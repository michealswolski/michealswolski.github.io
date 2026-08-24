import { useCallback, useRef } from "react";
import { profile, getHeroStats } from "../data/profile";
import { totalProjectCount } from "../data/projects";
import HeroBackground from "../components/HeroBackground";
import { IconArrowRight, IconArrowUpRight, IconDownload, IconGitHub, IconLinkedIn } from "../components/Icons";

const heroStats = getHeroStats(totalProjectCount);

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
          <div className="hero-tagline-row">
            <span className="pill hero-tagline-pill hero-tagline-pill--primary">{profile.identity}</span>
            {profile.focusAreas.map((area) => (
              <span key={area} className="pill hero-tagline-pill hero-tagline-pill--secondary">
                {area}
              </span>
            ))}
          </div>

          <h1 className="hero-name">{profile.name}</h1>

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

        <aside className="hero-panel" aria-label="Current status">
          <div className="hero-status-card">
            <span className="dot dot--live" aria-hidden="true" />
            <div>
              <p className="hero-status-title">Open to full-time roles</p>
              <p className="hero-status-sub mono">Automotive &amp; product security · full-time · Michigan or remote</p>
            </div>
          </div>

          <dl className="hero-readout">
            <div>
              <dt className="mono">Focus</dt>
              {/* Rendered as separate items rather than one joined string so a
                  narrow panel wraps between focus areas instead of inside
                  "Full-Stack". */}
              <dd className="hero-readout-tags">
                {profile.focusAreas.map((area) => (
                  <span key={area}>{area}</span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="mono">Based</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt className="mono">Degree</dt>
              <dd>B.S. Information Assurance &amp; Cyber Defense</dd>
            </div>
          </dl>

          <div className="hero-link-list">
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="hero-link-item">
              <span>
                <IconGitHub size={14} /> GitHub
              </span>
              <IconArrowUpRight size={11} />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hero-link-item">
              <span>
                <IconLinkedIn size={14} /> LinkedIn
              </span>
              <IconArrowUpRight size={11} />
            </a>
          </div>
        </aside>
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
