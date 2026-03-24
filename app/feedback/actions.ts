"use server";

import nodemailer from "nodemailer";

export type FeedbackState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function submitFeedback(
  _prev: FeedbackState,
  formData: FormData,
): Promise<FeedbackState> {
  const honeypot = (formData.get("company")?.toString() ?? "").trim();
  if (honeypot !== "") {
    return { status: "success" };
  }

  const message = (formData.get("message")?.toString() ?? "").trim();
  const email = (formData.get("email")?.toString() ?? "").trim();

  if (message.length < 2) {
    return { status: "error", message: "Please enter a message." };
  }
  if (message.length > 20_000) {
    return { status: "error", message: "Message is too long (20,000 characters max)." };
  }

  const host = process.env.FEEDBACK_SMTP_HOST;
  const portRaw = process.env.FEEDBACK_SMTP_PORT ?? "587";
  const port = Number.parseInt(portRaw, 10);
  const user = process.env.FEEDBACK_SMTP_USER;
  const pass = process.env.FEEDBACK_SMTP_PASS;
  const to = process.env.FEEDBACK_TO_EMAIL ?? "hello@zenbead.io";

  if (!host || !user || !pass || Number.isNaN(port)) {
    return {
      status: "error",
      message:
        "This form isn’t wired to email on this server yet. Please write to hello@zenbead.io — we read everything.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const from = process.env.FEEDBACK_FROM_EMAIL ?? user;

    await transporter.sendMail({
      from: `"ZenBead feedback" <${from}>`,
      to,
      replyTo: email || undefined,
      subject: "ZenBead app feedback",
      text: [
        email ? `Sender email: ${email}` : "No reply email provided",
        "",
        message,
      ].join("\n"),
      html: `<p><strong>Sender (optional):</strong> ${email ? escapeHtml(email) : "—"}</p><pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(message)}</pre>`,
    });

    return { status: "success" };
  } catch (e) {
    console.error("[feedback]", e);
    return {
      status: "error",
      message:
        "Couldn’t send just now. Please try again or email hello@zenbead.io.",
    };
  }
}
