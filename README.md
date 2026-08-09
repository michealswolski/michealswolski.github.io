# michealswolski.github.io

> Micheal Wolski's portfolio — cybersecurity, automotive security, and AI/software engineering. Live at [michealswolski.github.io](https://michealswolski.github.io).

## Overview

A single-page portfolio built to support cybersecurity, automotive/product-security, and AI/software engineering job searches. Content is organized around real, verifiable work — every featured project links to an inspectable public repository unless it's explicitly marked as a private case study.

## Stack

- React 18 + Vite
- Plain CSS with design tokens (`src/styles/tokens.css`) — no CSS framework
- GitHub Pages, deployed via GitHub Actions on every push to `main`

## Features

- Dark-first theme (light mode fully supported, persisted, no flash-of-wrong-theme on load)
- Scroll-reveal and active-section navigation via `IntersectionObserver`
- Accessible project case-study modal — focus trap, `Escape` to close, focus returns to the trigger
- `prefers-reduced-motion` respected throughout
- SEO: canonical URL, Open Graph + Twitter card metadata, JSON-LD (`Person`/`WebSite`), `robots.txt`, `sitemap.xml`
- No fabricated data — no placeholder screenshots, no synthetic "contribution graph," no unverified metrics

## Project structure

```
src/
  components/     # Navbar, ProjectCard, ProjectModal, ExperienceTimeline, etc.
  sections/       # Hero, About, Experience, FeaturedProjects, Skills, Education, Contact
  data/           # profile, experience, education, skills, projects — content lives here
  hooks/          # useScrollReveal, useActiveSection, useTheme, useReducedMotion
  styles/         # tokens.css (design tokens), global.css, components.css
  App.jsx
  main.jsx
public/
  favicon.svg, apple-touch-icon.png, og-image.png
  robots.txt, sitemap.xml
```

Content changes (a new project, an updated bullet point, a corrected date) should only ever require editing a file under `src/data/` — not touching component markup.

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

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci`, builds with Vite, and publishes `dist/` to GitHub Pages.

## Accessibility & performance notes

- Verified with axe-core across both themes, desktop and mobile, at 320–1920px — no violations at the time of writing.
- No canvas/WebGL effects; all motion is CSS transforms/opacity, gated by `prefers-reduced-motion`.
- Single external network dependency at runtime is Google Fonts (preconnected); the rest of the app has zero runtime dependencies beyond React.

---
Built by Micheal Wolski
