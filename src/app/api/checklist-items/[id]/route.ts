import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { UserChecklistItemUpdateSchema } from "@/lib/validation/checklist";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return errorResponse("UNAUTHORIZED", "You must be signed in to update checklist items.");
    }

    const { id } = await params;

    const checklistItem = await prisma.checklistItem.findUnique({ where: { id } });
    if (!checklistItem) {
      return errorResponse("NOT_FOUND", "Checklist item not found.", 404);
    }

    const body = await request.json();
    const parsed = UserChecklistItemUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid update data.", 400, parsed.error.flatten().fieldErrors);
    }

    const data = parsed.data;

    const userItem = await prisma.userChecklistItem.upsert({
      where: { userId_checklistItemId: { userId: session.user.id, checklistItemId: id } },
      update: {
        status: data.status ?? undefined,
        notes: data.notes !== undefined ? data.notes : undefined,
        completedAt: data.status === "completed" ? new Date() : null,
      },
      create: {
        userId: session.user.id,
        checklistItemId: id,
        status: data.status || "not_started",
        notes: data.notes || null,
        completedAt: data.status === "completed" ? new Date() : null,
      },
    });

    const allItems = await prisma.checklistItem.findMany({
      where: { workflowId: checklistItem.workflowId },
    });

    const userItems = await prisma.userChecklistItem.findMany({
      where: { userId: session.user.id, checklistItem: { workflowId: checklistItem.workflowId } },
    });

    const completedCount = userItems.filter((ui: any) => ui.status === "completed").length;
    const totalRequired = allItems.filter((ci: any) => ci.isRequired).length;
    const progressPercentage = totalRequired > 0 ? Math.round((completedCount / totalRequired) * 100) : 0;

    const workflow = await prisma.workflow.findUnique({
      where: { id: checklistItem.workflowId },
      select: { slug: true },
    });

    const workflowStatus = progressPercentage === 100 ? "completed" : progressPercentage > 0 ? "in_progress" : "not_started";

    await prisma.userWorkflow.upsert({
      where: { userId_workflowId: { userId: session.user.id, workflowId: checklistItem.workflowId } },
      update: { status: workflowStatus, progressPercentage, completedAt: workflowStatus === "completed" ? new Date() : null },
      create: { userId: session.user.id, workflowId: checklistItem.workflowId, status: workflowStatus, progressPercentage, completedAt: workflowStatus === "completed" ? new Date() : null },
    });

    return successResponse({
      checklistItem: { id: userItem.id, status: userItem.status, completedAt: userItem.completedAt },
      workflowProgress: { workflowSlug: workflow?.slug || "unknown", progressPercentage, status: workflowStatus },
    });
  } catch (error) {
    console.error("Failed to update checklist item:", error);
    return errorResponse("SERVER_ERROR", "Failed to update checklist item.", 500);
  }
}
