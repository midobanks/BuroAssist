import { z } from "zod";
import { NationalityGroup, CurrentStatus } from "@prisma/client";

export const OnboardingSchema = z.object({
  preferredLanguage: z.string().min(2).max(5).default("en"),
  cityId: z.string().uuid({ message: "A valid city selection is required." }),
  nationalityGroup: z.nativeEnum(NationalityGroup, { message: "Please select your nationality group." }),
  currentStatus: z.nativeEnum(CurrentStatus, { message: "Please select your current status in Germany." }),
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

export type OnboardingInput = z.infer<typeof OnboardingSchema>;
