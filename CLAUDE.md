# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

`brandonidas.github.io` — Brandon Tong's personal GitHub Pages site. It's a
plain HTML/CSS/JS static site (no framework, no bundler for the main page),
plus a couple of small self-contained sub-projects/PWAs living in their own
subdirectories.

Read **STYLE_GUIDE.md** before making visual or code-style changes — it
documents the site's conventions (naming, CSS/JS style, tone) in detail and
should be treated as the source of truth for "does this fit the site."

## Layout

- `index.html` — the main page (resume/landing page, typewriter intro,
  collapsible bio sections). This is the primary thing most visitors see.
- `app.js`, `like_button.js`, `name_card.js` — root-level scripts loaded by
  `index.html`.
- `src/` — JSX sources compiled via Babel CLI into root-level JS. Build with:
  ```
  npx babel --watch src --out-dir . --presets react-app/prod
  ```
- `bbt-pwa/` — a standalone PWA ("Big Button Timer"), fully self-contained
  with its own `index.html`, `manifest.json`, `service-worker.js`, `icons/`.
- `blog/` — long-form posts. `blog/index.html` lists posts from a plain JS
  array; `blog/style.css` is the shared theme; `blog/template.html` is the
  copy-paste starting point for a new post; posts live in `blog/posts/` as
  `YYYY-MM-DD-slug.html`. See STYLE_GUIDE.md's "Blog" section for the full
  add-a-post checklist.
- `babel_jsx_demo.html`, `line_animation_demo.html` — standalone demo pages,
  not linked into the main site nav; leave them as scratch/reference unless
  asked to change them.
- `package.json` — only declares `babel-cli` / `babel-preset-react-app` for
  compiling `src/`. There is no test suite and no other build tooling.

## Working in this repo

- There's no build/test/lint command beyond the Babel watch command above.
  Don't invent npm scripts, CI, or a bundler setup unless asked.
- Since this is a GitHub Pages site, paths inside a subdirectory project must
  be absolute from the domain root (e.g. `/bbt-pwa/manifest.json`), not
  relative — see the "added gh pages specific paths" commit for precedent.
- Preserve the site's hand-rolled, personal character. Don't refactor
  commented-out code, old-school patterns (`var`, `React.createElement`), or
  inline styles into "modern best practice" unless that's the actual task.
- New mini-projects/subpages should be self-contained in their own
  subdirectory, following the pattern in `bbt-pwa/` (see STYLE_GUIDE.md for
  the checklist).
- This is a low-stakes personal site — still avoid unnecessary destructive
  git operations, but there's no production user base to worry about beyond
  the site's actual visitors.
