# Style Guide

This site is a personal, hand-rolled GitHub Pages site — not a framework app.
It's meant to feel like a personal artifact: minimal, a little raw, a little
weird, with visible seams (commented-out old code, inline scripts, ASCII/unicode
flourishes). Preserve that character; don't "clean it up" into a generic
modern site unless asked.

## Project shape

- Root `index.html` is the main page: a resume/landing page with a typewriter
  intro and collapsible "manifest" section (education, work, teaching,
  military service, high school).
- Subdirectories (e.g. `bbt-pwa/`) are self-contained mini-projects/PWAs, each
  with its own `index.html`, `manifest.json`, `service-worker.js`, and icons.
  Treat each as its own little world — don't leak its styling back into the
  root site or vice versa.
- `blog/` is the exception to "no shared CSS between projects" — it's a set
  of prose pages, not a one-off mini-app, so its posts intentionally share
  one theme. See "Blog" below.
- `src/` holds JSX sources that get compiled with Babel CLI into plain JS at
  the repo root (see comment at the bottom of `index.html`):
  ```
  npx babel --watch src --out-dir . --presets react-app/prod
  ```
- No bundler, no build step for the main site. React/ReactDOM/Babel-standalone
  and jQuery are loaded via CDN `<script>` tags directly in HTML. Keep it that
  way — don't introduce webpack/vite/npm build tooling for the root site
  without being asked.
- Deployed via GitHub Pages, so asset paths inside a subproject should be
  absolute from the domain root (e.g. `/bbt-pwa/manifest.json`,
  `/bbt-pwa/icons/icon-192.png`), not relative — GitHub Pages serves
  subdirectories at real sub-paths.

## HTML/CSS

- Plain `<style>` blocks in the `<head>` or inline in the page; no CSS
  framework, no CSS-in-JS, no preprocessor.
- The main site's visual language: black-and-white, monospace (`Andale Mono`,
  `Courier New`) for the big hero text, serif (`Cochin`, `Cambria`, `Georgia`)
  for body copy. `a:hover` inverts to a solid black background / white text.
- Newer sub-projects (e.g. `bbt-pwa`) are allowed their own distinct palette
  and font (e.g. a Google Font, navy/green/red states) — they don't need to
  match the root site's black-and-white look. Match the *existing* file's
  palette when editing it, don't retrofit the root site's colors onto it.
- Class naming has drifted over the site's history: older/root-site CSS uses
  `snake_case` classes (`card_center`, `small_text`, `blink_me`), while newer
  sub-projects use `kebab-case` (`action-zone`, `split-zone`). Follow whatever
  convention the file you're editing already uses; don't mix the two within
  one file.
- Layout is simple flow/flexbox with `margin: auto` centering and `max-width`
  caps (`.center`, `.card_center`, `.maxed`) — no CSS grid, no framework
  breakpoints. Responsive sizing favors `min()`/`max()` with `vw` units over
  media queries (e.g. `font-size: max(min(12vw, 75px), 40px)`).

## JavaScript

- Vanilla DOM APIs (`document.getElementById`, `classList`, `innerHTML`),
  plain `<script>` tags, no modules/imports, no build step for the root site.
  jQuery is available but rarely used directly.
- Root-site JS uses `var` and function declarations, `snake_case`-ish
  identifiers for DOM ids/classes but `camelCase` for functions
  (`typeWriter`, `classByString`, `lineByIDAndLength`). Newer scripts
  (`bbt-pwa`) use `const`/`let` and more modern syntax (template literals,
  arrow functions). Match the era of the file you're touching.
- React usage is old-school (`React.createElement`, React 17 via CDN,
  `ReactDOM.render`) in `like_button.js` / `name_card.js`. Don't upgrade
  these to hooks/JSX/newer React versions unless asked — they're intentionally
  small demos, not the site's main architecture.
- It's normal and expected to see commented-out blocks of old code left in
  place as a kind of history/scratch log. Don't delete them as "cleanup"
  unless the task is specifically about tidying — ask first if unsure.

## Tone / content

- Copy is personal and informal, with dry humor and self-aware asides (e.g.
  "*DO NOT TURN ON IF YOU ARE A RECRUITER*", "MOAR CRYPTIC RUNES", aspiring to
  look like Palantir's site or "something that belongs on West World").
  Keep new copy in that voice — first person, a little wry, not corporate.
- Unicode/ASCII symbols (☖ ⚛ ♕ ♔ ⚕ etc.) are used decoratively inline with
  text. This is a deliberate aesthetic choice, not clutter to remove.

## Blog

`blog/` holds long-form posts that don't fit on the one-screen resume
homepage. Structure:

- `blog/style.css` — the one shared theme for the index, the template, and
  every post. Serif body text (matching the root site), monospace for
  titles/nav, black-and-white, `a:hover` inverts — same visual language as
  the root site but tuned for reading instead of a landing-page hero.
- `blog/index.html` — lists posts. Posts are plain data: a `posts` array of
  `{ title, date, file }` literals rendered into a list, sorted by date. No
  build step, no CMS — just edit the array.
- `blog/template.html` — copy-paste starting point for a new post. Not a
  real post itself and not listed in `index.html`.
- `blog/posts/*.html` — the actual posts, named `YYYY-MM-DD-slug.html`.

To add a post:
1. Copy `blog/template.html` to `blog/posts/YYYY-MM-DD-slug.html`.
2. Fill in the title, date, and content.
3. Add a matching `{ title, date, file }` entry to the `posts` array in
   `blog/index.html`.

Every blog page links `/blog/style.css` with an absolute path (same
GitHub-Pages-subdirectory reasoning as `bbt-pwa/`), and includes the same
`site-nav` (`Home | Blog`) at the top.

## When adding a new mini-project/subpage

1. Give it its own subdirectory (mirror the `bbt-pwa/` pattern) with its own
   `index.html` and any assets it needs.
2. If it should be a PWA, include a `manifest.json`, a `service-worker.js`,
   and icons, using absolute paths rooted at `/<subdir>/...`.
3. Keep it self-contained — its own `<style>`/`<script>` blocks, no shared
   CSS/JS files with the root site unless there's a real reason to share.
4. It's fine for it to look and feel different from the root site.
