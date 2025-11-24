import { NextResponse } from "next/server";
import { BACKEND_URL } from "../../lib/backend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const subject = String(body.subject ?? "").trim();
    const content = String(body.content ?? "").trim();

    if (!subject) {
      return NextResponse.json(
        { message: "subject is required" },
        { status: 400 }
      );
    }

    try {
      const backendRes = await fetch(`${BACKEND_URL}/api/campaigns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content }),
      });

      const text = await backendRes.text();
      let parsed: any = text;
      try {
        parsed = text ? JSON.parse(text) : null;
      } catch (e) {}

      return NextResponse.json(parsed, { status: backendRes.status });
    } catch (e) {
      console.error("Error forwarding campaign to backend:", e);
      return NextResponse.json(
        { message: "failed to forward to backend" },
        { status: 502 }
      );
    }
  } catch (err) {
    return NextResponse.json({ message: "invalid json" }, { status: 400 });
  }
}
