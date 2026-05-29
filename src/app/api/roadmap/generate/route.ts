import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { generateRoadmap } from "@/lib/roadmap-engine";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return errorResponse("UNAUTHORIZED", "You must be signed in to view your roadmap.");
    }

    const body = await request.json().catch(() => ({}));
    const refresh = body?.refresh === true;

    const profile = await prisma.profile.findUnique({
      where: { id: session.user.id },
    });

    if (!profile || !profile.nationalityGroup || !profile.currentStatus) {
      return errorResponse("VALIDATION_ERROR", "Please complete your onboarding first.");
    }

    const recommendations = generateRoadmap({
      nationalityGroup: profile.nationalityGroup,
      currentStatus: profile.currentStatus,
      arrivalDate: profile.arrivalDate,
      moveInDate: profile.moveInDate,
      visaExpiryDate: profile.visaExpiryDate,
      hasGermanBank: false,
      hasGermanSIM: false,
    });

    const userWorkflows = await prisma.userWorkflow.findMany({
      where: { userId: session.user.id },
      include: { workflow: true },
    });

    const dbWorkflows = await prisma.workflow.findMany({ where: { isActive: true } });

    const roadmap = recommendations.map((rec) => {
      const dbWf = dbWorkflows.find((w) => w.slug === rec.slug);
      const uwf = userWorkflows.find((uw) => uw.workflow.slug === rec.slug);

      return {
        slug: rec.slug,
        name: dbWf?.name || rec.slug,
        shortDescription: dbWf?.shortDescription || "",
        order: rec.order,
        reason: rec.reason,
        isUrgent: rec.isUrgent,
        isApplicable: rec.isApplicable,
        status: rec.isApplicable ? (uwf?.status || "not_started") : "not_applicable",
        progressPercentage: uwf?.progressPercentage || 0,
        dueDate: uwf?.dueDate || null,
      };
    });

    if (refresh) {
      for (const rec of recommendations.filter((r) => r.isApplicable)) {
        const wf = dbWorkflows.find((w) => w.slug === rec.slug);
        if (wf) {
          const existing = userWorkflows.find((uw) => uw.workflowId === wf.id);
          if (!existing) {
            await prisma.userWorkflow.create({
              data: { userId: session.user.id, workflowId: wf.id, status: "not_started", dueDate: rec.isUrgent ? new Date(Date.now() + 14 * 86400000) : null },
            });
          }
        }
      }
    }

    return successResponse({ roadmap: { generatedAt: new Date().toISOString(), workflows: roadmap } });
  } catch (error) {
    console.error("Failed to generate roadmap:", error);
    return errorResponse("SERVER_ERROR", "Failed to generate roadmap.", 500);
  }
}
