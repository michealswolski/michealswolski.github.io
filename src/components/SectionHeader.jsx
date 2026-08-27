import SectionDivider from "./SectionDivider";
import GlyphIcon from "./GlyphIcon";
import { useScrollReveal } from "../hooks/useScrollReveal";

/*
  `command` renders the eyebrow as a shell prompt — the same device the profile
  README opens with. It replaces the plain eyebrow rather than stacking on top
  of it, and still carries the section's name so it reads as a label, not a gag.

  `accent` and `glyph` give each section its own colour and mark, the way the
  profile README's section plaques do. Every section previously looked
  identical, so scrolling the page felt like restarting it seven times; the
  accent tints the divider, the icon and the prompt, and nothing else, so the
  rhythm comes through without adding a single extra element to read.
*/
export default function SectionHeader({ eyebrow, command, glyph, accent, title, subtitle, id, divider = true }) {
  const [ref, visible] = useScrollReveal();
  const style = accent ? { "--sec": `var(--${accent})` } : undefined;

  return (
    <div className="section-lead" style={style}>
      {divider && <SectionDivider />}
      <div ref={ref} className="section-head reveal" data-visible={visible}>
        {command ? (
          <p className="eyebrow eyebrow--term mono" id={id ? `${id}-eyebrow` : undefined}>
            {glyph && (
              <span className="eyebrow-glyph" aria-hidden="true">
                <GlyphIcon name={glyph} size={14} />
              </span>
            )}
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
    </div>
  );
}
