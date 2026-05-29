import { z } from "zod";
import { FeedbackType } from "@prisma/client";

export const CreateFeedbackSchema = z.object({
  feedbackType: z.nativeEnum(FeedbackType, { message: "A valid feedback type is required." }),
  workflowId: z.string().uuid().nullable().optional(),
  contentSourceId: z.string().uuid().nullable().optional(),
  message: z.string().min(5, "Message must be at least 5 characters.").max(5000, "Message cannot exceed 5000 characters."),
  rating: z.number().int().min(1).max(5).nullable().optional(),
});

export type CreateFeedbackInput = z.infer<typeof CreateFeedbackSchema>;
