import { z } from "zod";
import { ReminderType, ReminderChannel, ReminderStatus } from "@prisma/client";

export const CreateReminderSchema = z.object({
  title: z.string().min(1, "Title is required.").max(200, "Title must be under 200 characters."),
  description: z.string().max(1000, "Description must be under 1000 characters.").nullable().optional(),
  reminderType: z.nativeEnum(ReminderType, { message: "A valid reminder type is required." }),
  reminderAt: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().refine((date) => date > new Date(), {
      message: "Reminder date must be in the future.",
    })
  ),
  channel: z.nativeEnum(ReminderChannel).default(ReminderChannel.email),
  workflowId: z.string().uuid().nullable().optional(),
  checklistItemId: z.string().uuid().nullable().optional(),
});

export const UpdateReminderSchema = CreateReminderSchema.partial().extend({
  status: z.nativeEnum(ReminderStatus).optional(),
});

export type CreateReminderInput = z.infer<typeof CreateReminderSchema>;
export type UpdateReminderInput = z.infer<typeof UpdateReminderSchema>;
