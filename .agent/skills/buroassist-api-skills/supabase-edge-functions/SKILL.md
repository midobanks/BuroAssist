# Skill: Supabase Edge Functions for BüroAssist

## Purpose

Use this skill when implementing secure server-side logic that should not run directly in the browser.

Supabase Edge Functions are the recommended MVP backend layer for sensitive operations, scheduled jobs, email dispatch orchestration, webhook handling, and controlled access to third-party APIs.

## When to use this skill

Use this skill for:

- Sending reminder emails through Resend.
- Running scheduled reminder jobs.
- Generating personalized roadmaps server-side.
- Handling future Stripe webhooks.
- Proxying future AI or translation APIs without exposing keys.
- Running admin-only content review utilities.
- Validating authenticated requests before writing sensitive user-owned data.

Do not use this skill for:

- Long-running scraping jobs.
- Storing documents.
- Circumventing government appointment systems.
- Submitting government applications on behalf of users.

## Required implementation pattern

Every protected function must:

1. Read the `Authorization` header.
2. Validate the Supabase JWT.
3. Extract the authenticated user ID.
4. Verify authorization before reading or writing user-owned data.
5. Return structured JSON errors.
6. Avoid leaking stack traces or third-party API secrets.

## Recommended functions

### `generate-roadmap`

Purpose:

- Generate personalized workflow order and checklist recommendations.

Inputs:

- `city_id`
- `nationality_group`
- `current_status`
- `arrival_date`
- `move_in_date`
- `visa_expiry_date`

Output:

- Ordered workflow list.
- Recommended next task.
- Warning messages.
- Due-date suggestions.

Rules:

- Do not present output as legal advice.
- Include source-backed workflow references.
- Use plain-language warnings.

### `dispatch-reminders`

Purpose:

- Find due reminders and send reminder emails through Resend.

Inputs:

- Usually none; runs on schedule.

Output:

- Number of reminders processed.
- Number sent.
- Number skipped.
- Errors logged.

Rules:

- Never send reminders to users who disabled reminders.
- Respect reminder status and user preferences.
- Mark sent reminders as `sent` only after email succeeds.

### `create-reminder`

Purpose:

- Create validated reminder records.

Inputs:

- `workflow_id`
- `reminder_type`
- `reminder_date`
- `channel`

Rules:

- Authenticated user only.
- Reminder date must be valid and not unreasonably far in the past.
- Email channel is MVP default.

### `admin-content-review`

Purpose:

- Admin-only function for marking content as reviewed or stale.

Rules:

- Requires admin role claim or allowlisted admin user.
- Must write an audit log.

## Environment variables

```bash
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
APP_BASE_URL=
```

Rules:

- Third-party keys must only exist in server-side environments.
- Service-role key must be used only when RLS bypass is explicitly required.
- Prefer user-scoped Supabase client where possible.

## Error response format

Use consistent errors:

```json
{
  "error": {
    "code": "unauthorized",
    "message": "Please sign in to continue."
  }
}
```

User-facing messages should be calm and simple.

## Logging rules

Log:

- Function name.
- Request ID.
- User ID when authenticated.
- High-level error code.

Do not log:

- Access tokens.
- API keys.
- Full email content.
- Sensitive user notes.
- Identity, tax, immigration, banking, or document numbers.

## Acceptance criteria

A task using this skill is complete when:

- The function validates authentication when required.
- The function uses server-side environment variables only.
- User-owned data access is authorized.
- Errors are structured and safe.
- Reminder functions update database state correctly.
- Logs do not contain sensitive data.

## Security checklist

- [ ] Authorization header validated.
- [ ] User ID verified against requested resource ownership.
- [ ] No secrets returned to client.
- [ ] No sensitive data logged.
- [ ] Rate limiting considered for public functions.
- [ ] Errors are safe and non-technical.

## Official documentation

- https://supabase.com/docs/guides/functions
- https://supabase.com/docs/reference/javascript/functions-invoke
