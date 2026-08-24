/*
  The animated rule the README puts between every section: a cyan-to-green
  gradient line, evenly spaced tick marks that twinkle out of phase, and a
  pulse that travels left to right. Purely decorative.
*/

export default function SectionDivider() {
  return (
    <div className="rule" role="presentation">
      <span className="rule-line" />
      <span className="rule-ticks" />
      <span className="rule-pulse" />
    </div>
  );
}
