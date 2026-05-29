# design-system.md — BüroAssist Agent Rules

## Purpose

This file defines the design-system rules for BüroAssist. Apply these rules when generating UI, editing components, writing interface copy, creating prototypes, or reviewing product screens.

BüroAssist should feel calm, warm, minimal, trustworthy, and practical. The design direction is inspired by Claude-style product design: text-first, spacious, restrained, soft, and focused on reducing cognitive load.

---

## Product Design North Star

BüroAssist is not a flashy productivity app. It is a calm guide through stressful German bureaucracy.

The interface should make users feel:

- “I know what to do next.”
- “This is manageable.”
- “I can trust this guidance.”
- “I am not being judged for not knowing the system.”

Design for reassurance, not excitement.

---

## Core Design Principles

### 1. Calm over clever

Avoid visual noise, novelty UI, excessive animation, and dense layouts. Users often arrive stressed, confused, or under deadline pressure.

### 2. Text-first clarity

BüroAssist is a guidance product. Typography, hierarchy, and plain-language content are more important than decorative UI.

### 3. Progressive disclosure

Show the next useful step first. Hide complex details behind expandable sections, tooltips, or “Learn more” blocks.

### 4. Trust through transparency

Show source links, last-reviewed dates, disclaimers, and uncertainty states where relevant.

### 5. Mobile-first

Most users may use BüroAssist while commuting, preparing for an appointment, or checking documents on the go.

### 6. Accessible by default

Design for users with different language levels, stress levels, visual needs, and device conditions.

---

## Visual Personality

BüroAssist should feel:

- Warm
- Human
- Minimal
- Structured
- Reliable
- Non-bureaucratic
- Slightly editorial

BüroAssist should not feel:

- Corporate cold
- Governmental and intimidating
- Neon startup-like
- Overly playful
- Legally authoritative
- Financial-advisory aggressive

---

## Color System

Use a warm neutral foundation with restrained accents.

### Recommended palette

```txt
Background:        #F8F5EF  warm ivory
Surface:           #FFFFFF  white
Surface Soft:      #F1ECE3  soft beige
Text Primary:      #2F2A24  warm charcoal
Text Secondary:    #6F665B  muted brown-gray
Text Muted:        #9A9085  soft gray-brown
Border:            #E4DCCF  warm border
Accent Primary:    #B46A3C  terracotta
Accent Soft:       #EFE0D3  soft terracotta wash
Success:           #4F7A5A  calm green
Warning:           #A56A28  muted amber
Error:             #B5534B  soft red
Info:              #536F8C  muted blue
```

### Usage rules

- Use warm ivory or near-white as the dominant background.
- Use terracotta sparingly for primary actions and key highlights.
- Use muted warning and error colors; avoid alarming bright red unless there is a true urgent risk.
- Do not use saturated gradients in the MVP interface.
- Do not rely on color alone to communicate status.

---

## Typography

### Style

Use a clean, readable sans-serif with a slightly warm or editorial feel.

Recommended options:

- Inter
- Geist
- Source Sans 3
- IBM Plex Sans
- system font stack if speed is preferred

### Type scale

```txt
Display:    40–48px / 1.05 line-height
H1:         32–36px / 1.1
H2:         24–28px / 1.2
H3:         20–22px / 1.3
Body:       16px / 1.6
Small:      14px / 1.5
Caption:    12–13px / 1.4
```

### Typography rules

- Body text should be easy to scan.
- Avoid long paragraphs on mobile.
- Use sentence case for headings and buttons.
- Avoid all-caps except for small labels where truly useful.
- Keep line length comfortable on desktop, ideally 60–75 characters for content-heavy pages.

---

## Spacing and Layout

### Spacing scale

Use consistent spacing:

```txt
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
```

### Layout rules

- Mobile screens should use a single-column layout.
- Desktop can use two columns for dashboard and detail pages.
- Keep important actions near the content they affect.
- Use cards for workflow summaries, checklist groups, reminders, and source blocks.
- Avoid dense dashboards with too many widgets.

### Page width

Recommended max widths:

```txt
Content pages:       720–820px
Dashboard content:   960–1120px
Full app shell:      1200px max
```

---

## Border Radius and Elevation

### Radius

```txt
Small:   8px
Medium:  12px
Large:   16px
XL:      20px
2XL:     24px
```

### Elevation

Use soft shadows sparingly.

Good:

- Thin borders
- Subtle shadow on cards
- Soft background contrast

Avoid:

- Heavy drop shadows
- Floating glassmorphism panels
- High-contrast dark outlines

---

## Iconography

Use simple line icons.

Recommended icon style:

- 1.5–2px stroke
- Rounded stroke caps
- Minimal detail
- Consistent sizing

Recommended icon library:

- Lucide React

Icon rules:

- Icons should support meaning, not replace labels.
- All icon-only buttons must include accessible labels.
- Avoid decorative icon overload.

---

## Components

### 1. Workflow Card

Used for Anmeldung, Residence Permit, Health Insurance, Tax ID + ELSTER, Mobile SIM, and Banking Setup.

Required elements:

- Workflow title
- Plain-language summary
- Status badge
- Progress indicator
- Next recommended action
- Last-reviewed label where source-backed guidance appears
- Primary action button

States:

- Not started
- In progress
- Ready
- Completed
- Needs attention

Design rules:

- Use generous padding.
- Keep summaries short.
- Do not show every checklist item on the card.
- Use calm status colors.

---

### 2. Checklist Item

Required elements:

- Checkbox
- Item title
- Short explanation
- Optional required/optional badge
- Optional source link
- Optional note field

Rules:

- Completed items should remain readable.
- Do not hide completed items by default.
- Use supportive microcopy for uncertain items.

Example:

> “May be required depending on your city or status.”

---

### 3. Roadmap Step

Roadmap steps show sequence and dependency.

Required elements:

- Step number or timeline marker
- Task title
- Why this step matters
- Status
- Due date or suggested timing where available

Rules:

- Explain dependencies clearly.
- Mark urgent items with calm urgency, not panic.
- Allow users to jump into a workflow from the roadmap.

---

### 4. Source Block

Use source blocks for official links and reviewed guidance.

Required elements:

- Source title
- Source type: official authority, provider, government portal, trusted guide
- Last reviewed date
- External link indicator

Rules:

- Source blocks should be visibly trustworthy but not visually dominant.
- External links should open safely and clearly.
- Do not bury sources in footnotes only.

---

### 5. Disclaimer Block

Use for legal, tax, immigration, insurance, banking, and provider guidance.

Tone:

- Clear
- Calm
- Non-defensive

Example:

> “BüroAssist provides general guidance, not legal, tax, immigration, insurance, or financial advice. Always confirm final requirements with the responsible authority or provider.”

Rules:

- Use at points of risk, not only in terms and conditions.
- Do not make disclaimers visually alarming unless required.

---

### 6. Reminder Card

Required elements:

- Reminder title
- Workflow association
- Date
- Channel
- Edit action
- Disable/delete action

Rules:

- Dates must be unambiguous.
- Use Europe/Berlin timezone assumptions unless changed.
- Confirm when a reminder is saved.

---

### 7. Glossary Term

Used for German bureaucracy words.

Required elements:

- German term
- Simple English explanation
- Related workflow
- Optional example usage

Examples:

- Anmeldung
- Ausländerbehörde
- Wohnungsgeberbestätigung
- Steueridentifikationsnummer
- ELSTER
- Gesetzliche Krankenversicherung

---

## Button System

### Primary button

Use for the main next action.

Examples:

- Start roadmap
- Continue checklist
- Save reminder
- View next step

### Secondary button

Use for supportive actions.

Examples:

- Learn more
- View official source
- Edit profile

### Tertiary / ghost button

Use for low-emphasis actions.

Examples:

- Skip for now
- Clear selection
- Cancel

Rules:

- Avoid more than one primary button in the same section.
- Button labels should be action-oriented.
- Avoid vague labels like “Submit” when a clearer action is possible.

---

## Status Language

Use calm, specific status labels.

Recommended labels:

```txt
Not started
In progress
Ready to prepare
Ready for appointment
Waiting for response
Needs attention
Completed
```

Avoid labels such as:

```txt
Failed
Invalid
Rejected
Critical
Illegal
```

unless they accurately reflect a user-confirmed state and are handled carefully.

---

## Empty States

Empty states should guide users to the next action.

Good example:

> “No reminders yet. Add one for your appointment or deadline so you do not have to keep it in your head.”

Rules:

- Explain why the area is empty.
- Provide one clear next action.
- Avoid making the user feel behind.

---

## Error States

Error states should be calm and useful.

Good example:

> “We could not load your roadmap. Please refresh the page or try again in a moment.”

Avoid:

> “Something went wrong.”

Rules:

- Give a recovery path.
- Do not expose technical details.
- Do not blame the user.

---

## Loading States

Use lightweight skeletons or soft loading indicators.

Rules:

- Avoid aggressive spinners for content-heavy pages.
- Preserve layout stability.
- Show loading text where the user may be anxious.

Example:

> “Preparing your roadmap…”

---

## UX Patterns by Page

### Landing Page

Goal: build trust quickly.

Sections:

1. Simple hero statement
2. Supported workflows
3. How it works
4. Trust and disclaimer
5. Call to action

Tone:

- Practical
- Reassuring
- Not sales-heavy

---

### Onboarding

Goal: collect only necessary information.

Rules:

- Ask one topic per step.
- Explain why sensitive-adjacent data is requested.
- Allow users to skip nonessential questions.
- Show progress but keep it lightweight.

Recommended steps:

1. Situation
2. City
3. Status
4. Nationality group
5. Key dates
6. Roadmap preview

---

### Dashboard

Goal: show what to do next.

Priority order:

1. Next urgent action
2. Workflow progress
3. Upcoming reminders
4. Missing documents
5. Useful sources

Avoid dashboard clutter.

---

### Workflow Detail Page

Goal: help users understand and complete one process.

Structure:

1. Overview
2. Who needs this
3. When to do it
4. Checklist
5. Step-by-step guidance
6. Common mistakes
7. Official links
8. Reminder setup

---

## Content Design Rules

### Voice

BüroAssist voice should be:

- Clear
- Reassuring
- Direct
- Non-judgmental
- Practical

### Writing rules

- Use simple English.
- Explain German terms immediately.
- Prefer “may” and “often” where requirements vary.
- Avoid pretending city-specific rules are universal.
- Use short paragraphs and scannable sections.

### Example transformation

Avoid:

> “Applicants are obligated to present valid documentary evidence in accordance with municipal registration requirements.”

Use:

> “Bring a valid passport or ID and your landlord confirmation. Some cities may ask for additional documents.”

---

## Accessibility Rules

Design must support WCAG 2.1 AA as a target.

Rules:

- Minimum body text size: 16px.
- Maintain strong contrast between text and background.
- Use visible focus states.
- Do not rely on color only for status.
- All form inputs need labels.
- Use clear error messages.
- Support keyboard navigation.
- Avoid motion that cannot be reduced.

---

## Responsive Rules

### Mobile

- Single-column layouts
- Sticky bottom action only when genuinely helpful
- Large tap targets
- Minimal nested navigation
- Checklists optimized for thumb use

### Tablet/Desktop

- Use two-column layouts for dashboard and workflow detail where useful
- Keep reading columns narrow
- Use side panels for related sources, reminders, or glossary terms

---

## Animation Rules

Use motion sparingly.

Allowed:

- Subtle fade-in for cards
- Gentle expansion for accordions
- Smooth progress updates
- Light success confirmation

Avoid:

- Bouncy animations
- Confetti for serious bureaucracy tasks
- Long transitions
- Motion that distracts from reading

Respect reduced-motion preferences.

---

## AI Feature Design Rules

If AI explanation features are added later:

- Clearly label AI-generated explanations.
- Show source text or extracted fields for review.
- Allow users to correct outputs.
- Avoid legal conclusions.
- Include a disclaimer near the AI result.
- Do not store uploaded documents by default.

AI should sound like a careful assistant, not an authority.

---

## Provider and Marketplace Design Rules

For banking, SIM, insurance, or future partner/provider flows:

- Remain neutral unless there is a transparent partnership label.
- Clearly separate examples from recommendations.
- Avoid “best for you” claims.
- Use comparison criteria instead of rankings where possible.

Example criteria:

- English app support
- Online signup
- ID verification method
- Monthly cost
- Physical card availability
- Customer support language

---

## Design QA Checklist

Before approving a screen, verify:

- The next action is obvious.
- The screen does not overwhelm the user.
- Copy is simple and non-judgmental.
- Risky guidance includes source/disclaimer context.
- UI works on mobile.
- Color is not the only status indicator.
- Error and empty states are helpful.
- Buttons use clear action labels.
- Layout feels calm and spacious.
- The design does not imply legal, tax, insurance, immigration, or financial advice.

---

## Agent Behavior Rules

When acting as a design or UI agent for BüroAssist:

1. Preserve a warm, minimal, Claude-inspired design language.
2. Prioritize comprehension over decoration.
3. Use cards, checklists, timelines, and source blocks consistently.
4. Avoid dense tables on mobile unless absolutely necessary.
5. Do not introduce aggressive colors, gamification, or distracting animation.
6. Always design for trust, uncertainty, and user stress.
7. Keep provider-related UI neutral and transparent.
