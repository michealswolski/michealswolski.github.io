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

export default function ProjectCard({ project, index, onOpen }) {
  const [ref, visible] = useScrollReveal();
  const accent = CATEGORY_COLORS[project.category] || "var(--accent)";
  const statusLabel = project.status ? STATUS_LABEL[project.status] : null;

  return (
    <article
      ref={ref}
      className="project-card card reveal"
      data-visible={visible}
      style={{ "--cat": accent, transitionDelay: visible ? "0ms" : `${Math.min(index, 6) * 45}ms` }}
    >
      {project.screenshot && <ScreenshotFrame screenshot={project.screenshot} size="card" />}

      <div className="project-card-body">
        <div className="project-card-top">
          <span className="badge">{project.category}</span>
          {statusLabel && <span className="project-status">{statusLabel}</span>}
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
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
              <IconGitHub size={14} />
              Code
            </a>
          )}
          {!project.links?.github && project.privateLabel && <span className="project-private-tag">{project.privateLabel}</span>}
        </div>
      </div>
    </article>
  );
}
