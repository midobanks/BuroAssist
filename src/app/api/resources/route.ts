import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const citySlug = searchParams.get("citySlug");
    const workflowSlug = searchParams.get("workflowSlug");
    const sourceType = searchParams.get("sourceType");

    const where: Record<string, unknown> = {};

    if (citySlug) where.city = { slug: citySlug };
    if (workflowSlug) where.workflow = { slug: workflowSlug };
    if (sourceType) where.sourceType = sourceType;

    const sources = await prisma.contentSource.findMany({
      where,
      orderBy: { lastCheckedAt: "desc" },
      include: {
        city: { select: { name: true, slug: true } },
        workflow: { select: { name: true, slug: true } },
      },
    });

    return successResponse({ sources });
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    return errorResponse("SERVER_ERROR", "Failed to fetch resources.", 500);
  }
}
