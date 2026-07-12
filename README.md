# michealswolski.github.io

> Personal portfolio — **Micheal Wolski**, Automotive Cybersecurity, Digitalization &amp; AI
> Live at [michealswolski.github.io](https://michealswolski.github.io)

A refined, enterprise/automotive-styled portfolio: charcoal + teal design system, restrained motion, and a focus on credible, accurate content.

## Sections
- Hero, About, and focus areas
- Experience — Bosch Mobility (public summary only) and earlier roles
- Projects — Bosch case studies, current builds, automotive & academic work, and security labs, with category filtering and detail modals
- Skills (grouped by function), Education, Professional Development, and "Currently Exploring"
- Print-friendly résumé (Save-as-PDF from the browser print dialog)
- Contact

## Tech Stack
- React 18 + Vite
- Content lives in `src/data.js`; UI/theme in `src/App.jsx`
- SEO/OpenGraph/Twitter + JSON-LD in `index.html`; `robots.txt`, `sitemap.xml`, custom `404.html`, and OG image in `public/`
- GitHub Pages, auto-deployed via GitHub Actions
- No CSS frameworks — custom styling; dark/light theme; reduced-motion and keyboard-accessible

## Updating content
Edit the exported objects in **`src/data.js`** — `P` (profile), `EXPERIENCE`, `PROJECTS`, `SKILLS`, `EDU`, `CERTS`, `DEVELOPMENT`, `EXPLORING`, `SOCIALS`. Each project supports `status`, `featured`, `cat` (filter categories), and an optional public `link`.

## Local Development
```bash
npm install
npm run dev
```

## Deploy
Push to `main` — GitHub Actions builds and deploys to GitHub Pages.

---
Built by Micheal Wolski
