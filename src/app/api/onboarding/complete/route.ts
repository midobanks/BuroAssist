import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { OnboardingSchema } from "@/lib/validation/onboarding";
import { generateRoadmap } from "@/lib/roadmap-engine";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return errorResponse("UNAUTHORIZED", "You must be signed in to complete onboarding.");
    }

    const body = await request.json();
    const parsed = OnboardingSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Please check the highlighted fields and try again.", 400, parsed.error.flatten().fieldErrors);
    }

    const data = parsed.data;

    const profile = await prisma.profile.upsert({
      where: { id: session.user.id },
      update: {
        preferredLanguage: data.preferredLanguage,
        cityId: data.cityId,
        nationalityGroup: data.nationalityGroup,
        currentStatus: data.currentStatus,
        arrivalDate: data.arrivalDate ? new Date(data.arrivalDate) : null,
        moveInDate: data.moveInDate ? new Date(data.moveInDate) : null,
        visaExpiryDate: data.visaExpiryDate ? new Date(data.visaExpiryDate) : null,
        onboardingCompletedAt: new Date(),
      },
      create: {
        id: session.user.id,
        email: session.user.email || undefined,
        preferredLanguage: data.preferredLanguage,
        cityId: data.cityId,
        nationalityGroup: data.nationalityGroup,
        currentStatus: data.currentStatus,
        arrivalDate: data.arrivalDate ? new Date(data.arrivalDate) : null,
        moveInDate: data.moveInDate ? new Date(data.moveInDate) : null,
        visaExpiryDate: data.visaExpiryDate ? new Date(data.visaExpiryDate) : null,
        onboardingCompletedAt: new Date(),
      },
    });

    const recommendations = generateRoadmap({
      nationalityGroup: data.nationalityGroup,
      currentStatus: data.currentStatus,
      arrivalDate: data.arrivalDate ? new Date(data.arrivalDate) : null,
      moveInDate: data.moveInDate ? new Date(data.moveInDate) : null,
      visaExpiryDate: data.visaExpiryDate ? new Date(data.visaExpiryDate) : null,
      hasGermanBank: false,
      hasGermanSIM: false,
    });

    for (const rec of recommendations) {
      if (rec.isApplicable) {
        const workflow = await prisma.workflow.findUnique({ where: { slug: rec.slug } });
        if (workflow) {
          await prisma.userWorkflow.upsert({
            where: { userId_workflowId: { userId: session.user.id, workflowId: workflow.id } },
            update: { status: "not_started", dueDate: null },
            create: { userId: session.user.id, workflowId: workflow.id, status: "not_started", dueDate: rec.isUrgent ? new Date(Date.now() + 14 * 86400000) : null },
          });
        }
      }
    }

    const dbWorkflows = await prisma.workflow.findMany({ where: { isActive: true } });
    const roadmap = recommendations.map((rec) => {
      const dbWf = dbWorkflows.find((w: any) => w.slug === rec.slug);
      return {
        slug: rec.slug,
        name: dbWf?.name || rec.slug,
        order: rec.order,
        reason: rec.reason,
        isUrgent: rec.isUrgent,
        isApplicable: rec.isApplicable,
        status: rec.isApplicable ? "not_started" : "not_applicable",
      };
    });

    return successResponse({ profile: { onboardingCompletedAt: profile.onboardingCompletedAt }, roadmap: { workflows: roadmap } }, 201);
  } catch (error) {
    console.error("Failed to complete onboarding:", error);
    return errorResponse("SERVER_ERROR", "Failed to complete onboarding.", 500);
  }
}
