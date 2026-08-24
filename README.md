# michealswolski.github.io

> Micheal Wolski's portfolio — cybersecurity, with a specialty focus in AI agents and automotive/embedded systems. Live at [michealswolski.github.io](https://michealswolski.github.io).

## Overview

A single-page portfolio built to support cybersecurity job searches, weighted toward AI security and automotive/embedded roles. Content is organized around real, verifiable work — every featured project links to an inspectable public repository unless it's explicitly marked as a private or public-safe case study.

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
- Accessible project case-study modal — focus trap, `Escape` to close, focus returns to the trigger
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

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci`, refreshes the activity data, builds with Vite, and publishes `dist/` to GitHub Pages. The activity refresh fails soft — an unreachable or rate-limited API leaves the committed data in place rather than failing the deploy.

## Accessibility & performance notes

- Verified with axe-core (WCAG 2.1 A + AA) in both themes at 390px and 1440px — zero violations.
- `--text-faint` fails AA by design and is restricted to `aria-hidden` ornament; anything carrying text uses `--text-dim` or stronger.
- Brand colours on skill chips are used only as tint, dot, and border — never as text colour — so chips for near-black and near-white brands keep identical text contrast in both themes.
- No canvas/WebGL effects; all motion is CSS transforms/opacity, gated by `prefers-reduced-motion`.
- Zero runtime third-party requests. Fonts are self-hosted (~132 KB of latin woff2), and React is the only runtime dependency.

---
Built by Micheal Wolski
