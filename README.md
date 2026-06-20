# joshualarosa.ai

Personal resource hub — a link-in-bio destination for guides, prompts and playbooks, with email-gated PDF downloads, a newsletter signup, and a link to the Building Leverage podcast.

## Stack
- **Next.js** (App Router, TypeScript) on **Vercel**
- **Supabase** — Postgres (`resources`, `subscribers`) + Storage (`covers` public, `pdfs` private)
- Brand system in plain CSS (`brand/tokens.css` + `brand/components.css`) — "quiet editorial"

## Local dev
```bash
npm install
cp .env.local.example .env.local   # fill in Supabase keys
npm run dev
```

## Environment variables
| Var | Notes |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | server-only secret (signed URLs, subscriber inserts) |
| `NEXT_PUBLIC_SITE_URL` | canonical site URL (for sitemap/OG); optional |

Set the same vars in Vercel → Project → Settings → Environment Variables.

## How content works
- The site reads published rows from Supabase `resources`; new rows appear automatically (ISR).
- PDFs live in the private `pdfs` bucket and are served via short-lived signed URLs after the email gate.
- Adding a resource: upload the PDF to `pdfs`, insert a row with `published = true`.

## Project layout
- `app/` — routes (`/`, `/resources`, `/r/[slug]`, `/podcast`, `/api/unlock`)
- `components/` — Nav, Footer, ResourceCard, EmailGate, etc.
- `lib/` — Supabase clients + the resource data-access layer
- `brand/` — design tokens, component styles, style guide
- `supabase/schema.sql` — DB schema; `scripts/` — seed + PDF rebrand pipeline
- `docs/` — specs, plans, Supabase setup
