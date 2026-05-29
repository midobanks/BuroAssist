# security.md — BüroAssist Agent Rules

## Purpose

This file defines security, privacy, compliance, and trust rules for BüroAssist. Treat these rules as mandatory for all product, design, engineering, and AI-agent work.

BüroAssist handles sensitive life-admin contexts for internationals in Germany. Even when the MVP does not store official documents, users may enter dates, city, nationality group, immigration status category, insurance situation, appointment reminders, and other personal setup data. The product must be designed with data minimization, GDPR awareness, and user trust from day one.

---

## Security Principles

### 1. Data minimization by default

Collect only what is needed to generate a useful roadmap, checklist, and reminder.

Allowed MVP data examples:

- Email address
- Preferred language
- City
- Nationality group: EU/EEA or non-EU
- Current status: student, employee, job seeker, freelancer, family member
- Arrival date
- Move-in date
- Visa or residence expiry date
- Workflow completion status
- Checklist completion status
- Reminder dates

Do not collect or store in MVP:

- Passport numbers
- National ID numbers
- Residence permit card numbers
- Tax IDs
- ELSTER credentials
- Bank account login details
- Card numbers
- IBAN unless a future feature has a reviewed need
- SIM identity verification documents
- Health insurance membership numbers unless a future feature has a reviewed need
- Uploaded official letters or documents by default

### 2. Guidance, not regulated advice

BüroAssist must never claim to provide legal, immigration, tax, banking, insurance, investment, or financial advice.

Use wording such as:

- “General guidance”
- “Commonly required”
- “May be required”
- “Check with the responsible authority”
- “Requirements can vary by city, status, and provider”

Avoid wording such as:

- “You are eligible”
- “You are guaranteed”
- “This is legally required in your case”
- “This provider is best for you”
- “You should choose this bank/insurance”
- “Your application will be accepted”

### 3. User-owned data isolation

Every user must only access their own profile, checklists, roadmap, and reminders.

Use:

- NextAuth session verification and Prisma user ID query scoping
- Server-side authorization checks
- Least-privilege API keys
- Role-based access for admin features

Never rely only on frontend checks for security.

### 4. No secrets in frontend

Never expose:

- Supabase service-role key
- Resend API key
- PostHog private keys
- OpenAI API key
- DeepL API key
- Stripe secret key
- Webhook secrets
- Admin tokens

Only expose keys designed for public use, such as frontend-safe publishable keys, and only when properly restricted.

### 5. Source-backed trust

Security includes protecting users from misinformation.

Any official-process content must include:

- Source URL
- Last-reviewed date
- City-specific or general scope
- Risk level where appropriate
- Disclaimer where requirements may vary

---

## GDPR and Privacy Rules

### Lawful basis

For MVP, assume these lawful bases are likely relevant:

- Contract or pre-contractual necessity for core account and app functionality
- Consent for optional reminders, marketing emails, analytics where required, and future AI document processing
- Legitimate interest only where carefully justified and privacy-friendly

Agents must not invent final legal positions. Privacy policy and cookie/analytics choices should be reviewed before launch.

### User rights

The system should be designed to support:

- Data access request
- Data correction
- Data deletion
- Data export where practical
- Reminder unsubscribe/disable
- Account deletion

### Retention

Use short and purposeful retention.

Suggested MVP approach:

- Account/profile data: retain while account is active
- Checklist state: retain while account is active
- Reminder data: retain until reminder is completed/cancelled, then keep minimal delivery metadata if needed
- Analytics: avoid personal identifiers where possible
- Support messages: retain only as long as needed
- Uploaded documents: not stored in MVP

### Privacy copy

Be clear with users:

- What data is collected
- Why it is collected
- How it improves their roadmap
- Whether reminders are optional
- How they can delete their account/data

---

## Authentication Security

### Required controls

- Use trusted auth provider such as Auth.js (NextAuth v5).
- Enforce secure session handling.
- Use HTTPS only.
- Use strong password rules if passwords are enabled.
- Support magic links or password reset flows securely.
- Rate-limit auth endpoints where possible.
- Avoid leaking whether an email exists in password reset flows.

### Admin access

Admin features must require:

- Authenticated user
- Explicit admin role
- Server-side role validation
- Audit logging for content changes where possible

Admin routes must not rely on frontend route hiding alone.

---

## Database Security

### Database User Scoping

Enforce strict user-scoping for all database queries affecting user-owned tables.

User-owned tables include:

- `profiles`
- `user_workflows`
- `user_checklist_items`
- `reminders`

All Prisma database queries must explicitly scope actions using `where: { userId: session.user.id }` (or `id: session.user.id` for profiles) extracted from secure server-side sessions.

### Content tables

Published content tables may be publicly readable if they contain no sensitive data.

Content mutation must be admin-only.

Content tables include:

- `cities`
- `workflows`
- `workflow_steps`
- `checklist_items`
- `resources`
- `glossary_terms`
- `content_sources`

### Database rules

- Use UUID primary keys.
- Add timestamps to important records.
- Validate enum-like fields at database or API layer.
- Avoid storing raw provider responses when they contain personal data.
- Backups must be protected and access-limited.

---

## API Security

### Server-side only operations

The following must happen server-side:

- Sending email via Resend
- Reminder processing
- Admin content mutation
- AI API calls when introduced
- Stripe webhooks when introduced
- Any operation requiring a secret key

### Input validation

Validate all user input on the server.

Examples:

- City IDs must exist.
- Dates must be valid and reasonable.
- Status values must be from allowed lists.
- Reminder dates must be valid future or near-future dates.
- URLs in content must be valid and reviewed.

### Rate limiting

Apply rate limits to:

- Auth-related endpoints
- Reminder creation
- Feedback submission
- Future AI explainer endpoints
- Contact/support forms
- Any public API route

### Error handling

Do not expose:

- Stack traces
- SQL errors
- Provider raw errors
- Secret names
- Internal table structure details

Return safe messages such as:

> We could not complete this action. Please try again.

Log detailed errors server-side only.

---

## Reminder and Email Security

### Email content rules

Reminder emails must not include sensitive identifiers.

Allowed:

- Workflow name
- Generic reminder title
- Due date
- Link back to dashboard

Avoid:

- Passport details
- Tax ID
- Residence permit number
- Health insurance number
- Bank account details
- Full document lists that reveal sensitive status unless user explicitly consented

### Unsubscribe and control

Users must be able to:

- Disable reminders
- Delete reminders
- Change reminder dates
- Opt out of non-essential emails

Transactional account/security emails may be handled separately from marketing emails.

---

## Analytics Security

### Allowed analytics events

Examples:

- `onboarding_started`
- `onboarding_completed`
- `roadmap_generated`
- `workflow_started`
- `workflow_completed`
- `checklist_item_completed`
- `reminder_created`
- `source_link_clicked`
- `content_feedback_submitted`

### Do not send to analytics

- Email address unless explicitly required and configured safely
- Tax ID
- Passport or ID numbers
- Exact visa/residence permit numbers
- Uploaded document content
- Free-text notes that may contain personal information
- Bank credentials
- Health insurance member numbers

### Analytics identity

Use privacy-friendly identifiers where possible. Avoid over-identifying users in analytics tools.

---

## AI Feature Security: Future Rules

AI features are not required for the core MVP. If added later, they must follow stricter rules.

### AI letter explainer

When users upload or paste official letters:

- Make upload optional.
- Explain what will be processed.
- Ask users to remove or redact sensitive numbers where possible.
- Do not store uploaded documents by default.
- Process through server-side functions only.
- Do not send documents directly from frontend to AI provider.
- Do not train custom models on user documents unless explicitly consented and legally reviewed.
- Show extracted summary, deadlines, and next actions as suggestions for user confirmation.
- Always include disclaimer: not legal advice.

### AI output constraints

AI must not:

- Claim legal certainty
- Guarantee application success
- Recommend specific insurance or banking products as best
- Infer protected or sensitive attributes unnecessarily
- Generate fake official information
- Invent source links

AI should:

- Use cautious wording
- Cite or link to stored official sources when available
- Encourage verification with responsible authority
- Ask user to confirm uncertain details

---

## Banking Setup Security

BüroAssist may guide users through banking setup, especially online-first options like N26, Revolut, Wise, bunq, or similar providers as neutral examples.

Rules:

- Do not provide financial advice.
- Do not rank providers as best for a specific user unless a regulated review process exists.
- Do not collect bank login credentials.
- Do not collect card numbers.
- Do not collect online banking passwords or one-time passcodes.
- Do not initiate transactions.
- Do not use open banking APIs in MVP.
- Present comparison criteria neutrally, such as fees, German IBAN availability, verification requirements, app language, cash withdrawal limits, and support options.

Use safe copy:

> These are examples of online banking options. Check each provider’s current requirements, fees, and eligibility before opening an account.

---

## Mobile SIM Registration Security

BüroAssist may guide users through SIM or eSIM setup.

Rules:

- Do not collect identity documents for SIM verification in MVP.
- Do not act as the SIM provider or identity verification provider.
- Do not store passport, ID, or video-ident data.
- Link users to provider-owned activation and verification flows.
- Explain that verification requirements may differ by provider and plan type.

Use safe copy:

> Many SIM providers require identity verification before activation. Follow the provider’s official verification process and avoid sharing ID documents outside trusted provider channels.

---

## Health Insurance Security

BüroAssist may explain public vs private health insurance and proof requirements.

Rules:

- Do not provide insurance advice.
- Do not claim a user is eligible for a specific plan.
- Do not collect health diagnosis or medical-condition information.
- Do not collect insurance member numbers in MVP.
- Do not rank providers without a reviewed business and compliance model.
- If referrals are added later, clearly disclose commercial relationships.

Use safe copy:

> This is general information. Your accepted insurance path can depend on your age, status, university, employer, provider, and residence situation.

---

## Residence Permit Security

Residence permit workflows are high-risk.

Rules:

- Do not provide immigration legal advice.
- Do not guarantee eligibility or approval.
- Do not ask for or store residence permit card numbers in MVP.
- Do not submit applications on behalf of users.
- Do not scrape or bypass protected immigration office systems.
- Use city-specific official links where possible.
- Clearly state that requirements may vary by local authority and permit type.

Use safe copy:

> This checklist is a preparation guide. Always confirm the latest requirements with the responsible Ausländerbehörde or official portal.

---

## Tax ID + ELSTER Security

Tax workflows are sensitive.

Rules:

- Do not provide tax advice.
- Do not store Tax ID in MVP.
- Do not store ELSTER credentials or activation codes.
- Do not ask for tax filings, income details, or tax documents in MVP unless a future reviewed feature requires it.
- Do not integrate directly with ELSTER in MVP.

Use safe copy:

> BüroAssist can explain the difference between Tax ID, tax number, and ELSTER. It does not file taxes or manage your ELSTER account.

---

## Content Security and Misinformation Prevention

### Content review

Every high-risk content item must include:

- Source URL
- Last-reviewed date
- Reviewer or review status if available
- Risk level
- City scope

High-risk workflows:

- Residence Permit
- Health Insurance
- Tax ID + ELSTER
- Banking Setup

Medium-risk workflows:

- Anmeldung
- Mobile SIM Registration

### Content wording

Use cautious language for variable processes:

- “Often”
- “Usually”
- “May”
- “Commonly”
- “Depending on your city/status/provider”

Do not present variable requirements as universal facts.

---

## File and Document Handling

MVP should avoid document uploads.

If document upload is introduced later:

- Use explicit consent.
- Use encrypted storage.
- Apply short retention by default.
- Allow immediate deletion.
- Scan for malware if files are stored.
- Restrict file types.
- Limit file size.
- Do not make files public.
- Do not include document contents in analytics.

---

## Secrets and Environment Variables

Use environment variables for all secrets.

Examples:

```txt
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
POSTHOG_KEY=
POSTHOG_HOST=
OPENAI_API_KEY=
DEEPL_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Rules:

- Never commit `.env` files.
- Use different keys for local, staging, and production.
- Rotate exposed keys immediately.
- Restrict provider keys where possible.
- Use secret storage in deployment platform.

---

## Dependency Security

- Keep dependencies updated.
- Use lockfiles.
- Run dependency audits before deployment.
- Avoid unnecessary packages.
- Do not add abandoned or suspicious libraries.
- Prefer official SDKs for Supabase, Resend, Stripe, and other core services.

---

## Deployment Security

Production deployment must use:

- HTTPS
- Secure environment variables
- Separate staging and production projects
- Restricted admin access
- Database backups
- Monitoring for failed jobs and errors
- Logging without sensitive content

---

## Security Checklist Before Launch

- [ ] RLS enabled on all user-owned tables
- [ ] Admin routes protected server-side
- [ ] No service keys in frontend bundle
- [ ] Email reminders contain no sensitive identifiers
- [ ] Analytics excludes personal and sensitive data
- [ ] Privacy policy drafted
- [ ] Cookie/analytics consent reviewed where required
- [ ] Account deletion path defined
- [ ] Reminder opt-out implemented
- [ ] Official content includes sources and last-reviewed dates
- [ ] High-risk workflow disclaimers visible
- [ ] Error messages do not leak internal details
- [ ] Secrets stored securely in deployment platform
- [ ] MVP does not store passport, tax ID, bank, or document data

---

## Incident Response Basics

If a security issue is discovered:

1. Stop the leak or disable the affected feature.
2. Rotate exposed keys if relevant.
3. Review logs to understand scope.
4. Preserve evidence without spreading sensitive data.
5. Notify affected users if required.
6. Document root cause and fix.
7. Add tests or controls to prevent recurrence.

Do not downplay incidents or guess about impact without evidence.

---

## Definition of Secure Enough for MVP

The BüroAssist MVP is secure enough to launch only when:

- User data is isolated by RLS and authorization checks
- The app collects minimal personal data
- No sensitive official identifiers are stored
- Emails and analytics avoid sensitive data
- Official guidance is source-backed and reviewed
- Legal/tax/immigration/insurance/banking disclaimers are clear
- Admin functions are protected
- Secrets are not exposed
- Users can control reminders and delete their account/data
