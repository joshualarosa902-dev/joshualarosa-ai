# Brand System — joshualarosa.ai resource hub

**Date:** 2026-06-16
**Status:** Approved foundation (brand system only — site build, content pipeline, and Building Leverage site are separate specs)
**Owner:** Joshua LaRosa

---

## 1. Context & goal

Joshua is building a content funnel anchored by a **resource hub** at `joshualarosa.ai` — a link-in-bio destination (in the spirit of OpusJake and Steven Bartlett's `steven.com`) where his lead magnets, PDFs, and guides live, newsletter signup happens, and a button points to his podcast site, **Building Leverage** (built later).

**This spec covers only the brand system.** Per Joshua's direction: lock the styles first, ship nothing until the look is approved, then build. The site, the Supabase-backed resource pipeline, and the Building Leverage site each get their own spec afterward.

### Brand pivot
The brand moves **off the old navy/gold "Suits" aesthetic** to a **quiet editorial** identity — warm neutrals, refined type, with yellow as a precise signature accent. (An earlier arcade/yellow-black exploration was rejected for reading "construction/hardware" rather than high-value tech/AI; see §3.)

---

## 2. Brand strategy — "siblings, not twins"

Joshua (the person) is the **parent brand**. Building Leverage is a **sub-brand** (today a podcast, later possibly more). They share DNA but are not identical, mirroring `steven.com` (calm/personal) vs DOAC (loud/show).

| | Resource hub (`joshualarosa.ai`) | Building Leverage (later) |
|---|---|---|
| Role | Personal home base, resource library | The show |
| Surface | **Light-forward**, premium, readable | **Dark, loud**, high-contrast |
| Energy | Confident, calm, premium | Bold, punchy, grabby |
| Shared | Yellow accent · type family · refined voice | (same) |

The hub uses a slightly **deeper yellow** than the podcast's brighter lemon — same family, more refined.

---

## 3. Creative direction — "quiet editorial"

High-value tech/AI brands signal status through **restraint**, not volume. The hub is light-led and editorial: warm neutrals, generous whitespace, hairline details, refined type, and **yellow used like a scalpel** — a single underline, a 6px dot, one accented word, one filled CTA. Never big yellow-on-black blocks (that reads construction/hazard signage).

- **Foundation (everywhere):** bone background, refined Geist type with Instrument Serif italic accents, lots of air, hairline dividers, text-link CTAs, restrained resource cards.
- **Signature accent:** yellow appears only as punctuation — dot, underline, arrow, or a single filled button per view.
- **Dark moment (sparingly):** a refined soft-black hero section (no scanlines/no texture) for high-impact moments; this is also the visual bridge to the dark Building Leverage brand.

---

## 4. Palette

| Token | Hex | Role |
|---|---|---|
| `--c-yellow` | `#EBC400` | Signature accent — dots, underlines, arrows, one filled CTA. **Scalpel, not wallpaper.** |
| `--c-ink` | `#16130B` | Warm near-black — primary text |
| `--c-soft-black` | `#0E0E0E` | Dark-moment hero background |
| `--c-bone` | `#FAF8F3` | Primary page background |
| `--c-white` | `#FFFFFF` | Cards / raised surfaces |
| `--c-muted` | `#8C857A` | Secondary/caption text on light |
| `--c-line` | `#E7E2D6` | Hairlines on light |
| `--c-surface-dark` | `#161513` | Cards on dark |
| `--c-line-dark` | `#262420` | Hairlines on dark |
| `--c-muted-dark` | `#8E8A82` | Secondary text on dark |

Yellow `#EBC400` is the locked accent, calibrated a touch deeper than the podcast's lemon yellow (siblings, not identical). Easily nudged in one place (`tokens.css`).

**Usage rule:** yellow covers a tiny fraction of any view — a dot, an underline, an arrow, or a single filled button. Warm neutrals carry everything else. On dark, body text is off-white `#F4F1EA`, yellow is the only accent.

---

## 5. Typography

| Use | Typeface | Notes |
|---|---|---|
| Display / headings / UI / body | **Geist** (400/500/600) | Modern, refined grotesque — reads "well-funded AI startup." Mixed case, tight tracking, medium weight |
| Editorial accent | **Instrument Serif** (italic) | One word per headline — the "quiet luxury" flourish (e.g. *build*) |

Both free (Google Fonts), web + PDF safe. **Mixed case, not all-caps. Medium weight, not heavy** — restraint reads premium. Anton/JetBrains Mono from the rejected arcade direction are dropped.

---

## 6. Logo / wordmark

- **Primary wordmark:** `joshualarosa.ai` — lowercase, heavy weight, with `.ai` reversed out of a yellow highlight box.
- **Companion mark:** `JL` monogram in a yellow rounded square — for avatars, favicons, social.
- No symbol/icon logo (the earlier Pac-Man motif is **dropped**).

---

## 7. Signature devices & motifs

1. **Scalpel underline** — a 2px yellow underline under one word (usually the serif accent).
2. **Accent dot** — a 6px yellow dot preceding category labels, eyebrows, list items.
3. **Yellow arrow** — `→` / `↓` on CTAs, the only color in an otherwise mono link.
4. **One filled CTA per view** — a single yellow button; everything else is text-link or hairline-ghost.
5. **Category label** — accent dot + letter-spaced uppercase muted text (e.g. "· PDF · 12 PP"), replacing the rejected mono terminal tag.

**Texture/finish:** flat warm surfaces, hairline (1px) dividers, generous whitespace. No halftone, no scanlines, no heavy fills — restraint is the finish.

---

## 8. Component primitives

- **Buttons:** primary (yellow bg / ink text), inverse (ink bg / yellow text), ghost (ink outline). Pill radius for CTAs, `6px` for inline.
- **Resource card:** cover/thumb, title (Inter 700), meta line, monospace category tag, download button.
- **Tag/pill:** monospace, `> PDF` / `> PROMPT` style.
- **Highlight, knockout box, marquee bar** (bold yellow scrolling strip for B-moment accents).

### Scale
- **Spacing:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px.
- **Radius:** `--r-sm 6px`, `--r-md 10px`, `--r-lg 16px`, `--r-pill 999px`.

---

## 9. Design tokens (to be codified as `brand/tokens.css`)

```css
:root {
  --c-yellow:#EBC400; --c-ink:#16130B; --c-soft-black:#0E0E0E;
  --c-bone:#FAF8F3; --c-white:#FFFFFF; --c-muted:#8C857A; --c-line:#E7E2D6;
  --c-surface-dark:#161513; --c-line-dark:#262420; --c-muted-dark:#8E8A82;
  --font-display:'Geist',sans-serif; --font-ui:'Geist',sans-serif;
  --font-body:'Geist',sans-serif; --font-serif:'Instrument Serif',serif;
  --r-sm:6px; --r-md:8px; --r-lg:14px;
  --s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px;
  --s-5:24px; --s-6:40px; --s-7:64px; --s-8:96px;
}
```

These tokens become the single source of truth — the Vercel site imports them, and a Figma-ready spec sheet mirrors them so the site and Figma never drift.

---

## 10. Deliverables (this brand-system phase)

1. `brand/tokens.css` — design tokens.
2. A brand style-guide page (HTML) demonstrating palette, type, components, motifs — also serves as the living reference.
3. Figma-ready spec sheet (the values above, organized for drop-in).
4. Reusable component styles (buttons, cards, tags, highlight, knockout box) the site will consume.

---

## 11. Out of scope (separate specs)

- The resource hub site itself (layout, pages, sections).
- The Supabase-backed resource pipeline (auto-populating resources/PDFs).
- Newsletter signup integration (Substack).
- The Building Leverage podcast site (built after the hub ships).
- ManyChat integration — **not needed** (emails are exported to Substack manually).
- Custom AI-generated graphics/textures — produced during implementation via the `design` / `banner-design` skills.
