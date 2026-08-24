/*
  Data-integrity tests.

  Almost all of this site's content lives in src/data, and the components trust
  it: a typo in an evidence id silently produces a skill chip that filters to
  nothing, a missing category colour renders an invisible badge, and a renamed
  screenshot leaves a broken image. None of that fails the build, so it gets
  caught here instead.

  Uses node:test — no test framework dependency for a suite this size.
*/

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const load = (rel) => import(pathToFileURL(resolve(root, rel)).href);

const {
  featuredProjects,
  secondaryProjects,
  secondaryGroups,
  CATEGORY_COLORS,
  totalProjectCount,
  REPOS_WITH_PUBLISHED_SOURCE,
} = await load("src/data/projects.js");
const { skillTiers, skillEvidenceMap } = await load("src/data/skills.js");
const { profile, getHeroStats } = await load("src/data/profile.js");
const { education, professionalDevelopment, professionalDevelopmentGroups } = await load("src/data/education.js");
const { boschExperience, additionalExperience } = await load("src/data/experience.js");

const allProjects = [...featuredProjects, ...secondaryProjects];
const projectIds = new Set(allProjects.map((p) => p.id));
const VALID_STATUS = new Set(["public", "case-study", "private", "in-progress"]);
const tokensCss = readFileSync(resolve(root, "src/styles/tokens.css"), "utf8");

test("every project id is unique", () => {
  const seen = new Set();
  const dupes = [];
  for (const p of allProjects) {
    if (seen.has(p.id)) dupes.push(p.id);
    seen.add(p.id);
  }
  assert.deepEqual(dupes, [], `duplicate project ids: ${dupes.join(", ")}`);
});

test("every project has the fields the cards render", () => {
  for (const p of allProjects) {
    assert.ok(p.id, "missing id");
    assert.ok(p.title, `${p.id}: missing title`);
    assert.ok(p.category, `${p.id}: missing category`);
    assert.ok(p.summary, `${p.id}: missing summary`);
    assert.ok(Array.isArray(p.tech) && p.tech.length > 0, `${p.id}: missing tech`);
    assert.ok(p.links && typeof p.links === "object", `${p.id}: missing links object`);
  }
});

test("every featured project has a full case study", () => {
  for (const p of featuredProjects) {
    assert.ok(p.detail, `${p.id}: featured projects need a detail block`);
    assert.ok(p.detail.problem, `${p.id}: detail.problem missing`);
    assert.ok(p.detail.whatIBuilt, `${p.id}: detail.whatIBuilt missing`);
    assert.ok(Array.isArray(p.highlights) && p.highlights.length > 0, `${p.id}: highlights missing`);
  }
});

test("status values come from the controlled list", () => {
  for (const p of featuredProjects) {
    if (p.status === undefined) continue;
    assert.ok(VALID_STATUS.has(p.status), `${p.id}: unknown status "${p.status}"`);
  }
});

test("only private projects may omit a repository link", () => {
  for (const p of allProjects) {
    if (p.links?.github) continue;
    assert.equal(p.status, "private", `${p.id}: no github link but status is "${p.status}"`);
    assert.ok(p.privateLabel, `${p.id}: private projects need a privateLabel`);
  }
});

test("every repository link points at the right account over https", () => {
  for (const p of allProjects) {
    for (const key of ["github", "githubSecondary", "demo"]) {
      const url = p.links?.[key];
      if (!url) continue;
      const parsed = new URL(url);
      assert.equal(parsed.protocol, "https:", `${p.id}.${key}: not https`);
      if (parsed.hostname === "github.com") {
        // Repository links carry the account in the first path segment.
        assert.match(parsed.pathname, /^\/michealswolski\//i, `${p.id}.${key}: not the right account`);
      } else {
        // Pages links carry the account in the hostname instead.
        assert.equal(parsed.hostname, "michealswolski.github.io", `${p.id}.${key}: unexpected host`);
      }
    }
  }
});

test("every category used has a colour, and every colour token is defined", () => {
  for (const p of allProjects) {
    const value = CATEGORY_COLORS[p.category];
    assert.ok(value, `${p.id}: category "${p.category}" has no colour`);
  }
  for (const [name, value] of Object.entries(CATEGORY_COLORS)) {
    const token = /var\((--[a-z0-9-]+)\)/.exec(value)?.[1];
    assert.ok(token, `${name}: colour is not a token reference`);
    assert.ok(tokensCss.includes(`${token}:`), `${name}: token ${token} is not defined in tokens.css`);
  }
});

test("every screenshot file exists and is described", () => {
  for (const p of allProjects) {
    if (!p.screenshot) continue;
    assert.ok(p.screenshot.src?.startsWith("/"), `${p.id}: screenshot src must be root-relative`);
    assert.ok(
      existsSync(resolve(root, "public", p.screenshot.src.replace(/^\//, ""))),
      `${p.id}: screenshot file missing at public${p.screenshot.src}`
    );
    assert.ok(p.screenshot.alt?.length > 10, `${p.id}: screenshot needs descriptive alt text`);
  }
});

test("project metrics are non-negative integers", () => {
  for (const p of allProjects) {
    if (!p.metrics) continue;
    for (const [key, value] of Object.entries(p.metrics)) {
      assert.ok(Number.isInteger(value) && value >= 0, `${p.id}.metrics.${key}: ${value}`);
    }
  }
});

test("every skill evidence reference points at a real project", () => {
  for (const tier of skillTiers) {
    for (const group of tier.groups) {
      for (const item of group.items) {
        for (const id of item.evidence || []) {
          assert.ok(projectIds.has(id), `skill "${item.name}" references unknown project "${id}"`);
        }
      }
    }
  }
});

test("skill names are unique within a tier and brands are valid hex", () => {
  for (const tier of skillTiers) {
    const seen = new Set();
    for (const group of tier.groups) {
      for (const item of group.items) {
        assert.ok(!seen.has(item.name), `${tier.id}: duplicate skill "${item.name}"`);
        seen.add(item.name);
        if (item.brand) {
          assert.match(item.brand, /^#[0-9A-Fa-f]{6}$/, `skill "${item.name}": bad brand colour`);
        }
      }
    }
  }
});

test("the evidence map matches the skills that declare evidence", () => {
  const declared = skillTiers
    .flatMap((t) => t.groups.flatMap((g) => g.items))
    .filter((i) => i.evidence?.length)
    .map((i) => i.name);
  assert.equal(Object.keys(skillEvidenceMap).length, new Set(declared).size);
});

test("secondary groups contain every secondary project exactly once", () => {
  const grouped = secondaryGroups.flatMap((g) => g.projects.map((p) => p.id));
  assert.equal(grouped.length, secondaryProjects.length);
  assert.equal(new Set(grouped).size, grouped.length, "a project appears in two groups");
});

test("the total project count matches the rendered lists", () => {
  assert.equal(totalProjectCount, allProjects.length);
  assert.equal(getHeroStats(totalProjectCount)[2].value, String(allProjects.length));
});

test("published-source set only names real projects", () => {
  for (const id of REPOS_WITH_PUBLISHED_SOURCE) {
    assert.ok(projectIds.has(id), `published-source set names unknown project "${id}"`);
  }
});

test("profile links are https and the résumé is either unset or root-relative", () => {
  for (const [key, url] of Object.entries(profile.socials)) {
    assert.equal(new URL(url).protocol, "https:", `socials.${key}`);
  }
  if (profile.resumeUrl !== null) {
    assert.ok(profile.resumeUrl.startsWith("/"), "resumeUrl must be root-relative");
    assert.ok(
      existsSync(resolve(root, "public", profile.resumeUrl.replace(/^\//, ""))),
      `resumeUrl set but no file at public${profile.resumeUrl}`
    );
  }
  assert.ok(profile.aboutParagraphs.length >= 3, "About should carry a real summary");
  assert.equal(profile.focusAreas.length, 3, "hero renders three focus pills");
});

test("professional development groups reference real entries, and none are orphaned", () => {
  const byId = new Map(professionalDevelopment.map((item) => [item.id, item]));
  const referenced = professionalDevelopmentGroups.flatMap((g) => g.ids);
  for (const id of referenced) {
    assert.ok(byId.has(id), `professional development group references unknown id "${id}"`);
  }
  assert.equal(
    new Set(referenced).size,
    professionalDevelopment.length,
    "every entry must appear in exactly one group"
  );
});

test("education and experience carry the fields their cards render", () => {
  for (const item of education) {
    assert.ok(item.degree && item.school && item.status, "incomplete education entry");
  }
  assert.ok(boschExperience.role && boschExperience.company, "bosch entry incomplete");
  assert.ok(boschExperience.categories.length > 0, "bosch entry has no categories");
  for (const job of additionalExperience) {
    assert.ok(job.role && job.company && job.period, "incomplete earlier-experience entry");
  }
});
