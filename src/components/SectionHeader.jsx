import { useScrollReveal } from "../hooks/useScrollReveal";

export default function SectionHeader({ eyebrow, title, subtitle, id }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className="section-head reveal" data-visible={visible}>
      {eyebrow && (
        <div className="eyebrow" id={id ? `${id}-eyebrow` : undefined}>
          {eyebrow}
        </div>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </div>
  );
}
