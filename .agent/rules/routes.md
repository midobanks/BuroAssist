# BüroAssist Routes Rules

## Purpose

This file defines the route structure for the BüroAssist MVP. Use these routes when building the app so navigation, layouts, and feature ownership remain consistent.

## Routing Principles

- Use mobile-first responsive pages.
- Prefer clear, readable URLs.
- Keep workflow routes stable because they may be shared in emails and onboarding flows.
- Protect authenticated app routes where user data is shown.
- Public marketing and resource pages may remain unauthenticated.
- Do not create duplicate route patterns for the same concept.

## Recommended Framework Assumption

Assume a Next.js App Router structure unless the product owner chooses another framework.

## Public Routes

### `/`

Landing page.

Purpose:

- Explain BüroAssist value proposition
- Show supported workflows
- Build trust with disclaimers and source-backed positioning
- CTA to start onboarding

Primary CTA:

- `Start my roadmap`

Secondary CTA:

- `Explore workflows`

### `/workflows`

Public overview of all supported MVP workflows.

Shows:

- Anmeldung
- Residence Permit
- Health Insurance
- Tax ID + ELSTER
- Mobile SIM Registration
- Banking Setup

Each card should link to a workflow detail route.

### `/workflows/anmeldung`

Public or authenticated workflow guide for Anmeldung.

### `/workflows/residence-permit`

Public or authenticated workflow guide for residence permits.

### `/workflows/health-insurance`

Public or authenticated workflow guide for health insurance onboarding.

### `/workflows/tax-id-elster`

Public or authenticated workflow guide for Tax ID and ELSTER.

### `/workflows/mobile-sim`

Public or authenticated workflow guide for mobile SIM registration.

### `/workflows/banking`

Public or authenticated workflow guide for online-first banking setup.

### `/glossary`

Public glossary of German terms.

Examples:

- Anmeldung
- Bürgeramt
- Ausländerbehörde
- Wohnungsgeberbestätigung
- Steueridentifikationsnummer
- ELSTER
- Krankenkasse
- IBAN
- eSIM
- Videoident

### `/resources`

Public official-resource directory.

Shows:

- Germany-wide official links
- City-specific links
- Workflow-specific sources
- Last-reviewed dates

### `/about`

Product explanation and trust positioning.

### `/privacy`

Privacy policy page.

### `/terms`

Terms of use page.

### `/disclaimer`

Legal/tax/immigration/insurance disclaimer page.

## Authentication Routes

### `/sign-in`

User sign-in page.

Requirements:

- Email/password or magic-link option depending on auth provider
- Clear privacy reassurance
- Link to sign-up

### `/sign-up`

User registration page.

Requirements:

- Minimal account creation
- Explain why an account is useful: save roadmap, checklist, and reminders

### `/reset-password`

Password reset page if password auth is used.

## Onboarding Routes

### `/onboarding`

Main onboarding entry route.

Collect:

- City
- Nationality group: EU/EEA or non-EU
- Current status
- Arrival date or move-in date
- Visa/residence expiry date when relevant
- Priority need or current situation

### `/onboarding/profile`

Optional multi-step route for profile questions.

### `/onboarding/roadmap-preview`

Shows generated roadmap preview before dashboard.

Requirements:

- Allow user to confirm or edit inputs
- Encourage account creation if user is unauthenticated

## Authenticated App Routes

### `/dashboard`

Main user home after login.

Shows:

- Next urgent task
- Upcoming reminders
- Workflow progress
- Missing documents
- Recently completed steps
- Official links relevant to user profile

### `/roadmap`

Personalized roadmap page.

Shows:

- Ordered workflow steps
- Dependencies between workflows
- Estimated sequence
- User-specific warnings

### `/my-workflows`

Authenticated list of user workflows.

Shows:

- Status per workflow
- Progress percentage
- Due dates
- Reminder status

### `/my-workflows/[workflowSlug]`

Authenticated workflow detail with personalized checklist.

Allowed slugs:

- `anmeldung`
- `residence-permit`
- `health-insurance`
- `tax-id-elster`
- `mobile-sim`
- `banking`

Shows:

- Workflow overview
- Personalized checklist
- Source-backed guidance
- Reminder setup
- User notes
- Completion controls

### `/reminders`

User reminders overview.

Shows:

- Upcoming reminders
- Past reminders
- Workflow association
- Edit/delete reminder controls

### `/profile`

User profile settings.

Editable fields:

- City
- Preferred language
- Nationality group
- Current status
- Arrival date
- Move-in date
- Visa/residence expiry date

Do not collect unnecessary sensitive data.

### `/settings`

App settings.

Includes:

- Email notification preferences
- Privacy controls
- Account deletion request/control
- Data export request/control where implemented

### `/feedback`

Feedback submission page.

Supports:

- General product feedback
- Content error report
- Missing official link report
- Workflow usefulness rating

## Admin Routes

Admin routes must require admin authorization.

### `/admin`

Admin dashboard.

Shows:

- Content needing review
- Reported content issues
- Recent feedback
- Workflow coverage status

### `/admin/content`

Content management list.

### `/admin/content/workflows`

Manage workflow content.

### `/admin/content/checklist-items`

Manage checklist items.

### `/admin/content/sources`

Manage official source links.

### `/admin/glossary`

Manage glossary terms.

### `/admin/feedback`

Review feedback and content error reports.

## API Routes

Use API routes for server-only operations.

### `/api/roadmap/generate`

Generate or refresh personalized roadmap.

### `/api/profile/update`

Update user profile.

### `/api/checklist/update`

Update checklist item status.

### `/api/reminders/create`

Create reminder.

### `/api/reminders/update`

Update reminder.

### `/api/reminders/delete`

Delete reminder.

### `/api/feedback/submit`

Submit content or product feedback.

### `/api/email/send-reminder`

Server-only endpoint or scheduled function for reminder email sending.

Do not expose direct email-sending capability to the browser.

## Route Protection Rules

Public:

- `/`
- `/workflows`
- `/workflows/*`
- `/glossary`
- `/resources`
- `/about`
- `/privacy`
- `/terms`
- `/disclaimer`
- `/sign-in`
- `/sign-up`
- `/reset-password`

Authenticated:

- `/dashboard`
- `/roadmap`
- `/my-workflows`
- `/my-workflows/*`
- `/reminders`
- `/profile`
- `/settings`
- `/feedback`

Admin-only:

- `/admin`
- `/admin/*`

## Navigation Rules

Primary app navigation:

1. Dashboard
2. Roadmap
3. Workflows
4. Glossary
5. Resources
6. Profile

Mobile bottom navigation may include:

1. Dashboard
2. Roadmap
3. Workflows
4. Reminders
5. Profile

## Empty State Routes

If a user has not completed onboarding and visits `/dashboard`, redirect to `/onboarding` or show a clear CTA:

`Create your Germany setup roadmap`

If a user has no reminders, show:

`No reminders yet. Add one from any workflow checklist to stay ahead of deadlines.`

## Error Routes

Implement:

- `/not-found` or framework default 404
- Graceful unauthorized state
- Graceful server error state

All error states must be calm, plain-language, and actionable.
