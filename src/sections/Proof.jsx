import { useMemo } from "react";
import SectionHeader from "../components/SectionHeader";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { featuredProjects, secondaryProjects, SECURITY_DOMAINS, hasPublishedSource } from "../data/projects";
import { activity } from "../data/activity";
import { profile } from "../data/profile";
import { IconArrowUpRight, IconGitHub } from "../components/Icons";

/*
  A native replacement for the third-party GitHub stat widgets.

  Two sources, both real: the repository counts and language split come from the
  GitHub API, refreshed at build time by scripts/fetch-activity.mjs; the project
  and test counts are derived at render time from the same data that renders the
  project grid above, so they can't drift from what the page actually shows.
*/

const DATE_FMT = { year: "numeric", month: "short", day: "numeric" };

function formatDate(iso) {
  if (!iso) return null;
  // Parse as UTC noon so the rendered day doesn't shift by timezone.
  const d = new Date(`${iso}T12:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString("en-US", DATE_FMT);
}

export default function Proof() {
  const [ref, visible] = useScrollReveal();

  const { allProjects, testTotal, sourceCount, domains } = useMemo(() => {
    const all = [...featuredProjects, ...secondaryProjects];
    const tests = all.reduce((n, p) => n + (p.metrics?.tests || 0), 0);
    const withSource = all.filter(hasPublishedSource).length;

    // Grouped by security domain rather than by the per-project category:
    // twelve of the projects share the "Systems" category, so a category
    // breakdown says almost nothing about the shape of the work.
    const ordered = SECURITY_DOMAINS.map((d) => ({ ...d, count: d.ids.length })).sort((a, b) => b.count - a.count);

    return { allProjects: all, testTotal: tests, sourceCount: withSource, domains: ordered };
  }, []);

  const languageTotal = activity.languages.reduce((n, l) => n + l.count, 0);
  // Only ever shown when the build actually reached the API. The committed
  // fallback is marked stale, and a date that has been sitting in git for weeks
  // is worse than no date: it reads as live proof of activity and isn't.
  const lastPush = activity.stale ? null : formatDate(activity.lastPush);

  const stats = [
    { value: testTotal, label: "Passing tests across public projects", note: "counted from their test suites" },
    { value: sourceCount, label: "Projects with published source", note: "implementation, not just a README" },
    { value: domains.length, label: "Security domains covered", note: "automotive through AI security" },
  ];

  return (
    <section id="proof" className="section section--alt proof-section">
      <div className="container">
        <SectionHeader
          command="./stats --source github"
          glyph="chip"
          accent="success"
          title="Proof of Work"
          subtitle="Depth rather than volume. Counts come from this page's own project data and from GitHub at build time — not screenshots of a dashboard."
        />

        <div ref={ref} className="reveal" data-visible={visible}>
          <div className="proof-stats">
            {stats.map((s) => (
              <div key={s.label} className="proof-stat">
                <div className="proof-stat-value">{s.value}</div>
                <div className="proof-stat-label">{s.label}</div>
                <div className="proof-stat-note mono">{s.note}</div>
              </div>
            ))}
          </div>

          <div className="proof-panels">
            <div className="proof-panel">
              <h3 className="proof-panel-title">Where the work sits</h3>
              <p className="proof-panel-sub">
                Every project on this page, grouped by security domain. Two lanes, one discipline — the threat model
                changes, the rigour does not.
              </p>
              <ul className="proof-bars">
                {domains.map((d) => (
                  <li key={d.name} className="proof-bar-row" style={{ "--cat": d.color }}>
                    <span className="proof-bar-label">{d.name}</span>
                    <span className="proof-bar-track">
                      <span className="proof-bar-fill" style={{ width: `${(d.count / allProjects.length) * 100}%` }} />
                    </span>
                    <span className="proof-bar-value mono">{d.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="proof-panel">
              <h3 className="proof-panel-title">Repository languages</h3>
              <p className="proof-panel-sub">
                As classified by GitHub. Research and documentation repositories carry no language and are left out
                rather than lumped into an &ldquo;other&rdquo; bucket.
              </p>
              {languageTotal > 0 ? (
                <>
                  <div
                    className="proof-langbar"
                    role="img"
                    aria-label={activity.languages.map((l) => `${l.name}: ${l.count} repositories`).join(", ")}
                  >
                    {activity.languages.map((l, i) => (
                      <span
                        key={l.name}
                        className="proof-langbar-seg"
                        style={{ width: `${(l.count / languageTotal) * 100}%`, "--i": i }}
                      />
                    ))}
                  </div>
                  <ul className="proof-langlist">
                    {activity.languages.map((l, i) => (
                      <li key={l.name} style={{ "--i": i }}>
                        <span className="proof-langdot" aria-hidden="true" />
                        {l.name}
                        <span className="mono">{l.count}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="proof-panel-sub">Language data unavailable at last build.</p>
              )}

              <div className="proof-meta mono">
                <span>
                  {activity.publicRepos} public repositories
                  {lastPush && ` · last push ${lastPush}`}
                </span>
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="proof-meta-link">
                  <IconGitHub size={13} />
                  View on GitHub
                  <IconArrowUpRight size={11} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
