export default function ScreenshotFrame({ screenshot, size = "card" }) {
  if (!screenshot) return null;
  return (
    <div className={`shot-frame shot-frame--${size}`}>
      <div className="shot-frame-bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <img
        src={screenshot.src}
        alt={screenshot.alt}
        width={screenshot.width || 1200}
        height={screenshot.height || 750}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
