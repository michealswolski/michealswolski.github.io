import SectionHeader from "../components/SectionHeader";
import EducationCard from "../components/EducationCard";
import { education, professionalDevelopment } from "../data/education";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Education() {
  const [devRef, devVisible] = useScrollReveal();
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeader eyebrow="Education" title="Academic Background" />
        <div className="grid grid-2 edu-grid">
          {education.map((item, i) => (
            <EducationCard key={item.school} item={item} index={i} />
          ))}
        </div>

        <div className="eyebrow prof-dev-eyebrow">Professional Development</div>
        <div ref={devRef} className="prof-dev-grid reveal" data-visible={devVisible}>
          {professionalDevelopment.map((item) => (
            <div key={item.title} className="prof-dev-item">
              <span className="dot" style={{ color: "var(--accent)" }} aria-hidden="true" />
              <div>
                <p className="prof-dev-title">{item.title}</p>
                <p className="prof-dev-note">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
