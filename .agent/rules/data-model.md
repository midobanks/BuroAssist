# BüroAssist Data Model Rules

## Purpose

This file defines the conceptual data model for the BüroAssist MVP. Use it to design database tables, API payloads, TypeScript types, and validation schemas.

## Data Principles

- Collect only data needed to personalize workflows and reminders.
- Do not store passport numbers, ID card numbers, tax IDs, bank credentials, ELSTER credentials, SIM contract numbers, or residence permit numbers in the MVP.
- Store user workflow progress, not sensitive documents.
- Every content item that provides administrative guidance must include a source reference and review metadata.
- Prefer normalized data for workflows and checklist items.
- Use enums for statuses and workflow slugs to avoid inconsistent values.

## Core Entities

## User

Authentication user managed by the auth provider.

Do not duplicate auth credentials in app tables.

Related app table should be `profiles`.

## Profile

Stores user personalization inputs.

Fields:

- `id`: uuid, primary key, references auth user id
- `email`: text, optional cached email
- `preferred_language`: text, default `en`
- `city_id`: uuid, nullable
- `nationality_group`: enum, nullable
- `current_status`: enum, nullable
- `arrival_date`: date, nullable
- `move_in_date`: date, nullable
- `visa_expiry_date`: date, nullable
- `onboarding_completed_at`: timestamp, nullable
- `created_at`: timestamp
- `updated_at`: timestamp

Allowed `nationality_group` values:

- `eu_eea`
- `non_eu`
- `unknown`

Allowed `current_status` values:

- `student`
- `employee`
- `skilled_worker`
- `blue_card_candidate`
- `job_seeker`
- `freelancer`
- `family_member`
- `researcher`
- `other`
- `unknown`

## City

Stores supported cities.

Fields:

- `id`: uuid, primary key
- `name`: text
- `slug`: text, unique
- `federal_state`: text, nullable
- `country`: text, default `Germany`
- `is_mvp_city`: boolean
- `is_active`: boolean
- `created_at`: timestamp
- `updated_at`: timestamp

MVP city slugs:

- `berlin`
- `munich`
- `hamburg`
- `cologne`
- `frankfurt`

## Workflow

Defines each supported MVP workflow.

Fields:

- `id`: uuid, primary key
- `slug`: enum/text, unique
- `name`: text
- `short_description`: text
- `long_description`: text
- `category`: text
- `default_order`: integer
- `risk_level`: enum
- `is_active`: boolean
- `last_reviewed_at`: timestamp
- `created_at`: timestamp
- `updated_at`: timestamp

Allowed workflow slugs:

- `anmeldung`
- `residence_permit`
- `health_insurance`
- `tax_id_elster`
- `mobile_sim`
- `banking`

Allowed `risk_level` values:

- `low`
- `medium`
- `high`

Residence permit, health insurance, and tax-related content should normally be treated as `high` or `medium` risk.

## WorkflowStep

Defines ordered steps within a workflow.

Fields:

- `id`: uuid, primary key
- `workflow_id`: uuid, references workflows
- `city_id`: uuid, nullable
- `title`: text
- `description`: text
- `step_order`: integer
- `applies_to_statuses`: text array or jsonb
- `applies_to_nationality_groups`: text array or jsonb
- `is_required`: boolean
- `warning_text`: text, nullable
- `source_id`: uuid, nullable, references content_sources
- `last_reviewed_at`: timestamp
- `created_at`: timestamp
- `updated_at`: timestamp

## ChecklistItem

Actionable item users can mark complete.

Fields:

- `id`: uuid, primary key
- `workflow_id`: uuid, references workflows
- `workflow_step_id`: uuid, nullable, references workflow_steps
- `city_id`: uuid, nullable
- `title`: text
- `description`: text
- `item_type`: enum
- `priority`: enum
- `applies_to_statuses`: text array or jsonb
- `applies_to_nationality_groups`: text array or jsonb
- `is_required`: boolean
- `source_id`: uuid, nullable, references content_sources
- `last_reviewed_at`: timestamp
- `created_at`: timestamp
- `updated_at`: timestamp

Allowed `item_type` values:

- `document`
- `appointment`
- `form`
- `proof`
- `account_setup`
- `verification`
- `reminder`
- `information`
- `other`

Allowed `priority` values:

- `low`
- `medium`
- `high`
- `urgent`

## UserWorkflow

Tracks a user’s progress through each workflow.

Fields:

- `id`: uuid, primary key
- `user_id`: uuid, references auth user/profile
- `workflow_id`: uuid, references workflows
- `status`: enum
- `progress_percentage`: integer, 0-100
- `due_date`: date, nullable
- `started_at`: timestamp, nullable
- `completed_at`: timestamp, nullable
- `created_at`: timestamp
- `updated_at`: timestamp

Allowed `status` values:

- `not_started`
- `in_progress`
- `ready`
- `completed`
- `blocked`
- `not_applicable`

## UserChecklistItem

Tracks a user’s completion state for a checklist item.

Fields:

- `id`: uuid, primary key
- `user_id`: uuid, references auth user/profile
- `checklist_item_id`: uuid, references checklist_items
- `status`: enum
- `notes`: text, nullable
- `completed_at`: timestamp, nullable
- `created_at`: timestamp
- `updated_at`: timestamp

Allowed `status` values:

- `not_started`
- `in_progress`
- `completed`
- `blocked`
- `not_applicable`

## Reminder

Stores reminders for deadlines, appointments, and follow-ups.

Fields:

- `id`: uuid, primary key
- `user_id`: uuid, references auth user/profile
- `workflow_id`: uuid, nullable, references workflows
- `checklist_item_id`: uuid, nullable, references checklist_items
- `title`: text
- `description`: text, nullable
- `reminder_type`: enum
- `reminder_at`: timestamp
- `channel`: enum
- `status`: enum
- `sent_at`: timestamp, nullable
- `created_at`: timestamp
- `updated_at`: timestamp

Allowed `reminder_type` values:

- `deadline`
- `appointment`
- `document_follow_up`
- `activation_code`
- `renewal`
- `custom`

Allowed `channel` values:

- `email`
- `in_app`

Allowed `status` values:

- `scheduled`
- `sent`
- `cancelled`
- `failed`

## ContentSource

Stores source links and review metadata for trust.

Fields:

- `id`: uuid, primary key
- `title`: text
- `url`: text
- `source_type`: enum
- `publisher`: text, nullable
- `city_id`: uuid, nullable
- `workflow_id`: uuid, nullable
- `language`: text, default `de`
- `last_checked_at`: timestamp
- `created_at`: timestamp
- `updated_at`: timestamp

Allowed `source_type` values:

- `official_government`
- `official_provider`
- `trusted_institution`
- `internal_reviewed_content`
- `other`

Prefer `official_government` and `trusted_institution` sources for bureaucracy content.

## GlossaryTerm

Stores simplified explanations of German terms.

Fields:

- `id`: uuid, primary key
- `term`: text
- `slug`: text, unique
- `plain_english_definition`: text
- `german_definition`: text, nullable
- `workflow_id`: uuid, nullable
- `source_id`: uuid, nullable
- `created_at`: timestamp
- `updated_at`: timestamp

## Feedback

Stores user feedback and content error reports.

Fields:

- `id`: uuid, primary key
- `user_id`: uuid, nullable
- `feedback_type`: enum
- `workflow_id`: uuid, nullable
- `content_source_id`: uuid, nullable
- `message`: text
- `rating`: integer, nullable
- `status`: enum
- `created_at`: timestamp
- `updated_at`: timestamp

Allowed `feedback_type` values:

- `content_error`
- `missing_information`
- `confusing_step`
- `product_feedback`
- `feature_request`

Allowed `status` values:

- `new`
- `reviewing`
- `resolved`
- `dismissed`

## AnalyticsEvent

Analytics events should generally be sent to PostHog, not stored in the primary app database unless needed.

Key event names:

- `onboarding_started`
- `onboarding_completed`
- `roadmap_generated`
- `workflow_opened`
- `checklist_item_completed`
- `reminder_created`
- `official_link_clicked`
- `content_feedback_submitted`

Event properties may include:

- `workflow_slug`
- `city_slug`
- `current_status`
- `nationality_group`

Do not send sensitive free-text notes or document contents to analytics.

## Relationship Rules

- A profile belongs to one auth user.
- A city can have many workflow steps and content sources.
- A workflow can have many workflow steps and checklist items.
- A user can have many user workflows.
- A user workflow belongs to one workflow.
- A user can have many user checklist items.
- A checklist item can be linked to a workflow step.
- A reminder can relate to a workflow, checklist item, or custom user task.
- Content sources can support workflows, workflow steps, checklist items, and glossary terms.

## Sensitive Data Rules

Never create fields for these in the MVP unless explicitly approved after security review:

- Passport number
- National ID number
- Residence permit number
- Tax ID
- Tax number
- Social security number
- ELSTER credentials
- Bank login credentials
- Full IBAN by default
- SIM card contract number
- Uploaded official documents
- Biometric data

## Derived Data Rules

Roadmap order may be derived from:

- User status
- Nationality group
- City
- Move-in date
- Visa expiry date
- Workflow dependencies

Do not permanently store complex derived roadmaps unless needed. Store user workflow progress and regenerate roadmap order from rules where possible.
