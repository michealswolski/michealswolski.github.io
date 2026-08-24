/*
  Emits a real HTML file for every case study, plus the GitHub Pages 404.

  Why this exists: GitHub Pages serves static files, so a request for
  /projects/ai-agent-governance/ would 404 without a file there — the route
  would only work by clicking through from the home page, which defeats the
  point of having shareable URLs.

  Rather than the usual 404-redirect hack (which flashes, loses the URL for a
  moment, and gives crawlers nothing), each project gets its own copy of
  index.html with its own <title>, description, canonical, Open Graph tags,
  and SoftwareSourceCode JSON-LD baked in. Crawlers and link unfurlers read the
  correct metadata without running any JavaScript; the SPA then boots and
  renders the matching route.

  Run after `vite build` — see the `build` script in package.json.
*/

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const SITE = "https://michealswolski.github.io";

const { featuredProjects, secondaryProjects } = await import(pathToFileURL(resolve(root, "src/data/projects.js")).href);
const { profile } = await import(pathToFileURL(resolve(root, "src/data/profile.js")).href);

const shell = readFileSync(resolve(dist, "index.html"), "utf8");

function escapeAttr(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Replace the content of a meta/link tag matched by an attribute selector. */
function setTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`prerender: expected tag not found for ${pattern}`);
  }
  return html.replace(pattern, replacement);
}

function pageFor(project) {
  const url = `${SITE}/projects/${project.id}/`;
  const title = `${project.title} — ${profile.name}`;
  const desc = project.summary;

  let html = shell;
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(title)}</title>`);
  html = setTag(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeAttr(desc)}" />`
  );
  html = setTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  html = setTag(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  html = setTag(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeAttr(title)}" />`
  );
  html = setTag(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeAttr(desc)}" />`
  );
  html = setTag(
    html,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`
  );
  html = setTag(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeAttr(desc)}" />`
  );

  // Project-level structured data, in addition to the site-wide Person/WebSite
  // graph already in the shell.
  const ld = {
    "@context": "https://schema.org",
    "@type": project.links?.github ? "SoftwareSourceCode" : "CreativeWork",
    name: project.title,
    description: desc,
    url,
    author: { "@type": "Person", name: profile.name, url: `${SITE}/` },
    ...(project.links?.github ? { codeRepository: project.links.github } : {}),
    ...(project.tech?.length ? { programmingLanguage: project.tech } : {}),
  };
  html = html.replace(
    "</head>",
    `  <script type="application/ld+json">\n${JSON.stringify(ld, null, 2)}\n    </script>\n  </head>`
  );

  // Crawler- and no-JS-readable content. The SPA replaces #root on boot, so
  // this never double-renders for a normal visitor.
  const d = project.detail || {};
  const sections = [
    ["Problem", d.problem],
    [project.status === "in-progress" ? "What I'm Building" : "What I Built", d.whatIBuilt],
    ["Architecture & Approach", d.architecture],
    ["Challenges & Decisions", d.challenges],
    ["What I Learned", d.whatILearned],
  ].filter(([, body]) => body);

  const noscript = [
    `<h1>${escapeAttr(project.title)}</h1>`,
    `<p>${escapeAttr(desc)}</p>`,
    ...sections.map(([h, body]) => `<h2>${escapeAttr(h)}</h2><p>${escapeAttr(body)}</p>`),
    project.links?.github ? `<p><a href="${project.links.github}">Source repository</a></p>` : "",
    `<p><a href="${SITE}/">Back to the portfolio</a></p>`,
  ].join("\n      ");

  return html.replace(
    '<div id="root"></div>',
    `<div id="root"></div>\n    <noscript>\n      ${noscript}\n    </noscript>`
  );
}

let count = 0;
const all = [...featuredProjects, ...secondaryProjects];
for (const project of all) {
  const dir = resolve(dist, "projects", project.id);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, "index.html"), pageFor(project));
  count += 1;
}

// Any other unknown path falls back to the SPA shell, which renders the
// branded 404 for whatever pathname it sees.
writeFileSync(resolve(dist, "404.html"), shell);

// Keep the sitemap in step with the routes that actually exist.
const today = new Date().toISOString().slice(0, 10);
const urls = [
  `  <url>\n    <loc>${SITE}/</loc>\n    <lastmod>${today}</lastmod>\n    <priority>1.0</priority>\n  </url>`,
  ...all.map(
    (p) =>
      `  <url>\n    <loc>${SITE}/projects/${p.id}/</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.7</priority>\n  </url>`
  ),
];
writeFileSync(
  resolve(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`
);

console.log(`prerender: ${count} case-study pages, 404.html, sitemap with ${urls.length} urls`);
