import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const cities = await prisma.city.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true, federalState: true, isMvpCity: true },
    });
    return successResponse({ cities });
  } catch (error) {
    console.error("Failed to fetch cities:", error);
    return errorResponse("SERVER_ERROR", "Failed to fetch cities.", 500);
  }
}
