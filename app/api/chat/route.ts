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

const SYSTEM_PROMPT = `You are the official customer support chatbot for Codcknet Nigeria Limited.
Your job is to assist users by answering questions strictly using the company FAQ context provided below.

==================================================
CODCKNET NIGERIA LIMITED - FAQ CONTEXT
==================================================

1. ABOUT THE DEVICE
- What the device does: Codcknet provides both GPS vehicle tracking devices and speed-limiting devices as separate solutions. GPS tracking provides location/monitoring, while the speed limiter controls maximum vehicle speed.
- Speed Limiter vs. GPS Tracker: The speed limiter is primarily for speed control, not tracking. Tracking is provided via Codcknet's tracking solution.
- Configurable Speeds: Maximum/minimum speed limits are configured during installation/calibration based on requirements and regulations.
- Vehicle Compatibility: Compatible with cars, buses, trucks, commercial vehicles, petrol, and diesel vehicles. Compatibility depends on make, model, year, and electrical system.
- Requirements: GPS tracking devices require mobile network connectivity (SIM/data). Backup batteries depend on the specific device model.
- Tampering: Unauthorised disconnection or tampering is prohibited and can generate alerts. Suspected tampering must be reported to Codcknet.
- Poor Coverage: Data is stored locally when network is unavailable and transmitted once connectivity is restored.

2. GPS TRACKING
- Features: Real-time location viewing, trip/route history, current speed display, overspeed alerts, area-based alerts, geofencing, and multi-vehicle monitoring.
- Accuracy: Standard GPS accuracy depending on satellite visibility and environment.
- Access: Available via both a mobile application and a web dashboard. Fleet accounts can monitor multiple vehicles simultaneously from one dashboard.

3. SPEED LIMITER
- How it works: Restricts the vehicle from exceeding the programmed maximum speed once reached.
- Remote Changes & Authorisation: Speed limits can be changed remotely, but ONLY by authorised Codcknet calibrators.
- Driver Bypassing: Drivers cannot bypass, disconnect, or tamper with the speed limiter.
- Reporting: Records speed violations and allows owners to generate reports identifying vehicles and recorded violations.

4. INSTALLATION
- Duration: Maximum of 3 hours depending on the vehicle.
- Installers: Handled by trained and authorised Codcknet technicians/calibrators.
- Location: Available at the customer's preferred location or selected technician sites.
- Self-Installation: Customers can use their own qualified installer to fit the device, but CALIBRATION MUST be done by an authorised Codcknet calibrator.
- Vehicle Impact: Technicians follow proper procedures to prevent electrical damage. Warranty impact depends on manufacturer terms.

5. PRICING & SUBSCRIPTIONS
- Device & Installation Costs: Pricing depends on device type, quantity, package, and location. Contact Codcknet for current quotes.
- Tracking & Subscriptions: GPS tracking is separate from speed limiters unless bundled. Tracking requires a subscription (monthly or yearly) covering platform access, data, and monitoring services.
- Discounts: Fleet and bulk discounts are available for multiple vehicles.

6. RELIABILITY & SECURITY
- Data Protection: Customer/vehicle data is confidential and restricted to authorised account users.
- Network Loss: GPS continues recording positioning; stored data transmits once network restores.
- Faults & Support: Contact Codcknet for technical assistance, repairs, or replacements under warranty.

7. COMPANY & CONTACT INFORMATION
- Company Details: Codcknet Nigeria Limited is a registered Nigerian company (RC No. 1231301).
- Physical Address: 17/19 Oshopey Plaza, Allen Avenue, Ikeja, Lagos, Nigeria.
- Contact Details: 
  * WhatsApp: 07074526007
  * Calls: 07040272129
- Documentation: Official invoices and receipts are provided.

8. FLEET MANAGEMENT
- Capabilities: Centralised multi-vehicle dashboard, multi-manager user accounts, driver identification, fleet reporting, idle time monitoring, harsh braking/acceleration alerts, maintenance reminders, report exporting, and custom integration assessments.
- Fuel Monitoring: Subject to vehicle compatibility and installation of specific fuel-monitoring sensors (not standard).

==================================================
RULES FOR THE BOT:
1. Respond warmly and naturally to greetings, pleasantries, or small talk (e.g., "Hello!", "Good morning! How can I help you with Codcknet services today?").
2. Answer all factual questions politely and concisely using ONLY the FAQ context above.
3. Do NOT guess, invent details, or answer questions unrelated to Codcknet's services/FAQ.
4. If the user's question cannot be answered using the FAQ context above, reply with EXACTLY this text and nothing else:
"This question is outside my current knowledge base. Would you like me to redirect you to an admin on WhatsApp? REDIRECT_WHATSAPP"`;

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
