import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return errorResponse("VALIDATION_ERROR", "First name, last name, email, and password are required.");
    }

    const name = `${firstName.trim()} ${lastName.trim()}`;

    if (password.length < 8) {
      return errorResponse("VALIDATION_ERROR", "Password must be at least 8 characters.");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return errorResponse("VALIDATION_ERROR", "An account with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.$transaction(async (tx: any) => {
      const u = await tx.user.create({ data: { name, email, passwordHash } });
      await tx.profile.create({ data: { id: u.id, email: u.email } });
      return u;
    });

    return successResponse({ id: user.id, name: user.name, email: user.email }, 201);
  } catch (error) {
    console.error("Registration failed:", error);
    return errorResponse("SERVER_ERROR", "Registration failed. Please try again.", 500);
  }
}
