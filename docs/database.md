# Database setup

MindBloom uses **PostgreSQL** via Prisma. Every part of the schema —
`Json` columns, `String[]` arrays, enums, `@db.Text` — requires
Postgres; it will not validate against SQLite. `prisma/schema.prisma`
is already pinned to `provider = "postgresql"`.

> ⚠️ **Don't run `npx prisma init`** in this project. It regenerates
> `schema.prisma` from scratch with a fresh SQLite datasource block and
> will overwrite the Postgres one, which is exactly the mismatch that
> breaks `prisma generate`. If you need to reset the schema, restore it
> from git instead.

## Option A — Docker (recommended)

A ready-to-go `docker-compose.yml` is included at the project root:

```bash
docker compose up -d
```

This starts Postgres on `localhost:5432` with user/password/db all set
to `mindbloom`, matching `.env.example`'s `DATABASE_URL` out of the
box — no edits needed. It also starts [Adminer](https://www.adminer.org/)
at http://localhost:8080 (server: `db`, user/pass/db: `mindbloom`) if
you want a quick GUI without `prisma studio`.

To stop it: `docker compose down`. To wipe the data volume too:
`docker compose down -v`.

## Option B — Hosted Postgres

Any of these work well with Vercel deployments:

- [Neon](https://neon.tech) (serverless Postgres, generous free tier)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

Copy the connection string they give you into `DATABASE_URL` in `.env`.

## Apply the schema

```bash
npx prisma generate   # regenerate the Prisma client (also runs on npm install)
npm run db:push
```

`npm run db:push` creates every table defined in `prisma/schema.prisma`
— users, profiles, mood entries, habits & habit logs, journal entries,
sleep logs, assessment results, CBT/ACT/DBT worksheets, self-care plan
items, AI conversations & messages, articles, bookmarks & reading
progress, daily challenges & logs, achievements, notifications, and
NextAuth's own auth tables.

For production, prefer migrations over `db push`:

```bash
npx prisma migrate dev --name init     # in development, generates a migration
npx prisma migrate deploy              # in production/CI
```

## Inspect data

```bash
npm run db:studio
```

Opens Prisma Studio, a GUI for browsing and editing rows.

## Seeding demo data

```bash
npm run db:seed
```

Seeds a sample daily challenge, an achievement definition, and the
Psychology Library articles.

## Troubleshooting

**`prisma generate` fails with a validation error mentioning SQLite,
or complains that `Json`/array fields aren't supported** — the
`datasource` block's `provider` has been changed away from
`"postgresql"` (most often by re-running `prisma init`). Open
`prisma/schema.prisma` and confirm the top of the file reads:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Connection refused on `localhost:5432`** — the Postgres container
isn't running yet; run `docker compose up -d` and wait a few seconds
for the healthcheck to pass before `db:push`.

