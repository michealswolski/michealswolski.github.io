import SectionHeader from "../components/SectionHeader";
import SkillChip from "../components/SkillChip";
import GlyphIcon from "../components/GlyphIcon";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { skillTiers } from "../data/skills";

function SkillGroup({ group, index, activeSkill, onSelectSkill }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className="skill-group reveal"
      data-visible={visible}
      style={{ transitionDelay: visible ? "0ms" : `${Math.min(index, 6) * 55}ms` }}
    >
      <h4 className="skill-group-title">
        <GlyphIcon name={group.glyph} />
        {group.category}
      </h4>
      <div className="skill-badge-row">
        {group.items.map((item) => (
          <SkillChip
            key={item.name}
            name={item.name}
            brand={item.brand}
            evidenceCount={item.evidence?.length || 0}
            active={activeSkill === item.name}
            onSelect={onSelectSkill}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills({ activeSkill, onSelectSkill }) {
  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <SectionHeader
          eyebrow="Skills"
          title="Technical Skills"
          subtitle="Split by how directly hands-on the experience is. Anything with a number beside it was used to build a project on this page — press it to filter the grid to exactly those projects."
        />

        {skillTiers.map((tier) => (
          <div key={tier.id} className={`skill-tier skill-tier--${tier.id}`}>
            <div className="skill-tier-head">
              <h3 className="skill-tier-label">{tier.label}</h3>
              <p className="skill-tier-note">{tier.note}</p>
            </div>
            <div className="grid grid-skills">
              {tier.groups.map((group, i) => (
                <SkillGroup
                  key={`${tier.id}-${group.category}`}
                  group={group}
                  index={i}
                  activeSkill={activeSkill}
                  onSelectSkill={onSelectSkill}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
