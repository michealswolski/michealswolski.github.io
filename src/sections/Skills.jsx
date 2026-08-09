import SectionHeader from "../components/SectionHeader";
import SkillGroup from "../components/SkillGroup";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <SectionHeader
          eyebrow="Skills"
          title="Technical Skills"
          subtitle="Grouped by how directly hands-on the experience is — research/coursework exposure is labeled as such rather than implied mastery."
        />
        <div className="grid grid-skills">
          {skillGroups.map((group, i) => (
            <SkillGroup key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
