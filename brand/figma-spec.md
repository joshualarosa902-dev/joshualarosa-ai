# joshualarosa.ai — Figma spec sheet (v2 · quiet editorial)

Drop-in values for rebuilding the brand in Figma. Mirrors `tokens.css` exactly — if a value changes, change it in both. Direction: light-led editorial, warm neutrals, yellow as a scalpel accent.

## Color styles
| Figma style name | Hex | Use |
|---|---|---|
| `brand/yellow` | #EBC400 | Signature accent — dots, underlines, arrows, one CTA |
| `brand/ink` | #16130B | Warm near-black — text |
| `brand/soft-black` | #0E0E0E | Dark-moment hero background |
| `brand/bone` | #FAF8F3 | Primary page background |
| `brand/white` | #FFFFFF | Cards / raised surfaces |
| `brand/muted` | #8C857A | Captions (light) |
| `brand/line` | #E7E2D6 | Hairline (light) |
| `brand/surface-dark` | #161513 | Cards (dark) |
| `brand/line-dark` | #262420 | Hairline (dark) |
| `brand/muted-dark` | #8E8A82 | Captions (dark) |

## Text styles
| Figma style name | Font | Size | Weight | Case |
|---|---|---|---|---|
| `display/hero` | Geist | 60 (34 mobile) | Medium 500 | Sentence |
| `display/h1` | Geist | 44 (28) | Medium 500 | Sentence |
| `display/h2` | Geist | 32 (22) | Medium 500 | Sentence |
| `ui/h3` | Geist | 18 | SemiBold 600 | Sentence |
| `body/base` | Geist | 16 | Regular 400 | Sentence |
| `body/small` | Geist | 13 | Medium 500 | Sentence |
| `eyebrow` | Geist | 11 | Medium 500 | UPPERCASE, tracking 0.2em |
| `accent/serif` | Instrument Serif | matches headline | Italic 400 | Sentence |

Mixed case throughout (except eyebrows). Display leans medium weight + tight tracking (-0.02em) — restraint reads premium.

## Radius
`sm` 6 · `md` 8 · `lg` 14 (no pills — pills read chunky)

## Spacing scale
4 · 8 · 12 · 16 · 24 · 40 · 64 · 96 (generous — whitespace is the look)

## Component anatomy
- **btn-accent** — single filled yellow button per view. Ink text, radius 8, pad 11×18, Geist 500, trailing `→`.
- **btn-ghost** — transparent, 1px line border, radius 8, pad 10×18.
- **btn-link** — text + 1px underline + yellow trailing arrow. The default CTA.
- **Resource card** — 250 wide, white fill, 1px line, radius 14, pad 24. Top: accent dot + uppercase muted label. Title Geist 500/18 (tight). Desc small/muted. Footer: `Download ↓` link (yellow arrow).
- **Scalpel underline** — 2px yellow under one (usually serif-italic) word.
- **Accent dot** — 6px yellow circle before labels/eyebrows.

## Surfaces
- **Light (default)** — bone #FAF8F3, flat, hairline dividers, lots of air.
- **Dark moment** — soft-black #0E0E0E, off-white #F4F1EA text, yellow the only accent. No textures, no scanlines. Used sparingly for the hero / podcast bridge.
