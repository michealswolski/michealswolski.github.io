/*
  The security seal from the profile README, rebuilt as an inline SVG.

  Two concentric rings counter-rotate, a radar wedge sweeps, and a hexagonal
  shield holds a padlock. Everything moves through CSS classes, so the global
  prefers-reduced-motion rule stops all of it and the artwork settles into a
  perfectly readable resting state.

  `variant="watermark"` drops the padlock and the motto and leaves only the
  rings — used behind the hero panel, where a full emblem would compete with
  the credential badge sitting on top of it.
*/

const CX = 120;
const CY = 120;

export default function SecurityEmblem({ variant = "full", size = 240, className = "" }) {
  const watermark = variant === "watermark";

  return (
    <svg
      className={`emblem${watermark ? " emblem--watermark" : ""}${className ? ` ${className}` : ""}`}
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="emblem-edge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-strong)" />
          <stop offset="55%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--success)" />
        </linearGradient>
        <linearGradient id="emblem-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.34" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle
        className="emblem-ring emblem-ring--cw"
        cx={CX}
        cy={CY}
        r="116"
        stroke="var(--accent)"
        strokeOpacity="0.3"
        strokeDasharray="3 11"
      />
      <circle
        className="emblem-ring emblem-ring--ccw"
        cx={CX}
        cy={CY}
        r="96"
        stroke="var(--accent2)"
        strokeOpacity="0.34"
        strokeDasharray="26 14"
      />
      <circle cx={CX} cy={CY} r="74" stroke="var(--success)" strokeOpacity="0.26" />

      <path
        className="emblem-radar"
        d={`M${CX} ${CY} L${CX + 116} ${CY - 42} A116 116 0 0 1 ${CX + 116} ${CY + 42} Z`}
        fill="url(#emblem-sweep)"
      />

      <g className="emblem-ring emblem-ring--cw">
        <circle cx={CX + 116} cy={CY} r="4" fill="var(--accent)" />
        <circle cx={CX - 58} cy={CY + 100} r="4" fill="var(--success)" />
        <circle cx={CX - 58} cy={CY - 100} r="4" fill="var(--accent2)" />
      </g>
      <g className="emblem-ring emblem-ring--ccw">
        <circle cx={CX} cy={CY - 96} r="3.2" fill="var(--accent)" opacity="0.9" />
        <circle cx={CX + 83} cy={CY + 48} r="3.2" fill="var(--success)" opacity="0.9" />
      </g>

      <path
        d={`M${CX} ${CY - 58} L${CX + 50} ${CY - 29} L${CX + 50} ${CY + 29} L${CX} ${CY + 58} L${CX - 50} ${CY + 29} L${CX - 50} ${CY - 29} Z`}
        fill="var(--surface)"
        fillOpacity={watermark ? "0" : "0.72"}
        stroke="url(#emblem-edge)"
        strokeWidth="1.8"
      />
      <path
        className="emblem-pulse"
        d={`M${CX} ${CY - 58} L${CX + 50} ${CY - 29} L${CX + 50} ${CY + 29} L${CX} ${CY + 58} L${CX - 50} ${CY + 29} L${CX - 50} ${CY - 29} Z`}
        stroke="var(--accent)"
        strokeWidth="6"
        strokeOpacity="0.16"
      />

      {!watermark && (
        <g>
          <path
            d={`M${CX - 14} ${CY - 6} v-9 a14 14 0 0 1 28 0 v9`}
            stroke="var(--accent-strong)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <rect x={CX - 22} y={CY - 6} width="44" height="34" rx="7" stroke="var(--accent-strong)" strokeWidth="2.4" />
          <circle cx={CX} cy={CY + 8} r="3.4" fill="var(--success)" />
          <path d={`M${CX} ${CY + 11} v7`} stroke="var(--success)" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
