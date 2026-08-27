import SectionHeader from "../components/SectionHeader";
import { profile } from "../data/profile";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function About() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader command="./whoami --verbose" glyph="terminal" accent="accent" title="Who I am" />
        <div ref={ref} className="about-layout reveal" data-visible={visible}>
          <div className="about-body">
            <p className="about-lead">{profile.leadIn}</p>
            {profile.aboutParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Fills the third of the section the prose column left empty, and
              gives the current work a place of its own instead of trailing the
              biography as a footnote. */}
          <aside className="about-rail">
            <div className="about-exploring">
              <span className="mono about-exploring-label">Currently building</span>
              <div className="skill-chip-row">
                {profile.currentlyExploring.map((item) => (
                  <span key={item} className="skill-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
