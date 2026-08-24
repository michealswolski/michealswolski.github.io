/*
  Runs axe-core against the built site and fails the build on any WCAG 2.1
  A/AA violation.

  Checks both themes and both a phone and a desktop viewport, because several
  of the site's contrast values differ per theme and its layout differs per
  breakpoint — a single pass would miss regressions in the other three.

  Also checks one case-study page, not just the home page, so the routed
  templates stay covered.
*/

import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const axeSource = readFileSync(require.resolve("axe-core"), "utf8");
const PORT = 4319;
const BASE = `http://localhost:${PORT}`;

const { featuredProjects } = await import(pathToFileURL(resolve(root, "src/data/projects.js")).href);
const samplePath = `/projects/${featuredProjects[0].id}/`;

const server = spawn("npx", ["vite", "preview", "--port", String(PORT)], {
  cwd: root,
  stdio: "ignore",
  detached: false,
});

async function waitForServer(timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(BASE);
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error("preview server did not start");
}

const TARGETS = [
  { path: "/", theme: "dark", width: 1440 },
  { path: "/", theme: "light", width: 1440 },
  { path: "/", theme: "dark", width: 390 },
  { path: "/", theme: "light", width: 390 },
  { path: samplePath, theme: "dark", width: 1440 },
  { path: samplePath, theme: "light", width: 390 },
];

let browser;
let failed = 0;

try {
  await waitForServer();
  // CHROMIUM_PATH lets a sandbox or self-hosted runner point at a Chromium it
  // already has, instead of requiring Playwright's exact bundled build.
  browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});

  for (const target of TARGETS) {
    const ctx = await browser.newContext({
      viewport: { width: target.width, height: 900 },
      reducedMotion: "reduce",
    });
    if (target.theme === "light") {
      await ctx.addInitScript(() => localStorage.setItem("mw-theme", "light"));
    }
    const page = await ctx.newPage();
    await page.goto(BASE + target.path, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    await page.addScriptTag({ content: axeSource });

    const violations = await page.evaluate(async () => {
      const result = await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      });
      return result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
      }));
    });

    const label = `${target.path} · ${target.theme} · ${target.width}px`;
    if (violations.length) {
      failed += violations.length;
      console.error(`\n✗ ${label} — ${violations.length} violation(s)`);
      for (const v of violations) {
        console.error(`   [${v.impact}] ${v.id}: ${v.help}`);
        for (const node of v.nodes) console.error(`     ${node}`);
      }
    } else {
      console.log(`✓ ${label} — clean`);
    }
    await ctx.close();
  }
} finally {
  await browser?.close();
  server.kill();
}

if (failed) {
  console.error(`\na11y: ${failed} violation(s) — failing the build`);
  process.exit(1);
}
console.log("\na11y: no WCAG 2.1 A/AA violations");
