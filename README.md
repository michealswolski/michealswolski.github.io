# michealswolski.github.io

> Micheal Wolski's portfolio — automotive and product cybersecurity, embedded security, and AI agent security. Live at [michealswolski.github.io](https://michealswolski.github.io).

## Overview

A portfolio built to support a job search in automotive and product cybersecurity, embedded security, and adjacent security engineering. Content is organized around verifiable work: every project links to public source, implementation artifacts, or a clearly labeled technical case study — and which of those it is, is stated rather than implied.

## Stack

- React 18 + Vite
- Plain CSS with design tokens (`src/styles/tokens.css`) — no CSS framework
- Self-hosted fonts — zero third-party requests at runtime
- GitHub Pages, deployed via GitHub Actions on every push to `main`

## Features

- Dark-first theme (light mode fully supported, persisted, no flash-of-wrong-theme on load)
- **Skill → project evidence links.** Skills that were used to build something carry a count; pressing one filters the project grid to exactly the projects that used it. Skills without a public repo behind them live in a separate "working knowledge" tier rather than being mixed in.
- **Category filtering** across the featured project grid
- **Proof of Work section** — a native replacement for third-party GitHub stat widgets. Repository and language counts come from the GitHub API at build time; project and test counts are derived at render time from the same data that renders the grid, so they can't drift from what the page shows.
- **Shareable case-study URLs.** Every project has a real page at `/projects/<id>/`, prerendered at build time with its own title, description, canonical URL, and `SoftwareSourceCode` JSON-LD, plus a `<noscript>` copy of the case study. A recruiter can send a single project link and it previews correctly. The modal stays as a quick preview and links through to the full page.
- Accessible project case-study modal — focus trap, `Escape` to close, focus returns to the trigger
- Branded 404, and a résumé CTA in the hero, navbar, and contact section that renders only when `resumeUrl` is set — so there's never a button that 404s
- Scroll-reveal and active-section navigation via `IntersectionObserver`
- `prefers-reduced-motion` respected throughout
- SEO: canonical URL, Open Graph + Twitter card metadata, JSON-LD (`Person`/`WebSite`), `robots.txt`, `sitemap.xml`
- No fabricated data — no placeholder screenshots, no third-party contribution-graph embeds, no unverified metrics

## Project structure

```
src/
  components/     # Navbar, ProjectCard, ProjectModal, SkillChip, GlyphIcon, etc.
  sections/       # Hero, About, Experience, FeaturedProjects, Proof, Skills, Education, Contact
  data/           # profile, experience, education, skills, projects, activity — content lives here
  hooks/          # useScrollReveal, useActiveSection, useTheme, useReducedMotion
  styles/         # fonts.css, tokens.css (design tokens), global.css, components.css
  App.jsx
  main.jsx
scripts/
  fetch-activity.mjs   # regenerates src/data/activity.js from the GitHub API at build time
  prerender.mjs        # per-project HTML, 404.html, and sitemap after vite build
  a11y-check.mjs       # axe-core audit used by CI
  link-check.mjs       # internal link validation over dist/
tests/
  data.test.mjs        # data-integrity tests
public/
  fonts/          # self-hosted latin woff2 subsets
  screenshots/    # real product screenshots, shown in case-study modals
  favicon.svg, apple-touch-icon.png, og-image.png
  robots.txt, sitemap.xml
```

Content changes (a new project, an updated bullet point, a corrected date) should only ever require editing a file under `src/data/` — not touching component markup.

`src/data/activity.js` is generated. Edit `scripts/fetch-activity.mjs` instead; the committed copy is the fallback used when the API is unreachable, so it should always hold real values.

## Skill tiers

`src/data/skills.js` splits skills into two tiers deliberately:

- **Hands-on** — used to build something that shipped. Most entries carry an `evidence` array of project ids, validated against `src/data/projects.js`.
- **Working knowledge** — coursework, research, and internal work with no public repository to point at.

Keeping them separate means an interviewer can tell which is which without asking. When adding a skill, put it in the tier that matches the evidence you can actually show.

## Local development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint      # ESLint
npm run format    # Prettier, check only (format:write to fix)
npm test          # data-integrity tests (node:test)
npm run build     # vite build + prerender
npm run check     # all of the above
```

`npm test` guards the things the components trust but the build doesn't verify:
unique project ids, every skill `evidence` id resolving to a real project,
category colours existing as tokens in `tokens.css`, screenshot files being
present, status values coming from the controlled list, and only private
projects omitting a repository link.

CI (`.github/workflows/ci.yml`) runs those on every pull request, plus an
axe-core audit across both themes at two breakpoints on both the home page and
a case-study page, and an internal-link check over the built output.

## Build

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

To refresh the GitHub activity data locally:

```bash
node scripts/fetch-activity.mjs
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci`, refreshes the activity data, builds with Vite (including the prerender step), and publishes `dist/` to GitHub Pages. The activity refresh fails soft — an unreachable or rate-limited API leaves the committed data in place rather than failing the deploy.

## Accessibility & performance notes

- Verified with axe-core (WCAG 2.1 A + AA) in both themes at 390px and 1440px, on the home page and a case-study page — zero violations, enforced in CI.
- `--text-faint` fails AA by design and is restricted to `aria-hidden` ornament; anything carrying text uses `--text-dim` or stronger.
- Brand colours on skill chips are used only as tint, dot, and border — never as text colour — so chips for near-black and near-white brands keep identical text contrast in both themes.
- No canvas/WebGL effects; all motion is CSS transforms/opacity, gated by `prefers-reduced-motion`.
- Zero runtime third-party requests. Fonts are self-hosted (~132 KB of latin woff2), and React is the only runtime dependency.

---

Built by Micheal Wolski
