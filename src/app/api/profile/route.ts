import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { ProfileUpdateSchema } from "@/lib/validation/profile";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return errorResponse("UNAUTHORIZED", "You must be signed in to view your profile.");
    }

    const profile = await prisma.profile.findUnique({
      where: { id: session.user.id },
      include: { city: true, user: { select: { name: true } } },
    });

    if (!profile) {
      return errorResponse("NOT_FOUND", "Profile not found.");
    }

    return successResponse({ profile });
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return errorResponse("SERVER_ERROR", "Failed to fetch profile.", 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return errorResponse("UNAUTHORIZED", "You must be signed in to update your profile.");
    }

    const body = await request.json();
    const parsed = ProfileUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Please check the highlighted fields and try again.", 400, parsed.error.flatten().fieldErrors);
    }

    const updateData: Record<string, unknown> = {};
    const fields = parsed.data;
    if (fields.preferredLanguage !== undefined) updateData.preferredLanguage = fields.preferredLanguage;
    if (fields.cityId !== undefined) updateData.cityId = fields.cityId;
    if (fields.nationalityGroup !== undefined) updateData.nationalityGroup = fields.nationalityGroup;
    if (fields.currentStatus !== undefined) updateData.currentStatus = fields.currentStatus;
    if (fields.arrivalDate !== undefined) updateData.arrivalDate = fields.arrivalDate;
    if (fields.moveInDate !== undefined) updateData.moveInDate = fields.moveInDate;
    if (fields.visaExpiryDate !== undefined) updateData.visaExpiryDate = fields.visaExpiryDate;

    const profile = await prisma.profile.upsert({
      where: { id: session.user.id },
      update: updateData,
      create: { id: session.user.id, email: session.user.email || undefined, ...updateData },
    });

    return successResponse({ profile });
  } catch (error) {
    console.error("Failed to update profile:", error);
    return errorResponse("SERVER_ERROR", "Failed to update profile.", 500);
  }
}
