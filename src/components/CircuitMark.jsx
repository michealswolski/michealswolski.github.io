// Decorative circuit-and-vehicle silhouette used as a low-opacity watermark
// behind the hero. Purely decorative — hidden from assistive tech.
export default function CircuitMark() {
  const nodes = [
    [118, 216],
    [198, 184],
    [308, 162],
    [435, 140],
    [568, 144],
    [665, 160],
    [750, 196],
  ];
  const branchEnds = [
    [198, 256],
    [308, 112],
    [435, 112],
    [568, 112],
    [665, 256],
  ];

  return (
    <svg viewBox="0 0 900 290" width="900" height="290" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M 55,248 L 145,248 A 74,50 0 0,0 285,248 L 618,248 A 74,50 0 0,0 758,248
           L 818,248 L 826,230 L 812,205 L 772,183 L 736,175 L 704,162
           C 674,136 642,116 620,112 L 370,112
           C 348,116 320,130 300,150 L 274,176 L 240,188 L 180,196 L 124,210 L 84,224 Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
      <path d="M 302,150 L 324,115 L 438,112 L 438,154 Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M 443,112 L 620,112 L 618,154 L 443,154 Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <circle cx="215" cy="278" r="40" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="215" cy="278" r="7" fill="currentColor" />
      <circle cx="688" cy="278" r="40" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="688" cy="278" r="7" fill="currentColor" />
      <polyline points="118,216 198,184 308,162 435,140 568,144 665,160 750,196" stroke="currentColor" strokeWidth="1" strokeDasharray="7 4" />
      <line x1="198" y1="184" x2="198" y2="248" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1="308" y1="162" x2="308" y2="113" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1="435" y1="140" x2="435" y2="112" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1="568" y1="144" x2="568" y2="112" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1="665" y1="160" x2="688" y2="248" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5.5" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx={x} cy={y} r="2.2" fill="currentColor" />
        </g>
      ))}
      {branchEnds.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" stroke="currentColor" strokeWidth="0.9" fill="none" />
      ))}
    </svg>
  );
}
