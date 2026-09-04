import { sendSchoolEmail } from "@/lib/sendEmail";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    interests?: string;
    message?: string;
  };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const interests = String(body.interests || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !email) {
    return Response.json({ error: "name and email are required" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  try {
    const result = await sendSchoolEmail({
      subject: `Volunteer interest from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        interests ? `Interests: ${interests}` : null,
        message ? `\n${message}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
      replyTo: email,
    });
    return Response.json({ ok: true, note: result.note });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Failed to send message" },
      { status: 500 },
    );
  }
}
