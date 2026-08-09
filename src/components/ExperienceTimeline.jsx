import { useScrollReveal } from "../hooks/useScrollReveal";

function BoschMark({ size = 74 }) {
  return (
    <svg width={size} height={size * 0.29} viewBox="0 0 200 58" fill="none" aria-hidden="true">
      <text x="2" y="46" fill="#E20015" fontFamily="'Outfit','Arial Black',sans-serif" fontWeight="900" fontSize="48" letterSpacing="2">
        BOSCH
      </text>
    </svg>
  );
}

export default function ExperienceTimeline({ bosch, additional }) {
  const [ref, visible] = useScrollReveal();

  return (
    <div>
      <div ref={ref} className="experience-card reveal" data-visible={visible}>
        <div className="experience-card-head">
          <div>
            <BoschMark />
            <h3 className="experience-role">{bosch.role}</h3>
            <div className="experience-meta">
              <span className="experience-company">{bosch.company}</span>
              <span aria-hidden="true">·</span>
              <span className="mono experience-team">{bosch.team}</span>
            </div>
          </div>
          <div className="experience-when">
            <span className="tag">{bosch.period}</span>
            <span className="experience-location mono">{bosch.location}</span>
          </div>
        </div>

        <p className="experience-inline-note">{bosch.note}</p>

        <div className="experience-grid">
          {bosch.categories.map((cat) => (
            <div key={cat.title} className="experience-category">
              <h4>{cat.title}</h4>
              <ul>
                {cat.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="experience-disclaimer">{bosch.disclaimer}</p>
      </div>

      {additional?.length > 0 && (
        <div className="additional-experience">
          <span className="mono additional-experience-label">Additional Experience</span>
          <ul>
            {additional.map((job) => (
              <li key={job.company}>
                <span className="additional-role">{job.role}</span>
                <span className="additional-sep" aria-hidden="true">
                  ·
                </span>
                <span className="additional-company">{job.company}</span>
                <span className="additional-period mono">{job.period}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
