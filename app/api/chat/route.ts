import { NextResponse } from "next/server";

export const runtime = "nodejs";

const REQUEST_TIMEOUT_MS = 20_000;

type ChatRequest = {
  message?: unknown;
  history?: unknown;
};

export async function POST(request: Request) {
  const spaceUrl = process.env.HF_SPACE_URL?.trim().replace(/\/$/, "");
  const accessToken = process.env.HF_ACCESS_TOKEN?.trim();

  if (!spaceUrl || !accessToken) {
    return NextResponse.json(
      { success: false, message: "Chat service is not configured." },
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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const upstreamResponse = await fetch(`${spaceUrl}/api/chat`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        ...(Array.isArray(body.history) ? { history: body.history } : {}),
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    const responseText = await upstreamResponse.text();
    let responseBody: unknown = null;

    try {
      responseBody = responseText ? JSON.parse(responseText) : null;
    } catch {
      responseBody = { message: responseText || "Chat service returned an invalid response." };
    }

    if (!upstreamResponse.ok) {
      console.error("Hugging Face chat request failed:", upstreamResponse.status);
      return NextResponse.json(
        { success: false, message: "The chat service could not process your message." },
        { status: upstreamResponse.status >= 500 ? 502 : upstreamResponse.status },
      );
    }

    return NextResponse.json(responseBody);
  } catch (error) {
    const message = error instanceof Error && error.name === "AbortError"
      ? "The chat service took too long to respond. Please try again."
      : "The chat service is temporarily unavailable.";

    console.error("Chat proxy request failed:", error);
    return NextResponse.json({ success: false, message }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
