# BüroAssist MVP API Skills

This folder contains one `SKILL.md` per MVP-critical API capability for BüroAssist.

These skills are written for AI coding agents and human developers working on the BüroAssist MVP. They define when to use each API, required product constraints, implementation patterns, security requirements, and acceptance criteria.

## MVP-critical API skills included

1. `supabase-auth/SKILL.md` — authentication, sessions, user identity, account security.
2. `supabase-postgres/SKILL.md` — relational database, RLS, workflow/checklist/reminder data.
3. `supabase-edge-functions/SKILL.md` — secure backend operations, scheduled reminder dispatch, webhooks.
4. `buroassist-content-api/SKILL.md` — CMS-like content model using Supabase tables for workflow guidance and official links.
5. `resend-email/SKILL.md` — transactional emails and reminder notifications.
6. `posthog-analytics/SKILL.md` — product analytics, funnels, events, feature flags.

## Product principles all API skills must follow

- BüroAssist provides administrative guidance, not legal, tax, immigration, insurance, banking, or government advice.
- Store only the minimum user data required for personalization.
- Do not store passport numbers, Tax IDs, ELSTER credentials, residence permit numbers, bank credentials, or identity-document images in the MVP.
- All official-process guidance must be source-backed and include `source_url` plus `last_reviewed_at`.
- All user-facing workflows must remain calm, plain-language, and mobile-first.
- Use Row Level Security for all user-owned data.
- Avoid building features that submit official applications on behalf of users.
