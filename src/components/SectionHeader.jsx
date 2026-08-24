import SectionDivider from "./SectionDivider";
import { useScrollReveal } from "../hooks/useScrollReveal";

/*
  `command` renders the eyebrow as a shell prompt — the same device the profile
  README opens with. It replaces the plain eyebrow rather than stacking on top
  of it, and still carries the section's name so it reads as a label, not a gag.
*/
export default function SectionHeader({ eyebrow, command, title, subtitle, id, divider = true }) {
  const [ref, visible] = useScrollReveal();
  return (
    <>
      {divider && <SectionDivider />}
      <div ref={ref} className="section-head reveal" data-visible={visible}>
        {command ? (
          <p className="eyebrow eyebrow--term mono" id={id ? `${id}-eyebrow` : undefined}>
            <span className="eyebrow-sigil" aria-hidden="true">
              $
            </span>
            {command}
          </p>
        ) : (
          eyebrow && (
            <div className="eyebrow" id={id ? `${id}-eyebrow` : undefined}>
              {eyebrow}
            </div>
          )
        )}
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-sub">{subtitle}</p>}
      </div>
    </>
  );
}
