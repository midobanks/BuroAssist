# architecture.md — BüroAssist Agent Rules

## Purpose

This file defines architecture rules for building BüroAssist. Treat these rules as product and engineering constraints for any implementation work.

BüroAssist is a mobile-first web app for internationals in Germany. It turns essential setup and bureaucracy tasks into personalized roadmaps, workflow cards, checklists, reminders, glossary explanations, and official-source links.

The MVP covers six workflows:

1. Mobile SIM Registration
2. Banking Setup
3. Health Insurance Onboarding
4. Anmeldung
5. Residence Permit
6. Tax ID + ELSTER

The recommended launch strategy is Berlin-first, then expand to Munich, Hamburg, Cologne, Frankfurt, and other German cities.

---

## Architecture Principles

### 1. Mobile-first, content-led, workflow-driven

BüroAssist is not a generic chatbot or static blog. The system must be built around structured workflows and user progress.

Every workflow should support:

- Plain-language overview
- Who needs this
- When to do it
- Required documents or inputs
- Step-by-step actions
- Common mistakes
- Official links
- Checklist status
- Reminder setup
- Last-reviewed metadata

### 2. Guidance before automation

Do not over-automate official processes in the MVP.

BüroAssist should help users understand, prepare, track, and remember. It should not submit official applications, guarantee eligibility, scrape protected appointment systems, or act as a regulated advisor.

### 3. Source-backed content architecture

Bureaucracy content changes often. Do not hardcode official process content directly into frontend components.

Use a content layer that supports:

- City-specific content
- Germany-wide general content
- User-status-specific content
- Official source URLs
- Last-reviewed dates
- Review status
- Content versioning where possible
- Risk labels for sensitive workflows

### 4. Personalization through rules, not opaque assumptions

The personalization engine should be deterministic for MVP.

Use explicit user inputs such as:

- City
- Nationality group: EU/EEA or non-EU
- Current status: student, employee, job seeker, freelancer, family member
- Arrival date
- Move-in date
- Visa or residence expiry date
- Insurance situation
- Banking readiness
- SIM/eSIM preference where relevant

Avoid making hidden assumptions about legal, tax, immigration, insurance, or banking eligibility.

### 5. Progressive complexity

The architecture should support future premium features, but MVP must stay lean.

MVP must support:

- Authentication
- User profile
- Personalized roadmap
- Workflow cards
- Checklist progress
- Reminder creation
- Email notifications
- Content management
- Basic analytics

Later features may include:

- AI official letter explainer
- Appointment availability monitoring
- PDF checklist exports
- Document readiness scoring
- Provider comparison layer
- B2B dashboards

---

## Recommended MVP Stack

### Frontend

Use a modern React-based stack.

Recommended:

- Next.js
- TypeScript
- Tailwind CSS
- Component library based on the BüroAssist design system

Architecture expectations:

- Server components where helpful
- Client components for interactive checklists, reminders, onboarding, and dashboard states
- Mobile-first layouts
- Accessible forms
- Route-level loading and error states

### Backend and Database

Recommended:

- NextAuth.js (Auth.js v5)
- Prisma ORM with PostgreSQL
- Application-level schema authorization (user ID scoping)
- Next.js Route Handlers (API routes)

Core backend responsibilities:

- User authentication
- Profile management
- Roadmap generation
- Checklist state persistence
- Reminder scheduling
- Content retrieval
- Email trigger orchestration
- Analytics event capture

### Email

Recommended:

- Resend for transactional email

Use email for:

- Reminder confirmations
- Deadline reminders
- Onboarding nudges
- Account notifications

### Analytics

Recommended:

- PostHog for product analytics, event tracking, funnels, and feature flags

Track product behavior, not sensitive user details.

### Content Management

Recommended for MVP:

- PostgreSQL database tables as a lightweight CMS via Prisma

Potential later upgrade:

- Sanity, Directus, or Strapi when editorial workflows become complex

---

## System Modules

### 1. Authentication Module

Responsibilities:

- Sign up
- Login
- Password reset or magic link
- Session management
- Authenticated access to profile, roadmap, checklists, and reminders

Rules:

- Do not expose service-role keys in frontend code.
- Use server-side functions for privileged operations.
- Enforce Row Level Security for all user-owned tables.

### 2. User Profile Module

Responsibilities:

- Store personalization inputs
- Allow users to edit profile settings
- Generate roadmap context

Suggested fields:

- `user_id`
- `email`
- `preferred_language`
- `city_id`
- `nationality_group`
- `current_status`
- `arrival_date`
- `move_in_date`
- `visa_expiry_date`
- `created_at`
- `updated_at`

Rules:

- Do not store passport numbers, residence permit numbers, tax IDs, bank account credentials, or SIM identity verification data.
- Store only what is needed for personalization and reminders.

### 3. Roadmap Engine

Responsibilities:

- Turn user profile inputs into ordered workflow recommendations
- Prioritize urgent workflows
- Surface next action
- Show dependencies between workflows

Example dependencies:

- SIM can be useful early for app verification and communication.
- Banking may be needed for salary, rent, subscriptions, insurance payments, or blocked-account-related tasks.
- Health insurance proof may be required for enrollment, work, and residence permit workflows.
- Anmeldung often supports Tax ID delivery and is commonly required for other processes.
- Residence permit workflows depend on status, visa expiry, city, insurance proof, and supporting documents.
- Tax ID and ELSTER typically come after address registration or later tax-related need.

Rules:

- Do not claim there is one universal order for all users.
- Explain when the order depends on user status, city, or provider.
- Always show uncertainty notes for city-specific or provider-specific steps.

### 4. Workflow Module

Responsibilities:

- Display workflow cards
- Display workflow detail pages
- Store user workflow state
- Calculate progress

Workflow states:

- `not_started`
- `in_progress`
- `ready`
- `blocked`
- `completed`

Rules:

- Each workflow must have a source-backed content record.
- Each workflow must have a last-reviewed date.
- Each high-risk workflow must include a disclaimer.

### 5. Checklist Module

Responsibilities:

- Render checklist items
- Persist completion state
- Support notes per checklist item
- Show required vs optional items
- Show city-specific and status-specific logic

Suggested item fields:

- `id`
- `workflow_id`
- `title`
- `description`
- `required_for_status`
- `city_id`
- `priority`
- `is_required`
- `source_url`
- `last_reviewed_at`

Rules:

- Checklist item descriptions must be short and actionable.
- Avoid legalistic wording.
- Use German terms only with plain-language explanations.

### 6. Reminder Module

Responsibilities:

- Allow users to set reminders
- Trigger email reminders
- Allow reminder cancellation
- Track reminder delivery state

Reminder examples:

- Anmeldung appointment date
- Visa/residence expiry warning
- Health insurance proof deadline
- ELSTER activation follow-up
- SIM activation task
- Banking verification follow-up

Rules:

- Users must be able to disable reminders.
- Reminder emails must not include sensitive personal identifiers.
- Deadline wording must be careful and non-guaranteed.

### 7. Content Management Module

Responsibilities:

- Store official and editorial guidance
- Store source URLs
- Store review metadata
- Support city-specific content
- Support user-status-specific content

Suggested tables:

- `cities`
- `workflows`
- `workflow_steps`
- `checklist_items`
- `resources`
- `glossary_terms`
- `content_sources`
- `content_reviews`

Rules:

- Official process content must never be detached from its source metadata.
- Display “last reviewed” on user-facing guidance where practical.
- High-risk content must be reviewed more often than general setup content.

### 8. Glossary Module

Responsibilities:

- Explain German bureaucracy terms in simple English
- Link glossary terms to workflows
- Support search

Example terms:

- Anmeldung
- Bürgeramt
- Ausländerbehörde
- Wohnungsgeberbestätigung
- Steuer-ID
- Steuernummer
- ELSTER
- Krankenkasse
- IBAN
- SEPA
- eSIM
- Identitätsprüfung

Rules:

- Glossary definitions should be short, neutral, and non-advisory.

### 9. Analytics Module

Responsibilities:

- Track onboarding completion
- Track workflow starts
- Track checklist completion
- Track reminder setup
- Track content helpfulness
- Track drop-off points

Rules:

- Do not send sensitive personal data to analytics.
- Use event names that describe product behavior, not personal status in unnecessary detail.

---

## Suggested Database Schema

### `profiles`

- `id uuid primary key`
- `user_id uuid references auth.users(id)`
- `preferred_language text default 'en'`
- `city_id uuid references cities(id)`
- `nationality_group text`
- `current_status text`
- `arrival_date date null`
- `move_in_date date null`
- `visa_expiry_date date null`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

### `cities`

- `id uuid primary key`
- `name text`
- `state text`
- `country text default 'Germany'`
- `slug text unique`

### `workflows`

- `id uuid primary key`
- `slug text unique`
- `name text`
- `category text`
- `description text`
- `risk_level text`
- `is_active boolean default true`
- `last_reviewed_at date null`

### `workflow_steps`

- `id uuid primary key`
- `workflow_id uuid references workflows(id)`
- `title text`
- `description text`
- `sort_order integer`
- `city_id uuid null references cities(id)`
- `status_filter text[] null`
- `source_url text null`
- `last_reviewed_at date null`

### `checklist_items`

- `id uuid primary key`
- `workflow_id uuid references workflows(id)`
- `title text`
- `description text`
- `is_required boolean default true`
- `priority text`
- `city_id uuid null references cities(id)`
- `status_filter text[] null`
- `source_url text null`
- `last_reviewed_at date null`

### `user_workflows`

- `id uuid primary key`
- `user_id uuid references auth.users(id)`
- `workflow_id uuid references workflows(id)`
- `status text default 'not_started'`
- `progress_percentage integer default 0`
- `due_date date null`
- `completed_at timestamptz null`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

### `user_checklist_items`

- `id uuid primary key`
- `user_id uuid references auth.users(id)`
- `checklist_item_id uuid references checklist_items(id)`
- `status text default 'not_started'`
- `notes text null`
- `completed_at timestamptz null`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

### `reminders`

- `id uuid primary key`
- `user_id uuid references auth.users(id)`
- `workflow_id uuid references workflows(id)`
- `title text`
- `reminder_type text`
- `reminder_date timestamptz`
- `channel text default 'email'`
- `status text default 'scheduled'`
- `sent_at timestamptz null`
- `created_at timestamptz default now()`

### `resources`

- `id uuid primary key`
- `workflow_id uuid null references workflows(id)`
- `city_id uuid null references cities(id)`
- `title text`
- `url text`
- `source_type text`
- `description text null`
- `last_reviewed_at date null`

### `glossary_terms`

- `id uuid primary key`
- `term text unique`
- `definition text`
- `related_workflow_id uuid null references workflows(id)`
- `source_url text null`
- `last_reviewed_at date null`

---

## API Rules

### Public frontend APIs

Frontend code may call:

- Auth session APIs
- User-owned profile APIs
- User-owned checklist APIs
- Read-only published content APIs

Frontend code must not call:

- Service-role Supabase APIs
- Email provider APIs directly
- Admin content mutation APIs unless user has admin role
- AI provider APIs directly
- Payment webhooks directly

### Server-side APIs

Server-side functions should handle:

- Email sending
- Reminder processing
- AI calls when later introduced
- Admin content mutation
- Analytics enrichment if needed
- Stripe webhooks when later introduced

### API response rules

All API responses should be typed and predictable.

Use standard response shapes:

```ts
type ApiSuccess<T> = {
  data: T;
  error: null;
};

type ApiFailure = {
  data: null;
  error: {
    code: string;
    message: string;
  };
};
```

Do not expose raw provider errors to users.

---

## Frontend Routing Rules

Recommended route structure:

```txt
/
/login
/onboarding
/dashboard
/roadmap
/workflows
/workflows/[slug]
/glossary
/resources
/profile
/settings
/admin/content
```

Rules:

- Protect authenticated routes.
- Keep onboarding short and resumable.
- Dashboard should always show the next best action.
- Workflow pages should be readable without overwhelming the user.
- Admin routes must require explicit admin role checks.

---

## Workflow Ordering Rules

The default roadmap order for a new international arrival may be:

1. Mobile SIM Registration
2. Banking Setup
3. Health Insurance Onboarding
4. Anmeldung
5. Residence Permit
6. Tax ID + ELSTER

But this order must be personalized.

Examples:

- A student may need health insurance proof before enrollment and residence permit.
- A non-EU user with a visa expiry date soon should see residence permit urgency earlier.
- A user who already has a SIM or bank account should be able to mark those workflows as completed or skipped.
- A user moving within Germany may need Anmeldung before other tasks.

Rules:

- Do not force a universal path.
- Always allow users to mark steps as completed, not applicable, or skipped.
- Explain why a workflow is recommended now.

---

## Error Handling Rules

Use calm, practical error messages.

Bad:

> Invalid request.

Better:

> We could not save this step. Please check your connection and try again.

Rules:

- Do not blame the user.
- Preserve user input where possible.
- Log technical errors server-side.
- Show retry actions where appropriate.
- Never leak stack traces or provider responses.

---

## Performance Rules

- Optimize for mobile networks.
- Avoid loading all workflow content upfront if not needed.
- Cache read-only content.
- Use pagination or search for large resource lists.
- Keep dashboard fast and lightweight.
- Use optimistic UI for checklist toggles where safe.

---

## Accessibility Rules

- Target WCAG 2.1 AA.
- Use semantic HTML.
- Ensure keyboard navigation.
- Provide visible focus states.
- Avoid color-only status indicators.
- Use clear form labels and helper text.
- Keep reading level simple.

---

## Future Architecture Extensions

### AI Letter Explainer

When added, implement as server-side feature only.

Rules:

- Do not send documents to AI from the frontend directly.
- Ask users to remove sensitive numbers where possible.
- Avoid storing uploaded documents by default.
- Show extracted deadlines/actions for user confirmation.
- Always include disclaimer that this is not legal advice.

### Appointment Monitoring

When added, avoid fragile scraping where possible.

Rules:

- Prefer official APIs or user-directed links.
- Do not bypass anti-bot protections.
- Do not guarantee appointment availability.
- Clearly label feature as monitoring or alerting, not booking.

### PDF Export

When added, generate PDFs server-side.

Rules:

- Do not include sensitive identifiers.
- Include source links and last-reviewed dates.
- Include disclaimer.

---

## Definition of Done

A BüroAssist feature is done only when it:

- Works on mobile-first layouts
- Has typed data contracts
- Respects privacy and data minimization
- Uses source-backed content for official processes
- Includes loading, empty, and error states
- Tracks non-sensitive analytics events where relevant
- Has accessible UI labels and focus behavior
- Avoids regulated advice wording
- Supports content review metadata where applicable
