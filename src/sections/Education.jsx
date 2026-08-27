import SectionHeader from "../components/SectionHeader";
import EducationCard from "../components/EducationCard";
import { education, professionalDevelopment, professionalDevelopmentGroups } from "../data/education";
import { useScrollReveal } from "../hooks/useScrollReveal";

const byId = Object.fromEntries(professionalDevelopment.map((item) => [item.id, item]));

export default function Education() {
  const [devRef, devVisible] = useScrollReveal();
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeader command="./verify --credentials" glyph="shield" accent="warning" title="Academic Background" />
        <div className="grid grid-2 edu-grid">
          {education.map((item, i) => (
            <EducationCard key={item.school} item={item} index={i} />
          ))}
        </div>

        <div className="eyebrow prof-dev-eyebrow">Professional Development</div>
        <div ref={devRef} className="reveal" data-visible={devVisible}>
          {professionalDevelopmentGroups.map((group) => (
            <div key={group.title} className="prof-dev-group">
              <h3 className="prof-dev-group-title">{group.title}</h3>
              <div className="prof-dev-grid">
                {group.ids
                  .map((id) => byId[id])
                  .filter(Boolean)
                  .map((item) => (
                    <div key={item.id} className="prof-dev-item">
                      <span className="dot" style={{ color: "var(--accent)" }} aria-hidden="true" />
                      <div>
                        <p className="prof-dev-title">{item.title}</p>
                        <p className="prof-dev-note">{item.note}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
