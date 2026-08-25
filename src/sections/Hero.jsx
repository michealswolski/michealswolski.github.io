import { useCallback, useRef } from "react";
import { profile, getHeroStats } from "../data/profile";
import { totalProjectCount } from "../data/projects";
import HeroBackground from "../components/HeroBackground";
import SecurityConsole from "../components/SecurityConsole";
import SecurityEmblem from "../components/SecurityEmblem";
import CanWave from "../components/CanWave";
import { IconArrowRight, IconDownload, IconGitHub, IconLinkedIn } from "../components/Icons";

const heroStats = getHeroStats(totalProjectCount);

// One cycle through every role, so each entry's delay can be derived rather
// than hard-coded. Matches the timing the README's hero SVG uses.
const ROLE_HOLD = 4.4;
const ROLE_CYCLE = profile.roles.length * ROLE_HOLD;

export default function Hero() {
  const glowRef = useRef(null);
  const frame = useRef(null);

  const onPointerMove = useCallback((e) => {
    if (frame.current) return;
    const { clientX, clientY, currentTarget } = e;
    frame.current = requestAnimationFrame(() => {
      const rect = currentTarget.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      if (glowRef.current) {
        glowRef.current.style.setProperty("--mx", `${x}%`);
        glowRef.current.style.setProperty("--my", `${y}%`);
      }
      frame.current = null;
    });
  }, []);

  return (
    <section id="home" className="hero" onPointerMove={onPointerMove}>
      <HeroBackground />
      <div ref={glowRef} className="hero-glow" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-main">
          {/* Ornament. Everything it says is said again in readable form below. */}
          <div className="term" aria-hidden="true">
            <div className="term-bar">
              <span className="term-light term-light--red" />
              <span className="term-light term-light--amber" />
              <span className="term-light term-light--green" />
              <span className="term-host mono">{profile.shell.host}</span>
            </div>
            <p className="term-line mono">
              <span className="term-sigil">$</span>
              <span className="term-cmd">{profile.shell.command}</span>
              <span className="term-caret" />
            </p>
          </div>

          <h1 className="hero-name">{profile.name}</h1>
          <span className="hero-rule" aria-hidden="true" />

          {/* The cycle is decoration; this is the copy a screen reader gets. */}
          <p className="visually-hidden">{profile.roles.map((r) => `${r.text} — ${r.detail}.`).join(" ")}</p>
          <div className="hero-roles" aria-hidden="true">
            {profile.roles.map((role, i) => (
              <p
                key={role.text}
                className="hero-role"
                style={{ animationDelay: `${(i * ROLE_HOLD).toFixed(2)}s`, animationDuration: `${ROLE_CYCLE}s` }}
              >
                <span className="hero-role-sigil">&gt;</span>
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

        <aside className="hero-panel" aria-label="What I build">
          <div className="hero-panel-seal" aria-hidden="true">
            <SecurityEmblem variant="watermark" size={520} />
          </div>
          <SecurityConsole />
          <p className="visually-hidden">
            Secure boot and CAN bus controls on the vehicle side, prompt-injection scoring and human approval on the AI
            agent side, and detection rules on the monitoring side.
          </p>
        </aside>

        {/* Its own row inside the flex container rather than a sibling of it,
            so the hero stays one centred block at every width. */}
        <div className="hero-hud">
          <p className="hero-hud-status">
            <span className="dot dot--live" aria-hidden="true" />
            <span className="mono">Open to work</span>
          </p>
          <p className="hero-hud-item mono">{profile.location}</p>
          <p className="hero-hud-item mono">{profile.availability}</p>
          <CanWave />
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
