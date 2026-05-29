# BüroAssist Acceptance Criteria Rules

## Purpose

This file defines what “done” means for BüroAssist MVP features. Use it to guide implementation, testing, and Antigravity verification.

## Global Acceptance Criteria

Every feature is complete only when:

- It works on mobile and desktop.
- It uses accessible labels and keyboard-friendly controls.
- It handles loading, empty, success, and error states.
- It avoids unnecessary sensitive data collection.
- It follows the design system.
- It uses plain English.
- It includes appropriate disclaimers for legal, tax, immigration, insurance, banking, and telecom topics.
- It does not make eligibility guarantees.
- It has at least basic automated tests or a documented manual QA checklist.

## Landing Page

Complete when:

- User understands what BüroAssist does within 10 seconds.
- Page explains the six MVP workflows.
- Primary CTA leads to onboarding.
- Trust section explains that BüroAssist is guidance, not official advice.
- Page is responsive and accessible.
- Page includes links to Privacy, Terms, and Disclaimer.

## Sign Up / Sign In

Complete when:

- User can create an account.
- User can sign in.
- User can sign out.
- Authentication errors are plain-language and safe.
- Authenticated user is redirected to dashboard or onboarding as appropriate.
- Unauthenticated users cannot access protected routes.

## Onboarding

Complete when:

- User can select city.
- User can select nationality group: EU/EEA, non-EU, or unknown.
- User can select current status.
- User can enter arrival date or move-in date.
- User can enter visa/residence expiry date when relevant.
- User can skip non-applicable fields.
- Invalid fields show accessible error messages.
- User can review inputs before generating roadmap.
- Onboarding completion creates or updates the user profile.
- Onboarding completion generates the initial personalized roadmap.

## Personalized Roadmap

Complete when:

- Roadmap shows relevant workflows from the six MVP workflows.
- Workflow order is sensible for the user profile.
- Each workflow card shows status, short explanation, and next action.
- Roadmap explains why important workflows are recommended.
- User can open each workflow from roadmap.
- User can refresh roadmap after profile changes.
- Roadmap avoids saying the user is definitely eligible for any status, permit, insurance type, bank account, or SIM product.

## Dashboard

Complete when:

- Dashboard shows next urgent task.
- Dashboard shows upcoming reminders.
- Dashboard shows progress across workflows.
- Dashboard shows incomplete or missing checklist items.
- Dashboard links to roadmap and workflows.
- Empty state encourages onboarding if no roadmap exists.
- Data is scoped to the authenticated user only.

## Workflow Pages

Complete when every workflow page includes:

- Plain-language overview.
- Who needs this.
- When to do it.
- Documents or information needed.
- Step-by-step process.
- Common mistakes.
- Official or trusted source links.
- Checklist.
- Reminder setup.
- Last-reviewed date.
- Disclaimer.

## Anmeldung Workflow

Complete when:

- User can understand what Anmeldung means.
- User sees relevant checklist items.
- User sees explanation of Wohnungsgeberbestätigung.
- User can mark items complete.
- User can save an appointment/reminder date.
- User sees official city link where available.
- User is warned that requirements and appointment systems vary by city.

## Residence Permit Workflow

Complete when:

- User can select or confirm status/permit path.
- User sees checklist adjusted by broad status where possible.
- User can enter or use visa/residence expiry date.
- App shows deadline warning if expiry date is approaching.
- User sees local authority guidance where available.
- Content clearly states requirements vary by case and Ausländerbehörde.
- App does not provide legal eligibility decisions.

## Health Insurance Workflow

Complete when:

- User can understand health insurance is generally required in Germany.
- User can compare public vs private insurance at a high level.
- User sees guidance based on student, employee, freelancer, job seeker, family, or EU/EEA status.
- User sees proof-related checklist items.
- Provider comparison is neutral and criteria-based.
- App does not claim to sell, rank, or advise on insurance products unless a regulated/legal review approves it.

## Tax ID + ELSTER Workflow

Complete when:

- User understands the difference between Tax ID, tax number, and social security number.
- User understands how Anmeldung may relate to Tax ID delivery.
- User sees Tax ID recovery/request guidance.
- User sees ELSTER setup overview.
- User can set activation-code reminder.
- App does not store Tax ID or ELSTER credentials.
- App does not provide tax filing advice.

## Mobile SIM Registration Workflow

Complete when:

- User understands prepaid, postpaid, and eSIM options at a high level.
- User understands that SIM activation may require identity verification.
- User sees checklist for ID, address where needed, email, payment method, and activation steps.
- Provider examples are neutral.
- App does not process identity verification or SIM activation.
- App does not store ID document numbers.

## Banking Setup Workflow

Complete when:

- User understands online-first banking setup as a practical first step.
- App gives neutral examples such as N26, Revolut, Wise, bunq, and Vivid.
- User sees checklist for ID verification, address, phone number, email, and tax residency questions where relevant.
- App explains IBAN and account verification basics.
- App offers fallback guidance for traditional banks.
- App does not store bank credentials.
- App does not provide credit, loan, investment, or regulated financial advice.

## Checklist Tracking

Complete when:

- User can mark checklist items as not started, in progress, completed, blocked, or not applicable.
- Checklist changes persist after page refresh.
- Workflow progress updates after checklist changes.
- User can add optional notes.
- Notes are private to the user.
- Notes are not sent to analytics.

## Reminder System

Complete when:

- User can create a reminder from a workflow or checklist item.
- User can edit reminder title, time, and channel.
- User can delete or cancel a reminder.
- User can view all reminders.
- Email reminders are sent only for due scheduled reminders.
- Failed email sends are tracked safely.
- User can disable reminders.

## Glossary

Complete when:

- User can browse glossary terms.
- User can search terms.
- Each term has a plain-English definition.
- Relevant terms link to workflows.
- Terms avoid legal/tax advice.

## Resources

Complete when:

- User can view official and trusted links by workflow and city.
- Each source shows title, publisher/source type, URL, and last checked date.
- Broken or outdated links can be reported.

## Feedback

Complete when:

- User can submit feedback from workflow pages.
- User can report outdated or confusing content.
- Feedback is stored with workflow context.
- Feedback submission shows confirmation.
- Feedback form is rate-limited or protected against spam.

## Admin Content Management

Complete when:

- Admin can create and update workflow content.
- Admin can create and update checklist items.
- Admin can manage official source links.
- Admin can review feedback reports.
- Admin-only routes are protected.
- Content updates include last-reviewed metadata.

## Analytics

Complete when these events are tracked without sensitive data:

- `onboarding_started`
- `onboarding_completed`
- `roadmap_generated`
- `workflow_opened`
- `checklist_item_completed`
- `reminder_created`
- `official_link_clicked`
- `content_feedback_submitted`

Properties may include workflow slug, city slug, user status, and nationality group.

## Security and Privacy

Complete when:

- RLS or equivalent access controls are enabled for user-owned data.
- Users cannot access another user’s profile, checklist, reminders, or notes.
- Server-only secrets are not exposed to the browser.
- Sensitive data fields are not created unnecessarily.
- Account deletion or deletion request path exists.
- Privacy policy is linked.

## Definition of Done for MVP

The MVP is done when:

- A new user can sign up.
- A new user can complete onboarding.
- The app generates a personalized roadmap.
- User can open all six workflow pages.
- User can complete checklist items.
- User can create and manage reminders.
- User can read glossary and resources.
- Admin can manage content or content can be seeded reliably.
- Analytics events are captured.
- Security rules prevent cross-user access.
- The app is deployable with documented environment variables.
