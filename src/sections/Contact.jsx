import SectionHeader from "../components/SectionHeader";
import { profile } from "../data/profile";
import { IconArrowUpRight, IconDownload, IconGitHub, IconLinkedIn, IconMail } from "../components/Icons";

export default function Contact() {
  return (
    <section id="contact" className="section section--alt contact-section">
      <div className="container contact-inner">
        <SectionHeader eyebrow="Contact" title="Hiring for automotive, product, or embedded security?" />
        <p className="contact-sub">
          I&rsquo;m a recent graduate looking for full-time work in automotive and product cybersecurity, embedded
          security, and adjacent security engineering. LinkedIn is the fastest way to reach me; GitHub has the source
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
      </div>
    </section>
  );
}
