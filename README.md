# MindBloom

**Understand yourself. Grow every day.**

MindBloom is a mental wellness platform: mood tracking, habit building, a
gratitude journal, sleep tracking, evidence-informed self-assessments
(PHQ-9, GAD-7, PSS-10), a CBT worksheet toolbox, a relaxation center
(breathing, grounding, meditation timer), and a supportive AI wellness
coach — all in one calm, premium interface.

> **MindBloom is educational and supportive. It does not diagnose mental
> health conditions or replace professional care.** If you are in
> crisis, call or text **988** (US Suicide & Crisis Lifeline) any time.

---

## Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn-style UI ·
Framer Motion · Prisma · PostgreSQL · NextAuth · React Hook Form + Zod ·
Recharts · OpenAI API

## What's implemented

- **Auth** — email/password (NextAuth Credentials + bcrypt) and Google
  OAuth, protected `/dashboard` routes via middleware.
- **Landing page** — hero, features, how it works, testimonials,
  pricing, FAQ, newsletter form.
- **Dashboard** — real aggregated stats pulled from the database.
- **Mood tracker** — check-in form + 30-day trend chart.
- **Habit tracker** — create habits, daily toggle, streak calculation.
- **Gratitude journal** — prompts, rich entries, history.
- **Sleep tracker** — bedtime/wake logging, duration chart.
- **Self-assessments** — PHQ-9, GAD-7, PSS-10 with automatic scoring,
  interpretation bands, suggestions, and crisis-resource surfacing.
- **CBT toolbox** — 7 worksheet types (thought record, behavioral
  activation, problem solving, exposure hierarchy, self-compassion,
  core beliefs, goal setting), each saved and revisitable.
- **Relaxation center** — box breathing & 4-7-8 breathing with an
  animated pacing orb, 5-4-3-2-1 grounding, progressive muscle
  relaxation guide, and a meditation timer with generated ambient sound.
- **AI wellness coach** — chat backed by the OpenAI API with a strict
  system prompt (no diagnosis, no medication advice, crisis-aware).
- **Settings** — theme (light/dark/system) and reminder preferences.
- **Database schema** — covers all PRD entities (users, moods, habits,
  journals, sleep, assessments, CBT worksheets, self-care plan,
  AI conversations, articles, challenges, achievements, notifications)
  so the remaining surfaces (psychology library, admin panel, daily
  challenges UI, push notifications) can be built directly on top of it.

## What's intentionally not built out

This is a large PRD. To ship something genuinely functional rather than
a shell of placeholders, the admin panel, psychology article library,
daily-challenge UI, and push notifications were left for a follow-up
pass — the Prisma models for all of them already exist in
`prisma/schema.prisma`. See `docs/architecture.md` for how to extend it.

---

## Getting started

See `docs/installation.md` for full setup. Quick version:

```bash
npm install
cp .env.example .env        # already matches docker-compose.yml's credentials
docker compose up -d        # starts local Postgres (+ Adminer on :8080)
npm run db:push             # create tables from the Prisma schema
npm run db:seed             # optional demo data
npm run dev
```

Open http://localhost:3000.

## Documentation

- [`docs/installation.md`](docs/installation.md) — environment setup
- [`docs/database.md`](docs/database.md) — Postgres + Prisma setup
- [`docs/deployment.md`](docs/deployment.md) — deploying to Vercel
- [`docs/architecture.md`](docs/architecture.md) — folder structure & how to extend
