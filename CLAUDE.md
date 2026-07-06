# Project: brandonidas.github.io

## Stack Constraints
- **HTML-only pages** — no build step, no backend, no bundler, no SSR.
- CSS lives in `<style>` blocks inside each HTML file, or in a single flat `.css` file loaded via `<link>`. No preprocessors (Sass, Less, PostCSS).
- JavaScript is plain vanilla JS or small CDN-delivered libraries (e.g. Alpine.js, GSAP, Anime.js). No React, no build-time transpilation, no `npm run` required to view the site.
- Dependencies must be loaded from a CDN `<script>` tag or downloaded as a single file into the repo — never via a module bundler.
- The site must open correctly by double-clicking `index.html` (file:// protocol) AND via GitHub Pages (https://).

## Authoring Rules
- Keep each HTML file self-contained; avoid splitting logic across too many files.
- Prefer CSS custom properties (`--var`) over repeated literal values.
- No TypeScript, no JSX, no templating engines.
- When adding a new page, link it from `index.html`; do not create orphan pages.

## Design Direction
- Palantir-inspired: dark-mode-first, monochrome + single accent, dense information layout.
- Retain existing aesthetic elements: cryptic unicode runes, monospace display type, typewriter/fade-in animations.
- Full style guide is in `STYLE_GUIDE.md`.

## Legal Safety — Content Rules
- All copy on this site is public-facing and represents Brandon personally. Keep everything legally safe.
- Do NOT reference NDAs, confidentiality agreements, or imply knowledge of classified or protected information in any content, including non-professional commentary.
- Do NOT name specific clients beyond what is already publicly stated in Brandon's LinkedIn/resume.
- Do NOT include specific internal metrics, pricing, or deal terms beyond what Brandon has explicitly approved for public use.
- When writing witty or personal commentary, keep it self-deprecating and professionally innocuous — no statements that could be read as disparaging clients, employers, or colleagues.
- When in doubt about whether a piece of content is safe to publish, flag it to Brandon rather than including it.
