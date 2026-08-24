import CircuitMark from "./CircuitMark";

// The hero's ambient layer: two slow-drifting gradient blobs, a dot grid that
// pans a single cell before repeating, a scan sweep, and a faint circuit
// watermark. No canvas and no per-frame JS — all CSS transforms and opacity,
// switched off wholesale by the global prefers-reduced-motion rule.
export default function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-blob hero-blob--a" />
      <div className="hero-blob hero-blob--b" />
      <div className="hero-dotgrid" />
      <div className="hero-scan" />
      <div className="hero-circuit">
        <CircuitMark />
      </div>
    </div>
  );
}
