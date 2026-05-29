# Skill: Supabase Auth for BüroAssist

## Purpose

Use this skill when implementing authentication, session management, user identity, account recovery, or protected access for BüroAssist.

Supabase Auth is the recommended MVP authentication layer because it integrates with Supabase Postgres, supports common login methods, and works well with Row Level Security.

## When to use this skill

Use this skill for:

- User sign-up and login.
- Magic-link authentication.
- Email/password authentication.
- Password reset flows.
- Session refresh and logout.
- Protecting dashboard, roadmap, checklist, reminder, and profile routes.
- Connecting authenticated users to `profiles`, `user_workflows`, `user_checklist_items`, and `reminders`.

Do not use this skill for:

- Storing sensitive documents.
- Government identity verification.
- ELSTER authentication.
- Banking authentication.
- SIM identity verification.

## BüroAssist product rules

- Users must be able to explore public content without creating an account.
- Users must create an account before saving a personalized roadmap, checklist progress, reminders, or profile data.
- Use email-based authentication for MVP.
- Magic link is preferred for low-friction onboarding.
- Social login can be added later, but is not required for MVP.
- Never expose Supabase service-role keys in frontend code.
- Never store passport numbers, Tax IDs, residence permit numbers, ELSTER credentials, banking credentials, or ID images in auth metadata.

## Recommended login methods

MVP:

- Email magic link.
- Email/password only if users need a more familiar login path.

Later:

- Google login.
- Apple login.
- University/employer SSO for B2B.

## Data ownership model

Every user-owned table must include:

```sql
user_id uuid not null references auth.users(id) on delete cascade
```

Tables requiring user ownership:

- `profiles`
- `user_workflows`
- `user_checklist_items`
- `reminders`
- `user_notes`
- `feedback`

## Required RLS pattern

Enable Row Level Security for all user-owned tables.

Example policy:

```sql
create policy "Users can read their own profile"
on profiles
for select
using (auth.uid() = user_id);

create policy "Users can update their own profile"
on profiles
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

For inserts:

```sql
create policy "Users can insert their own rows"
on user_workflows
for insert
with check (auth.uid() = user_id);
```

## Required frontend behavior

- Display public landing, glossary, and general workflow pages without login.
- Prompt login only when the user tries to save progress, create reminders, or access their dashboard.
- After login, route users to `/dashboard` or the unfinished onboarding step.
- Show a friendly session-expired state rather than failing silently.

## Required backend behavior

- All backend functions must verify the authenticated user before accessing user-owned data.
- Use Supabase JWT validation in Edge Functions.
- Never trust `user_id` sent from the client without checking it matches `auth.uid()` or the authenticated JWT subject.

## Environment variables

Frontend-safe:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Server-only:

```bash
SUPABASE_SERVICE_ROLE_KEY=
```

Rules:

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be used in the browser with RLS enabled.
- `SUPABASE_SERVICE_ROLE_KEY` must only be used server-side.
- Service-role operations must be minimal, audited, and never triggered directly by arbitrary client input.

## Acceptance criteria

A task using this skill is complete when:

- A user can sign up and sign in.
- A user can sign out.
- Protected routes redirect unauthenticated users.
- Authenticated users can only access their own dashboard data.
- RLS is enabled and tested on all user-owned tables.
- No sensitive identity, tax, immigration, banking, or document numbers are stored in auth metadata.

## Security checklist

- [ ] RLS enabled on all user-owned tables.
- [ ] No service-role key in frontend code.
- [ ] No sensitive personal identifiers stored in metadata.
- [ ] Password reset or magic-link flow tested.
- [ ] Session refresh and logout tested.
- [ ] Auth errors are shown in calm, plain language.

## Official documentation

- https://supabase.com/docs/guides/auth
- https://supabase.com/docs/reference/javascript/auth-api
