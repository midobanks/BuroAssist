import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { CreateFeedbackSchema } from "@/lib/validation/feedback";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();
    const parsed = CreateFeedbackSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Please check the highlighted fields.", 400, parsed.error.flatten().fieldErrors);
    }

    const data = parsed.data;

    const feedback = await prisma.feedback.create({
      data: {
        userId: session?.user?.id || null,
        feedbackType: data.feedbackType,
        workflowId: data.workflowId || null,
        contentSourceId: data.contentSourceId || null,
        message: data.message,
        rating: data.rating || null,
      },
    });

    return successResponse({ feedback: { id: feedback.id, status: feedback.status, createdAt: feedback.createdAt } }, 201);
  } catch (error) {
    console.error("Failed to submit feedback:", error);
    return errorResponse("SERVER_ERROR", "Failed to submit feedback.", 500);
  }
}
