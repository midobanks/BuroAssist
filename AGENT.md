# AGENT.md — BüroAssist

## Project Context

BüroAssist is a mobile-first web application for internationals living in or moving to Germany. The product helps users complete essential Germany setup and bureaucracy tasks through personalized, step-by-step workflows, checklists, reminders, glossary explanations, and official-source links.

The MVP focuses on six workflow modules:

1. Anmeldung Assistant — registering a residential address in Germany.
2. Residence Permit Assistant — preparing for application, extension, or renewal.
3. Health Insurance Onboarding Assistant — understanding and obtaining valid health insurance proof.
4. Tax ID + ELSTER Assistant — understanding tax identification and setting up ELSTER where relevant.
5. Mobile SIM Registration Assistant — choosing and activating a German SIM/eSIM with identity verification.
6. Banking Setup Assistant — opening a first bank account, with online/mobile banks as the recommended first-step path when eligible.

The recommended launch market is Berlin-first, with later expansion to Munich, Hamburg, Cologne, Frankfurt, and other German cities.

---

## Product Mission

Help internationals in Germany know what to do, what documents they need, where to go, and what comes next when setting up life in Germany.

BüroAssist should reduce anxiety, prevent missed steps, and transform scattered administrative information into calm, trustworthy, personalized guidance.

---

## Target Users

### Primary User

New international arrivals in Germany, especially:

- Non-EU students
- Skilled workers
- Job seekers
- New employees
- International families
- People with beginner or intermediate German

### Secondary Users

- International employees preparing for payroll, residence permit, and health insurance setup
- International students preparing enrollment, insurance, Anmeldung, residence permit, SIM, bank account, and part-time work requirements
- EU/EEA movers who still need help with practical setup tasks

---

## Core User Problems

Agents working on BüroAssist must optimize for these problems:

- Users do not know the correct order of setup tasks.
- Users do not understand German administrative terms.
- Users do not know which documents are mandatory, optional, city-specific, or provider-specific.
- Users confuse related concepts such as Anmeldung, residence permit, visa, Tax ID, tax number, social security number, IBAN, SEPA, statutory health insurance, and private health insurance.
- Users miss deadlines or fail verification because they are underprepared.
- Users depend on scattered advice from Reddit, WhatsApp groups, blogs, and informal communities.

---

## Product Principles

### 1. Calm Over Complexity

Every screen should reduce stress. Avoid overwhelming users with large blocks of legal or administrative text.

### 2. Step-by-Step Guidance

Break every workflow into small, checkable steps. Users should always understand the next action.

### 3. Source-Backed Trust

When content describes official processes, include source links, last-reviewed dates, and clear uncertainty notes where requirements vary.

### 4. No Legal, Tax, Immigration, Banking, Insurance, or Financial Advice

BüroAssist provides general administrative guidance only. Do not phrase output as professional advice, guaranteed eligibility, or definitive legal interpretation.

### 5. Mobile-First

Design and implementation must prioritize mobile usage. Many users will use the product while commuting, preparing for appointments, or comparing documents.

### 6. Provider-Neutral Guidance

For banking, mobile SIM, and insurance flows, do not rank providers as “best” in a regulated or advisory sense. Use neutral comparison criteria and eligibility-based guidance.

### 7. Data Minimization

Collect only what is required for personalization. Do not store sensitive documents or credentials in the MVP.

---

## MVP Experience

BüroAssist should not feel like six separate articles. It should feel like one personalized setup roadmap.

Example roadmap for a new non-EU student in Berlin:

1. Get a temporary or permanent German mobile number.
2. Choose a first banking option, preferably online/mobile banking if eligible.
3. Confirm health insurance path.
4. Book and complete Anmeldung.
5. Wait for or request Tax ID.
6. Prepare residence permit application.
7. Set up ELSTER when needed.

---

## Workflow Requirements

## 1. Anmeldung Assistant

### Goal

Help users register their residential address in Germany.

### Required Capabilities

- City selection
- Move-in date capture
- Rental status capture
- Document checklist
- Appointment link guidance
- Explanation of Wohnungsgeberbestätigung
- Task tracker
- Registration reminder

### Typical Checklist Items

- Valid passport or ID
- Registration form
- Landlord confirmation / Wohnungsgeberbestätigung
- Rental contract where relevant
- Marriage certificate or birth certificate where relevant
- Appointment confirmation where required

### Agent Rules

- Explain that requirements and timelines can vary by city.
- Prefer official city links for appointment and checklist guidance.
- Do not guarantee appointment availability.

---

## 2. Residence Permit Assistant

### Goal

Help users prepare for residence permit application, extension, or renewal.

### Required Capabilities

- User status selection: student, skilled worker, job seeker, family member, researcher, self-employed, EU Blue Card candidate
- Current visa or residence status capture
- Visa/residence permit expiry date capture
- City selection
- Document checklist by status
- Deadline reminder
- Local authority/application channel guidance
- Progress tracker

### Typical Checklist Items

- Passport
- Visa or current residence title
- Biometric photo
- Anmeldung certificate
- Health insurance proof
- Proof of financial means
- Employment contract or university enrollment certificate
- Rental agreement or proof of accommodation
- Application form or online submission confirmation

### Agent Rules

- Always include a disclaimer that final requirements depend on the responsible Ausländerbehörde.
- Do not determine legal eligibility.
- Use cautious wording such as “may need,” “usually required,” and “verify with the authority.”
- Highlight expiry-date urgency clearly.

---

## 3. Health Insurance Onboarding Assistant

### Goal

Help users understand health insurance paths and obtain valid proof.

### Required Capabilities

- Status selection: student, employee, job seeker, freelancer, spouse/family, EU citizen
- Age capture for student logic
- Country/EHIC status capture
- Public vs private insurance explanation
- Proof checklist
- Provider-neutral questions to ask insurers
- Reminder to obtain proof before enrollment, employment, or residence application

### Agent Rules

- Do not recommend a specific insurer as the best choice.
- Do not provide insurance advice.
- Use neutral criteria: eligibility, accepted proof, language support, coverage start date, cancellation terms, monthly cost, support availability.
- Remind users to verify acceptance with the university, employer, immigration authority, or insurer.

---

## 4. Tax ID + ELSTER Assistant

### Goal

Help users understand tax identifiers and set up ELSTER where relevant.

### Required Capabilities

- Explain Tax ID vs tax number vs social security number vs VAT number.
- Explain the relationship between Anmeldung and Tax ID delivery.
- Provide Tax ID recovery/request guidance.
- Explain ELSTER registration steps.
- Remind user to complete activation after receiving email/postal activation data.
- Do not store sensitive tax credentials.

### Agent Rules

- Do not offer tax filing advice in the MVP.
- Do not ask users to store Tax ID, ELSTER certificate, activation codes, or login credentials in the product.
- Keep explanations simple and glossary-driven.

---

## 5. Mobile SIM Registration Assistant

### Goal

Help users choose and activate a German SIM or eSIM.

### Required Capabilities

- Explain prepaid SIM, eSIM, and contract differences.
- Explain identity verification requirements.
- Capture whether the user has a supported passport/ID.
- Capture whether the user has a German address.
- Provide activation checklist.
- Explain common VideoIdent/PostIdent failure reasons.
- Recommend prepaid/eSIM as a practical first step where appropriate.

### Typical Checklist Items

- Passport or supported ID
- German or temporary address where required
- Email address
- Smartphone with camera
- Stable internet connection
- Payment method
- Provider app or activation portal

### Agent Rules

- Do not claim a provider will accept a specific document unless verified from that provider’s current guidance.
- Explain that activation requirements vary by provider.
- Use neutral provider examples only.

---

## 6. Banking Setup Assistant

### Goal

Help users open a first bank account in Germany, prioritizing online/mobile banking as a fast first-step option where eligible.

### Product Position

BüroAssist should present online/mobile banks as a practical first step, not as universally superior. Examples may include N26, Revolut, Wise, bunq, Vivid, or other providers, but the product must remain provider-neutral unless a formal partnership is disclosed.

### Required Capabilities

- Explain why users need a bank account in Germany.
- Explain IBAN, SEPA direct debit, debit card, Girocard, credit card, and blocked account at a basic level.
- Compare online/mobile banking vs traditional banks.
- Show eligibility and identity verification checklist.
- Capture whether the user has a supported ID document.
- Capture whether the user has a German address or temporary address.
- Capture whether the user needs salary payment, rent payment, blocked account, or daily spending.
- Explain common bank verification failure reasons.
- Remind users that some landlords, employers, or authorities may have preferences or requirements.

### Typical Checklist Items

- Passport or supported ID
- Smartphone
- Email address
- Mobile number
- German address or current residence address where accepted
- Tax residency information where required
- Selfie/video verification readiness
- Proof of student/employment status where required

### Provider-Neutral Comparison Criteria

- Eligibility by nationality/residence status
- Supported ID documents
- German IBAN or European IBAN availability
- Monthly fees
- Card type and delivery time
- Cash withdrawal rules
- SEPA direct debit support
- English-language support
- App language
- Verification method
- Customer service availability

### Agent Rules

- Do not provide investment, credit, loan, or financial advice.
- Do not ask users to store bank credentials.
- Do not guarantee account approval.
- Favor “first-step banking setup” language over “best bank” language.

---

## Personalization Inputs

The onboarding flow should collect only the minimum information needed to generate the roadmap:

- City
- Country/nationality group: EU/EEA or non-EU
- Current status: student, employee, job seeker, freelancer, family member, other
- Arrival date or expected arrival date
- Move-in date
- Visa/residence permit expiry date, if applicable
- Whether the user already has a German phone number
- Whether the user already has a bank account usable in Germany
- Whether the user already has health insurance proof
- Whether the user has completed Anmeldung
- Preferred language

Do not collect passport numbers, Tax IDs, bank credentials, ELSTER credentials, insurance policy numbers, or residence permit numbers in the MVP.

---

## Dashboard Requirements

The dashboard should show:

- Next urgent task
- Personalized roadmap progress
- Upcoming deadlines
- Missing documents
- Workflow cards
- Saved official links
- Reminder setup
- Recently completed steps
- Glossary shortcuts

Workflow card statuses:

- Not started
- In progress
- Ready
- Completed
- Blocked

---

## Content Requirements

Every workflow page should include:

1. Plain-language overview
2. Who needs this
3. When to do it
4. Documents needed
5. Step-by-step process
6. Common mistakes
7. Official links
8. Checklist
9. Reminder setup
10. Last-reviewed date
11. Disclaimer where appropriate

### Content Tone

Use language that is:

- Clear
- Reassuring
- Direct
- Non-judgmental
- Practical

Prefer this style:

> “Try to register your address soon after moving in. Some cities expect this within a set timeframe, and late registration may cause problems later.”

Avoid this style:

> “Failure to register within the statutory period may lead to penalties.”

---

## Glossary Requirements

BüroAssist should include short explanations for German terms, including:

- Anmeldung
- Bürgeramt
- Ausländerbehörde
- Aufenthaltstitel
- Wohnungsgeberbestätigung
- Steueridentifikationsnummer
- Steuernummer
- ELSTER
- Krankenkasse
- gesetzliche Krankenversicherung
- private Krankenversicherung
- IBAN
- SEPA
- Girocard
- VideoIdent
- PostIdent
- eSIM
- Prepaid SIM
- Blocked Account / Sperrkonto

Glossary entries should be short, plain-language, and linked contextually inside workflows.

---

## Data and Privacy Rules

BüroAssist must follow GDPR principles:

- Data minimization
- Purpose limitation
- Consent where required
- Transparent data use
- User control over deletion/export
- Secure storage
- No unnecessary sensitive data collection

### Do Not Store in MVP

- Passport numbers
- Passport scans
- Residence permit scans
- Tax ID values
- ELSTER credentials or activation codes
- Bank login credentials
- Bank account passwords
- Insurance policy numbers
- SIM provider account passwords

### Acceptable MVP Data

- Email
- Preferred language
- City
- General status category
- Workflow completion state
- Reminder dates
- Non-sensitive checklist notes
- Saved public links

---

## Legal and Compliance Rules

Every high-risk workflow must include a visible disclaimer.

Recommended disclaimer:

> BüroAssist provides general administrative guidance only. It does not provide legal, tax, immigration, banking, insurance, or financial advice. Requirements can vary by city, authority, provider, and personal situation. Always verify final requirements with the responsible authority or provider.

### High-Risk Content Areas

- Residence permits
- Visa expiry deadlines
- Health insurance eligibility
- Banking eligibility
- Tax/ELSTER setup
- Identity verification requirements

### Agent Behavior

When generating content or UX copy:

- Avoid guarantees.
- Avoid “you are eligible” unless the product has verified, rule-based eligibility from official or provider sources.
- Prefer “you may need,” “commonly required,” “usually requested,” and “verify with.”
- Include official or provider source links when possible.
- Clearly mark content that varies by city or provider.

---

## Recommended Information Architecture

Main navigation:

1. Dashboard
2. My Roadmap
3. Workflows
4. Glossary
5. Resources
6. Profile

Key screens:

1. Landing page
2. Onboarding questionnaire
3. Personalized roadmap
4. Dashboard
5. Workflow detail page
6. Checklist page
7. Reminder setup page
8. Glossary page
9. Profile/settings page

---

## Functional Requirements Summary

### Must-Have

- Onboarding questionnaire
- Personalized roadmap
- Six MVP workflow guides
- Checklist tracking
- Deadline/reminder setup
- City-specific official links where available
- Glossary
- Clear disclaimers
- Content last-reviewed dates

### Should-Have

- Email reminders
- PDF checklist export
- User notes per task
- Feedback button on each workflow
- Basic provider-neutral comparison tables

### Could-Have

- AI official letter explainer
- Appointment slot monitoring
- Document readiness checker
- Provider marketplace
- Community Q&A

### Won’t-Have for MVP

- Full application submission
- Legal, tax, banking, financial, immigration, or insurance consultation
- Complex tax filing
- Secure document vault
- Storage of sensitive IDs or credentials
- Guaranteed appointment or provider approval

---

## Suggested Data Model

### User

- user_id
- email
- preferred_language
- city
- nationality_group
- current_status
- arrival_date
- move_in_date
- visa_expiry_date
- has_german_phone_number
- has_germany_usable_bank_account
- has_health_insurance_proof
- has_completed_anmeldung
- created_at
- updated_at

### Workflow

- workflow_id
- workflow_name
- workflow_category
- general_description
- city_specific_available
- provider_specific_available
- last_reviewed_at

### UserWorkflow

- user_workflow_id
- user_id
- workflow_id
- status
- progress_percentage
- due_date
- completed_at
- blocked_reason

### ChecklistItem

- checklist_item_id
- workflow_id
- title
- description
- required_for_status
- city
- provider_type
- priority
- source_url
- last_reviewed_at

### UserChecklistItem

- user_id
- checklist_item_id
- status
- completed_at
- notes

### Reminder

- reminder_id
- user_id
- workflow_id
- reminder_type
- reminder_date
- channel
- status

### GlossaryTerm

- term_id
- term
- plain_language_definition
- category
- related_workflow_id
- source_url
- last_reviewed_at

---

## UX Rules for Agents

When creating screens, components, or copy:

- Use progressive disclosure.
- Avoid dense paragraphs.
- Show one clear next action.
- Use checklist patterns for document preparation.
- Use status badges for workflow progress.
- Include “Why this matters” explanations for confusing steps.
- Provide warnings without fear-based language.
- Make source links visible but not disruptive.
- Design for thumb-friendly mobile interaction.
- Use accessible contrast, clear labels, and readable font sizes.

---

## Engineering Guidance

No specific stack is mandated by the PRD. If implementing from scratch, prefer a pragmatic mobile-first web stack.

Recommended default architecture:

- Frontend: React/Next.js or similar
- Styling: Tailwind CSS or equivalent design system
- Backend: Node.js/Next.js API routes, Python, or another maintainable backend
- Database: PostgreSQL or equivalent relational database
- Auth: Email/passwordless or OAuth provider
- CMS/content: Headless CMS or admin-managed database tables
- Notifications: Email first; push later
- Hosting: GDPR-aware EU-compatible hosting preferred

### Engineering Priorities

1. Roadmap generation logic
2. Workflow content rendering
3. Checklist persistence
4. Reminder setup
5. Glossary linking
6. Content source and review metadata
7. Privacy-first user profile

### Testing Priorities

- Onboarding logic produces correct roadmap variants.
- Checklist state persists correctly.
- Reminder dates are calculated correctly.
- No sensitive fields are stored accidentally.
- City-specific content falls back to general guidance where needed.
- Disclaimers appear on high-risk workflows.
- Workflow pages remain usable on mobile screens.

---

## Content Governance

Agents must preserve the content governance model:

- Every checklist item should have a source URL where applicable.
- Every workflow should have a last-reviewed date.
- High-risk workflows should be reviewed more frequently.
- Outdated content should be flagged instead of silently displayed.
- City/provider-specific content should be separated from general Germany-wide guidance.

---

## Success Metrics

### Activation

- Onboarding completion rate
- Personalized roadmap generation rate
- First workflow started rate

### Engagement

- Checklist items completed per user
- Workflows started per user
- Reminder setup rate
- Return visits within 7 days

### Outcomes

- Users who report completing Anmeldung
- Users who report opening/activating a SIM
- Users who report opening a bank account
- Users who report obtaining health insurance proof
- Users who report receiving/recovering Tax ID
- Users who report submitting a residence permit application
- Users who report completing ELSTER registration

### Trust

- Content helpfulness rating
- Confidence before/after workflow
- Reported error rate
- Source link click-through rate

---

## Naming and Brand Rules

Use the product name exactly as:

**BüroAssist**

Acceptable fallback for code identifiers where special characters are inconvenient:

- `BuroAssist`
- `buroassist`
- `buro_assist`

Do not rename the product.

### Tagline Options

- German paperwork, simplified.
- Your guide through German bureaucracy.
- Know what to do next in Germany.
- From SIM to Anmeldung to ELSTER, one step at a time.
- Settle in Germany with less stress.

---

## Agent Output Rules

When generating code, product copy, user stories, UX flows, or documentation for BüroAssist:

1. Preserve the six-workflow MVP scope.
2. Keep online/mobile banking as a recommended first-step path, not a guaranteed best option.
3. Keep guidance provider-neutral unless explicitly told otherwise.
4. Do not introduce sensitive data storage without explicit privacy controls.
5. Do not provide professional legal, tax, insurance, banking, immigration, or financial advice.
6. Include source-link and last-reviewed fields in content models.
7. Use simple English by default.
8. Design mobile-first.
9. Use calm, practical, step-by-step language.
10. Prioritize Berlin-first assumptions unless a different city is selected.

---

## Definition of Done for MVP Features

A BüroAssist MVP feature is done when:

- It supports mobile-first use.
- It has clear user-facing copy.
- It includes a checklist or next action where appropriate.
- It avoids professional advice claims.
- It includes source/review metadata where process guidance is shown.
- It respects data minimization.
- It has empty, loading, success, error, and blocked states.
- It works for at least the primary persona: a new international arrival in Berlin.
- It does not store sensitive IDs, credentials, or documents.

---

## Primary Reference Document

This AGENT.md is derived from the BüroAssist MVP PRD. When conflict appears between this file and a more recent PRD, the latest PRD should be treated as the product source of truth.
