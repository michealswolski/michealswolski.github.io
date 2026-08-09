import SectionHeader from "../components/SectionHeader";
import { profile } from "../data/profile";
import { IconArrowUpRight, IconGitHub, IconLinkedIn } from "../components/Icons";

export default function Contact() {
  return (
    <section id="contact" className="section section--alt contact-section">
      <div className="container contact-inner">
        <SectionHeader eyebrow="Contact" title="Interested in cybersecurity, automotive security, AI, or software engineering work?" />
        <p className="contact-sub">
          I'm a recent graduate actively looking for full-time roles. The fastest way to reach me is LinkedIn — GitHub has the source behind everything above.
        </p>
        <div className="contact-links">
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
