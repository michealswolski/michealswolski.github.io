import { useEffect, useRef } from "react";
import { CATEGORY_COLORS } from "../data/projects";
import { IconArrowUpRight, IconClose, IconGitHub } from "./Icons";

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    const dialog = dialogRef.current;
    const focusables = dialog ? dialog.querySelectorAll(FOCUSABLE) : [];
    (focusables[0] || dialog)?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [onClose]);

  if (!project) return null;
  const { detail } = project;
  const accent = CATEGORY_COLORS[project.category] || "var(--accent)";

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        style={{ "--cat": accent }}
      >
        <button type="button" className="modal-close icon-btn" onClick={onClose} aria-label="Close case study">
          <IconClose />
        </button>

        <div className="modal-head">
          <span className="badge">{project.category}</span>
          <h2 id="project-modal-title" className="modal-title">
            {project.title}
          </h2>
          <p className="modal-summary">{project.summary}</p>
        </div>

        {project.disclaimer && <p className="modal-disclaimer">{project.disclaimer}</p>}
        {project.inProgressNote && <p className="modal-disclaimer modal-disclaimer--progress">{project.inProgressNote}</p>}

        <div className="modal-body">
          {detail?.problem && (
            <section>
              <h3>Problem</h3>
              <p>{detail.problem}</p>
            </section>
          )}
          {detail?.whatIBuilt && (
            <section>
              <h3>What I Built</h3>
              <p>{detail.whatIBuilt}</p>
            </section>
          )}
          {detail?.architecture && (
            <section>
              <h3>Architecture &amp; Approach</h3>
              <p>{detail.architecture}</p>
            </section>
          )}
          {detail?.keyFeatures?.length > 0 && (
            <section>
              <h3>Key Features</h3>
              <ul className="modal-list">
                {detail.keyFeatures.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>
          )}
          {detail?.challenges && (
            <section>
              <h3>Challenges &amp; Decisions</h3>
              <p>{detail.challenges}</p>
            </section>
          )}
          {detail?.whatILearned && (
            <section>
              <h3>What I Learned</h3>
              <p>{detail.whatILearned}</p>
            </section>
          )}
          <section>
            <h3>Tech Stack</h3>
            <div className="project-tags">
              {project.tech.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="modal-footer">
          {project.links?.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
              <IconGitHub size={14} />
              View Source
              <IconArrowUpRight />
            </a>
          )}
          {project.links?.githubSecondary && (
            <a href={project.links.githubSecondary} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
              <IconGitHub size={14} />
              {project.links.githubSecondaryLabel || "Related repo"}
              <IconArrowUpRight />
            </a>
          )}
          {project.privateLabel && !project.links?.github && <span className="project-private-tag">{project.privateLabel}</span>}
        </div>
      </div>
    </div>
  );
}
