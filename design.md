# DESIGN.md — BüroAssist

## 1. Design Direction

BüroAssist should feel like a calm, intelligent bureaucracy companion for internationals in Germany. The product should reduce anxiety, not amplify the feeling of dealing with government paperwork.

The visual direction should be inspired by Claude-style interfaces: warm, minimal, text-first, spacious, card-based, and conversational. Avoid cold corporate SaaS dashboards, aggressive gradients, heavy shadows, dense tables, and overly playful illustrations.

### Product personality

BüroAssist is:

- Calm
- Helpful
- Trustworthy
- Clear
- Warm
- Practical
- Multicultural
- Source-backed
- Non-intimidating

BüroAssist is not:

- Legalistic
- Bureaucratic
- Overly playful
- Over-designed
- Sales-heavy
- Dark-patterned
- Overly AI-branded
- Government-looking

### Core design statement

> BüroAssist turns German bureaucracy into a calm, guided checklist experience.

---

## 2. Brand Feel

### Emotional goal

Users often arrive with stress, uncertainty, and fear of making mistakes. The interface should make them feel:

1. “I know what to do next.”
2. “This is manageable.”
3. “I can trust this guidance.”
4. “I am not alone.”

### Design keywords

- Warm minimalism
- Soft structure
- Clear hierarchy
- Guided progress
- Gentle urgency
- Human language
- Practical reassurance
- Official-source confidence

---

## 3. Visual Style

### Overall aesthetic

Use a warm neutral base with subtle accent colors. The UI should feel closer to a thoughtful productivity tool than a flashy consumer app.

Recommended style:

- Off-white backgrounds
- Soft beige, sand, and warm gray surfaces
- Deep charcoal text
- Muted blue/teal or warm green accent for progress and trust
- Soft amber for attention states
- Muted red only for urgent/high-risk warnings
- Rounded cards
- Thin borders
- Minimal shadows
- Large readable text
- Generous spacing

### Avoid

- Pure white everywhere
- Neon colors
- Heavy blue government-style UI
- Excessive gradients
- Glassmorphism
- Tiny dense text
- Generic purple AI app styling
- Excessive icons
- Stock-photo expat imagery

---

## 4. Color System

### Primary palette

Use CSS variables or design tokens.

```css
:root {
  --background: #F7F3EA;
  --surface: #FFFDF8;
  --surface-muted: #EFE7DA;
  --surface-soft: #F3EDE2;

  --text-primary: #25221D;
  --text-secondary: #5F594F;
  --text-muted: #8A8174;

  --border-subtle: #DDD2C1;
  --border-strong: #C9BCA8;

  --accent-primary: #2F6F68;
  --accent-primary-hover: #285F59;
  --accent-primary-soft: #DDEDEA;

  --accent-secondary: #9B6A3A;
  --accent-secondary-soft: #F0DFCA;

  --success: #2F7D5C;
  --success-soft: #E0F0E7;

  --warning: #B7791F;
  --warning-soft: #FFF1D6;

  --danger: #B94A48;
  --danger-soft: #F8DDDB;

  --info: #3F6C9B;
  --info-soft: #E2ECF6;
}
```

### Color usage rules

- Use `--background` for the app shell.
- Use `--surface` for cards and panels.
- Use `--accent-primary` for primary CTAs, selected states, and progress indicators.
- Use `--warning` for upcoming deadlines or incomplete important steps.
- Use `--danger` only for urgent deadlines, expired visa/residence status, or irreversible actions.
- Never rely only on color to communicate status. Always include text labels and icons.

---

## 5. Typography

### Recommended fonts

Use a readable modern sans-serif with a warm editorial feel.

Preferred stack:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Alternative pairings:

- `Inter` for product UI
- `Source Sans 3` for content-heavy pages
- `IBM Plex Sans` for a slightly more administrative but still friendly tone

Avoid decorative fonts, overly geometric fonts, and narrow condensed type.

### Type scale

```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
```

### Typography rules

- Use large, clear page titles.
- Keep paragraphs short.
- Use plain English.
- Use German terms only when necessary, followed by explanation.
- Prefer sentence case over title case.
- Avoid long legal-style paragraphs.

Example:

```text
Good: Register your address
Avoid: Residential Registration Compliance Requirement
```

---

## 6. Layout Principles

### Mobile-first

BüroAssist should be designed primarily for mobile use because users may need guidance while commuting, preparing for appointments, or standing outside an office.

### Layout rhythm

- Use generous vertical spacing.
- Keep one primary action per screen.
- Use stacked cards on mobile.
- Use two-column layouts only on tablet and desktop.
- Use sticky bottom CTAs for important mobile flows.

### Page width

Recommended max widths:

```css
--content-narrow: 640px;
--content-default: 960px;
--content-wide: 1200px;
```

Use narrow width for forms, workflow steps, and reading pages.
Use wider width for dashboard and roadmap overview.

### Spacing scale

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

Default card padding:

- Mobile: `16px`
- Tablet: `20px`
- Desktop: `24px`

---

## 7. Shape, Borders, and Shadows

### Border radius

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-2xl: 24px;
```

Use:

- Buttons: `12px` or `999px` depending on style
- Cards: `20px`
- Modals: `24px`
- Inputs: `12px`
- Badges: `999px`

### Shadows

Use shadows sparingly. Prefer thin borders and tonal separation.

```css
--shadow-soft: 0 8px 24px rgba(37, 34, 29, 0.06);
--shadow-card: 0 2px 8px rgba(37, 34, 29, 0.04);
--shadow-popover: 0 16px 48px rgba(37, 34, 29, 0.12);
```

Do not use heavy drop shadows.

---

## 8. Interaction Principles

### Interaction feel

- Quiet
- Predictable
- Smooth
- Fast
- Reassuring

### Motion

Use subtle motion only to clarify state changes.

Recommended:

- Fade in cards
- Slide up bottom sheets
- Small progress transitions
- Gentle loading shimmer for content cards

Avoid:

- Bouncy motion
- Confetti
- Excessive page transitions
- Motion on every card

Respect `prefers-reduced-motion`.

### Loading states

Use clear, human loading copy:

```text
Building your roadmap…
Checking what applies to your situation…
Preparing your checklist…
```

Avoid fake precision or legal certainty.

---

## 9. Accessibility Rules

BüroAssist must target WCAG 2.1 AA.

### Required accessibility behavior

- Minimum touch target: `44px × 44px`
- Visible keyboard focus states
- Proper semantic headings
- Form labels always visible
- Error messages tied to inputs
- Do not use placeholder text as the only label
- All icons need text labels or `aria-label`
- Status indicators must include text
- Use sufficient contrast for body text and interactive elements
- Support screen readers for checklists and progress states

### Focus state

```css
:focus-visible {
  outline: 3px solid rgba(47, 111, 104, 0.35);
  outline-offset: 3px;
}
```

---

## 10. Core Screens

### 10.1 Landing Page

Purpose: Explain the value quickly and reduce anxiety.

Required sections:

1. Hero
2. Workflow preview
3. How it works
4. Trust/disclaimer section
5. Target users
6. CTA

Hero copy direction:

```text
German paperwork, simplified.
Get a step-by-step roadmap for Anmeldung, residence permits, health insurance, Tax ID, SIM registration, and banking setup.
```

Primary CTA:

```text
Create my roadmap
```

Secondary CTA:

```text
See supported workflows
```

Design:

- Warm background
- Left-aligned text
- Large headline
- Simple product preview card
- No stock images needed

### 10.2 Onboarding Questionnaire

Purpose: Collect only the minimum information needed to generate a useful roadmap.

Question style:

- One question per step on mobile
- Progress indicator at top
- Short helper text
- Back button always available
- Skip optional questions when possible

Example questions:

1. Where in Germany are you living or moving to?
2. What best describes your current situation?
3. Are you an EU/EEA citizen?
4. When did you move in, or when will you move in?
5. Do you already have health insurance?
6. Do you already have a German bank account?
7. Do you already have a German mobile number?
8. Does your current visa or residence permit have an expiry date?

### 10.3 Personalized Roadmap

Purpose: Show what to do next and in what order.

Roadmap card structure:

- Workflow title
- Short explanation
- Status
- Priority
- Estimated effort
- Required before/after dependencies
- CTA

Example workflow cards:

- Set up mobile SIM
- Open a bank account
- Confirm health insurance
- Register your address
- Get your Tax ID
- Prepare residence permit
- Create ELSTER account

Roadmap ordering should adapt to user context.

For a new arrival:

1. Mobile SIM setup
2. Banking setup
3. Health insurance path
4. Anmeldung
5. Tax ID
6. Residence permit
7. ELSTER

### 10.4 Dashboard

Purpose: Give users a calm control center.

Sections:

1. Next best action
2. Upcoming deadlines
3. Roadmap progress
4. Missing documents
5. Saved official links
6. Recently completed steps

Dashboard should not be overloaded. The “next best action” must be visually dominant.

### 10.5 Workflow Detail Page

Each workflow page should include:

1. Plain-language overview
2. Who needs this
3. When to do it
4. Documents or requirements
5. Step-by-step checklist
6. Common mistakes
7. Official links
8. Last reviewed date
9. Reminder setup

### 10.6 Checklist Page

Checklist items should be clear, tappable, and reassuring.

Item states:

- Not started
- In progress
- Ready
- Completed
- Needs attention

Each item may include:

- Title
- Short description
- Why it matters
- Example document name
- Source link
- Notes field

### 10.7 Glossary

Purpose: Explain German bureaucracy terms in plain English.

Glossary examples:

- Anmeldung
- Bürgeramt
- Ausländerbehörde
- Wohnungsgeberbestätigung
- Steueridentifikationsnummer
- Steuernummer
- ELSTER
- Krankenkasse
- Aufenthaltstitel
- eAT

Design as searchable cards, not a long dictionary page.

---

## 11. Component System

### 11.1 Buttons

#### Primary button

Use for the main action on a screen.

```css
.button-primary {
  background: var(--accent-primary);
  color: white;
  border-radius: 12px;
  min-height: 44px;
  padding: 0 18px;
  font-weight: 600;
}
```

Labels:

- Create my roadmap
- Continue
- Save reminder
- Mark as complete
- Start checklist

#### Secondary button

Use for supporting actions.

```css
.button-secondary {
  background: var(--surface);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  min-height: 44px;
}
```

#### Destructive button

Use only for irreversible actions.

```css
.button-danger {
  background: var(--danger);
  color: white;
}
```

### 11.2 Cards

Cards are the primary UI container.

Card types:

- Workflow card
- Deadline card
- Checklist card
- Source card
- Explanation card
- Warning card
- Glossary card

Default card:

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  padding: 20px;
  box-shadow: var(--shadow-card);
}
```

### 11.3 Workflow Card

Required elements:

- Icon or small symbol
- Workflow title
- One-sentence summary
- Status badge
- Progress indicator
- CTA

Example:

```text
Anmeldung
Register your address so your official letters and Tax ID can reach you.
Status: In progress
3 of 6 steps ready
Continue
```

### 11.4 Status Badges

Badge labels:

- Not started
- In progress
- Ready
- Completed
- Needs attention
- Deadline soon
- Source checked

Badge rules:

- Use soft background colors.
- Include readable text.
- Avoid icon-only badges.

### 11.5 Progress Indicators

Use progress bars for workflow completion, not circular charts.

Example:

```text
4 of 7 steps complete
```

A progress bar should always be paired with text.

### 11.6 Forms

Form fields should be calm and direct.

Rules:

- Labels always visible
- Helper text below label
- Error text below input
- Use select/radio cards for major choices
- Avoid long dropdowns where search is better

Example field:

```text
Which city are you moving to?
This helps us show the right office links and local process notes.
```

### 11.7 Alerts

Alert types:

- Info
- Warning
- Urgent
- Success

Example warning:

```text
Deadline soon
Your visa expiry date is in 21 days. Start preparing your residence permit documents now and check your local Ausländerbehörde process.
```

### 11.8 Source Link Component

Every important workflow instruction should support source links.

Source component fields:

- Source title
- Organization or authority name
- Last reviewed date
- External link indicator

Example:

```text
Official source
Berlin Service Portal · Last reviewed: May 2026
Open official page ↗
```

---

## 12. Workflow Design Guidance

### 12.1 Mobile SIM Registration

Design goal: Help users understand why a German mobile number helps with banking, appointments, identity verification, and daily life.

UI emphasis:

- Simple checklist
- ID verification explanation
- Prepaid vs contract comparison
- eSIM availability note
- No affiliate pressure in MVP

Suggested flow:

1. Do you already have a German mobile number?
2. Do you prefer prepaid, contract, or eSIM?
3. Do you have a passport or accepted ID for verification?
4. Show checklist and provider-neutral comparison criteria.

Provider-neutral criteria:

- Monthly cost
- Prepaid vs contract
- eSIM support
- English support
- Network coverage
- EU roaming
- ID verification method

### 12.2 Banking Setup

Design goal: Encourage a practical first step through online banking while remaining provider-neutral.

UI emphasis:

- Online banking first-step path
- Explain why a bank account matters for rent, salary, insurance, deposits, and subscriptions
- Show that traditional banks may be useful later
- Avoid ranking providers unless there is a transparent comparison model

Suggested flow:

1. Do you already have a SEPA-capable account?
2. Do you need an account quickly?
3. Do you have a valid ID and phone number?
4. Show online banking setup checklist.

Provider examples may include:

- N26
- Revolut
- Wise
- bunq
- Vivid

Always frame these as examples, not endorsements.

Comparison criteria:

- Account opening speed
- German IBAN availability
- Accepted ID documents
- English app support
- Card delivery time
- Cash deposit/withdrawal options
- Fees
- Customer support quality
- Suitability for salary/rent payments

### 12.3 Anmeldung

Design goal: Make the process feel concrete and appointment-ready.

UI emphasis:

- “What to bring” checklist
- Landlord confirmation explanation
- Appointment reminder
- City-specific official link
- Tax ID dependency note

### 12.4 Residence Permit

Design goal: Reduce deadline anxiety while avoiding legal-advice framing.

UI emphasis:

- Expiry date warning
- Permit-type selector
- Document readiness score
- Local authority source links
- Clear disclaimer

Never say:

```text
You are eligible for this permit.
```

Say:

```text
This path may apply based on your answers. Check the official requirements before applying.
```

### 12.5 Health Insurance

Design goal: Help users understand the likely path and the proof they need.

UI emphasis:

- Public vs private explanation
- Student/employee/freelancer logic
- Proof checklist
- Provider-neutral decision questions

Do not recommend a specific insurer as the “best” option without transparent criteria.

### 12.6 Tax ID + ELSTER

Design goal: Explain confusing tax terms simply.

UI emphasis:

- Tax ID vs Tax Number vs Social Security Number comparison
- Anmeldung dependency
- Tax ID recovery path
- ELSTER activation timeline

Do not ask users to store tax credentials in the MVP.

---

## 13. Content Style Guide

### Voice

BüroAssist should sound like a calm, knowledgeable friend who understands German bureaucracy but does not overclaim.

### Tone rules

Use:

- “You may need…”
- “In many cases…”
- “Check your city’s official page…”
- “This step usually helps with…”
- “Based on your answers, start here…”

Avoid:

- “You are guaranteed…”
- “You must always…” unless legally certain and sourced
- “This is the best provider…”
- “Don’t worry” as a substitute for clear help
- Fear-based copy

### Copy examples

Good:

```text
Start with a mobile number if you need quick access to banking apps, appointment confirmations, and identity verification.
```

Avoid:

```text
You cannot survive in Germany without a German SIM.
```

Good:

```text
Your Tax ID is usually sent by post after your first address registration. If it does not arrive, you can request it from the Federal Central Tax Office.
```

Avoid:

```text
After Anmeldung, you will automatically receive everything you need.
```

---

## 14. Empty States

Empty states should be useful, not decorative.

### No roadmap yet

```text
Create your roadmap
Answer a few questions and BüroAssist will show which bureaucracy steps apply to your situation.
```

CTA:

```text
Start setup
```

### No deadlines

```text
No deadlines added yet
Add your move-in date or visa expiry date so we can help you plan ahead.
```

### No completed tasks

```text
Your progress will appear here
Mark checklist items as complete as you prepare documents and finish appointments.
```

---

## 15. Error States

Error messages should explain what happened and what the user can do.

Bad:

```text
Invalid input.
```

Good:

```text
Please enter a valid date so we can calculate your reminder.
```

Bad:

```text
Something went wrong.
```

Good:

```text
We could not save your checklist update. Check your connection and try again.
```

---

## 16. Trust and Compliance UI

### Disclaimer pattern

Use short contextual disclaimers, not scary legal blocks.

Example:

```text
BüroAssist provides general administrative guidance, not legal, tax, or insurance advice. Always check the official authority page before submitting documents.
```

### Source visibility

Every workflow should show:

- Official source links
- Last reviewed date
- City-specific warning where relevant

### Sensitive data pattern

When asking for dates or status, explain why.

Example:

```text
Why we ask: Your visa expiry date helps us show reminders. We do not need your permit number.
```

---

## 17. Navigation

### Mobile navigation

Use bottom navigation with 4–5 items max:

1. Home
2. Roadmap
3. Workflows
4. Glossary
5. Profile

### Desktop navigation

Use left sidebar or top navigation:

- Dashboard
- Roadmap
- Workflows
- Resources
- Glossary
- Profile

### Navigation rules

- Always provide a clear way back to the roadmap.
- Keep workflow progress persistent.
- Do not bury deadlines inside settings.
- Do not make users search for their next action.

---

## 18. Icons and Illustration

### Icon style

Use simple line icons with consistent stroke width.

Recommended icon categories:

- Home/address
- Passport/ID
- Health shield
- Tax document
- Phone/SIM
- Bank/card
- Calendar
- Checklist
- Info/source

### Illustration style

Use sparingly.

If used:

- Soft geometric shapes
- Paper/document motifs
- Small human touches
- Warm neutral palette

Avoid:

- Cartoon bureaucracy clerks
- Stereotypical international imagery
- Overly childish illustrations
- Decorative images that slow the UI

---

## 19. Responsive Behavior

### Mobile

- Single-column layout
- Sticky bottom CTA for forms
- Full-width cards
- Bottom sheets for secondary explanations
- Collapsible content sections

### Tablet

- Two-column dashboard possible
- Roadmap and checklist side-by-side where useful

### Desktop

- Sidebar navigation
- Main content max width
- Dashboard grid
- Right-side panel for deadlines or source links

---

## 20. Example Page Structures

### Dashboard wireframe

```text
[Header]
Good morning, Aisha
You have 2 important tasks this week.

[Next best action card]
Prepare your Anmeldung documents
3 of 5 items ready
[Continue]

[Deadline cards]
- Visa expiry: 28 days left
- Anmeldung reminder: due soon

[Roadmap progress]
SIM setup        Complete
Banking setup    In progress
Health insurance Ready
Anmeldung        In progress
Tax ID           Not started
Residence permit Not started
ELSTER           Later
```

### Workflow page wireframe

```text
[Workflow title]
Register your address

[Short explanation]
Anmeldung is your official address registration. It helps authorities send letters to your registered address and is often needed for later steps.

[Status card]
In progress · 3 of 6 steps ready

[Checklist]
□ Passport or ID
□ Registration form
□ Landlord confirmation
□ Appointment confirmation
□ Marriage/birth certificate if relevant

[Common mistakes]
- Forgetting the landlord confirmation
- Booking the wrong office
- Missing appointment documents

[Official sources]
Berlin Service Portal · Last reviewed May 2026
```

---

## 21. Implementation Guidance for AI/Dev Agents

When generating BüroAssist UI, follow these rules:

1. Build mobile-first.
2. Use warm neutral backgrounds.
3. Use card-based layouts.
4. Keep text clear and practical.
5. Show one primary action per screen.
6. Include visible source and disclaimer patterns.
7. Never overclaim legal, tax, insurance, immigration, banking, or telecom certainty.
8. Do not store sensitive IDs or credentials in UI examples.
9. Use accessible components by default.
10. Include loading, empty, error, and success states.
11. Make deadlines visible but not panic-inducing.
12. Use provider-neutral language for banking, SIM, and insurance.
13. Avoid generic AI gradients and flashy dashboards.
14. Use German terms only with plain-English explanations.
15. Always design around the user’s next best action.

---

## 22. Suggested Tailwind Theme Tokens

```js
const buroAssistTheme = {
  colors: {
    background: "#F7F3EA",
    surface: "#FFFDF8",
    surfaceMuted: "#EFE7DA",
    textPrimary: "#25221D",
    textSecondary: "#5F594F",
    textMuted: "#8A8174",
    borderSubtle: "#DDD2C1",
    borderStrong: "#C9BCA8",
    accent: "#2F6F68",
    accentHover: "#285F59",
    accentSoft: "#DDEDEA",
    warning: "#B7791F",
    warningSoft: "#FFF1D6",
    danger: "#B94A48",
    dangerSoft: "#F8DDDB",
    success: "#2F7D5C",
    successSoft: "#E0F0E7",
  },
  borderRadius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    "2xl": "24px",
  },
  boxShadow: {
    soft: "0 8px 24px rgba(37, 34, 29, 0.06)",
    card: "0 2px 8px rgba(37, 34, 29, 0.04)",
    popover: "0 16px 48px rgba(37, 34, 29, 0.12)",
  },
};
```

---

## 23. Quality Checklist Before Shipping UI

Before shipping any BüroAssist screen, verify:

- The primary action is obvious.
- The user knows what to do next.
- The screen is usable on mobile.
- Text is plain and reassuring.
- No legal or financial overclaim is made.
- Sources are visible where guidance is process-critical.
- Disclaimers are present where needed.
- Forms have labels, helper text, and error states.
- Status is not communicated by color alone.
- Deadlines are clear without being fear-based.
- Provider examples are framed neutrally.
- Sensitive information is not requested unless necessary.
- The UI feels calm, warm, and trustworthy.

---

## 24. Design Summary

BüroAssist should look and feel like a calm paperwork companion: warm, structured, minimal, and trustworthy. The interface should prioritize roadmap clarity, checklist progress, plain-language explanations, official source visibility, and user confidence.

The product’s design should make German bureaucracy feel less like a maze and more like a guided path.
