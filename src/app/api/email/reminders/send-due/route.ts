import { sendDueReminderNotifications } from "@/lib/email";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const jobSecret = body.jobSecret;

    if (jobSecret !== process.env.AUTH_SECRET) {
      return errorResponse("UNAUTHORIZED", "Invalid secret.", 401);
    }

    const results = await sendDueReminderNotifications();

    return successResponse(results);
  } catch {
    return errorResponse("SERVER_ERROR", "Failed to process reminders.", 500);
  }
}
