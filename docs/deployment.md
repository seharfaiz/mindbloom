# Deploying to Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. In Vercel, "Add New Project" and import the repo.
3. Set the environment variables from `.env.example` in the Vercel
   project's Settings → Environment Variables:
   - `DATABASE_URL` — point this at a production Postgres instance
     (Neon/Supabase/Railway all have one-click Vercel integrations)
   - `NEXTAUTH_URL` — your production URL, e.g. `https://mindbloom.app`
   - `NEXTAUTH_SECRET` — a fresh `openssl rand -base64 32` value
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` (if using Google sign-in
     — remember to add the production redirect URI in Google Cloud
     Console: `https://yourdomain.com/api/auth/callback/google`)
   - `OPENAI_API_KEY` (if using the AI coach)
4. Deploy. Vercel runs `npm install` (which triggers `prisma generate`
   via `postinstall`) and `npm run build`.
5. After the first deploy, run the schema against your production
   database once (from your machine, with `DATABASE_URL` pointed at
   prod):
   ```bash
   npx prisma migrate deploy
   ```
6. Visit your production URL and create an account to verify auth,
   then check a few dashboard pages to confirm the database connection.

## Notes

- The app uses the Node.js runtime for API routes (Prisma isn't
  compatible with the Edge runtime), which Vercel handles automatically
  for the routes under `src/app/api/`.
- If you add image uploads later, pair them with a storage provider
  (Vercel Blob, S3, or Supabase Storage) rather than the filesystem,
  since Vercel's filesystem is read-only at runtime.
