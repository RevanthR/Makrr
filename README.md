# Makrr — Digital Studio

Landing site and admin dashboard for Makrr (Hyderabad). Built with Next.js, Postgres, and Vercel Blob.

## Setup

1. **Clone and install**
   ```bash
   npm install
   ```

2. **Environment**
   - Copy `.env.example` to `.env.local`
   - Set `POSTGRES_URL` (e.g. from [Neon](https://neon.tech) or Vercel Marketplace)
   - Set `BLOB_READ_WRITE_TOKEN` (create a Blob store in your Vercel project)
   - Set `ADMIN_PASSWORD` for the `/admin` login

3. **Database**
   - Run the schema once (e.g. in Neon SQL editor or `psql`):
     - Use `drizzle/0000_init.sql`
   - Or use Drizzle: `npm run db:push`
   - Seed projects and testimonials: `npm run db:seed`

4. **Run**
   ```bash
   npm run dev
   ```
   - Site: [http://localhost:3000](http://localhost:3000)
   - Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Deploy (Vercel)

- Connect the repo to Vercel
- Add env vars: `POSTGRES_URL`, `BLOB_READ_WRITE_TOKEN`, `ADMIN_PASSWORD`
- Create a Postgres database (Neon via Vercel Marketplace or direct)
- Create a Vercel Blob store (Storage in project settings)
- Run the schema and seed against the **production** DB (see below)

## Migrate DB after deployment

Vercel doesn’t run migration commands for you. Use one of these against your **production** database.

### Option 1: Run from your machine (recommended)

1. Get the production connection string from Vercel (Project → Settings → Environment Variables) or from Neon.
2. In your project folder, point Drizzle at production and push schema:
   ```bash
   POSTGRES_URL="postgresql://..." npm run db:push
   ```
   Or put the production URL in a separate file and load it only when migrating:
   ```bash
   # .env.production.local (do not commit)
   POSTGRES_URL=postgresql://user:pass@host/db?sslmode=require
   ```
   Then run:
   ```bash
   dotenv -e .env.production.local -- npm run db:push
   ```
   (Install dotenv-cli if needed: `npm i -g dotenv-cli` or `npx dotenv-cli -e .env.production.local -- npm run db:push` with dotenv-cli in devDependencies.)
3. Seed (first time only):
   ```bash
   POSTGRES_URL="postgresql://..." npm run db:seed
   ```
   Or with a file: `dotenv -e .env.production.local -- npm run db:seed`

### Option 2: Run SQL in the database dashboard

1. Open your provider’s SQL editor (e.g. [Neon](https://neon.tech) → your project → SQL Editor).
2. Paste and run the contents of `drizzle/0000_init.sql` to create tables.
3. For initial data, run the seed once from your machine (Option 1 step 3) or insert rows manually.

After the first deploy, only run `db:push` again when you change the schema (e.g. new columns or tables). You don’t need to re-run migrations on every Vercel deploy if the schema hasn’t changed.

## Scripts

- `npm run dev` — development server
- `npm run build` / `npm run start` — production
- `npm run db:push` — push Drizzle schema to DB
- `npm run db:seed` — seed projects and testimonials
