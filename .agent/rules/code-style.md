# code-style.md — BüroAssist Agent Rules

## Purpose

This file defines code-style rules for BüroAssist. Apply these rules when generating, editing, reviewing, or refactoring code for the product.

BüroAssist is a mobile-first, content-led web app for internationals in Germany. Code must support a calm, trustworthy, accessible user experience while protecting sensitive user context.

---

## Product Context

BüroAssist helps users complete essential setup and bureaucracy workflows in Germany through personalized roadmaps, checklists, reminders, and official-source guidance.

Current MVP workflows:

1. Anmeldung
2. Residence Permit
3. Health Insurance Onboarding
4. Tax ID + ELSTER
5. Mobile SIM Registration
6. Banking Setup

If a local PRD conflicts with this file, prefer the latest approved PRD and update this file accordingly.

---

## Preferred Stack Assumptions

Use these assumptions unless the repository clearly uses a different stack:

- Frontend: Next.js with React and TypeScript
- Styling: Tailwind CSS
- Components: shadcn/ui-style primitives where available
- Forms: React Hook Form + Zod
- Backend/API: Next.js Route Handlers
- Database: PostgreSQL via Prisma ORM
- Auth: Auth.js (NextAuth v5)
- Email: Resend
- Analytics: PostHog
- Testing: Vitest, Testing Library, Playwright where applicable

Do not introduce large frameworks, global state libraries, or heavy dependencies unless there is a clear product need.

---

## TypeScript Rules

### Use TypeScript strictly

- Prefer explicit domain types over `any`.
- Avoid `unknown` unless handling external inputs.
- Never use `as any` to bypass type problems.
- Model workflow states as unions or enums.
- Validate external inputs with schemas before using them.

Recommended examples:

```ts
type WorkflowKey =
  | "anmeldung"
  | "residence_permit"
  | "health_insurance"
  | "tax_id_elster"
  | "mobile_sim"
  | "banking_setup";

 type WorkflowStatus = "not_started" | "in_progress" | "ready" | "completed";
```

### Keep domain types centralized

Place shared domain types in predictable locations such as:

```txt
src/types/
src/lib/domain/
src/lib/schemas/
```

Avoid redefining workflow, checklist, reminder, city, or profile types inside unrelated components.

---

## Naming Conventions

### Files and folders

Use kebab-case for files and folders:

```txt
workflow-card.tsx
roadmap-progress.tsx
reminder-form.tsx
city-resource-list.tsx
```

### React components

Use PascalCase:

```tsx
WorkflowCard
RoadmapProgress
ReminderForm
CityResourceList
```

### Functions and variables

Use camelCase:

```ts
generateRoadmap
getChecklistItems
currentWorkflowStatus
```

### Database tables

Use snake_case:

```sql
user_profiles
workflows
checklist_items
user_checklist_items
reminders
content_sources
```

### Constants

Use UPPER_SNAKE_CASE only for true constants:

```ts
MAX_REMINDERS_PER_USER
SUPPORTED_MVP_CITIES
```

---

## Folder Structure Guidelines

Prefer a feature-oriented structure:

```txt
src/
  app/
  components/
    ui/
    layout/
    workflow/
    roadmap/
    reminders/
  features/
    onboarding/
    workflows/
    checklist/
    reminders/
    content/
    profile/
  lib/
    prisma.ts
    analytics/
    email/
    security/
    dates/
    validation/
  types/
  constants/
```

Rules:

- Keep reusable UI primitives in `components/ui`.
- Keep product-specific components in feature folders.
- Keep API clients and server utilities outside React components.
- Do not place business logic directly in page components when it can be extracted.

---

## Component Rules

### Components should be small and purposeful

A component should usually do one of these things:

- Render a specific UI element
- Compose a section of a page
- Handle a form
- Display a domain object such as a workflow, checklist, reminder, or resource

Avoid components that fetch data, transform domain logic, manage complex state, and render large UI all at once.

### Prefer composition

Use composition over prop bloat. If a component needs too many props, split it.

### Use clear empty, loading, and error states

Every async user-facing section must account for:

- Loading state
- Empty state
- Error state
- Success state

Error messages must be calm and useful. Do not blame the user.

---

## Form Rules

BüroAssist relies heavily on onboarding and workflow forms. Forms must be reliable and accessible.

Rules:

- Validate all form data with Zod or an equivalent schema.
- Keep form labels visible.
- Do not rely only on placeholders.
- Use plain-language helper text.
- Show validation messages near the field.
- Avoid asking for sensitive identifiers in MVP.
- Use date inputs carefully and clarify the expected date.

Do not collect:

- Passport number
- Tax ID
- ELSTER credentials
- Bank login details
- Health insurance membership number
- Uploaded ID documents by default

---

## Workflow Logic Rules

### Keep workflow logic deterministic

MVP personalization should be rule-based and explainable.

Good:

```ts
if (profile.nationalityGroup === "non_eu" && profile.visaExpiryDate) {
  addReminder("residence_permit_deadline");
}
```

Avoid:

```ts
// Hidden or unexplained eligibility assumptions
user.isEligibleForBlueCard = aiGuess(profile);
```

### Explain recommendations

Whenever BüroAssist changes workflow order, checklist priority, or reminder urgency, the UI should explain why.

Example:

> “Residence Permit is marked urgent because your current visa or residence title expires soon.”

### Never guarantee outcomes

Do not write code or UI copy that implies a user will be accepted, approved, insured, registered, or verified.

---

## Content and CMS Rules

Bureaucracy guidance must not be hardcoded into UI components.

Content should be stored in a content layer with fields such as:

- `title`
- `summary`
- `workflow_key`
- `city`
- `status_group`
- `body`
- `source_url`
- `source_label`
- `last_reviewed_at`
- `risk_level`
- `review_status`

Rules:

- Every high-risk guidance item needs a source URL.
- Show last-reviewed dates where users rely on procedural accuracy.
- Use CMS-driven strings for official-process instructions.
- Keep UI labels in code only if they are product interface text, not official guidance.

---

## API and Server Rules

### Validate inputs at the boundary

All API routes, Edge Functions, and server actions must validate incoming data.

### Keep privileged work server-side

Never expose these in the browser:

- Supabase service role key
- Resend API key
- PostHog personal API key
- Stripe secret key
- OpenAI API key
- DeepL API key

### Return safe errors

Server errors should not expose:

- Stack traces
- SQL queries
- API keys
- Internal table names when unnecessary
- Provider secrets

### Prefer idempotency

Reminder creation, email sending, and webhook processing should be idempotent where possible.

---

## Database Code Rules

### Always respect Row Level Security

Use RLS for user-owned tables:

- `user_profiles`
- `user_workflows`
- `user_checklist_items`
- `reminders`
- `user_notes`

### Separate public content from private user data

Public or admin-managed tables:

- `workflows`
- `checklist_items`
- `cities`
- `content_sources`
- `glossary_terms`

Private user tables:

- `user_profiles`
- `user_workflows`
- `user_checklist_items`
- `reminders`

### Use migrations

Database schema changes must be expressed as migrations, not manual dashboard-only edits.

---

## Error Handling and Logging

### User-facing errors

Write calm, actionable errors:

Good:

> “We could not save your reminder. Please try again.”

Avoid:

> “Database insert failed.”

### Developer logs

Logs may include internal error details but must not include sensitive user data.

Never log:

- Tax IDs
- Passport or ID numbers
- Uploaded document text
- Auth tokens
- API keys
- Bank or payment credentials

---

## Analytics Rules

Use analytics to improve onboarding and workflow usefulness, not to collect sensitive personal data.

Track events such as:

- `onboarding_started`
- `onboarding_completed`
- `roadmap_generated`
- `workflow_started`
- `checklist_item_completed`
- `reminder_created`
- `source_link_clicked`
- `feedback_submitted`

Do not send sensitive properties such as:

- Exact visa expiry date
- Passport details
- Tax ID
- Full address
- Uploaded document text
- Bank details

Use coarse properties where useful:

- `city`
- `workflow_key`
- `status_group`
- `days_until_deadline_bucket`

---

## Accessibility Rules

All UI code must support accessibility by default.

Rules:

- Use semantic HTML.
- Buttons must be buttons, not clickable divs.
- Links must be links.
- Inputs must have labels.
- Icon-only buttons need accessible labels.
- Maintain keyboard navigation.
- Do not remove focus outlines without replacing them.
- Ensure sufficient color contrast.
- Use `aria-live` only for meaningful status updates.

---

## Styling Rules

Use Tailwind utilities consistently.

Rules:

- Prefer design tokens and utility classes over custom CSS.
- Avoid arbitrary values unless necessary.
- Avoid inline styles except for dynamic values that cannot be represented safely otherwise.
- Keep spacing consistent.
- Use rounded corners and soft borders to support the calm visual language.
- Do not use aggressive colors for routine warnings.

---

## Date and Time Rules

BüroAssist handles deadlines and reminders. Date handling must be precise.

Rules:

- Store dates in ISO format.
- Be explicit about timezone assumptions.
- Use Europe/Berlin as the default user timezone for Germany-based reminders unless user settings differ.
- Display dates in a user-friendly localized format.
- Avoid ambiguous terms like “soon” without context.

Example:

> “Your reminder is set for 12 June 2026.”

---

## Testing Rules

### Minimum tests for critical logic

Add tests for:

- Roadmap generation
- Workflow ordering
- Checklist filtering
- Reminder date calculation
- Form validation
- RLS-sensitive API access where possible

### UI tests

Use component tests for:

- Workflow cards
- Checklist interactions
- Onboarding forms
- Reminder setup
- Empty/error states

### End-to-end tests

Prioritize flows:

1. New user signs up
2. Completes onboarding
3. Generates roadmap
4. Starts a workflow
5. Completes checklist item
6. Creates reminder

---

## Copy in Code

UI copy should follow BüroAssist tone:

- Clear
- Reassuring
- Direct
- Non-judgmental
- Practical

Avoid fear-based copy.

Good:

> “This step may be required before your residence permit appointment.”

Avoid:

> “You must do this or your application will fail.”

---

## Pull Request Checklist

Before marking implementation complete, verify:

- Code is typed and validated.
- User-owned data is protected by RLS or server checks.
- No secrets are exposed client-side.
- No sensitive identifiers are collected unnecessarily.
- Official guidance is source-backed or CMS-driven.
- Empty/loading/error states exist.
- UI works on mobile.
- Accessibility basics are covered.
- Analytics do not include sensitive data.
- User-facing copy avoids legal, tax, insurance, or financial advice claims.

---

## Agent Behavior Rules

When acting as a coding agent for BüroAssist:

1. Prefer small, reviewable changes.
2. Do not silently alter product scope.
3. Do not add new dependencies without explaining why.
4. Do not hardcode official guidance into components.
5. Do not create AI, banking, insurance, immigration, or legal-advice features without guardrails.
6. Preserve the calm and trustworthy user experience.
7. Ask for clarification only when a decision affects security, compliance, or core product direction.
