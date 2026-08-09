import { useCallback, useRef } from "react";
import { profile, heroStats } from "../data/profile";
import HeroBackground from "../components/HeroBackground";
import { IconArrowRight, IconGitHub, IconLinkedIn } from "../components/Icons";

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
            {profile.taglineParts.map((part, i) => (
              <span key={part} className="pill hero-tagline-pill">
                {part}
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

        <aside className="hero-panel" aria-label="Availability">
          <div className="hero-status-card">
            <span className="dot dot--live" style={{ color: "var(--success)" }} aria-hidden="true" />
            <div>
              <p className="hero-status-title">Open to full-time roles</p>
              <p className="hero-status-sub mono">Cybersecurity · Automotive Security · AI Engineering</p>
            </div>
          </div>

          <div className="hero-link-list">
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="hero-link-item">
              <span>
                <IconGitHub size={14} /> GitHub
              </span>
              <IconArrowRight size={11} />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hero-link-item">
              <span>
                <IconLinkedIn size={14} /> LinkedIn
              </span>
              <IconArrowRight size={11} />
            </a>
          </div>

          <p className="hero-location mono">{profile.location}</p>
        </aside>
      </div>
    </section>
  );
}
