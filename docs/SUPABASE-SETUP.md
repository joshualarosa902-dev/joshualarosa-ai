# Supabase setup — joshualarosa.ai

One-time setup to flip the site from sample data to your real, auto-populating resources. ~10 minutes.

## 1. Create the project
1. Go to [supabase.com](https://supabase.com) → New project (free tier is fine).
2. Name it `joshualarosa-ai`, pick a region near you, set a DB password.

## 2. Create the tables
- Dashboard → **SQL Editor** → New query → paste all of `supabase/schema.sql` → **Run**.

## 3. Create the storage buckets
- Dashboard → **Storage** → New bucket:
  - `covers` — **public** (resource cover images)
  - `pdfs` — **private** (the gated PDFs; served only via signed URLs)

## 4. Grab the keys
- Dashboard → **Project Settings → API**. Copy:
  - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
  - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` *(secret — server only, never commit)*

## 5. Wire them up
- Copy `.env.local.example` → `.env.local` and paste the three values.
- (At deploy) add the same three to **Vercel → Project → Settings → Environment Variables**.
- Restart the dev server. The site now reads from Supabase instead of sample data.

## 6. Add your first real resource
1. Storage → `pdfs` → upload the PDF (note its path, e.g. `ai-hook-vault.pdf`).
2. (Optional) Storage → `covers` → upload a cover; copy its public URL.
3. Table editor → `resources` → Insert row:
   - `slug` (url-safe, e.g. `ai-hook-vault`), `title`, `description`, `category`
   - `whats_inside` (array), `pdf_path` (the path from step 1), `cover_url` (optional)
   - `featured` / `published` → set `published = true` to make it live.
4. It appears on the site within ~60s (ISR revalidation). No code changes.

## Later
- Your lead-magnet skill can `insert` rows here directly → new magnets self-publish.
- Export `subscribers` (Table editor → Export CSV) and import into Substack.
