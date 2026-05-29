import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.SENDER_EMAIL || "BüroAssist <onboarding@resend.dev>";

let resendClient: Resend | null = null;

function getResend(): Resend | null {
  if (!resendApiKey) return null;
  if (!resendClient) {
    resendClient = new Resend(resendApiKey);
  }
  return resendClient;
}

export async function sendReminderEmail(params: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const client = getResend();
  if (!client) {
    console.warn("Resend API key not configured. Skipping email send.");
    return { error: "Resend not configured" };
  }

  try {
    const result = await client.emails.send({
      from: fromEmail,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html || undefined,
    });

    return { data: result };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { error };
  }
}

export async function sendDueReminderNotifications() {
  const { default: prisma } = await import("@/lib/prisma");

  const dueReminders = await prisma.reminder.findMany({
    where: {
      status: "scheduled",
      reminderAt: { lte: new Date() },
      channel: "email",
    },
    include: {
      user: { select: { email: true, name: true } },
      workflow: { select: { name: true } },
    },
  });

  const results = { processed: dueReminders.length, sent: 0, failed: 0 };

  for (const reminder of dueReminders) {
    if (!reminder.user.email) {
      results.failed++;
      continue;
    }

    const result = await sendReminderEmail({
      to: reminder.user.email,
      subject: `Reminder: ${reminder.title}`,
      text: `Hi ${reminder.user.name || "there"},\n\nThis is a reminder for: ${reminder.title}${reminder.workflow ? ` (${reminder.workflow.name})` : ""}${reminder.description ? `\n\n${reminder.description}` : ""}\n\n- BüroAssist`,
    });

    if (result.data) {
      await prisma.reminder.update({
        where: { id: reminder.id },
        data: { status: "sent", sentAt: new Date() },
      });
      results.sent++;
    } else {
      await prisma.reminder.update({
        where: { id: reminder.id },
        data: { status: "failed" },
      });
      results.failed++;
    }
  }

  return results;
}
