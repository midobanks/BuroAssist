import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { CreateReminderSchema } from "@/lib/validation/reminder";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return errorResponse("UNAUTHORIZED", "You must be signed in to view reminders.");
    }

    const reminders = await prisma.reminder.findMany({
      where: { userId: session.user.id },
      orderBy: { reminderAt: "asc" },
      include: { workflow: { select: { name: true, slug: true } } },
    });

    return successResponse({ reminders });
  } catch (error) {
    console.error("Failed to fetch reminders:", error);
    return errorResponse("SERVER_ERROR", "Failed to fetch reminders.", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return errorResponse("UNAUTHORIZED", "You must be signed in to create reminders.");
    }

    const body = await request.json();
    const parsed = CreateReminderSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Please check the highlighted fields.", 400, parsed.error.flatten().fieldErrors);
    }

    const data = parsed.data;

    const reminder = await prisma.reminder.create({
      data: {
        userId: session.user.id,
        title: data.title,
        description: data.description || null,
        reminderType: data.reminderType,
        reminderAt: data.reminderAt,
        channel: data.channel,
        workflowId: data.workflowId || null,
        checklistItemId: data.checklistItemId || null,
      },
    });

    return successResponse({ reminder }, 201);
  } catch (error) {
    console.error("Failed to create reminder:", error);
    return errorResponse("SERVER_ERROR", "Failed to create reminder.", 500);
  }
}
