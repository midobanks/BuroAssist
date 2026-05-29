import {
  WorkflowSlug,
  CurrentStatus,
  NationalityGroup,
  RiskLevel,
  ChecklistItemType,
  Priority,
  WorkflowStatus,
  ChecklistStatus,
  ReminderType,
  ReminderChannel,
  ReminderStatus,
  SourceType,
  FeedbackType,
  FeedbackStatus,
} from "@prisma/client";

export type {
  WorkflowSlug,
  CurrentStatus,
  NationalityGroup,
  RiskLevel,
  ChecklistItemType,
  Priority,
  WorkflowStatus,
  ChecklistStatus,
  ReminderType,
  ReminderChannel,
  ReminderStatus,
  SourceType,
  FeedbackType,
  FeedbackStatus,
};

export interface UserProfile {
  id: string;
  email?: string | null;
  preferredLanguage: string;
  cityId?: string | null;
  nationalityGroup?: NationalityGroup | null;
  currentStatus?: CurrentStatus | null;
  arrivalDate?: string | null; // ISO string representation
  moveInDate?: string | null; // ISO string representation
  visaExpiryDate?: string | null; // ISO string representation
  onboardingCompletedAt?: string | null;
}
