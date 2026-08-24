import { useScrollReveal } from "../hooks/useScrollReveal";
import { CATEGORY_COLORS } from "../data/projects";
import { IconArrowUpRight, IconGitHub } from "./Icons";
import ScreenshotFrame from "./ScreenshotFrame";

const STATUS_LABEL = {
  public: null,
  "case-study": "Public-safe case study",
  private: "Private project",
  "in-progress": "In progress",
};

/*
  Two variants of the same card.

  `spotlight` is the one lead project — wide, with its screenshot inline.
  Everything else is a `default` card with an identical internal structure, so
  the grid stays even instead of some cards carrying a screenshot and some not.
  Screenshots for the rest live in the case-study modal, where they're shown
  larger anyway.
*/
export default function ProjectCard({ project, index, onOpen, variant = "default" }) {
  const [ref, visible] = useScrollReveal();
  const accent = CATEGORY_COLORS[project.category] || "var(--accent)";
  const statusLabel = project.status ? STATUS_LABEL[project.status] : null;
  const isSpotlight = variant === "spotlight";

  return (
    <article
      ref={ref}
      className={`project-card card reveal${isSpotlight ? " project-card--spotlight" : ""}`}
      data-visible={visible}
      style={{ "--cat": accent, transitionDelay: visible ? "0ms" : `${Math.min(index, 6) * 45}ms` }}
    >
      {isSpotlight && project.screenshot && (
        <div className="project-card-media">
          <ScreenshotFrame screenshot={project.screenshot} size="card" eager />
        </div>
      )}

      <div className="project-card-body">
        <div className="project-card-top">
          <span className="badge">{project.category}</span>
          {statusLabel ? (
            <span className="project-status">{statusLabel}</span>
          ) : (
            <span className="project-index mono" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-summary">{project.summary}</p>

        {project.inProgressNote && <p className="project-note">{project.inProgressNote}</p>}

        <div className="project-tags">
          {project.tech.slice(0, 5).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div className="project-actions">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => onOpen(project)}>
            Case Study
            <IconArrowUpRight />
          </button>
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <IconGitHub size={14} />
              Code
            </a>
          )}
          {project.links?.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
              {project.links.demoLabel || "Live demo"}
              <IconArrowUpRight />
            </a>
          )}
          {!project.links?.github && project.privateLabel && (
            <span className="project-private-tag">{project.privateLabel}</span>
          )}
        </div>
      </div>
    </article>
  );
}
