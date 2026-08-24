/*
  Verifies that every internal link in the built site resolves.

  Catches the failure mode this site is most exposed to: content lives in
  src/data, so a renamed project id or a moved asset produces a link that looks
  fine in review and 404s in production. External URLs are not fetched — CI
  should not fail because someone else's server is having a bad day — but their
  shape is checked by the data tests.

  Dependency-free on purpose; it reads the dist/ output directly.
*/

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");

if (!existsSync(dist)) {
  console.error("link-check: dist/ not found — run the build first");
  process.exit(1);
}

function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

/** Resolve a root-relative URL to the file that would serve it. */
function resolves(url) {
  const path = url.split("#")[0].split("?")[0];
  if (path === "" || path === "/") return existsSync(resolve(dist, "index.html"));
  const rel = path.replace(/^\//, "").replace(/\/$/, "");
  return (
    existsSync(resolve(dist, rel)) ||
    existsSync(resolve(dist, `${rel}.html`)) ||
    existsSync(resolve(dist, rel, "index.html"))
  );
}

const pages = htmlFiles(dist);
const failures = [];
let checked = 0;

for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const label = page.slice(dist.length + 1);

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    // Skip anything that isn't a root-relative path into this site.
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    checked += 1;
    if (!resolves(url)) failures.push(`${label} → ${url}`);
  }
}

if (failures.length) {
  console.error(`link-check: ${failures.length} broken internal link(s):`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}

console.log(`link-check: ${checked} internal links across ${pages.length} pages all resolve`);
