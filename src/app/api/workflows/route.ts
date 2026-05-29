import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const workflows = await prisma.workflow.findMany({
      where: { isActive: true },
      orderBy: { defaultOrder: "asc" },
    });
    return successResponse({ workflows });
  } catch (error) {
    console.error("Failed to fetch workflows:", error);
    return errorResponse("SERVER_ERROR", "Failed to fetch workflows.", 500);
  }
}
