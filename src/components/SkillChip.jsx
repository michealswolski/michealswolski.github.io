/*
  A skill chip tinted with the technology's own brand colour.

  The brand colour is only ever an accent — the dot, a low-alpha background
  tint, a border. Label text stays on the theme's own text token, so a chip for
  a near-black brand (GitHub) and a near-white one (JavaScript yellow) both keep
  the same text contrast in both themes.

  Chips with evidence are buttons: pressing one filters the project grid to the
  projects that actually used that technology.
*/

export default function SkillChip({ name, brand, evidenceCount = 0, active = false, onSelect }) {
  const style = brand ? { "--brand": brand } : undefined;

  if (!evidenceCount) {
    return (
      <span className="skill-badge" style={style}>
        {brand && <span className="skill-badge-dot" aria-hidden="true" />}
        {name}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={`skill-badge skill-badge--linked${active ? " is-active" : ""}`}
      style={style}
      onClick={() => onSelect(name)}
      aria-pressed={active}
    >
      {brand && <span className="skill-badge-dot" aria-hidden="true" />}
      {name}
      <span className="skill-badge-count" aria-hidden="true">
        {evidenceCount}
      </span>
      <span className="visually-hidden">
        {active
          ? `— filtering projects by ${name}. Activate to clear.`
          : `— ${evidenceCount} project${evidenceCount === 1 ? "" : "s"} on this page used ${name}. Activate to filter.`}
      </span>
    </button>
  );
}
