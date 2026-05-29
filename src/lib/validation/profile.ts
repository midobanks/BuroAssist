import { z } from "zod";
import { NationalityGroup, CurrentStatus } from "@prisma/client";

export const ProfileUpdateSchema = z.object({
  preferredLanguage: z.string().min(2).max(5).optional(),
  cityId: z.string().uuid().nullable().optional(),
  nationalityGroup: z.nativeEnum(NationalityGroup).nullable().optional(),
  currentStatus: z.nativeEnum(CurrentStatus).nullable().optional(),
  arrivalDate: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return null;
    if (typeof val === "string") return new Date(val);
    return val;
  }, z.date().nullable().optional()),
  moveInDate: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return null;
    if (typeof val === "string") return new Date(val);
    return val;
  }, z.date().nullable().optional()),
  visaExpiryDate: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return null;
    if (typeof val === "string") return new Date(val);
    return val;
  }, z.date().nullable().optional()),
});

export type ProfileUpdateInput = z.infer<typeof ProfileUpdateSchema>;
