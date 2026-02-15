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
- Create a Postgres database (Neon via Vercel Marketplace or direct) and run the schema + seed
- Create a Vercel Blob store (Storage in project settings)

## Scripts

- `npm run dev` — development server
- `npm run build` / `npm run start` — production
- `npm run db:push` — push Drizzle schema to DB
- `npm run db:seed` — seed projects and testimonials
