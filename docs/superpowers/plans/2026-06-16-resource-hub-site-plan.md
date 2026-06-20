# Implementation Plan — Resource Hub Site

**Date:** 2026-06-16
**Spec:** `../specs/2026-06-16-resource-hub-site-design.md`
**Approach:** Build phase-by-phase with a preview checkpoint after each. Plain CSS using the brand `tokens.css` + `components.css` as global styles (no Tailwind — reuses the brand work directly). Next.js App Router + TypeScript.

---

## Phase 0 — Scaffold
- Next.js (App Router, TS, ESLint) at repo root `~/joshualarosa-ai/`, keeping `brand/` and `docs/`.
- Project structure: `app/`, `components/`, `lib/`, `brand/` (existing) imported globally.
- Verify dev server boots.

## Phase 1 — Brand integration & shell
- Global CSS: import `tokens.css` + `components.css`; fonts via `next/font` (Geist, Instrument Serif).
- Shared components: `Button` (accent/ghost/link), `Card`, `Eyebrow`, `Label`, `Nav`, `Footer`, `Section`.
- Root layout with nav + footer. **Checkpoint:** a blank themed page that looks on-brand.

## Phase 2 — Supabase
- Supabase project; `resources` + `subscribers` tables; RLS policies; `covers` (public) + `pdfs` (private) buckets.
- `lib/supabase/` — browser client (anon) + server client (service-role).
- Seed 3–4 sample resources (placeholder cover + PDF) so pages have data.
- Env wired locally (`.env.local`) and documented for Vercel.

## Phase 3 — Home (`/`)
- Hero, featured resources (from Supabase `featured=true`), newsletter block (Substack), podcast block (dark moment), work-with-me, footer. **Checkpoint.**

## Phase 4 — Library (`/library`)
- Fetch published resources; category filter chips; responsive card grid; optional title search. **Checkpoint.**

## Phase 5 — Resource page + email gate (`/r/[slug]`)
- Resource detail (cover, what's inside, video link).
- Gate form → `POST /api/unlock` → insert subscriber + return signed URL → download + `localStorage` unlock.
- SEO meta + OG image. **Checkpoint:** end-to-end download works behind the gate.

## Phase 6 — Podcast (`/podcast`)
- Building Leverage "coming soon" + existing links, dark-moment styling.

## Phase 7 — Polish
- Responsive pass (mobile-first), SEO (sitemap, metadata), accessibility, loading/empty/error states.

## Phase 8 — Deploy
- Push repo; Vercel project + env vars; verify on preview URL.
- Domain `joshualarosa.ai` → Vercel at go-live (after Joshua registers it).

---

## Verification per phase
Run dev server, screenshot/inspect via the preview tools, confirm brand fidelity + behavior before moving on.

## Notes
- No custom admin in v1 — resources added via Supabase dashboard or a small seed script.
- Schema is shaped so the lead-magnet skill can `insert` rows later with zero site changes.
