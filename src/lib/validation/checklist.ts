import { z } from "zod";
import { ChecklistStatus } from "@prisma/client";

export const UserChecklistItemUpdateSchema = z.object({
  status: z.nativeEnum(ChecklistStatus).optional(),
  notes: z.string().max(2000, "Notes cannot exceed 2000 characters.").nullable().optional(),
});

export type UserChecklistItemUpdateInput = z.infer<typeof UserChecklistItemUpdateSchema>;
