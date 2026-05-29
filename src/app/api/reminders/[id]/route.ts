import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { UpdateReminderSchema } from "@/lib/validation/reminder";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return errorResponse("UNAUTHORIZED", "You must be signed in to update reminders.");
    }

    const { id } = await params;

    const existing = await prisma.reminder.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("NOT_FOUND", "Reminder not found.", 404);
    }
    if (existing.userId !== session.user.id) {
      return errorResponse("FORBIDDEN", "You can only update your own reminders.", 403);
    }

    const body = await request.json();
    const parsed = UpdateReminderSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid update data.", 400, parsed.error.flatten().fieldErrors);
    }

    const reminder = await prisma.reminder.update({ where: { id }, data: parsed.data });
    return successResponse({ reminder });
  } catch (error) {
    console.error("Failed to update reminder:", error);
    return errorResponse("SERVER_ERROR", "Failed to update reminder.", 500);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return errorResponse("UNAUTHORIZED", "You must be signed in to cancel reminders.");
    }

    const { id } = await params;

    const existing = await prisma.reminder.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("NOT_FOUND", "Reminder not found.", 404);
    }
    if (existing.userId !== session.user.id) {
      return errorResponse("FORBIDDEN", "You can only cancel your own reminders.", 403);
    }

    await prisma.reminder.update({ where: { id }, data: { status: "cancelled" } });
    return successResponse({ success: true });
  } catch (error) {
    console.error("Failed to cancel reminder:", error);
    return errorResponse("SERVER_ERROR", "Failed to cancel reminder.", 500);
  }
}
