# Building Leverage — Podcast Site

**Date:** 2026-06-17
**Status:** Approved design — ready for implementation plan
**Relationship:** Sibling to `joshualarosa.ai` (shares brand DNA, darker/bolder expression). Reference: stevenbartlett.com/doac.
**Owner:** Joshua LaRosa

---

## 1. Context & goal

A standalone flagship site for **Building Leverage** — Joshua's guest-interview AI podcast — positioned as a serious **media company**, not just an episode list. Primary job: credibility and brand (for sponsors, guests, partners), with episode discovery and newsletter growth as supporting goals. It must be a clear **step up in design quality** over the resource hub — cinematic, bold, memorable.

Format: **guest interviews** (founders / builders / operators). Assets: episode videos on YouTube, guest/host photos, custom thumbnails.

---

## 2. Brand — the loud sibling

Same family as `joshualarosa.ai`, pushed darker and bolder:

| Token | Value | Role |
|---|---|---|
| `--c-black` | `#0A0A0A` | Primary canvas |
| `--c-panel` | `#121214` | Cards / panels |
| `--c-line` | `#26262A` | Hairlines on dark |
| `--c-text` | `#F4F1EA` | Primary text |
| `--c-muted` | `#8A8580` | Secondary text |
| `--c-yellow` | `#F2DE00` | Accent — brighter "pod lemon" (vs hub's `#EBC400`) |
| `--c-ember` | `#FF3B0D` | Rare dramatic spark (hover/active heat) — sparing |

- **Type:** Geist (UI/body) + **Instrument Serif** pushed forward for cinematic headlines + **JetBrains Mono** for tech accents (episode numbers, timecodes, `// now streaming`).
- **Photography:** guests treated cinematically — dark, rim-light, optional duotone.
- **Bold-broadcast accents:** big uppercase headlines, yellow knockout highlight, a live marquee, pulled quotes in serif italic.

---

## 3. Creative direction — "A + B mix" (cinematic + bold broadcast)

Cinematic dark base (rim-lit guests, serif headlines, restraint) crossed with bold-broadcast energy (huge uppercase type, yellow knockout, marquee). Premium but with real show energy.

**Signature "wow" moment — the interactive guest wall:** a cinematic grid of guest portraits that react to the cursor — hovered guest spotlights/scales, others dim, with a subtle tilt/parallax. This is the homepage centerpiece and the brand's memorable gesture. Degrades to a clean tappable grid on mobile / reduced-motion.

---

## 4. Information architecture

```
/                  flagship home
/episodes          full archive — guest-photo grid + filters
/episodes/[slug]   episode page: YouTube embed, guest, show notes, listen links, pulled quote
/about             the show + host story (the media-company mission)
```
Partner/advertise = homepage CTA + contact link for v1; dedicated page is a later addition.

---

## 5. Home page sections

1. **Hero** — cinematic featured episode: marquee, mono `EP.07`, big uppercase headline w/ yellow knockout, rim-lit guest + play, watch/listen badges, pulled quote bar.
2. **Subscribe everywhere** — prominent YouTube / Spotify / Apple.
3. **Featured episodes** — guest-photo cards (the DOAC device), most-popular / hand-picked, per-card watch/listen.
4. **Interactive guest wall** — the signature moment (§3).
5. **About the show** — mission + host, the media-company framing.
6. **Newsletter** — Substack signup (the transcript-derived newsletter).
7. **Partner / advertise** — sponsor + partner CTA.
8. **Footer** — socials + `← joshualarosa.ai` sibling cross-link.

---

## 6. Episodes — data model

Curated in Supabase (full control over guest, photo, featured/popular, copy) — not auto-pulled from YouTube. ~7 to start.

```sql
episodes (
  id uuid pk default gen_random_uuid(),
  slug text unique not null,
  number int,
  title text not null,
  guest_name text,
  guest_title text,            -- e.g. "Founder, Acme — sold for $40M"
  guest_photo_url text,        -- public bucket
  thumbnail_url text,          -- custom thumbnail
  youtube_url text,
  spotify_url text,
  apple_url text,
  duration text,               -- e.g. "52:14"
  description text,
  show_notes text,             -- markdown
  pull_quote text,
  published_at date,
  featured boolean default false,  -- hero
  popular boolean default false,   -- "most popular" row
  published boolean default false,
  created_at timestamptz default now()
)
```

The **guest wall** is derived from published episodes' `guest_photo_url` + `guest_name`. RLS: public read where `published = true`; writes via Supabase dashboard / service role.

---

## 7. Architecture & stack

- **New Next.js (App Router, TS) app**, its own **repo + Vercel project + domain** (a separate site, like DOAC vs steven.com).
- **Same Supabase project** as the hub (one backend) — new `episodes` table + a public `building-leverage` storage bucket (guest photos, thumbnails).
- **Brand:** reuse the hub's token approach as a **dark-theme** token file; build cinematic components (Hero, EpisodeCard, GuestWall, SubscribeBar, Marquee).
- **Newsletter:** Substack (`buildingleveragepod`) — embed/link for signup; optional capture to the shared `subscribers` table tagged `source = 'building-leverage'`.

---

## 8. Non-functional

- **Responsive** — mobile-first; the guest wall degrades to a static tappable grid; honor `prefers-reduced-motion`.
- **Performance** — lazy-load YouTube embeds (facade/click-to-load), optimized images, ISR for episode data.
- **SEO** — per-episode metadata + OG (guest photo / thumbnail), sitemap, schema.org `PodcastEpisode`.
- **Accessibility** — keyboard-navigable, sufficient contrast on dark, alt text on guest photos, motion-safe fallback.

---

## 9. Out of scope (later)

- Dedicated partner/advertise page, merch/shop, full transcript pages, comments/community.
- Auto-pulling episodes from YouTube; auto guest-photo sourcing.
- The Figma spec/template (next sub-project after this site).

## 10. Open decisions (non-blocking)
- Domain: own domain intended (e.g. `buildingleverage.com`/`.ai`) — confirm + register at go-live; build on Vercel URL first.
- Newsletter: Substack embed vs link-out vs own form → `subscribers` (decide during build).
