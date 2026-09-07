import { profile, getHeroStats } from "../data/profile";
import { totalProjectCount } from "../data/projects";
import { IconArrowRight, IconDownload, IconGitHub, IconLinkedIn } from "../components/Icons";

const heroStats = getHeroStats(totalProjectCount);

// One cycle through every role, so each entry's delay can be derived rather
// than hard-coded.
const ROLE_HOLD = 4.4;
const ROLE_CYCLE = profile.roles.length * ROLE_HOLD;

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-main">
          {profile.openToWork && (
            <p className="hero-status">
              <span className="dot dot--live" aria-hidden="true" />
              Open to work
              <span className="hero-status-sep" aria-hidden="true">
                ·
              </span>
              {profile.location}
              <span className="hero-status-sep" aria-hidden="true">
                ·
              </span>
              {profile.availability}
            </p>
          )}

          <h1 className="hero-name">{profile.name}</h1>

          {/* The cycle is decoration; this is the copy a screen reader gets. */}
          <p className="visually-hidden">{profile.roles.map((r) => `${r.text} — ${r.detail}.`).join(" ")}</p>
          <div className="hero-roles" aria-hidden="true">
            {profile.roles.map((role, i) => (
              <p
                key={role.text}
                className="hero-role"
                style={{ animationDelay: `${(i * ROLE_HOLD).toFixed(2)}s`, animationDuration: `${ROLE_CYCLE}s` }}
              >
                <span className="hero-role-text">{role.text}</span>
                <span className="hero-role-detail">{role.detail}</span>
              </p>
            ))}
          </div>

          <p className="hero-tagline">{profile.tagline}</p>

          <p className="hero-summary">{profile.heroSummary}</p>

          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              View Projects
              <IconArrowRight />
            </a>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} className="btn btn-secondary" download>
                <IconDownload size={15} />
                Download Résumé
              </a>
            )}
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <IconGitHub size={15} />
              GitHub
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <IconLinkedIn size={15} />
              LinkedIn
            </a>
          </div>

          <dl className="hero-stats">
            {heroStats.map((s) => (
              <div key={s.label} className="hero-stat">
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About section">
        <span className="scroll-cue-track">
          <span className="scroll-cue-dot" />
        </span>
        <span className="mono">Scroll</span>
      </a>
    </section>
  );
}
