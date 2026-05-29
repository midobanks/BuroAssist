# Skill: Resend Email API for BüroAssist

## Purpose

Use this skill when sending transactional emails, reminder emails, onboarding emails, or product notifications for BüroAssist.

Resend is the recommended MVP email API because it is developer-friendly, supports transactional email workflows, and integrates cleanly with serverless backends.

## When to use this skill

Use this skill for:

- Account-related emails if not fully handled by Supabase Auth.
- Checklist reminder emails.
- Visa/residence deadline reminder emails.
- Anmeldung appointment preparation reminders.
- ELSTER activation reminder emails.
- Weekly progress nudges.
- Feedback request emails.

Do not use this skill for:

- Marketing blasts without consent.
- Sending sensitive documents.
- Emailing passport numbers, Tax IDs, ELSTER details, residence permit numbers, or bank details.
- Legal/tax/immigration advice.

## Required sending pattern

All Resend calls must be made server-side through Supabase Edge Functions or another backend function.

Never call Resend directly from the browser.

## Environment variables

```bash
RESEND_API_KEY=
EMAIL_FROM="BüroAssist <hello@yourdomain.com>"
APP_BASE_URL=
```

Rules:

- Use a verified sending domain before production.
- Use restricted API keys where possible.
- Do not expose `RESEND_API_KEY` in frontend code.

## Required email types

### `welcome_email`

Trigger:

- After account creation or after first roadmap generation.

Purpose:

- Confirm account setup.
- Direct user to dashboard.
- Set calm tone.

### `deadline_reminder`

Trigger:

- Configured reminder date for residence permit, Anmeldung, or other deadline.

Purpose:

- Remind user about an upcoming deadline.
- Link back to the relevant workflow checklist.

### `appointment_prep_reminder`

Trigger:

- Before a saved appointment date.

Purpose:

- Encourage user to check required documents.

### `elster_activation_reminder`

Trigger:

- User marks ELSTER registration started but not completed.

Purpose:

- Remind user to complete activation after receiving email/post activation data.

### `weekly_progress_nudge`

Trigger:

- Optional weekly reminder for users who opted in.

Purpose:

- Encourage completion of next unfinished task.

## Email copy rules

Emails must be:

- Short.
- Calm.
- Plain-language.
- Action-oriented.
- Linked to the relevant dashboard or workflow.
- Non-alarming unless the deadline is urgent.

Avoid:

- Fear-based copy.
- Legal conclusions.
- Definitive promises about government outcomes.
- Sensitive data in subject lines.

## Example subject lines

Good:

- `Your Anmeldung checklist is ready`
- `Reminder: prepare your residence permit documents`
- `Your next BüroAssist task is waiting`

Avoid:

- `Your visa will expire and you may be in trouble`
- `Legal warning about your residence status`
- `Your Tax ID 12 345 678 901`

## Email payload pattern

```ts
await resend.emails.send({
  from: process.env.EMAIL_FROM,
  to: user.email,
  subject: 'Reminder: prepare your residence permit documents',
  html: renderTemplate('deadline_reminder', {
    firstName,
    workflowName,
    dashboardUrl,
  }),
});
```

## Reminder dispatch requirements

- Only send to users who opted in to email reminders.
- Check reminder status before sending.
- Mark reminder as `sent` only after successful send.
- Store provider response ID for debugging.
- Retry failed sends with safe limits.
- Do not send duplicate reminders.

## Required database fields for reminder sending

In `reminders`:

- `id`
- `user_id`
- `workflow_id`
- `reminder_type`
- `reminder_date`
- `channel`
- `status`
- `sent_at`
- `provider_message_id`
- `failure_reason`

## Acceptance criteria

A task using this skill is complete when:

- Emails are sent only from backend code.
- Emails use a verified sender domain in production.
- Users can disable reminder emails.
- Duplicate sends are prevented.
- No sensitive identifiers appear in subject lines or body copy.
- Failed sends are logged safely.

## Security and compliance checklist

- [ ] API key stored server-side only.
- [ ] Sending domain verified.
- [ ] User email preference checked.
- [ ] Sensitive data excluded from email.
- [ ] Reminder state updated after send.
- [ ] Unsubscribe or notification-preference path exists for non-essential emails.

## Official documentation

- https://resend.com/docs/api-reference/introduction
- https://resend.com/docs/api-reference/emails/send-email
