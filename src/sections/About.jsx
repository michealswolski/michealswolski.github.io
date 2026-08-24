import SectionHeader from "../components/SectionHeader";
import { profile } from "../data/profile";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function About() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader command="./whoami --verbose" title="Who I am" />
        <div ref={ref} className="about-body reveal" data-visible={visible}>
          <p className="about-lead">{profile.leadIn}</p>
          {profile.aboutParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="about-exploring">
            <span className="mono about-exploring-label">Currently exploring</span>
            <div className="skill-chip-row">
              {profile.currentlyExploring.map((item) => (
                <span key={item} className="skill-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
