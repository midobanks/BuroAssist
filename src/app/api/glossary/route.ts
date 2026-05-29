import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const workflowSlug = searchParams.get("workflowSlug");

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { term: { contains: search, mode: "insensitive" } },
        { plainEnglishDefinition: { contains: search, mode: "insensitive" } },
      ];
    }

    if (workflowSlug) {
      where.workflow = { slug: workflowSlug };
    }

    const terms = await prisma.glossaryTerm.findMany({
      where,
      orderBy: { term: "asc" },
      include: { workflow: { select: { name: true, slug: true } } },
    });

    return successResponse({ terms });
  } catch (error) {
    console.error("Failed to fetch glossary terms:", error);
    return errorResponse("SERVER_ERROR", "Failed to fetch glossary terms.", 500);
  }
}
