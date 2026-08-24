import { useScrollReveal } from "../hooks/useScrollReveal";
import { IconCap } from "./Icons";

export default function EducationCard({ item, index }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className="edu-card card reveal"
      data-visible={visible}
      style={{ transitionDelay: visible ? "0ms" : `${index * 90}ms` }}
    >
      <div className="edu-card-icon" aria-hidden="true">
        <IconCap size={20} />
      </div>
      <div>
        <h3 className="edu-degree">{item.degree}</h3>
        <p className="edu-school">{item.school}</p>
        <p className="edu-meta mono">
          {item.status} · {item.location}
        </p>
        {item.honors && (
          <span className="edu-honors">
            <span className="dot" aria-hidden="true" />
            {item.honors}
          </span>
        )}
      </div>
    </div>
  );
}
