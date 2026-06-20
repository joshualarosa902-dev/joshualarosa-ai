# Resource Hub Site — joshualarosa.ai

**Date:** 2026-06-16
**Status:** Approved design — ready for implementation plan
**Depends on:** Brand system v2 (`brand/tokens.css`, `brand/components.css`)
**Owner:** Joshua LaRosa

---

## 1. Context & goal

A public resource hub at `joshualarosa.ai` — the link-in-bio destination where the lead magnets, PDFs, and guides from Joshua's videos live. Structured like a personal hub (steven.com's multi-page shape + premium feel) with OpusJake-style resource mechanics. New resources **auto-populate** (the site reads from Supabase — no hand-editing), downloads are **email-gated** (grows the list), and the site cross-promotes the newsletter and the Building Leverage podcast.

---

## 2. Scope

### In scope (v1)
- Multi-page hub: home, library, per-resource pages, podcast block.
- Email-gated PDF downloads (own form → Supabase → manual Substack export).
- Supabase-backed resource data + Storage for PDFs/covers; site auto-populates.
- Brand v2 integration (tokens + components).
- Newsletter signup (Substack) + Building Leverage "coming soon" button.
- Deploy to Vercel.

### Out of scope (later specs)
- About / work-with-me as full pages (v1: work-with-me is a link to the [media kit](https://www.passionfroot.me/joshualarosaai)).
- Custom admin UI (v1 adds resources via Supabase dashboard / seed script).
- Auto-emailing the PDF link (v1 = instant on-page download).
- Lead-magnet skill auto-inserting rows (schema is ready for it; wiring is later).
- Building Leverage site itself; the Figma spec/template (built **after** the site is satisfactory).

---

## 3. Information architecture

```
/                → home hub
                     hero · featured resources · newsletter · podcast block · work-with-me · footer
/library         → full filterable resource grid (filter by category)
/r/[slug]        → dedicated resource page  ← email gate + download lives here
/podcast         → Building Leverage block ("coming soon" + existing pod links)
```

Global nav: Library · Podcast · Newsletter · Work with me. Footer: socials (TikTok/IG/YouTube), Substack, legal.

---

## 4. Pages

### Home (`/`)
- **Hero** — editorial headline + Instrument Serif accent, CTA to `/library` + secondary "browse" link.
- **Featured resources** — 3 cards where `featured = true`.
- **Newsletter** — Substack subscribe (the general list; see §7).
- **Podcast block** — Building Leverage, dark-moment styling, "coming soon" / existing links.
- **Work with me** — short block linking to the media kit.
- **Footer** — socials, newsletter, legal.

### Library (`/library`)
- Category filter chips (derived from distinct `resources.category`).
- Responsive grid of resource cards (cover, category label, title, short desc, "View →").
- Optional simple client-side search by title (nice-to-have).

### Resource page (`/r/[slug]`)
- Cover, title, description, "what's inside" list, category label, optional related video link.
- **Email gate:** email field → unlock. On success: download starts + persistent download link shown; set `localStorage` flag so returning visitors skip the gate.
- Subtle "get the newsletter" prompt below.
- SEO meta + OG image (cover) — this is the ManyChat/social link target.

### Podcast (`/podcast`)
- Building Leverage intro, dark-moment styling, "coming soon" + links to existing episodes. Becomes the gateway to the future BL site.

---

## 5. Email gate flow

1. Visitor enters email on `/r/[slug]`.
2. `POST /api/unlock` (server route, uses service-role key):
   - upsert `{ email, resource_slug }` into `subscribers`.
   - generate a **signed URL** (short TTL) for the resource's PDF in the private Storage bucket.
   - return the signed URL.
3. Client triggers download + shows the link; sets `localStorage["unlocked:<slug>"]`.
4. Joshua periodically exports `subscribers` (CSV) and imports to Substack.

PDFs live in a **private** bucket — only reachable via server-generated signed URLs, so the gate has teeth (no public hot-linking). Covers live in a **public** bucket.

---

## 6. Data model (Supabase)

```sql
resources (
  id uuid pk default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  whats_inside text[],         -- bullet list
  category text not null,
  cover_url text,              -- public bucket
  pdf_path text not null,      -- private bucket object path
  video_url text,              -- optional source video
  featured boolean default false,
  published boolean default false,
  created_at timestamptz default now()
)

subscribers (
  id uuid pk default gen_random_uuid(),
  email text not null,
  resource_slug text,          -- which magnet unlocked (nullable = general newsletter)
  created_at timestamptz default now()
)
```

**RLS:** `resources` — public `select` where `published = true`; no public writes. `subscribers` — no public access; inserts only via the server route (service-role). Writes/uploads done via Supabase dashboard or seed script in v1.

---

## 7. Newsletter (Substack)

- **General newsletter signup** (home + footer): Substack embedded subscribe / link — that's where the actual newsletter (Building Leverage, 53 subs) lives.
- **Resource-gate emails:** captured to Supabase `subscribers`, exported to Substack manually.
- Both ultimately feed Substack; the gate just gives lower friction + owned data for magnet leads.

---

## 8. Tech architecture

- **Next.js (App Router)** on **Vercel**.
- **Supabase** — Postgres + Storage. `@supabase/supabase-js`; anon key client-side (public reads), service-role key server-only (signed URLs, subscriber inserts).
- **Data freshness:** server components read `resources`; ISR `revalidate` (~60s) so new rows appear automatically. On-demand revalidation via webhook is a later optimization.
- **Brand:** port `tokens.css` + `components.css`; fonts via `next/font` (Geist, Instrument Serif). React components map to the brand classes (Button, Card, Eyebrow, etc.).
- **Env:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

---

## 9. Non-functional

- **Responsive** — mobile-first (most traffic is link-in-bio from mobile).
- **SEO** — per-resource metadata + OG images; sitemap; semantic headings.
- **Performance** — static where possible, signed URLs on demand; optimized images.
- **Accessibility** — sufficient contrast (warm neutrals pass), keyboard-navigable forms, alt text.

---

## 10. Deployment & setup

- Vercel project linked to the repo; env vars set in Vercel.
- Supabase project: tables, RLS policies, public `covers` + private `pdfs` buckets.
- Domain `joshualarosa.ai` pointed at Vercel (confirm registrar/DNS — not blocking; build on the Vercel preview URL first).

---

## 11. Open questions (non-blocking)
- Confirm `joshualarosa.ai` is registered + where DNS lives (needed only at go-live).
- Initial resource set to seed (titles, categories, PDFs) — gather when we seed.
- Substack subscribe: embed widget vs. link-out (decide during build; both trivial).
