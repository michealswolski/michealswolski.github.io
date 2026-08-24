import { useEffect, useRef } from "react";
import { CATEGORY_COLORS } from "../data/projects";
import { IconArrowUpRight, IconClose } from "./Icons";
import CaseStudyBody from "./CaseStudyBody";
import { projectPath } from "../hooks/useRoute";

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose, onOpenFull }) {
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

        <CaseStudyBody project={project} headingId="project-modal-title" />

        <a className="modal-permalink" href={projectPath(project.id)} onClick={onOpenFull}>
          View full case study
          <IconArrowUpRight />
        </a>
      </div>
    </div>
  );
}
