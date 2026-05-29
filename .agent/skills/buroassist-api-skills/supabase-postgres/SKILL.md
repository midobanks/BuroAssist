# Skill: Supabase Postgres for BüroAssist

## Purpose

Use this skill when designing, querying, migrating, or securing the BüroAssist relational database.

Supabase Postgres is the MVP system of record for users, profiles, workflows, checklists, reminders, city resources, official links, content review states, and analytics-adjacent product data.

## When to use this skill

Use this skill for:

- Creating schema migrations.
- Modeling workflows and checklist data.
- Persisting user roadmap progress.
- Storing city-specific official links.
- Storing reminders and notification status.
- Implementing Row Level Security.
- Writing database functions or views for roadmap generation.

Do not use this skill for:

- Storing passport numbers.
- Storing Tax IDs.
- Storing ELSTER credentials.
- Storing residence permit numbers.
- Storing uploaded identity documents.
- Storing bank credentials.

## MVP data model

Required tables:

```sql
profiles
cities
workflows
workflow_steps
checklist_items
user_workflows
user_checklist_items
reminders
content_sources
feedback
```

Optional MVP tables:

```sql
glossary_terms
resource_links
user_notes
content_review_queue
```

## Table responsibilities

### `profiles`

Stores low-risk personalization data.

Fields:

- `id uuid primary key`
- `user_id uuid references auth.users(id)`
- `preferred_language text default 'en'`
- `city_id uuid references cities(id)`
- `nationality_group text check in ('eu_eea', 'non_eu', 'unknown')`
- `current_status text`
- `arrival_date date`
- `move_in_date date`
- `visa_expiry_date date`
- `created_at timestamptz`
- `updated_at timestamptz`

Do not add sensitive document identifiers.

### `cities`

Stores supported MVP cities.

Recommended initial cities:

- Berlin
- Munich
- Hamburg
- Cologne
- Frankfurt

Fields:

- `id uuid primary key`
- `name text`
- `state text`
- `slug text unique`
- `is_active boolean`

### `workflows`

Stores main workflow definitions.

Current PRD workflows:

- Anmeldung
- Residence Permit
- Health Insurance Onboarding
- Tax ID + ELSTER

Fields:

- `id uuid primary key`
- `slug text unique`
- `name text`
- `description text`
- `risk_level text`
- `is_active boolean`
- `last_reviewed_at date`

### `checklist_items`

Stores generic and city/status-specific checklist requirements.

Fields:

- `id uuid primary key`
- `workflow_id uuid references workflows(id)`
- `city_id uuid references cities(id) null`
- `required_for_status text[]`
- `title text`
- `description text`
- `priority text check in ('required', 'recommended', 'optional')`
- `source_url text`
- `last_reviewed_at date`
- `is_active boolean`

### `user_checklist_items`

Tracks individual user progress.

Fields:

- `id uuid primary key`
- `user_id uuid references auth.users(id)`
- `checklist_item_id uuid references checklist_items(id)`
- `status text check in ('not_started', 'in_progress', 'ready', 'completed', 'not_applicable')`
- `completed_at timestamptz null`
- `notes text null`

## Required RLS rules

- Public reference tables may be readable by anonymous users if they contain no sensitive data.
- User-owned tables must only be readable and writable by the owning user.
- Admin-only content mutation should use a privileged server-side role or admin role claim.

Reference/public readable tables:

- `cities`
- `workflows`
- `workflow_steps`
- `checklist_items`
- `glossary_terms`
- `resource_links`
- `content_sources`

User-owned tables:

- `profiles`
- `user_workflows`
- `user_checklist_items`
- `reminders`
- `user_notes`

## Query principles

- Prefer server-side queries for personalized roadmap generation.
- Keep frontend queries simple and scoped.
- Always filter active content using `is_active = true`.
- Show `last_reviewed_at` in the UI for trust-sensitive guidance.
- Use database indexes on foreign keys, slugs, `city_id`, `workflow_id`, and `user_id`.

## Roadmap generation logic

A roadmap should be generated using:

- User status.
- Nationality group.
- City.
- Move-in date.
- Arrival date.
- Visa/residence expiry date.

The generated roadmap should not claim legal certainty. It should present likely administrative next steps and link to official sources.

## Acceptance criteria

A task using this skill is complete when:

- Required tables exist with migrations.
- User-owned tables have RLS enabled.
- Public content tables do not expose sensitive data.
- Checklist progress persists across sessions.
- A personalized roadmap can be generated from profile data.
- Official links and `last_reviewed_at` can be displayed for each workflow or checklist item.

## Security checklist

- [ ] RLS enabled on all user-owned tables.
- [ ] Service role never used in client code.
- [ ] No sensitive identifiers stored.
- [ ] Foreign keys and indexes created.
- [ ] Public tables reviewed for sensitive leakage.
- [ ] Admin-only mutations protected.

## Official documentation

- https://supabase.com/docs/guides/database/overview
- https://supabase.com/docs/guides/database/connecting-to-postgres
- https://supabase.com/docs/guides/database/postgres/row-level-security
