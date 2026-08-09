import CircuitMark from "./CircuitMark";

// Single restrained animated background: two slow-drifting gradient blobs,
// a static dot grid, and a faint circuit/vehicle watermark. No canvas, no
// per-frame JS — everything here is CSS transforms/opacity.
export default function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-blob hero-blob--a" />
      <div className="hero-blob hero-blob--b" />
      <div className="hero-dotgrid" />
      <div className="hero-circuit">
        <CircuitMark />
      </div>
    </div>
  );
}
