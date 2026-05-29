# BüroAssist API Contracts Rules

## Purpose

This file defines the MVP API contracts for BüroAssist. Use these contracts to keep frontend, backend, Supabase functions, validation schemas, and tests aligned.

## API Principles

- Use JSON request and response bodies.
- Validate all inputs on the server.
- Never trust client-provided user IDs; derive the authenticated user from the session.
- Do not expose service-role keys to the browser.
- Return plain-language errors safe for users.
- Do not return sensitive stack traces.
- Use stable workflow slugs.

## Common Types

### Workflow Slug

Allowed values:

```ts
'anmeldung' | 'residence_permit' | 'health_insurance' | 'tax_id_elster' | 'mobile_sim' | 'banking'
```

### User Status

Allowed values:

```ts
'student' | 'employee' | 'skilled_worker' | 'blue_card_candidate' | 'job_seeker' | 'freelancer' | 'family_member' | 'researcher' | 'other' | 'unknown'
```

### Nationality Group

Allowed values:

```ts
'eu_eea' | 'non_eu' | 'unknown'
```

### Checklist Status

Allowed values:

```ts
'not_started' | 'in_progress' | 'completed' | 'blocked' | 'not_applicable'
```

### Reminder Channel

Allowed values:

```ts
'email' | 'in_app'
```

## Error Response Shape

All API routes should return errors in this shape:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please check the highlighted fields and try again."
  }
}
```

Use stable error codes:

- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`
- `VALIDATION_ERROR`
- `RATE_LIMITED`
- `SERVER_ERROR`

## Authentication

All authenticated endpoints require a valid user session.

Never accept `user_id` in request bodies for user-owned resources. The backend must infer the user from the auth session.

## Endpoints

## `GET /api/profile`

Returns the authenticated user profile.

Response:

```json
{
  "profile": {
    "id": "uuid",
    "email": "user@example.com",
    "preferredLanguage": "en",
    "citySlug": "berlin",
    "nationalityGroup": "non_eu",
    "currentStatus": "student",
    "arrivalDate": "2026-06-01",
    "moveInDate": "2026-06-03",
    "visaExpiryDate": "2026-09-01",
    "onboardingCompletedAt": "2026-06-01T10:00:00Z"
  }
}
```

## `PATCH /api/profile`

Updates the authenticated user profile.

Request:

```json
{
  "preferredLanguage": "en",
  "citySlug": "berlin",
  "nationalityGroup": "non_eu",
  "currentStatus": "student",
  "arrivalDate": "2026-06-01",
  "moveInDate": "2026-06-03",
  "visaExpiryDate": "2026-09-01"
}
```

Response:

```json
{
  "profile": {
    "id": "uuid",
    "citySlug": "berlin",
    "nationalityGroup": "non_eu",
    "currentStatus": "student",
    "updatedAt": "2026-06-01T10:00:00Z"
  }
}
```

Validation rules:

- `citySlug` must match a supported city.
- `nationalityGroup` must match allowed enum.
- `currentStatus` must match allowed enum.
- Date fields must be valid ISO dates.

## `POST /api/onboarding/complete`

Completes onboarding and generates the initial roadmap.

Request:

```json
{
  "citySlug": "berlin",
  "nationalityGroup": "non_eu",
  "currentStatus": "student",
  "arrivalDate": "2026-06-01",
  "moveInDate": "2026-06-03",
  "visaExpiryDate": "2026-09-01",
  "priorityNeed": "residence_permit"
}
```

Response:

```json
{
  "profile": {
    "onboardingCompletedAt": "2026-06-01T10:00:00Z"
  },
  "roadmap": {
    "workflows": [
      {
        "slug": "health_insurance",
        "name": "Health Insurance",
        "status": "not_started",
        "order": 1,
        "reason": "You may need proof of health insurance for enrollment or residence permit steps."
      },
      {
        "slug": "anmeldung",
        "name": "Anmeldung",
        "status": "not_started",
        "order": 2,
        "reason": "Address registration often helps trigger your Tax ID and supports other setup tasks."
      }
    ]
  }
}
```

## `POST /api/roadmap/generate`

Generates or refreshes the personalized roadmap.

Request:

```json
{
  "refresh": true
}
```

Response:

```json
{
  "roadmap": {
    "generatedAt": "2026-06-01T10:00:00Z",
    "workflows": [
      {
        "slug": "anmeldung",
        "name": "Anmeldung",
        "status": "in_progress",
        "progressPercentage": 40,
        "order": 1,
        "dueDate": "2026-06-17",
        "warnings": [
          "Requirements and appointment availability may vary by city."
        ]
      }
    ]
  }
}
```

## `GET /api/workflows`

Returns active workflow definitions.

Query params:

- `citySlug` optional
- `status` optional
- `nationalityGroup` optional

Response:

```json
{
  "workflows": [
    {
      "slug": "anmeldung",
      "name": "Anmeldung",
      "shortDescription": "Register your address in Germany.",
      "category": "bureaucracy",
      "defaultOrder": 1,
      "lastReviewedAt": "2026-05-01T00:00:00Z"
    }
  ]
}
```

## `GET /api/workflows/:workflowSlug`

Returns workflow content and personalized checklist where authenticated.

Response:

```json
{
  "workflow": {
    "slug": "anmeldung",
    "name": "Anmeldung",
    "overview": "Anmeldung means registering your address after moving into a home in Germany.",
    "lastReviewedAt": "2026-05-01T00:00:00Z",
    "steps": [
      {
        "id": "uuid",
        "title": "Prepare your landlord confirmation",
        "description": "Ask your landlord for a Wohnungsgeberbestätigung.",
        "order": 1,
        "source": {
          "title": "Official city service page",
          "url": "https://example.gov"
        }
      }
    ],
    "checklistItems": [
      {
        "id": "uuid",
        "title": "Valid passport or ID",
        "description": "Bring a valid identity document.",
        "itemType": "document",
        "priority": "high",
        "status": "not_started"
      }
    ],
    "disclaimer": "This is general administrative guidance, not legal advice. Verify final requirements with the responsible authority."
  }
}
```

## `PATCH /api/checklist-items/:userChecklistItemId`

Updates a user checklist item.

Request:

```json
{
  "status": "completed",
  "notes": "Prepared and saved in folder."
}
```

Response:

```json
{
  "checklistItem": {
    "id": "uuid",
    "status": "completed",
    "completedAt": "2026-06-01T10:00:00Z"
  },
  "workflowProgress": {
    "workflowSlug": "anmeldung",
    "progressPercentage": 50,
    "status": "in_progress"
  }
}
```

Rules:

- User can only update their own checklist state.
- Notes must be length-limited.
- Notes must not be sent to analytics.

## `POST /api/reminders`

Creates a reminder.

Request:

```json
{
  "workflowSlug": "residence_permit",
  "checklistItemId": "uuid",
  "title": "Prepare residence permit documents",
  "description": "Review your checklist before the appointment.",
  "reminderType": "deadline",
  "reminderAt": "2026-08-15T09:00:00Z",
  "channel": "email"
}
```

Response:

```json
{
  "reminder": {
    "id": "uuid",
    "title": "Prepare residence permit documents",
    "status": "scheduled",
    "reminderAt": "2026-08-15T09:00:00Z",
    "channel": "email"
  }
}
```

Validation:

- `reminderAt` must be in the future.
- `channel` must be supported.
- User must own the associated workflow/checklist item.

## `GET /api/reminders`

Returns user reminders.

Response:

```json
{
  "reminders": [
    {
      "id": "uuid",
      "title": "Prepare residence permit documents",
      "workflowSlug": "residence_permit",
      "reminderAt": "2026-08-15T09:00:00Z",
      "channel": "email",
      "status": "scheduled"
    }
  ]
}
```

## `PATCH /api/reminders/:reminderId`

Updates a reminder.

Request:

```json
{
  "title": "Updated reminder title",
  "reminderAt": "2026-08-16T09:00:00Z",
  "status": "scheduled"
}
```

Response:

```json
{
  "reminder": {
    "id": "uuid",
    "title": "Updated reminder title",
    "reminderAt": "2026-08-16T09:00:00Z",
    "status": "scheduled"
  }
}
```

## `DELETE /api/reminders/:reminderId`

Deletes or cancels a reminder.

Response:

```json
{
  "success": true
}
```

## `POST /api/feedback`

Submits product or content feedback.

Request:

```json
{
  "feedbackType": "content_error",
  "workflowSlug": "health_insurance",
  "message": "This city link seems outdated.",
  "rating": 2
}
```

Response:

```json
{
  "feedback": {
    "id": "uuid",
    "status": "new",
    "createdAt": "2026-06-01T10:00:00Z"
  }
}
```

Rules:

- Allow anonymous feedback only if rate-limited.
- Sanitize message input.
- Do not expose admin notes to the user.

## `POST /api/analytics/track`

Optional proxy for analytics events if client-side tracking is restricted.

Request:

```json
{
  "event": "workflow_opened",
  "properties": {
    "workflowSlug": "anmeldung",
    "citySlug": "berlin"
  }
}
```

Response:

```json
{
  "success": true
}
```

Rules:

- Do not track sensitive data.
- Do not track free-text user notes.
- Prefer privacy-preserving event properties.

## `POST /api/email/reminders/send-due`

Server-only scheduled endpoint/function.

Purpose:

- Find due reminders
- Send reminder emails
- Mark reminders as sent or failed

This endpoint must not be callable by ordinary users.

Request:

```json
{
  "jobSecret": "server-only-secret"
}
```

Response:

```json
{
  "processed": 12,
  "sent": 11,
  "failed": 1
}
```

## Admin Endpoints

Admin endpoints must require admin authorization.

### `POST /api/admin/content/workflows`

Create or update workflow content.

### `POST /api/admin/content/checklist-items`

Create or update checklist items.

### `POST /api/admin/content/sources`

Create or update source links.

### `GET /api/admin/feedback`

List feedback reports.

## API Testing Requirements

For each endpoint, test:

- Unauthorized access
- Invalid payload
- Successful request
- Ownership checks
- Enum validation
- Sensitive data exclusion

## API Naming Rules

- Use camelCase in JSON responses.
- Use snake_case in database columns if using Postgres conventions.
- Convert at the API boundary.
- Use stable slugs in URLs.
