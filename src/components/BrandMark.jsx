/*
  The identity mark: a hexagon holding the MW monogram.

  Deliberately the same shape language as the credential badge on the profile
  README and the shield at the centre of SecurityEmblem — a hex is the site's
  recurring "sealed thing" motif, so the logo is that motif at its smallest.
  Replaces a generic padlock-in-a-rounded-square that could have belonged to
  any security site.

  Drawn as one path rather than clip-path so the gradient stroke stays crisp at
  32px, and the monogram is a <text> node in the display face so it matches the
  wordmark beside it.
*/

const HEX = "M12 1.6 21 6.8 21 17.2 12 22.4 3 17.2 3 6.8 Z";

export default function BrandMark({ size = 34, id = "brand" }) {
  const edge = `${id}-edge`;
  const glow = `${id}-glow`;

  return (
    <svg
      className="brand-mark-svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={edge} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-strong)" />
          <stop offset="50%" stopColor="var(--accent2)" />
          <stop offset="100%" stopColor="var(--success)" />
        </linearGradient>
        <linearGradient id={glow} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent2)" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <path d={HEX} fill={`url(#${glow})`} stroke={`url(#${edge})`} strokeWidth="1.5" strokeLinejoin="round" />
      <text
        x="12"
        y="15.4"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="8.4"
        fontWeight="800"
        letterSpacing="-0.3"
        fill="var(--text)"
      >
        MW
      </text>
    </svg>
  );
}
