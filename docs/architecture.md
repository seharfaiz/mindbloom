# Architecture overview

```
src/
  app/
    (marketing)/            # (reserved for future marketing-only routes)
    (auth)/login, register  # auth pages, share src/app/(auth)/layout.tsx
    dashboard/               # all authenticated app pages
      mood/ habits/ journal/ sleep/
      assessments/ assessments/[instrument]/
      cbt/ relax/ coach/ settings/
      layout.tsx             # server component: session gate + shell
      page.tsx                # dashboard overview
    api/                      # route handlers (Node runtime)
      auth/[...nextauth]/ register/ mood/ habits/ habits/[id]/
      journal/ sleep/ assessments/ cbt/ ai-coach/ settings/
    layout.tsx, page.tsx, globals.css
  components/
    ui/                      # shadcn-style primitives (button, card, input…)
    marketing/                # landing page sections
    dashboard/                 # sidebar, breathing exercise, meditation timer
    breathing-orb.tsx         # signature animated element, reused across the app
  lib/
    auth.ts                  # NextAuth config
    prisma.ts                # Prisma client singleton
    assessments.ts            # PHQ-9 / GAD-7 / PSS-10 question banks + scoring
    cbt-worksheets.ts         # CBT worksheet field definitions
    utils.ts
  types/next-auth.d.ts        # session type augmentation
prisma/
  schema.prisma               # full data model (see docs/database.md)
  seed.ts
```

## Data flow pattern

Every authenticated feature follows the same shape:

1. A Zod schema in the API route validates input.
2. `getServerSession(authOptions)` establishes identity; all queries
   are scoped to `userId` — there is no endpoint that can read another
   user's data.
3. Prisma reads/writes Postgres.
4. Client pages are `"use client"` components that `fetch()` the route
   and render with local state — kept simple on purpose so it's easy
   to swap in React Query / SWR later if you want caching.

Server-rendered pages (like the dashboard overview) call Prisma
directly instead of fetching their own API, since they run on the
server already.

## Extending toward the rest of the PRD

The schema already has models for parts of the PRD not yet wired to a
UI:

- **Psychology library** — `Article`, `ArticleBookmark`,
  `ReadingProgress` models exist. Add `app/dashboard/library/` pages
  and `api/articles/` routes following the same pattern as `journal/`.
- **Daily wellness challenges** — `DailyChallenge`, `ChallengeLog`
  exist; `prisma/seed.ts` seeds one sample challenge.
- **Achievements** — `Achievement`, `UserAchievement` exist; award them
  from within existing routes (e.g. when a habit streak hits 7 days).
- **Admin panel** — `Role` enum on `User` (`USER` / `ADMIN`) is ready;
  add `app/admin/` routes gated by checking `session.user.role`.
- **Notifications / push** — `Notification` model exists; wire up a
  cron (Vercel Cron or a queue) that reads `Settings.reminderHour` per
  user and creates rows, then add a bell icon in the dashboard shell
  that polls `api/notifications`.
- **Personality / broader assessments** (Big Five, resilience,
  self-compassion, etc.) — add new `AssessmentDef` entries to
  `lib/assessments.ts` following the PHQ-9/GAD-7/PSS-10 pattern; no
  schema changes needed since `AssessmentResult.instrument` is a
  free-form string.

## Design tokens

- **Colors**: sage (`sage-*`), deep navy (`navy-*`), warm beige
  (`beige-*`), warm-white canvas / dark slate — defined in
  `tailwind.config.ts`.
- **Type**: Fraunces (display, `font-display`), Plus Jakarta Sans
  (body, default `font-sans`), IBM Plex Mono (`font-mono`) for
  timers/data.
- **Signature element**: the `BreathingOrb` component — a layered,
  pulsing gradient orb used in the landing hero, the auth screen, and
  as the literal pacing guide in the breathing exercises. It ties the
  brand mark to the product's actual function.
