/*
  Regenerates src/data/activity.js from the public GitHub API.

  Runs at build time (see .github/workflows/deploy.yml) rather than in the
  browser, so visitors make no third-party request and never see a rate-limit
  error where a number should be.

  Fails soft on purpose: if the API is unreachable or rate-limited, the script
  logs and exits 0, leaving the committed data in place. A portfolio that still
  deploys with slightly stale numbers beats a portfolio that fails to deploy.
*/

import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const USER = "michealswolski";
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../src/data/activity.js");

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": `${USER}-portfolio-build`,
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function getJson(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

async function main() {
  const repos = [];
  for (let page = 1; page <= 5; page += 1) {
    const batch = await getJson(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner&page=${page}`);
    repos.push(...batch);
    if (batch.length < 100) break;
  }

  const active = repos.filter((r) => !r.fork && !r.archived);

  // Language counts come from repos GitHub actually classified. Doc- and
  // research-only repos have a null language and are excluded rather than
  // bucketed into a misleading "Other".
  const languageCounts = {};
  for (const r of active) {
    if (!r.language) continue;
    languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
  }
  const languages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  const lastPush = active
    .map((r) => r.pushed_at)
    .filter(Boolean)
    .sort()
    .at(-1);

  const data = {
    publicRepos: active.length,
    archivedRepos: repos.filter((r) => r.archived).length,
    languages,
    lastPush: lastPush ? lastPush.slice(0, 10) : null,
    generatedAt: new Date().toISOString().slice(0, 10),
    source: "github-api",
  };

  writeFileSync(OUT, render(data));
  console.log(`activity: wrote ${active.length} repos, last push ${data.lastPush}`);
}

function render(data) {
  return `/*
  GENERATED FILE — do not edit by hand.

  Written by scripts/fetch-activity.mjs at build time from the public GitHub
  API. The committed copy is the fallback used when the API is unreachable, so
  it should always contain real values rather than placeholders.
*/

export const activity = ${JSON.stringify(data, null, 2)};
`;
}

main().catch((err) => {
  console.warn(`activity: refresh skipped (${err.message}); keeping committed data`);
  try {
    // Touch nothing, but confirm the fallback is present and parseable.
    readFileSync(OUT, "utf8");
  } catch {
    console.error("activity: no committed fallback found at src/data/activity.js");
    process.exit(1);
  }
});
