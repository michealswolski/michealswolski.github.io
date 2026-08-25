import { profile } from "../data/profile";

/*
  The hero's centrepiece: a console that plays a detect → decide → act sequence
  and loops.

  What it shows is real in the sense that matters — every line describes a
  control one of the projects on this page actually implements, across all
  three lanes: secure boot and CAN on the vehicle side, trace scoring and human
  approval on the agent side, rule firing on the detection side. The timestamps
  and numbers are invented, so the panel says so in plain text underneath. This
  site does not present made-up numbers as measurements.

  The log is aria-hidden and paired with a single readable sentence: a screen
  reader getting eight streaming log lines is worse than getting the point.

  Each line's base state is visible, and only the keyframes hide it. So with
  animations off — reduced motion, or a browser that never runs them — the
  resting state is the whole log on screen at once, which is exactly what it
  should be.
*/

// One pass through every line, plus a beat to read the finished log before it
// clears and refills.
const STEP = 0.62;
const CYCLE = 14;

const LEVEL_LABEL = { ok: " OK ", warn: "WARN", act: " ACT" };

export default function SecurityConsole() {
  const { title, note, lines } = profile.console;

  return (
    <div className="console">
      <div className="console-bar">
        <span className="console-light console-light--red" />
        <span className="console-light console-light--amber" />
        <span className="console-light console-light--green" />
        <span className="console-title mono">{title}</span>
      </div>

      <ol className="console-log" aria-hidden="true">
        {lines.map((line, i) => (
          <li
            key={`${line.tag}-${line.text}`}
            className={`console-line console-line--${line.level}`}
            style={{ animationDelay: `${(i * STEP).toFixed(2)}s`, animationDuration: `${CYCLE}s` }}
          >
            <span className="console-time mono">{line.time}</span>
            <span className="console-level mono">[{LEVEL_LABEL[line.level]}]</span>
            <span className="console-tag mono">{line.tag}</span>
            <span className="console-text mono">{line.text}</span>
          </li>
        ))}
        <li
          className="console-line console-line--prompt"
          style={{ animationDelay: `${(lines.length * STEP).toFixed(2)}s`, animationDuration: `${CYCLE}s` }}
        >
          <span className="console-caret" />
        </li>
      </ol>

      <p className="console-note">{note}</p>
    </div>
  );
}
