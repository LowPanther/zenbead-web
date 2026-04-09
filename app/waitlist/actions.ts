"use server";

import nodemailer from "nodemailer";

export type WaitlistEmailState =
  | { status: "idle" }
  | { status: "success"; email: string }
  | { status: "error"; message: string };

export type WaitlistDetailsState =
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendWaitlistMail(options: {
  subject: string;
  textBody: string;
  htmlBody: string;
  replyTo: string;
}): Promise<void> {
  const host = process.env.FEEDBACK_SMTP_HOST;
  const portRaw = process.env.FEEDBACK_SMTP_PORT ?? "587";
  const port = Number.parseInt(portRaw, 10);
  const user = process.env.FEEDBACK_SMTP_USER;
  const pass = process.env.FEEDBACK_SMTP_PASS;
  const to = process.env.FEEDBACK_TO_EMAIL ?? "hello@zenbead.io";

  if (!host || !user || !pass || Number.isNaN(port)) {
    throw new Error("smtp_not_configured");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const from = process.env.FEEDBACK_FROM_EMAIL ?? user;

  await transporter.sendMail({
    from: `"ZenBead beta waitlist" <${from}>`,
    to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.textBody,
    html: options.htmlBody,
  });
}

export async function submitWaitlistEmail(
  _prev: WaitlistEmailState,
  formData: FormData,
): Promise<WaitlistEmailState> {
  const honeypot = (formData.get("company")?.toString() ?? "").trim();
  if (honeypot !== "") {
    return { status: "success", email: "" };
  }

  const email = (formData.get("email")?.toString() ?? "").trim();

  if (email.length === 0) {
    return { status: "error", message: "Please enter your email address." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (email.length > 320) {
    return { status: "error", message: "Email address is too long." };
  }

  try {
    await sendWaitlistMail({
      replyTo: email,
      subject: `ZenBead beta waitlist — ${email}`,
      textBody: [`Beta waitlist signup (email)`, ``, `Email: ${email}`].join(
        "\n",
      ),
      htmlBody: `
    <p><strong>Beta waitlist</strong> — email signup</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
  `,
    });

    return { status: "success", email };
  } catch (e) {
    if ((e as Error)?.message === "smtp_not_configured") {
      return {
        status: "error",
        message:
          "This form isn’t wired to email on this server yet. Please write to hello@zenbead.io and mention the beta waitlist.",
      };
    }
    console.error("[waitlist email]", e);
    return {
      status: "error",
      message:
        "Couldn’t send just now. Please try again or email hello@zenbead.io.",
    };
  }
}

export async function submitWaitlistDetails(
  _prev: WaitlistDetailsState,
  formData: FormData,
): Promise<WaitlistDetailsState> {
  const honeypot = (formData.get("company")?.toString() ?? "").trim();
  if (honeypot !== "") {
    return { status: "success" };
  }

  const email = (formData.get("email")?.toString() ?? "").trim();
  const experience = (formData.get("experience")?.toString() ?? "").trim();
  const devicePreference = (formData.get("devicePreference")?.toString() ?? "").trim();
  const hope = (formData.get("hope")?.toString() ?? "").trim();

  if (email.length === 0 || !EMAIL_RE.test(email) || email.length > 320) {
    return {
      status: "error",
      message:
        "Something went wrong with your session. Please refresh and join the waitlist again.",
    };
  }

  const maxOpt = 4000;
  for (const [label, val] of [
    ["Experience", experience],
    ["Device preference", devicePreference],
    ["Hope", hope],
  ] as const) {
    if (val.length > maxOpt) {
      return {
        status: "error",
        message: `${label} answer is too long (${maxOpt} characters max).`,
      };
    }
  }

  const q1 =
    "What experience do you want to have with a mindfulness and journalling app?";
  const q2 =
    "Are you happy to journal on your phone or would you prefer to do so on your PC/laptop?";
  const q3 =
    "What do you hope to gain through your mindfulness and journalling practice?";

  const textBody = [
    `Beta waitlist — optional answers`,
    ``,
    `Email: ${email}`,
    ``,
    `${q1}`,
    experience || "(no answer)",
    ``,
    `${q2}`,
    devicePreference || "(no answer)",
    ``,
    `${q3}`,
    hope || "(no answer)",
  ].join("\n");

  const htmlBody = `
    <p><strong>Beta waitlist</strong> — optional follow-up</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>${escapeHtml(q1)}</strong></p>
    <pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(experience || "—")}</pre>
    <p><strong>${escapeHtml(q2)}</strong></p>
    <pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(devicePreference || "—")}</pre>
    <p><strong>${escapeHtml(q3)}</strong></p>
    <pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(hope || "—")}</pre>
  `;

  try {
    await sendWaitlistMail({
      replyTo: email,
      subject: `ZenBead beta waitlist — follow-up — ${email}`,
      textBody,
      htmlBody,
    });

    return { status: "success" };
  } catch (e) {
    if ((e as Error)?.message === "smtp_not_configured") {
      return {
        status: "error",
        message:
          "This form isn’t wired to email on this server yet. Please write to hello@zenbead.io.",
      };
    }
    console.error("[waitlist details]", e);
    return {
      status: "error",
      message:
        "Couldn’t send your answers just now. You’re still on the waitlist — try again or email hello@zenbead.io.",
    };
  }
}
