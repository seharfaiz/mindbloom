# Installation guide

## Prerequisites

- Node.js 18.18+ (20 LTS recommended)
- Docker (recommended, for local PostgreSQL via the included
  `docker-compose.yml`) — or any hosted PostgreSQL connection string
- Optional: an OpenAI API key (for the AI wellness coach) and a Google
  OAuth client (for Google sign-in)

## 1. Install dependencies

```bash
npm install
```

This also runs `prisma generate` automatically via the `postinstall`
script.

## 2. Configure environment variables

```bash
cp .env.example .env
```

Fill in:

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXTAUTH_URL` | Yes | `http://localhost:3000` in dev |
| `NEXTAUTH_SECRET` | Yes | Generate with `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Optional | Needed only for Google sign-in |
| `OPENAI_API_KEY` | Optional | Needed only for the AI wellness coach |
| `RESEND_API_KEY` / `EMAIL_FROM` | Optional | Needed only for transactional email |

## 3. Start Postgres and set up the database

```bash
docker compose up -d   # local Postgres, matches DATABASE_URL in .env.example
npm run db:push
npm run db:seed   # optional
```

See `docs/database.md` for hosted-Postgres alternatives and troubleshooting.

## 4. Run the app

```bash
npm run dev
```

Visit http://localhost:3000, create an account, and you're in.

## 5. Google OAuth (optional)

1. Create an OAuth 2.0 client at https://console.cloud.google.com/apis/credentials
2. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   (and your production URL equivalent)
3. Copy the client ID/secret into `.env`

## 6. AI wellness coach (optional)

Add `OPENAI_API_KEY` to `.env`. Without it, the coach page will show a
friendly "not configured" message instead of erroring.
