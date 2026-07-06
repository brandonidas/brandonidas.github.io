# Style Guide — brandonidas.github.io
### Palantir-Inspired Personal Site

---

## 0. Guiding Principle: Show, Don't Tell

The Palantir aesthetic works because it *presents* information the way an analyst tool would — structured, dense, deliberate — rather than decorating sparse text with sci-fi chrome. This site already has real content (education, work, military service, writing). The goal is to organise that content like an ops dashboard, so the layout itself signals competence. Every visual choice below is in service of that.

---

## 1. Existing Elements to Keep

These are load-bearing parts of the current site's identity. Do not remove them.

| Element | Current form | Notes |
|---|---|---|
| **Typewriter intro** | `typeWriter()` in `app.js`, types "Hi, I'm Brandon" | Retain; keep it fast (≤ 50 ms/char) |
| **Cursor blink** | `.blink_me_on_off` CSS animation | Keep the step-blink, not a smooth fade |
| **Fade-in reveal** | `unfadeByID("manifest")` | Content behind the intro, fades in after typing |
| **Animated underline** | `lineByIDAndLength("line", ...)` | Grows to match `#top_bar` width |
| **Cryptic runes** | `☆ ☇ ⛇ ⛕ ⛗` and similar Unicode | Use as decorative punctuation and section markers |
| **Monospace display type** | `'Andale Mono', 'Courier New', monospace` for `.big_text` | Keep for the hero/intro; extend to data labels |
| **Personal toggle** | Checkbox reveals non-professional commentary | Retain the mechanism; restyle the toggle |
| **Section-card layout** | `.card_center` bordered cards per section | Keep the card metaphor; refine borders to Palantir spec |

---

## 2. Color System

Replace the current ad-hoc black/white/green with a strict token set. One accent, everything else is a gray ramp.

```css
:root {
  /* Surfaces */
  --pt-black:      #1E2124;   /* primary dark surface, near-black */
  --pt-surface-2:  #26292D;   /* card/panel backgrounds */
  --pt-surface-3:  #2E3237;   /* elevated panels, hover states */

  /* Text */
  --pt-text:       #DBDBDB;   /* primary body text */
  --pt-text-muted: #B9B9B9;   /* secondary labels, metadata */
  --pt-text-dim:   #767676;   /* disabled, timestamps, footnotes */

  /* Borders */
  --pt-border:     #3A3E42;   /* default panel border */
  --pt-border-mid: #767676;   /* active/focused border */

  /* Single accent — use sparingly */
  --pt-accent:     #0000EE;   /* links, active states, high-signal labels */

  /* Legacy semantic aliases for the existing site */
  --color-bg:      var(--pt-black);
  --color-text:    var(--pt-text);
  --color-border:  var(--pt-border);
  --color-accent:  var(--pt-accent);
}
```

**Rules:**
- `--pt-accent` appears in at most one element per visual cluster (one link, one active indicator). Do not use it for decoration.
- The current `green` outline (`.green_outline`) maps to `--pt-accent` — replace it.
- Pure `#000000` and pure `#FFFFFF` are banned; use the ramp.
- No gradients. No shadow colors other than `rgba(0,0,0,0.4)`.

---

## 3. Typography

Two typefaces, three roles. No third typeface.

### Typeface Stack

```css
:root {
  /* Display / hero — existing monospace, keep it */
  --font-display: 'Andale Mono', 'Courier New', monospace;

  /* Body / prose */
  --font-body: 'IBM Plex Sans', 'Inter', system-ui, sans-serif;

  /* Data / labels / metadata / timestamps */
  --font-mono: 'IBM Plex Mono', 'JetBrains Mono', 'Courier New', monospace;
}
```

Load via CDN (no build step required):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500&display=swap" rel="stylesheet">
```

### Type Scale

| Class / role | Font | Size | Weight | Use for |
|---|---|---|---|---|
| `.hero` | `--font-display` | `clamp(40px, 12vw, 75px)` | 400 | Typewriter intro ("Hi, I'm Brandon") |
| `h2` / section headers | `--font-body` | `13px` | 500 | Section labels, all-caps, letter-spaced |
| `.body` / `div` | `--font-body` | `14px` | 400 | Prose content |
| `.label` / metadata | `--font-mono` | `11px` | 400 | Dates, tags, runes, small UI text |
| `.small_text` | `--font-body` | `13px` | 400 | Secondary content |
| `.tiny_text` | `--font-mono` | `10px` | 400 | Footnotes, disclaimers |

**Rules:**
- Section headers are `text-transform: uppercase; letter-spacing: 0.12em;` — never title-cased.
- Body text at 14px reads as "operational"; do not increase to 17–18px (that reads as "blog").
- Dates, coordinates, version numbers, and the cryptic rune labels use `--font-mono` exclusively.
- Line height for body: `1.5`. For mono/data labels: `1.3`.

---

## 4. Layout and Information Density

### Core Grid

```css
.page-wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px;
}
```

Target whitespace ratio: **30–40%** of screen. This is lower than a typical portfolio (which runs 60%+), and it is what makes the layout read as dense-and-organised rather than airy.

### Section Structure (F-shaped hierarchy)

```
┌─────────────────────────────────────────────────────────┐
│  [CORNER: NAME + NAV LINKS]          [CORNER: RUNE + DATE]│
├─────────────────────────────────────────────────────────┤
│  [HERO: typewriter text, large monospace]                │
├─────────────────────────────────────────────────────────┤
│  [MANIFEST: card grid, 1–2 columns]                     │
│   ┌──────────────┐  ┌──────────────┐                   │
│   │ Education    │  │ Work         │                   │
│   ├──────────────┤  ├──────────────┤                   │
│   │ Teaching     │  │ Military     │                   │
│   └──────────────┘  └──────────────┘                   │
├─────────────────────────────────────────────────────────┤
│  [FOOTER: tiny_text footnotes, runes]                   │
└─────────────────────────────────────────────────────────┘
```

- Primary navigation lives **top-left** (name + links).
- High-signal metadata (date, rune) lives **top-right**.
- Content scans left-to-right, then down — no centered headings.
- Cap visible cards per view to **~8**. If more content exists, paginate or collapse behind a toggle.

### Heading Hierarchy

Two tiers only. No `h3`–`h6` used as visual size anchors.

- **Tier 1 (page header):** the single largest text on the view — the `.hero` typewriter text.
- **Tier 2 (section header):** `h2`-sized, small-caps, with a `--pt-border` rule beneath it. Use the `&rdsh;` arrow or a rune as a prefix (already present in the HTML).

---

## 5. Component Vocabulary

Four elevation states, communicated via border and shadow only — never color fill changes.

| State | CSS | Meaning |
|---|---|---|
| **Borderless** | no border | Least-important supporting content |
| **Bordered** | `border: 1px solid var(--pt-border)` | Default card/panel |
| **Elevated** | `border: 1px solid var(--pt-border-mid); box-shadow: 0 2px 8px rgba(0,0,0,0.4)` | Active or focused panel |
| **Recessed** | `box-shadow: inset 0 1px 3px rgba(0,0,0,0.5)` | Filter, secondary control, toggle track |

### Cards (`.card_center`)

```css
.card {
  border: 1px solid var(--pt-border);
  padding: 16px 20px;
  background: var(--pt-surface-2);
  /* no border-radius — square corners signal precision */
}
.card:hover {
  border-color: var(--pt-border-mid);
  box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
```

No `border-radius`. Square corners are a deliberate signal of precision, not an omission.

### Links

```css
a {
  color: var(--pt-accent);
  text-decoration: none;
}
a:hover {
  background: var(--pt-accent);
  color: var(--pt-black);
}
```

The current invert-on-hover (`background: black; color: white`) maps cleanly to this — just swap to the token.

### Toggle (personal commentary switch)

Retain the mechanism. Restyle using `--pt-border` for the track and `--pt-accent` for the checked state:

```css
input:checked + .slider { background-color: var(--pt-accent); }
.slider { background-color: var(--pt-border); }
```

### Animated Underline (`#line`)

Keep the `lineByIDAndLength` animation. Update color to `var(--pt-accent)` instead of `black`.

---

## 6. Animations

Keep the existing three animations. Do not add more.

| Animation | Keep? | Notes |
|---|---|---|
| Typewriter intro | Yes | Existing `typeWriter()` — no changes needed |
| Cursor blink (step) | Yes | `.blink_me_on_off` — step-start, not ease |
| Fade-in reveal | Yes | `unfadeByID()` — opacity 0.1 → 1, exponential |
| Line grow | Yes | `lineByIDAndLength()` — 1ms interval |
| Particle effects | No | Not present; do not add |
| Glitch / scanlines | No | Not present; do not add |
| Terminal typing (looping quotes) | Deferred | `quotesTypeWriter()` is stubbed; implement only if content warrants it |

**Rule:** if an animation does not carry information, it is decoration. The four above all carry information (content is loading / content is available / a boundary exists). A fifth animation must justify itself on the same grounds.

---

## 7. Cryptic Runes — Usage System

The runes are a signature element. Standardise their roles so they mean something:

| Rune | Unicode | Assigned role |
|---|---|---|
| `☆` | U+2606 | Section opener (currently `⛉` in Education) |
| `⚛` | U+269B | Technical / engineering content |
| `♕` | U+2655 | Academic / intellectual content |
| `⚄` | U+2684 | Statistics / data content |
| `☂` | U+2602 | Location / place marker |
| `⚖` | U+2696 | Evaluation / awards / ratings |
| `⛆` | U+26C6 | Misc / wildcard |
| `☇` | U+2607 | Alert / high-signal callout |

Use one rune per card header, immediately before the section name in `.label` size. Do not cluster multiple runes together (the current "MOAR CRYPTIC RUNES" line is aspirational; in production, assign one rune per context and let scarcity create meaning).

---

## 8. What Not to Do

Directly from Palantir's own design guidelines, restated for this site:

- No particle effects, no canvas starfields, no WebGL backgrounds.
- No glitch animations, scanline overlays, or CRT effects.
- No rainbow or multi-accent color schemes.
- No centered headings (left-align everything).
- No `border-radius` on cards or panels.
- No more than **two typefaces** loaded.
- No `!important` declarations.
- No inline `style=""` attributes for anything other than dynamic JS-set values.
- No `box-shadow` with a color other than `rgba(0,0,0,N)`.

---

## 9. File Conventions

Per `CLAUDE.md`: HTML-only, no build step.

```
brandonidas.github.io/
├── index.html          # main page, self-contained styles in <style>
├── style.css           # shared tokens (CSS custom properties only)
│                       # loaded via <link> in every HTML file
├── app.js              # shared animation utilities
├── STYLE_GUIDE.md      # this file
├── CLAUDE.md           # project instructions for Claude Code
└── bbt-pwa/            # separate PWA sub-project, own scope
```

`style.css` contains only the CSS custom property declarations from Section 2 and the base resets. Component styles stay in each HTML file's `<style>` block so each page remains self-contained.

---

## 10. Quick-Reference Tokens

```css
/* Copy this block into any new HTML file's <style> or into style.css */

:root {
  --pt-black:      #1E2124;
  --pt-surface-2:  #26292D;
  --pt-surface-3:  #2E3237;
  --pt-text:       #DBDBDB;
  --pt-text-muted: #B9B9B9;
  --pt-text-dim:   #767676;
  --pt-border:     #3A3E42;
  --pt-border-mid: #767676;
  --pt-accent:     #0000EE;

  --font-display: 'Andale Mono', 'Courier New', monospace;
  --font-body:    'IBM Plex Sans', 'Inter', system-ui, sans-serif;
  --font-mono:    'IBM Plex Mono', 'JetBrains Mono', 'Courier New', monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: var(--pt-black);
  color: var(--pt-text);
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.5;
}
```
