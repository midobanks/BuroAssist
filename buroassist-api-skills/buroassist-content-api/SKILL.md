# Skill: BüroAssist Content API

## Purpose

Use this skill when creating, reading, updating, reviewing, or displaying BüroAssist workflow content.

The MVP content API should be implemented using Supabase tables as a lightweight CMS. This avoids adding a separate CMS too early while still allowing content updates without frontend redeployment.

## When to use this skill

Use this skill for:

- Workflow guide content.
- Checklist item content.
- City-specific resource links.
- Official source URLs.
- Glossary terms.
- Common mistakes.
- Content review dates.
- Admin content updates.

Do not use this skill for:

- User-owned checklist progress.
- Sensitive personal data.
- Legal advice generation.
- Automated government submissions.

## Content principles

Every content item must be:

- Plain-language.
- Source-backed where process guidance is involved.
- Dated with `last_reviewed_at`.
- Marked as general or city-specific.
- Clear about uncertainty where requirements vary by office.
- Written as administrative guidance, not legal/tax/insurance advice.

## MVP content types

### `workflows`

Main workflows from the current PRD:

- Anmeldung
- Residence Permit
- Health Insurance Onboarding
- Tax ID + ELSTER

Fields:

- `id`
- `slug`
- `name`
- `short_description`
- `long_description`
- `who_needs_this`
- `when_to_do_this`
- `risk_level`
- `disclaimer_text`
- `last_reviewed_at`
- `is_active`

### `workflow_steps`

Fields:

- `id`
- `workflow_id`
- `city_id nullable`
- `status_scope nullable`
- `step_order`
- `title`
- `description`
- `expected_outcome`
- `common_blockers`
- `source_url`
- `last_reviewed_at`
- `is_active`

### `checklist_items`

Fields:

- `id`
- `workflow_id`
- `city_id nullable`
- `required_for_status text[]`
- `title`
- `description`
- `priority`
- `source_url`
- `last_reviewed_at`
- `is_active`

### `resource_links`

Fields:

- `id`
- `workflow_id nullable`
- `city_id nullable`
- `title`
- `url`
- `source_type` such as `official`, `trusted_provider`, `internal_guide`
- `description`
- `last_checked_at`
- `is_active`

### `glossary_terms`

Fields:

- `id`
- `term_de`
- `term_en`
- `plain_language_definition`
- `related_workflow_id nullable`
- `source_url nullable`
- `last_reviewed_at`

## Required content states

Use these content states:

- `draft`
- `review_needed`
- `published`
- `archived`

Only `published` and `is_active = true` content should appear to users.

## Review rules

High-risk content must be reviewed more often:

- Residence Permit: every 30–60 days.
- Anmeldung: every 60–90 days.
- Health Insurance: every 60–90 days.
- Tax ID + ELSTER: every 90 days.
- Glossary: every 90–180 days.

If content is stale, show a warning or hide it from personalized guidance depending on risk level.

## Source rules

Preferred source order:

1. Official government/city portal.
2. Official federal service portal.
3. Official institution page.
4. Trusted university or public organization.
5. Internal explanation based on reviewed sources.

Do not use random blogs, forums, or social media as authoritative sources.

## User-facing disclaimer pattern

Use short disclaimers near high-risk guidance:

> This is general administrative guidance, not legal advice. Requirements can vary by city and personal situation. Please verify final requirements with the responsible office.

## Admin requirements

Admin users must be able to:

- Create workflow content.
- Edit checklist items.
- Add or update official links.
- Set `last_reviewed_at`.
- Mark content as `review_needed`.
- Archive outdated content.

All admin mutations must be server-side or protected by admin-only RLS policies.

## Acceptance criteria

A task using this skill is complete when:

- Workflow content can be read by the frontend.
- Only published active content is shown to users.
- Each official-process item includes a source URL or explicit internal review note.
- Each item has `last_reviewed_at` or `last_checked_at`.
- City-specific content can override general content.
- Admin mutations are protected.

## Content quality checklist

- [ ] Is the content plain-language?
- [ ] Is there a source URL?
- [ ] Is there a last-reviewed date?
- [ ] Is this city-specific or general?
- [ ] Does it avoid legal/tax/insurance advice claims?
- [ ] Does it say when requirements may vary?
- [ ] Is stale content hidden or flagged?

## Related external CMS option

If BüroAssist outgrows Supabase tables as a lightweight CMS, consider Sanity or Directus.

Official documentation:

- https://supabase.com/docs/guides/database/overview
- https://www.sanity.io/docs/http-reference
- https://directus.io/docs/api
