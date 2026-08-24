/*
  The CAN bus readout from the README's hero HUD: a square wave scrolling left
  at a constant rate under a "CAN 500 kbps" label.

  The wave is one 200-unit tile drawn twice, side by side, translated by exactly
  one tile width — so the loop is seamless rather than snapping. It's ornament,
  not data, so it's hidden from assistive tech; the label is part of the picture.
*/

// Starts and ends at the same level, which is what makes the tile seamless.
const TILE =
  "M0 22 h12 V8 h16 V22 h10 V8 h8 V22 h20 V8 h12 V22 h14 V8 h18 V22 h10 V8 h14 V22 h16 V8 h10 V22 h16 V8 h12 V22 h12";

export default function CanWave() {
  return (
    <span className="canwave" aria-hidden="true">
      <span className="canwave-label mono">CAN 500 kbps</span>
      <svg className="canwave-svg" width="200" height="30" viewBox="0 0 200 30" fill="none" focusable="false">
        <g className="canwave-track">
          <path d={TILE} stroke="var(--accent)" strokeWidth="1.6" strokeOpacity="0.85" />
          <path d={TILE} stroke="var(--accent)" strokeWidth="1.6" strokeOpacity="0.85" transform="translate(200 0)" />
        </g>
      </svg>
    </span>
  );
}
