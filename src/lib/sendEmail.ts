import { site } from "@/lib/site";

type EmailPayload = {
  subject: string;
  text: string;
  replyTo?: string;
};

export async function sendSchoolEmail(payload: EmailPayload): Promise<{ sent: boolean; note: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_EMAIL_TO?.trim() || site.email;

  if (apiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_EMAIL_FROM?.trim() || `Milwaukee Marathi Shala <onboarding@resend.dev>`,
        to: [to],
        subject: payload.subject,
        text: payload.text,
        reply_to: payload.replyTo,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Email delivery failed");
    }
    return { sent: true, note: "Message sent. We will reply soon." };
  }

  const webhook = process.env.CONTACT_FORM_WEBHOOK?.trim();
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, ...payload }),
    });
    if (!res.ok) throw new Error("Webhook delivery failed");
    return { sent: true, note: "Message sent. We will reply soon." };
  }

  return {
    sent: false,
    note: `Email service is not configured on the server. Please email us directly at ${site.email}.`,
  };
}
