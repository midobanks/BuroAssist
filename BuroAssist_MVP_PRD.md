# Product Requirements Document: BüroAssist

## 1. Product Overview

**Product name:** BüroAssist  
**Product type:** Mobile-first web application, later native mobile app  
**Primary market:** Germany  
**Primary audience:** Internationals living in or moving to Germany  
**MVP focus:** Anmeldung, Residence Permit, Health Insurance Onboarding, Tax ID + ELSTER, Mobile SIM Registration, and Banking Setup  
**Recommended launch market:** Berlin-first, with expansion to Munich, Hamburg, Cologne, and Frankfurt  

### 1.1 Product Vision

BüroAssist helps internationals in Germany confidently complete essential setup and bureaucracy tasks by turning fragmented, German-heavy processes into clear, personalized, step-by-step workflows.

### 1.2 One-Line Value Proposition

**BüroAssist helps internationals in Germany know what to do, what documents they need, where to go, and what comes next when setting up life in Germany.**

### 1.3 Product Positioning

BüroAssist is a guided bureaucracy and settlement companion for internationals in Germany. It does not replace government offices, lawyers, tax advisors, banks, mobile providers, insurance brokers, or public authorities. Instead, it helps users understand official processes, prepare documents, compare practical options, track progress, and avoid common mistakes.

### 1.4 Problem Statement

Internationals arriving in Germany face a stressful sequence of administrative and practical setup tasks. They often need to register their address, obtain health insurance, open a bank account, activate a German mobile number, receive a tax identification number, set up ELSTER, and apply for or renew a residence permit. These tasks are highly connected, yet information is scattered across government websites, banks, telecom providers, insurance providers, forums, blogs, relocation guides, and social media groups.

The result is confusion, missed deadlines, incomplete documents, failed verification attempts, delayed salary payments, delayed residence permit applications, and anxiety during the first weeks or months in Germany.

### 1.5 Product Hypothesis

If BüroAssist provides internationals with a personalized setup roadmap, localized checklists, document preparation guidance, deadline reminders, plain-language explanations, and trusted official links, then users will complete essential Germany setup tasks faster, with fewer mistakes and less stress.

---

## 2. MVP Summary

### 2.1 MVP Workflow Areas

The MVP includes six workflow modules:

1. **Anmeldung Assistant** — Registering a residential address.
2. **Residence Permit Assistant** — Preparing for application, extension, or renewal.
3. **Health Insurance Onboarding Assistant** — Understanding and obtaining valid health insurance proof.
4. **Tax ID + ELSTER Assistant** — Understanding tax identification and setting up ELSTER where relevant.
5. **Mobile SIM Registration Assistant** — Choosing and activating a German SIM or eSIM with identity verification.
6. **Banking Setup Assistant** — Opening a first bank account, with online/mobile banks as the recommended first-step path.

### 2.2 Recommended MVP Experience

The user should not experience these as six disconnected guides. BüroAssist should present them as one personalized roadmap based on the user’s status, city, nationality group, and arrival situation.

Example roadmap for a new non-EU student in Berlin:

1. Get a temporary or permanent German mobile number.
2. Choose a first banking option, preferably online banking if eligible.
3. Confirm health insurance path.
4. Book and complete Anmeldung.
5. Wait for or request Tax ID.
6. Prepare residence permit application.
7. Set up ELSTER when needed.

---

## 3. Goals and Non-Goals

### 3.1 MVP Goals

1. Help internationals understand the correct sequence of essential Germany setup tasks.
2. Provide personalized guidance for six core workflows.
3. Reduce uncertainty by showing documents, deadlines, verification needs, responsible offices, provider-neutral guidance, and next actions.
4. Help users track progress through a personal setup dashboard.
5. Build trust through official links, clear limitations, and last-reviewed dates.
6. Validate demand for a Germany settlement and bureaucracy companion.

### 3.2 Business Goals

1. Validate the most painful and monetizable workflows.
2. Capture early users through a practical Berlin-first MVP.
3. Create a foundation for premium features such as AI letter explanation, appointment alerts, document readiness checks, and PDF exports.
4. Develop B2B potential with employers, universities, relocation agencies, student services, and international talent platforms.

### 3.3 Non-Goals for MVP

1. BüroAssist will not provide legal, tax, immigration, banking, insurance, or financial advice.
2. BüroAssist will not submit official applications on behalf of users.
3. BüroAssist will not open bank accounts, purchase SIM cards, or register users directly with providers.
4. BüroAssist will not rank financial institutions by investment, credit, or lending suitability.
5. BüroAssist will not store sensitive documents such as passports, residence permits, bank credentials, tax IDs, or insurance policy numbers in the MVP.
6. BüroAssist will not guarantee appointment availability or successful provider verification.
7. BüroAssist will not cover every German city or every residence permit type at launch.

---

## 4. Target Users

### 4.1 Primary Persona: New International Arrival

**Name:** Aisha  
**Age:** 24–35  
**Status:** Non-EU student, skilled worker, or job seeker  
**Location:** Berlin, Munich, Hamburg, Cologne, Frankfurt, or another major German city  
**Language:** English-speaking, beginner/intermediate German  

**Needs:**
- Get mobile connectivity quickly.
- Open a bank account for salary, rent, or daily payments.
- Register address.
- Get health insurance proof.
- Receive Tax ID.
- Apply for residence permit.

**Pain points:**
- Confusing German terminology.
- Unclear sequence of tasks.
- Different document requirements by city/provider.
- Fear of doing things in the wrong order.
- Difficulty verifying identity with banks or telecom providers.
- Reliance on Reddit, WhatsApp groups, and informal advice.

### 4.2 Secondary Persona: International Employee

**Name:** Daniel  
**Age:** 28–45  
**Status:** Skilled worker or EU Blue Card candidate  

**Needs:**
- Open bank account quickly for salary.
- Provide health insurance proof to employer.
- Register address.
- Prepare residence permit or Blue Card documents.
- Understand Tax ID for payroll.

### 4.3 Secondary Persona: International Student

**Name:** Linh  
**Age:** 18–30  
**Status:** International student  

**Needs:**
- Obtain valid health insurance proof for enrollment.
- Register address.
- Open a basic bank account.
- Activate German SIM.
- Prepare residence permit documents.
- Understand tax setup for part-time work.

---

## 5. Key User Problems

### 5.1 Cross-Workflow Problems

- Users do not know what to do first.
- Users do not know which tasks depend on other tasks.
- Users do not know which documents are mandatory, optional, or city/provider-specific.
- Users do not understand German terms like Anmeldung, Wohnungsgeberbestätigung, Steueridentifikationsnummer, Ausländerbehörde, Krankenkasse, Aufenthaltstitel, and VideoIdent.
- Users lose track of deadlines and verification steps.

### 5.2 Anmeldung Problems

- Users do not know they need to register their address after moving.
- Users are unsure which office handles registration.
- Users do not know which documents are required.
- Users confuse Anmeldung with residence permit registration.
- Users struggle to find appointments.
- Users do not understand landlord confirmation requirements.

### 5.3 Residence Permit Problems

- Users do not know when to apply after arrival.
- Users do not know which residence title applies to them.
- Requirements vary by city and permit type.
- Users miss deadlines before visa expiry.
- Users do not understand what to do after submitting online documents.

### 5.4 Health Insurance Problems

- Users do not know health insurance is mandatory in Germany.
- Users do not understand public vs private insurance.
- Students are unsure which proof is accepted for university enrollment and residence permits.
- Employees are unsure how health insurance connects to payroll and employer onboarding.

### 5.5 Tax ID + ELSTER Problems

- Users confuse Tax ID, tax number, VAT number, and social security number.
- Users do not know Tax ID is commonly triggered after Anmeldung.
- Users do not know how to recover/request Tax ID.
- Users find ELSTER registration confusing because activation may involve multiple verification steps.

### 5.6 Mobile SIM Registration Problems

- Users need a German phone number for banking, appointments, apartment hunting, delivery apps, and employer communication.
- Users do not know that SIM activation often requires identity verification.
- Users are unsure whether passport, residence permit, foreign ID, or Anmeldung address is needed.
- Users may fail video identification because of unsupported documents, poor connection, name mismatch, or address mismatch.
- Users do not know whether to start with prepaid SIM, eSIM, or contract.

### 5.7 Banking Setup Problems

- Users need a bank account for rent, salary, insurance payments, subscriptions, and daily life.
- Traditional banks may require appointments, German language ability, Anmeldung, or additional verification.
- Online/mobile banks can be faster but still require eligibility checks, supported ID documents, phone number, address, and identity verification.
- Users are unsure whether an online bank account is accepted by employers, landlords, visa offices, or service providers.
- Users confuse IBAN, SEPA direct debit, Girocard, debit card, credit card, and blocked account.

---

## 6. MVP Scope by Workflow

## 6.1 Workflow 1: Anmeldung Assistant

**User goal:** Register residential address in Germany.

### Core Capabilities

- City selection.
- Move-in date capture.
- Rental status capture.
- Document checklist.
- Appointment link guidance.
- Explanation of landlord confirmation / Wohnungsgeberbestätigung.
- Task tracker.
- Registration reminder.

### Checklist Examples

- Valid passport or ID.
- Registration form.
- Landlord confirmation / Wohnungsgeberbestätigung.
- Rental contract where relevant.
- Marriage certificate or birth certificate where relevant.
- Appointment confirmation where required.

### Acceptance Criteria

- User can select a city.
- User sees a general and city-specific checklist where available.
- User can mark each document as ready.
- User can save appointment date.
- User sees a warning that requirements may vary by Bürgeramt/city.

---

## 6.2 Workflow 2: Residence Permit Assistant

**User goal:** Prepare for residence permit application, renewal, or extension.

### Core Capabilities

- User status selection: student, skilled worker, job seeker, family, researcher, freelancer/self-employed, EU Blue Card candidate.
- Current visa/residence status capture.
- Visa/residence permit expiry date capture.
- City selection.
- Document checklist based on status.
- Deadline reminder.
- Office/application channel guidance.
- Progress tracker.

### Checklist Examples

- Passport.
- Visa or current residence title.
- Biometric photo.
- Anmeldung certificate.
- Health insurance proof.
- Proof of financial means.
- Employment contract or university enrollment certificate.
- Rental agreement/proof of accommodation.
- Application form or online submission confirmation.

### Acceptance Criteria

- User can select permit type/status.
- User receives a tailored document checklist.
- User receives a warning if visa/residence expiry is approaching.
- User sees relevant local authority link where available.
- User sees clear disclaimer that requirements may vary by Ausländerbehörde.

---

## 6.3 Workflow 3: Health Insurance Onboarding Assistant

**User goal:** Understand and choose a valid health insurance path.

### Core Capabilities

- Status selection: student, employee, job seeker, freelancer, spouse/family, EU citizen.
- Age capture for student logic.
- Country/EHIC status capture.
- Public vs private insurance explanation.
- Accepted proof checklist.
- Suggested questions to ask providers.
- Reminder to obtain proof before enrollment, employment, or residence permit application.

### Decision Logic Examples

- Student under 30 may usually be eligible for student statutory insurance.
- EU/EEA users may be able to use EHIC or recognized home-country insurance depending on status.
- Employees are typically enrolled through statutory health insurance unless eligible for private insurance.
- Freelancers and older students may need more specific guidance.

### Acceptance Criteria

- User can select status and insurance situation.
- App explains likely insurance options in plain language.
- App identifies likely proof requirements.
- App suggests neutral provider-evaluation questions.
- App avoids making regulated insurance advice claims.

---

## 6.4 Workflow 4: Tax ID + ELSTER Assistant

**User goal:** Understand Tax ID and create an ELSTER account where relevant.

### Core Capabilities

- Explain Tax ID vs Tax Number vs Social Security Number.
- Explain when Tax ID usually arrives.
- Provide Tax ID recovery/request guidance.
- Provide ELSTER readiness checklist.
- Explain ELSTER registration steps.
- Remind user to complete activation after receiving activation data.
- Provide secure storage reminder without storing credentials.

### Checklist Examples

- Tax ID.
- Date of birth.
- Email address.
- Registered postal address.
- ELSTER activation email.
- ELSTER activation letter/code.
- ELSTERSecure app or other login option.

### Acceptance Criteria

- App explains Tax ID vs Tax Number.
- App shows expected Tax ID path after Anmeldung.
- App provides Tax ID recovery guidance.
- App explains ELSTER activation steps.
- App does not store tax credentials.

---

## 6.5 Workflow 5: Mobile SIM Registration Assistant

**User goal:** Get a working German mobile number quickly and complete SIM/eSIM identity verification successfully.

### Core Capabilities

- Explain prepaid SIM, eSIM, contract SIM, and roaming trade-offs.
- Recommend a low-friction first-step path: prepaid SIM or eSIM, depending on user device and ID eligibility.
- Capture user needs:
  - Need German number immediately?
  - Has compatible eSIM phone?
  - Has passport/ID/residence permit?
  - Has German address yet?
  - Needs high data volume?
- Provide identity verification checklist.
- Explain common verification methods such as video identification, PostIdent, in-store verification, and provider app verification.
- Track activation status.
- Warn users to check provider-specific accepted documents before purchase.

### Checklist Examples

- Compatible phone.
- Passport or national ID.
- Residence permit if required/available.
- German address or current address accepted by provider.
- Email address.
- Payment method.
- Stable internet connection for video identification.

### Suggested MVP Guidance

BüroAssist should not recommend one telecom provider as the best option. Instead, it should guide users to choose based on:

- Immediate activation need.
- eSIM support.
- English-language onboarding.
- Accepted ID documents.
- Prepaid vs contract preference.
- Data needs.
- Coverage and network preference.
- Ability to complete verification online or in person.

### Acceptance Criteria

- User can select SIM type preference: prepaid, eSIM, contract, or unsure.
- App explains identity verification requirements.
- App provides an activation checklist.
- App warns that accepted documents vary by provider and verification method.
- User can mark SIM activation as completed.

---

## 6.6 Workflow 6: Banking Setup Assistant

**User goal:** Open a first bank account for everyday life in Germany, with online/mobile banking as the recommended first step where eligible.

### Product Position

The MVP should favor online/mobile banks as the first-step path because they can reduce friction for newcomers who need a fast account for salary, rent, SEPA payments, and everyday card usage. Examples to mention neutrally include N26, Revolut, Wise, Vivid, bunq, and other online banking options available to German residents.

BüroAssist should avoid presenting a single provider as universally best. Instead, it should help users evaluate eligibility, identity verification, German IBAN availability, fees, language support, card availability, cash deposit limitations, and whether the account fits their immediate needs.

### Core Capabilities

- Explain account types:
  - Online/mobile bank account.
  - Traditional bank Girokonto.
  - Blocked account for visa/study purposes.
  - Basic payment account.
- Recommend first-step path:
  - Try online/mobile bank first if eligible and user needs quick access.
  - Use traditional bank if online verification fails or user needs in-person support.
  - Use blocked account only when required for visa/student proof of financial means.
- Capture user needs:
  - Salary account.
  - Rent payments.
  - Visa blocked account.
  - Student account.
  - Cash deposits.
  - German IBAN preference.
  - English-language app support.
- Provide eligibility checklist.
- Provide identity verification checklist.
- Explain IBAN, SEPA, direct debit, debit card, virtual card, and Girocard.
- Track account opening status.

### Checklist Examples

- Smartphone.
- Email address.
- Mobile number.
- Residential address.
- Passport/national ID/residence permit where accepted.
- Tax residency information.
- Selfie or video verification readiness.
- Proof of address if requested.
- Supported country of residence.
- Minimum age requirement.

### Online Banking First-Step Guidance

The product should suggest this path:

1. Check whether the user has a valid ID accepted by the online bank.
2. Check whether the user has a smartphone and phone number.
3. Check whether the user has a German or accepted residential address.
4. Check whether the provider offers a German IBAN or whether a non-German EU IBAN is acceptable for the user’s needs.
5. Start with a free/basic account where possible.
6. Add card to Apple Pay/Google Pay if available.
7. Use the account for salary, rent, insurance, and daily payments once active.
8. Consider a traditional bank later if user needs cash deposits, branch support, Girocard, credit products, or specific employer/landlord requirements.

### Provider-Neutral Comparison Criteria

- Is account opening fully online?
- Does the provider support the user’s ID document?
- Does it offer a German IBAN?
- Are there monthly fees?
- Is English support available?
- Is a virtual card available immediately?
- Are cash withdrawals free or limited?
- Are cash deposits possible?
- Does it support SEPA direct debit?
- Is customer support responsive?
- Is the bank/provider properly regulated in the EU/Germany?

### Acceptance Criteria

- User can choose banking goal: everyday account, salary account, blocked account, student account, unsure.
- App explains online bank vs traditional bank trade-offs.
- App shows an eligibility checklist before user attempts signup.
- App provides provider-neutral comparison criteria.
- App allows user to mark account as opened, verification pending, or verification failed.
- App suggests fallback steps if online verification fails.

---

## 7. Personalized Roadmap Logic

### 7.1 Key User Inputs

- City.
- Nationality group: EU/EEA or non-EU.
- Current status: student, employee, job seeker, freelancer, family member.
- Arrival date.
- Move-in date.
- Visa/residence expiry date.
- Has German phone number?
- Has German or EU bank account?
- Has health insurance?
- Has Anmeldung?
- Has Tax ID?
- Needs residence permit?
- Needs blocked account?

### 7.2 Roadmap Sequencing Rules

#### New Arrival Without German Phone or Bank Account

1. Mobile SIM Registration.
2. Banking Setup.
3. Health Insurance Onboarding.
4. Anmeldung.
5. Tax ID tracking.
6. Residence Permit preparation.
7. ELSTER setup if relevant.

#### New Arrival With Employer Start Date Soon

1. Banking Setup.
2. Health Insurance Onboarding.
3. Anmeldung.
4. Tax ID tracking.
5. Residence Permit preparation.
6. Mobile SIM if not done.
7. ELSTER setup later.

#### New International Student

1. Mobile SIM Registration.
2. Health Insurance Onboarding.
3. Banking Setup or blocked account verification.
4. Anmeldung.
5. Residence Permit preparation.
6. Tax ID tracking.
7. ELSTER if working or filing taxes.

#### User Moving Within Germany

1. Anmeldung update.
2. Update bank address.
3. Update health insurance address.
4. Update mobile provider address.
5. Update residence permit authority if applicable.
6. Tax/ELSTER address awareness.

---

## 8. Functional Requirements

### 8.1 User Profile and Personalization

| ID | Requirement | Priority |
|---|---|---|
| FR-001 | User can select city in Germany | Must-have |
| FR-002 | User can select nationality group: EU/EEA or non-EU | Must-have |
| FR-003 | User can select status: student, employee, job seeker, freelancer, family member | Must-have |
| FR-004 | User can enter move-in date | Must-have |
| FR-005 | User can enter visa/residence expiry date | Must-have |
| FR-006 | User can indicate whether they have German phone number | Must-have |
| FR-007 | User can indicate whether they have a German/EU bank account | Must-have |
| FR-008 | User can indicate whether they have health insurance | Must-have |
| FR-009 | App generates personalized roadmap | Must-have |
| FR-010 | User can edit profile inputs | Should-have |

### 8.2 Workflow Cards

| ID | Requirement | Priority |
|---|---|---|
| FR-011 | App displays six MVP workflow cards | Must-have |
| FR-012 | Each workflow card shows status: Not started, In progress, Blocked, Ready, Completed | Must-have |
| FR-013 | Each workflow includes steps and checklist items | Must-have |
| FR-014 | User can mark checklist items complete | Must-have |
| FR-015 | App shows city-specific or provider-specific warnings where relevant | Must-have |
| FR-016 | App shows official/trusted source links where available | Must-have |
| FR-017 | App shows last-reviewed date for guidance content | Should-have |

### 8.3 Notifications and Reminders

| ID | Requirement | Priority |
|---|---|---|
| FR-018 | User can set reminders for appointments and deadlines | Must-have |
| FR-019 | App sends email reminders | Should-have |
| FR-020 | User can disable reminders | Must-have |
| FR-021 | App sends push reminders | Later |

### 8.4 Content Management

| ID | Requirement | Priority |
|---|---|---|
| FR-022 | Admin can update workflow content without code deployment | Must-have |
| FR-023 | Admin can attach source links to workflow steps | Must-have |
| FR-024 | Admin can flag content as city-specific, Germany-wide, provider-specific, or general | Must-have |
| FR-025 | Admin can mark content as needing review | Should-have |
| FR-026 | Admin can add provider-neutral comparison criteria | Should-have |

### 8.5 Mobile SIM Registration Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-027 | User can select SIM preference: prepaid, eSIM, contract, unsure | Must-have |
| FR-028 | App explains identity verification methods | Must-have |
| FR-029 | App provides SIM activation checklist | Must-have |
| FR-030 | App allows user to track verification status | Must-have |
| FR-031 | App provides fallback steps if verification fails | Should-have |

### 8.6 Banking Setup Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-032 | User can select banking goal | Must-have |
| FR-033 | App recommends online/mobile banking as first-step path where eligible | Must-have |
| FR-034 | App explains online bank vs traditional bank trade-offs | Must-have |
| FR-035 | App provides bank account eligibility checklist | Must-have |
| FR-036 | App provides provider-neutral comparison criteria | Must-have |
| FR-037 | App explains IBAN, SEPA, direct debit, Girocard, debit card, and virtual card | Must-have |
| FR-038 | App provides fallback steps if online verification fails | Should-have |

---

## 9. Information Architecture

### 9.1 Main Navigation

1. Dashboard
2. My Roadmap
3. Workflows
4. Glossary
5. Resources
6. Profile

### 9.2 Dashboard Sections

- Next urgent task.
- Setup progress percentage.
- Upcoming deadlines.
- Missing documents.
- Verification blockers.
- Saved official/provider links.
- Recently completed steps.

### 9.3 Workflow Page Structure

Each workflow page includes:

1. Plain-language overview.
2. Who needs this?
3. When to do it.
4. Documents or information needed.
5. Step-by-step process.
6. Common mistakes.
7. Official/trusted links.
8. Checklist.
9. Reminder setup.
10. Last-reviewed date.

---

## 10. UX Requirements

### 10.1 Design Principles

1. **Calm, not bureaucratic:** The interface should reduce anxiety.
2. **Step-by-step:** Users should never see too much information at once.
3. **Plain language:** Use simple explanations for German administrative and financial terms.
4. **Progressive disclosure:** Show advanced details only when needed.
5. **Trust-first:** Show sources, disclaimers, and last-updated dates.
6. **Mobile-first:** Users may access guidance while commuting, moving, or preparing for appointments.
7. **Provider-neutral:** For banking, insurance, and SIM topics, focus on decision criteria rather than biased recommendations.

### 10.2 Key Screens

1. Landing page.
2. Onboarding questionnaire.
3. Personalized roadmap.
4. Dashboard.
5. Workflow detail page.
6. Checklist page.
7. Reminder setup page.
8. Glossary page.
9. Resource comparison page.
10. Profile/settings page.

### 10.3 Content Tone

Tone should be:

- Clear.
- Reassuring.
- Direct.
- Non-judgmental.
- Practical.

Example:

Instead of: “You are legally obliged to ensure compliance with the applicable registration procedure.”

Use: “Register your address soon after moving in. Your Anmeldung is often needed later for your Tax ID, residence permit, bank account, and other services.”

---

## 11. Data Model: MVP

### 11.1 User

- user_id
- email
- preferred_language
- city
- nationality_group
- current_status
- arrival_date
- move_in_date
- visa_expiry_date
- has_german_phone
- has_bank_account
- has_health_insurance
- has_anmeldung
- has_tax_id
- needs_residence_permit
- needs_blocked_account
- created_at
- updated_at

### 11.2 Workflow

- workflow_id
- workflow_name
- workflow_category
- general_description
- city_specific_available
- provider_specific_considerations
- last_reviewed_at

### 11.3 UserWorkflow

- user_workflow_id
- user_id
- workflow_id
- status
- progress_percentage
- due_date
- completed_at

### 11.4 ChecklistItem

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

### 11.5 UserChecklistItem

- user_id
- checklist_item_id
- status
- completed_at
- notes

### 11.6 Reminder

- reminder_id
- user_id
- workflow_id
- reminder_type
- reminder_date
- channel
- status

### 11.7 GlossaryTerm

- term_id
- german_term
- english_explanation
- category
- related_workflow
- source_url

---

## 12. Content Strategy

### 12.1 MVP Cities

Recommended MVP city coverage:

1. Berlin
2. Munich
3. Hamburg
4. Cologne
5. Frankfurt

### 12.2 Content Layers

1. General Germany-wide explanation.
2. City-specific instructions.
3. User-status-specific checklist.
4. Provider-neutral decision criteria.
5. Official/trusted source links.
6. Common mistakes and warnings.

### 12.3 Content Governance

- Every workflow must have a last-reviewed date.
- Residence permit, banking, insurance, and SIM guidance should be reviewed frequently because requirements and provider processes may change.
- Each high-risk checklist item should include an official or trusted source link.
- The product should clearly state when requirements vary by provider, city, user status, or authority.

---

## 13. Legal, Compliance, and Risk Notes

### 13.1 Legal Disclaimer

BüroAssist provides general administrative and settlement guidance. It does not provide legal, tax, immigration, financial, banking, or insurance advice. Users should verify final requirements with the relevant authority, qualified professional, bank, provider, or official institution.

### 13.2 Risk Areas

| Risk | Impact | Mitigation |
|---|---:|---|
| Outdated official requirements | High | Source links, review dates, content governance |
| User treats guidance as legal advice | High | Clear disclaimers and careful wording |
| User treats banking guidance as financial advice | High | Provider-neutral criteria and no investment/credit advice |
| Sensitive personal data exposure | High | Data minimization and no document storage in MVP |
| Wrong city-specific instructions | Medium | City-based content model and verification |
| Provider requirements change | Medium | Last-reviewed labels and user feedback loop |
| Scope creep | High | Limit MVP to six workflows and selected cities |
| Low trust | High | Transparent sources, plain language, and feedback reporting |

---

## 14. Success Metrics

### 14.1 Activation Metrics

- Percentage of users completing onboarding.
- Percentage of users generating a personalized roadmap.
- Percentage of users starting at least one workflow.

### 14.2 Engagement Metrics

- Average number of checklist items completed per user.
- Number of workflows started per user.
- Reminder setup rate.
- Return visits within 7 days.
- Glossary usage rate.

### 14.3 Outcome Metrics

- Percentage of users who report completing Anmeldung.
- Percentage of users who report opening a bank account.
- Percentage of users who report activating a German SIM/eSIM.
- Percentage of users who obtain health insurance proof.
- Percentage of users who receive or recover Tax ID.
- Percentage of users who complete ELSTER registration.
- Percentage of users who submit residence permit application.

### 14.4 Trust Metrics

- User confidence rating before and after workflow.
- Content helpfulness rating.
- Reported error rate.
- Source link click-through rate.
- Provider verification failure reports.

### 14.5 Business Metrics

- Free-to-premium conversion rate.
- Waitlist signups.
- Referral rate.
- B2B partner leads.
- Cost per acquired user.

---

## 15. Monetization Strategy

### 15.1 Free Tier

- Basic roadmap.
- General workflow guides.
- Basic checklist.
- Glossary.
- Official links.
- Provider-neutral setup guidance.

### 15.2 Premium Tier

Potential price: €5–€10/month.

Premium features:

- Personalized deadline reminders.
- PDF checklist export.
- AI official letter explainer.
- Appointment availability alerts.
- Document readiness scoring.
- Multi-city move support.
- Provider verification troubleshooting guides.

### 15.3 B2B Opportunities

- Universities supporting international students.
- Employers onboarding international employees.
- Relocation agencies.
- International student platforms.
- Insurance onboarding partners.
- Immigration advisory firms.
- Coworking and startup communities.

---

## 16. MVP Release Plan

### Phase 1: Discovery and Prototype

- Interview 20–30 internationals in Germany.
- Validate the expanded six-workflow roadmap.
- Identify which workflows create the strongest “aha” moment.
- Test clickable prototype.
- Validate willingness to pay.

### Phase 2: No-Code / Low-Code MVP

- Build landing page.
- Build onboarding questionnaire.
- Build static but personalized roadmap.
- Build checklist tracker.
- Add email capture and feedback form.
- Include Berlin-first content.

### Phase 3: Functional MVP

- User accounts.
- Persistent dashboard.
- Checklist completion state.
- Reminder system.
- CMS-backed content.
- City-specific resource links.
- Provider-neutral banking/SIM criteria.

### Phase 4: Premium Experiments

- AI letter explainer.
- Appointment alerts.
- PDF export.
- Document readiness checker.
- Provider verification troubleshooting assistant.

---

## 17. Recommended MVP Feature Prioritization

### Must-Have

1. Onboarding questionnaire.
2. Personalized roadmap.
3. Six workflow guides.
4. Checklist tracking.
5. Deadline and task reminders.
6. City-specific official links.
7. Provider-neutral banking and SIM guidance.
8. Glossary.
9. Clear disclaimer.

### Should-Have

1. PDF checklist export.
2. Email reminders.
3. User notes per task.
4. Content last-updated label.
5. Feedback button on each workflow.
6. Verification troubleshooting tips.

### Could-Have

1. AI letter explainer.
2. Appointment slot monitoring.
3. Document upload/readiness checker.
4. Provider comparison marketplace.
5. Community Q&A.
6. Partner referral flow.

### Won’t-Have for MVP

1. Full application submission.
2. Legal/tax/financial/insurance consultation.
3. Complex tax filing.
4. Multi-language support beyond English.
5. Secure document vault.
6. Direct bank account or SIM registration inside BüroAssist.

---

## 18. Open Questions

1. Should the MVP be Berlin-only at launch or cover five cities with less depth?
2. Should the first target persona be students, skilled workers, or all internationals?
3. Should appointment monitoring be included in MVP or reserved as a premium feature?
4. Should BüroAssist partner with banks, SIM providers, or insurance providers from the start, or remain fully neutral at launch?
5. How can BüroAssist recommend online banking as a first step without creating perceived financial advice risk?
6. How much personalization can be delivered safely without collecting sensitive personal data?
7. What content review cadence is realistic for a solo founder or small team?

---

## 19. Recommended MVP Strategy

The strongest MVP path is to launch BüroAssist as a **Berlin-first settlement and bureaucracy roadmap for internationals**, covering six essential workflows: Mobile SIM Registration, Banking Setup, Health Insurance, Anmeldung, Residence Permit, and Tax ID + ELSTER.

The onboarding should ask only a few high-impact questions, then generate a clear task sequence. The first version should avoid complex AI features and focus on workflow clarity, checklists, reminders, and trustworthy source-backed content. Once users trust the roadmap, BüroAssist can add AI-powered letter explanation, appointment monitoring, document readiness checks, and expert referral features as premium layers.

---

## 20. Elevator Pitch

**BüroAssist is a digital settlement and bureaucracy companion for internationals in Germany. It turns confusing first-month tasks like SIM activation, banking setup, health insurance, Anmeldung, residence permits, Tax ID, and ELSTER into a personalized step-by-step roadmap with checklists, reminders, glossary explanations, and trusted links.**

---

## 21. Tagline Options

1. Settle in Germany, one step at a time.
2. German paperwork, simplified.
3. Your guide through German bureaucracy.
4. From SIM card to Anmeldung to ELSTER.
5. Know what to do next in Germany.
6. Less stress for your first months in Germany.

---

## 22. Reference Sources for Content Validation

The MVP content should be validated and regularly reviewed against official or provider-owned sources, including:

- Local city portals for Anmeldung and residence permit information.
- German tax authority and ELSTER resources.
- DAAD and public health insurance resources for student insurance guidance.
- BaFin and provider resources for online identity verification and banking setup.
- Mobile provider resources for SIM registration and activation requirements.

