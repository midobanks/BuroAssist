# Skill: PostHog Analytics for BüroAssist

## Purpose

Use this skill when tracking product analytics, onboarding funnels, workflow engagement, feature usage, and MVP validation metrics for BüroAssist.

PostHog is the recommended MVP analytics tool because it supports product analytics, funnels, feature flags, and event capture in one developer-focused platform.

## When to use this skill

Use this skill for:

- Tracking onboarding completion.
- Tracking roadmap generation.
- Tracking workflow starts.
- Tracking checklist completion.
- Tracking reminder setup.
- Tracking source-link clicks.
- Tracking feedback submissions.
- Measuring activation, engagement, and trust metrics.
- Running feature flags for MVP experiments.

Do not use this skill for:

- Tracking sensitive document contents.
- Capturing passport, Tax ID, residence permit, ELSTER, banking, or ID verification data.
- Recording private notes or official-letter contents.
- Storing unnecessary personally identifiable information.

## Event naming convention

Use lowercase snake_case.

Format:

```text
object_action
```

Examples:

- `onboarding_started`
- `onboarding_completed`
- `roadmap_generated`
- `workflow_started`
- `checklist_item_completed`
- `reminder_created`
- `source_link_clicked`
- `feedback_submitted`
- `glossary_term_viewed`

## Required MVP events

### Activation events

- `landing_page_viewed`
- `onboarding_started`
- `onboarding_step_completed`
- `onboarding_completed`
- `account_created`
- `roadmap_generated`

### Workflow events

- `workflow_viewed`
- `workflow_started`
- `workflow_completed`
- `checklist_item_viewed`
- `checklist_item_completed`
- `official_link_clicked`

### Reminder events

- `reminder_created`
- `reminder_updated`
- `reminder_disabled`
- `reminder_email_sent`
- `reminder_email_failed`

### Trust and quality events

- `content_helpfulness_rated`
- `content_issue_reported`
- `source_link_clicked`
- `confidence_rating_submitted`

## Event property rules

Allowed event properties:

- `workflow_slug`
- `city_slug`
- `status_group`
- `nationality_group`
- `step_number`
- `checklist_item_slug`
- `reminder_type`
- `source_type`
- `content_last_reviewed_at`
- `user_logged_in` boolean

Avoid event properties containing:

- Full names.
- Email addresses.
- Passport numbers.
- Tax IDs.
- Visa/residence permit numbers.
- ELSTER credentials.
- Bank details.
- Document text.
- Free-text user notes.

## Identity rules

- Before login, track anonymous events.
- After login, identify users using the internal `user_id`, not email.
- Do not send unnecessary personal profile data to PostHog.
- Consider EU hosting or privacy settings if available and relevant to GDPR posture.

## Funnel definitions

### Core activation funnel

1. `landing_page_viewed`
2. `onboarding_started`
3. `onboarding_completed`
4. `roadmap_generated`
5. `workflow_started`

### Checklist success funnel

1. `workflow_started`
2. `checklist_item_completed`
3. `reminder_created`
4. `workflow_completed`

### Trust funnel

1. `workflow_viewed`
2. `source_link_clicked`
3. `content_helpfulness_rated`
4. `feedback_submitted`

## Feature flag rules

Use feature flags for:

- New onboarding sequence.
- Berlin-first vs multi-city flow.
- Reminder UX variations.
- PDF export test.
- AI letter explainer beta.

Do not use feature flags to silently change legal-risk guidance without content review.

## Implementation pattern

Frontend:

- Capture UI events.
- Avoid sensitive payloads.
- Use a central analytics wrapper.

Backend:

- Capture reminder dispatch results and server-only lifecycle events.
- Avoid logging sensitive data.

Example wrapper:

```ts
analytics.capture('workflow_started', {
  workflow_slug: 'residence_permit',
  city_slug: 'berlin',
  user_logged_in: true,
});
```

## Acceptance criteria

A task using this skill is complete when:

- Required MVP events are tracked.
- Events follow naming conventions.
- Sensitive data is excluded from event properties.
- Funnels can be built for activation and checklist completion.
- Feature flags are documented.
- Analytics can be disabled or minimized according to privacy requirements.

## Privacy checklist

- [ ] No sensitive identifiers sent.
- [ ] No document text sent.
- [ ] No private notes sent.
- [ ] User identity uses internal ID only.
- [ ] Event properties are allowlisted.
- [ ] Cookie/privacy approach is documented.

## Official documentation

- https://posthog.com/docs
- https://posthog.com/docs/api
- https://posthog.com/docs/product-analytics/installation/api
