import { useScrollReveal } from "../hooks/useScrollReveal";

export default function SkillGroup({ group, index }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className="skill-group reveal" data-visible={visible} style={{ transitionDelay: visible ? "0ms" : `${index * 60}ms` }}>
      <h3 className="skill-group-title">{group.category}</h3>
      <div className="skill-chip-row">
        {group.items.map((item) => (
          <span key={item} className="skill-chip">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
