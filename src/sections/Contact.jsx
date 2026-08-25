import SectionHeader from "../components/SectionHeader";
import { profile } from "../data/profile";
import SecurityEmblem from "../components/SecurityEmblem";
import { IconArrowUpRight, IconDownload, IconGitHub, IconLinkedIn, IconMail } from "../components/Icons";

export default function Contact() {
  return (
    <section id="contact" className="section section--alt contact-section">
      <div className="container contact-inner">
        <SectionHeader command="./connect" title="Hiring for security engineering?" />
        <p className="contact-sub">
          I&rsquo;m a recent graduate looking for full-time cybersecurity work — automotive and embedded security, AI
          agent security, and detection and response. LinkedIn is the fastest way to reach me; GitHub has the source
          behind everything above.
        </p>
        <div className="contact-links">
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="btn btn-secondary">
              <IconMail size={16} />
              Email
            </a>
          )}
          {profile.resumeUrl && (
            <a href={profile.resumeUrl} className="btn btn-secondary" download>
              <IconDownload size={16} />
              Résumé
            </a>
          )}
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <IconGitHub size={16} />
            GitHub
            <IconArrowUpRight />
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <IconLinkedIn size={16} />
            LinkedIn
            <IconArrowUpRight />
          </a>
        </div>

        <div className="contact-seal">
          <SecurityEmblem size={168} />
          <p className="contact-motto mono">
            {profile.motto.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </p>
          <p className="contact-tagline">{profile.tagline}</p>
        </div>
      </div>
    </section>
  );
}
