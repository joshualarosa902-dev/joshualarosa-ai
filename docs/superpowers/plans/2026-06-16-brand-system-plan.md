# Implementation Plan — Brand System (joshualarosa.ai)

**Date:** 2026-06-16
**Spec:** `../specs/2026-06-16-brand-system-design.md`
**Goal:** Produce the brand-system deliverables so the resource-hub site can be built on a locked, reusable foundation. Stack-agnostic (plain CSS + static HTML) so it ports cleanly into the eventual Next.js + Vercel + Supabase site.

---

## Project layout

```
~/joshualarosa-ai/
  brand/
    tokens.css          # design tokens (single source of truth)
    components.css      # reusable component styles built on tokens
    style-guide.html    # living reference page (also the visual sign-off)
    figma-spec.md       # Figma-ready spec sheet (values organized for drop-in)
    assets/             # wordmark SVGs, JL monogram, favicon
  docs/superpowers/{specs,plans}/
```

---

## Phase 1 — Tokens (`brand/tokens.css`)
1. Encode all color tokens, font families, radius scale, spacing scale from spec §9.
2. Add `@import` (or `<link>`) for Google Fonts: Anton, Inter, JetBrains Mono.
3. Add semantic aliases (e.g. `--bg`, `--text`, `--accent`, `--surface`) mapping to primitives, so light/dark sections can flip cleanly.

**Done when:** tokens.css is importable and every value in the spec is represented.

## Phase 2 — Component styles (`brand/components.css`)
Build on tokens, no hard-coded values:
1. Buttons — primary (yellow/ink), inverse (ink/yellow), ghost (ink outline).
2. Resource card — thumb, title, meta, monospace category tag, download button.
3. Devices — highlighter span, white knockout box, monospace `>` tag/pill, marquee bar.
4. Surface helpers — `.surface-light` (paper + faint halftone) and `.surface-dark` (ink + scanlines), the latter carrying the B-moment treatment.

**Done when:** each primitive renders correctly on both light and dark surfaces.

## Phase 3 — Wordmark + assets (`brand/assets/`)
1. `joshualarosa.ai` wordmark as SVG (lowercase, heavy, yellow `.ai` box).
2. `JL` monogram (yellow rounded square) + favicon export.
3. Decide display-type approach for the wordmark (web font vs outlined SVG for pixel-perfection).

**Done when:** wordmark + monogram exist as crisp SVGs usable at any size.

## Phase 4 — Living style guide (`brand/style-guide.html`)
1. Single page pulling tokens.css + components.css.
2. Sections: palette, type scale, wordmark, buttons, cards, devices/motifs, light vs dark surfaces, the B-moment hero (boot screen).
3. This page is the **visual sign-off** for the brand and the ongoing reference.

**Done when:** the page renders the full system and Joshua approves it visually (I'll preview it locally).

## Phase 5 — Figma-ready spec sheet (`brand/figma-spec.md`)
1. Color styles (name → hex), text styles (name → font/size/weight/case), effect/spacing tokens — organized for fast recreation in Figma.
2. Component anatomy notes (button, card, tag) so Figma components match the CSS.

**Done when:** the sheet can be rebuilt in Figma without guesswork, mirroring the code tokens.

---

## Verification
- Open `style-guide.html` locally and confirm: fonts load, yellow reads correctly on black and white, all components render on both surfaces, no hard-coded colors in components.css.
- Sanity-check token names are consistent between tokens.css and figma-spec.md.

## Out of scope (next specs)
Resource-hub site pages/layout · Supabase resource pipeline · Substack signup · Building Leverage site · AI-generated custom graphics.

## Open question (not blocking phase 1)
Site framework for the next phase — recommend **Next.js** (best fit for Vercel + Supabase + auto-populating resources). The brand CSS ports in as-is regardless.
