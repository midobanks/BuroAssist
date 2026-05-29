import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { WorkflowSlug } from "@prisma/client";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!Object.values(WorkflowSlug).includes(slug as WorkflowSlug)) {
      return errorResponse("NOT_FOUND", "Workflow not found.", 404);
    }

    const workflow = await prisma.workflow.findUnique({
      where: { slug: slug as WorkflowSlug },
      include: {
        steps: {
          orderBy: { stepOrder: "asc" },
          include: { source: true, city: true },
        },
        checklistItems: {
          orderBy: { priority: "desc" },
          include: { source: true, city: true },
        },
        contentSources: true,
      },
    });

    if (!workflow || !workflow.isActive) {
      return errorResponse("NOT_FOUND", "Workflow not found.", 404);
    }

    const session = await auth();
    let userWorkflow = null;
    const userChecklistItems: Record<string, string> = {};

    if (session?.user?.id) {
      userWorkflow = await prisma.userWorkflow.findUnique({
        where: {
          userId_workflowId: { userId: session.user.id, workflowId: workflow.id },
        },
      });

      const userItems = await prisma.userChecklistItem.findMany({
        where: {
          userId: session.user.id,
          checklistItem: { workflowId: workflow.id },
        },
      });

      for (const item of userItems) {
        userChecklistItems[item.checklistItemId] = item.status;
      }
    }

    return successResponse({
      workflow: {
        ...workflow,
        userStatus: userWorkflow?.status || "not_started",
        userProgress: userWorkflow?.progressPercentage || 0,
        userChecklistItems,
      },
    });
  } catch (error) {
    console.error("Failed to fetch workflow:", error);
    return errorResponse("SERVER_ERROR", "Failed to fetch workflow.", 500);
  }
}
