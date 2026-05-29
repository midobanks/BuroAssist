# BüroAssist Product Scope Rules

## Purpose

This file defines the product boundaries for BüroAssist. Use it to prevent scope creep when building with agentic coding tools such as Google Antigravity.

BüroAssist is a mobile-first web app that helps internationals in Germany complete essential setup and bureaucracy tasks through personalized roadmaps, step-by-step workflows, checklists, reminders, glossary support, and official resource links.

## Product Positioning

BüroAssist is a guided administrative companion. It helps users understand what to do, what documents may be needed, where to verify requirements, and what to do next.

BüroAssist must not position itself as:

- A law firm
- A tax advisor
- An immigration consultant
- A health insurance broker
- A bank
- A SIM or telecom provider
- An official government portal

## Primary Target Audience

Build primarily for internationals living in or moving to Germany.

Primary users include:

- Non-EU students
- Skilled workers
- EU Blue Card candidates
- Job seekers
- Freelancers
- International employees
- Family members joining relatives in Germany
- EU/EEA movers who still need practical setup help

The MVP language is English. Future localization may include German, Arabic, Turkish, French, Spanish, Hindi, and Ukrainian.

## MVP Workflows

Build only these six workflows for the MVP:

1. Anmeldung
2. Residence Permit
3. Health Insurance Onboarding
4. Tax ID + ELSTER
5. Mobile SIM Registration
6. Banking Setup

Do not add additional workflows unless explicitly requested by the product owner.

## MVP Geography

Recommended launch approach:

- Berlin-first for highest quality
- Then expand to Munich, Hamburg, Cologne, and Frankfurt

If building city-specific content, prioritize Berlin. If city-specific data is unavailable, use general Germany-wide guidance and label it clearly.

## Core MVP Capabilities

The MVP must include:

- Landing page
- User onboarding questionnaire
- Personalized roadmap generation
- Dashboard
- Six workflow detail pages
- Checklist tracking
- Reminder creation and management
- City-specific official links where available
- Glossary of German bureaucracy terms
- Content source and last-reviewed metadata
- Clear legal/tax/insurance/immigration disclaimers
- Basic user profile editing

## Workflow Scope

### Anmeldung

Include:

- Address registration explanation
- Move-in date capture
- City selection
- Rental status
- Wohnungsgeberbestätigung explanation
- Document checklist
- Appointment guidance link
- Reminder to register address

Exclude:

- Direct appointment booking
- Automatic appointment scraping
- Submission of registration forms

### Residence Permit

Include:

- Permit/status selection
- Visa or residence expiry date
- Document checklist by user status
- Deadline reminders
- Local authority links
- Warnings that requirements vary by city and case

Exclude:

- Legal eligibility decisions
- Immigration advice
- Direct application submission
- Document approval guarantees

### Health Insurance Onboarding

Include:

- Public vs private explanation
- Student, employee, freelancer, job seeker, family, and EU/EEA status paths
- Proof checklist
- Neutral provider comparison criteria
- Reminder to obtain proof before enrollment, employment, or residence permit application

Exclude:

- Insurance brokerage claims
- Ranked recommendations presented as advice
- Binding eligibility decisions
- Storage of insurance policy numbers in MVP

### Tax ID + ELSTER

Include:

- Tax ID vs tax number vs social security number explanation
- Connection between Anmeldung and Tax ID delivery
- Tax ID recovery/request guidance
- ELSTER registration overview
- Activation reminder

Exclude:

- Tax filing
- ELSTER credential storage
- Direct ELSTER integration
- Tax advice

### Mobile SIM Registration

Include:

- Prepaid, postpaid, and eSIM explanation
- ID verification guidance
- Provider-neutral comparison criteria
- Activation checklist
- Store/official link guidance where useful

Exclude:

- SIM activation on behalf of users
- Identity verification processing
- Storage of passport or ID document numbers
- Telecom contract recommendations framed as advice

### Banking Setup

Include:

- Online-first banking setup guidance
- Neutral examples such as N26, Revolut, Wise, bunq, and Vivid
- Current-account setup checklist
- Identity verification explanation
- IBAN and payment basics
- Fallback guidance for traditional banks

Exclude:

- Open banking integration
- Bank account aggregation
- Credit, loan, or investment advice
- Storage of bank credentials or IBAN as a default MVP behavior

## Must-Have Product Rules

- Always show guidance as general administrative support, not advice.
- Always include source links or source references for official process guidance.
- Always show `last_reviewed_at` for workflow content.
- Always allow users to verify final requirements with the responsible authority.
- Prefer checklists, roadmaps, and explanations over chat-only interaction.
- Keep the experience calm, simple, and mobile-first.
- Avoid collecting sensitive data unless it is strictly necessary.

## MVP Non-Goals

Do not build these in the MVP:

- Direct government application submission
- Direct ELSTER integration
- Direct immigration office integration
- Automated appointment booking
- Open banking integration
- Health insurance quote engine
- SIM activation integration
- Secure document vault
- AI legal/tax/immigration advisor
- Full tax filing
- Native iOS or Android apps
- Marketplace of consultants
- Community Q&A forum

## Later / Premium Candidates

These may be added after core validation:

- AI official letter explainer
- Appointment availability alerts
- PDF checklist export
- Document readiness scoring
- Multi-language support
- B2B onboarding dashboards for employers and universities
- Expert referral flow
- Provider referral tracking
- Push notifications

## Product Success Metrics

Track:

- Onboarding completion rate
- Roadmap generation rate
- Workflow start rate
- Checklist item completion rate
- Reminder creation rate
- Return visits within 7 days
- Official link click-through rate
- Content helpfulness rating
- Reported content error rate
- User confidence before and after workflow

## Scope Decision Rule

When an agent is uncertain whether to build something, ask:

1. Does it help users understand, prepare, track, or remember an MVP bureaucracy/setup task?
2. Is it within one of the six MVP workflows?
3. Can it be built without collecting unnecessary sensitive data?
4. Can it be framed as guidance rather than advice?
5. Does it reduce anxiety and complexity?

If the answer to any of these is no, do not build it unless the product owner explicitly approves it.
