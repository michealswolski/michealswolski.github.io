import { profile, getHeroStats } from "../data/profile";
import { totalProjectCount } from "../data/projects";
import { IconArrowRight, IconGitHub, IconLinkedIn } from "../components/Icons";
import { projectPath } from "../hooks/useRoute";

const heroStats = getHeroStats(totalProjectCount);
const highlights = [
  ["automotive-ecu-lab", "01", "Automotive ECU Cybersecurity Lab", "Firmware trust · simulation"],
  ["autosbom-sentinel", "02", "AutoSBOM Sentinel", "Software inventory · signed baselines"],
  ["ai-agent-governance", "03", "AI Agent Governance Dashboard", "Audit trails · human review"],
];

export default function Hero() {
  return (
    <section id="home" className="hero portfolio-hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-inner portfolio-hero-inner">
        <div className="hero-main">
          <p className="hero-status">
            <span className="portfolio-kicker-mark" aria-hidden="true" />
            {profile.location}
          </p>
          <h1 className="hero-name">{profile.name}</h1>
          <p className="portfolio-hero-title">{profile.tagline}</p>
          <p className="hero-summary">{profile.heroSummary}</p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              Explore projects <IconArrowRight />
            </a>
            <a href={profile.socials.github} className="btn btn-secondary">
              <IconGitHub size={15} /> GitHub
            </a>
            <a href={profile.socials.linkedin} className="btn btn-secondary">
              <IconLinkedIn size={15} /> LinkedIn
            </a>
          </div>
          <dl className="hero-stats">
            {heroStats.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <aside className="portfolio-index" aria-label="Project highlights">
          <div className="portfolio-index-header">
            <h2>Project index</h2>
            <span className="mono">03 PROJECTS</span>
          </div>
          <ol>
            {highlights.map(([id, number, title, description]) => (
              <li key={id}>
                <a href={projectPath(id)}>
                  <span className="portfolio-index-number mono" aria-hidden="true">
                    {number}
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <small>{description}</small>
                  </span>
                  <IconArrowRight />
                </a>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
