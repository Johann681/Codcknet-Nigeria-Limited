import { NextResponse } from "next/server";

export const runtime = "nodejs";

const REQUEST_TIMEOUT_MS = 30_000;

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type ChatRequest = {
  message?: unknown;
  history?: unknown;
};

const SYSTEM_PROMPT = `You are the official customer support AI for Codcknet Nigeria Limited.
Identify user intent accurately even when users use informal English, Nigerian Pidgin, local slang, bad grammar, typos, or concise phrasing.

Answer directly, warmly, and concisely using only the verified knowledge base below. Use short paragraphs or bullets. Respond politely to greetings and small talk. Never invent exact prices, warranties, technical capabilities, or services that are not listed.

VERIFIED KNOWLEDGE BASE

1. ABOUT THE DEVICE
- Codcknet provides separate GPS vehicle tracking and speed-limiting solutions. GPS provides location and monitoring; the speed limiter controls maximum vehicle speed.
- The speed limiter is primarily for speed control, not tracking.
- Maximum and minimum speeds are configured during installation and calibration based on regulatory and client requirements.
- Devices are compatible with cars, buses, trucks, commercial vehicles, petrol vehicles, and diesel vehicles, subject to make, model, year, and electrical system.
- GPS tracking requires mobile network connectivity through a SIM/data plan. Backup batteries depend on the device model.
- Unauthorised disconnection or tampering is prohibited and generates system alerts. Suspected tampering must be reported to Codcknet immediately.
- When coverage is unavailable, data is stored locally and transmitted automatically when connectivity returns.

2. GPS TRACKING
- Features include real-time location, trip and route history, current speed, overspeed alerts, area-based alerts, geofencing, and multi-vehicle monitoring.
- Accuracy depends on satellite visibility and the surrounding environment.
- Access is available through a mobile application and web dashboard. Fleet accounts can monitor multiple vehicles from one dashboard.

3. SPEED LIMITER
- It restricts the vehicle from exceeding the programmed maximum speed.
- Speed limits can be changed remotely only by authorised Codcknet calibrators.
- Drivers cannot bypass, disconnect, or tamper with the limiter.
- The system records speed violations and lets vehicle owners generate detailed violation reports.

4. INSTALLATION
- Installation takes a maximum of 3 hours, depending on the vehicle model.
- Installation is handled by trained and authorised Codcknet technicians/calibrators.
- Mobile installation is available at the customer's preferred location or at selected technician workshops.
- A customer may use a qualified installer to fit the hardware, but calibration must be performed by an authorised Codcknet calibrator.
- Technicians follow proper electrical safety procedures. Warranty impact depends on the vehicle manufacturer's terms.

5. PRICING AND SUBSCRIPTIONS
- Pricing varies by device type, quantity, package, and installation location. Provide a custom quote through Codcknet; do not state an exact price.
- GPS tracking is separate from speed limiters unless bundled. Tracking requires a monthly or yearly subscription covering platform access, data, and monitoring.
- Fleet and bulk discounts are available for multi-vehicle orders.

6. RELIABILITY AND SECURITY
- Customer and vehicle data is confidential and restricted to authorised account users.
- GPS continues recording positioning offline and transmits stored data when the network returns.
- Codcknet technical support handles faults, repairs, and warranty replacements.

7. COMPANY AND CONTACT
- Codcknet Nigeria Limited is a registered Nigerian company, RC No. 1231301.
- Address: 17/19 Oshopey Plaza, Allen Avenue, Ikeja, Lagos, Nigeria.
- WhatsApp: 07074526007. Phone calls: 07040272129.
- Official invoices and receipts are provided for all services.

8. FLEET MANAGEMENT
- Capabilities include a centralised multi-vehicle dashboard, multi-manager accounts, driver identification, fleet reports, idle-time monitoring, harsh braking and acceleration alerts, maintenance reminders, report exporting, and custom integration assessments.
- Fuel monitoring depends on vehicle compatibility and dedicated fuel-monitoring sensors; it is not included as standard.

INTENT RULES
- Questions about an office, shop, physical address, or “where de office dey” should receive the Allen Avenue, Ikeja address.
- Questions about price, cost, rates, or “how much” should explain that pricing depends on specifications and provide contact options for a custom quote.
- Questions about booking, installation, duration, or technicians should use the installation facts above.
- Questions about phone numbers or WhatsApp should provide the verified contact numbers above.

If a query cannot be answered from this knowledge base, reply EXACTLY with this string and nothing else:
This question is outside my current knowledge base. Would you like me to redirect you to an admin on WhatsApp? REDIRECT_WHATSAPP`;

const CANDIDATE_MODELS = [
  "meta-llama/Llama-3.3-70B-Instruct",
  "Qwen/Qwen2.5-72B-Instruct",
  "deepseek-ai/DeepSeek-V3",
];

export async function POST(request: Request) {
  const token = (
    process.env.HF_TOKEN ||
    process.env.HF_ACCESS_TOKEN ||
    process.env.HUGGINGFACE_API_KEY
  )?.trim();

  const spaceUrl = process.env.HF_SPACE_URL?.trim().replace(/\/$/, "");
  const preferredModel = process.env.HF_MODEL?.trim() || CANDIDATE_MODELS[0];

  if (!token && !spaceUrl) {
    return NextResponse.json(
      {
        success: false,
        message: "Hugging Face API is not configured. Please set HF_TOKEN in your .env.local file.",
      },
      { status: 503 },
    );
  }

  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json(
      { success: false, message: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return NextResponse.json(
      { success: false, message: "A message is required." },
      { status: 400 },
    );
  }

  // Parse and sanitize history
  const sanitizedHistory: ChatMessage[] = [];
  if (Array.isArray(body.history)) {
    for (const item of body.history) {
      if (
        item &&
        typeof item === "object" &&
        "content" in item &&
        typeof item.content === "string" &&
        "role" in item &&
        (item.role === "user" || item.role === "assistant")
      ) {
        sanitizedHistory.push({
          role: item.role,
          content: item.content.slice(0, 1500),
        });
      }
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    // 1. If HF_SPACE_URL is provided, route to custom Space
    if (spaceUrl) {
      const spaceResponse = await fetch(`${spaceUrl}/api/chat`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          history: sanitizedHistory,
          systemPrompt: SYSTEM_PROMPT,
        }),
        signal: controller.signal,
        cache: "no-store",
      });

      const responseText = await spaceResponse.text();
      let spaceData: any = null;
      try {
        spaceData = responseText ? JSON.parse(responseText) : null;
      } catch {
        spaceData = { response: responseText };
      }

      if (!spaceResponse.ok) {
        return NextResponse.json(
          {
            success: false,
            message: spaceData?.message || "Space returned an error.",
          },
          { status: spaceResponse.status >= 500 ? 502 : spaceResponse.status },
        );
      }

      const reply =
        spaceData?.response ||
        spaceData?.answer ||
        spaceData?.message ||
        spaceData?.choices?.[0]?.message?.content ||
        "I'm here to assist you with Codcknet speed limiters and GPS tracking services!";

      return NextResponse.json({
        success: true,
        response: reply,
        message: reply,
      });
    }

    // 2. Hugging Face Serverless Chat Completions API
    const messagesPayload: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...sanitizedHistory.slice(-4), // Keep relevant recent history
      { role: "user", content: message },
    ];

    const modelsToTry = [
      preferredModel,
      ...CANDIDATE_MODELS.filter((m) => m !== preferredModel),
    ];

    let lastError: any = null;
    let assistantReply: string | null = null;

    for (const modelToUse of modelsToTry) {
      try {
        const hfResponse = await fetch(
          "https://router.huggingface.co/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: modelToUse,
              messages: messagesPayload,
              max_tokens: 512,
              temperature: 0.7,
            }),
            signal: controller.signal,
            cache: "no-store",
          },
        );

        if (hfResponse.ok) {
          const data = await hfResponse.json();
          const content = data?.choices?.[0]?.message?.content;
          if (content && typeof content === "string") {
            assistantReply = content.trim();
            break;
          }
        } else {
          const errText = await hfResponse.text();
          console.warn(`Hugging Face model ${modelToUse} failed (${hfResponse.status}):`, errText);
          lastError = errText;
        }
      } catch (e) {
        lastError = e;
      }
    }

    if (assistantReply) {
      return NextResponse.json({
        success: true,
        response: assistantReply,
        message: assistantReply,
      });
    }

    console.error("All Hugging Face models failed with:", lastError);
    return NextResponse.json(
      {
        success: false,
        message: "The AI service is currently busy. Please feel free to reach out directly via WhatsApp at +234 707 452 6007.",
      },
      { status: 502 },
    );
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === "AbortError";
    const errorMessage = isTimeout
      ? "The chat service took too long to respond. Please try again."
      : "The chat service is temporarily unavailable.";

    console.error("Chat API request failed:", error);
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
