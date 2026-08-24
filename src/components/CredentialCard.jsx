import { profile } from "../data/profile";

/*
  The lanyard badge from the profile README, rebuilt in the page rather than
  drawn as an SVG so its text renders at the site's own font sizes and stays
  crisp at any zoom.

  The whole badge is aria-hidden. It is an ornament that restates facts already
  on the page — the name is the <h1>, the role is the cycling line beside it,
  the region and availability are in the status bar below, and the degree is in
  the hero stats. Exposing it would make a screen reader read all of that twice.
*/

const BARCODE = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 2, 4, 1, 2];

export default function CredentialCard() {
  const { credential } = profile;
  const fields = [
    ["ID", credential.id],
    ["CLEARANCE", credential.clearance],
    ["STATUS", credential.status],
    ["REGION", credential.region],
  ];

  return (
    <div className="credential" aria-hidden="true">
      <div className="credential-clasp">
        <span className="credential-clasp-bar" />
        <span className="credential-clasp-ring" />
      </div>

      <div className="credential-card">
        <div className="credential-head">
          <span className="credential-head-label mono">SECURITY CREDENTIAL</span>
          <span className="credential-led" />
        </div>

        <div className="credential-avatar">
          <span className="credential-hex">
            <span className="credential-hex-inner">MW</span>
          </span>
        </div>

        <p className="credential-name">MICHEAL WOLSKI</p>
        <p className="credential-role mono">AUTOMOTIVE &amp; PRODUCT SECURITY</p>

        <div className="credential-fields">
          {fields.map(([key, value]) => (
            <div key={key} className="credential-field">
              <span className="credential-key mono">{key}</span>
              <span className="credential-value mono">{value}</span>
            </div>
          ))}
          <div className="credential-field credential-field--wide">
            <span className="credential-key mono">FOCUS</span>
            <span className="credential-value mono">{credential.focus}</span>
          </div>
        </div>

        <div className="credential-strip">
          <span className="credential-chip">
            <span className="credential-chip-traces" />
          </span>
          <span className="credential-barcode">
            {BARCODE.map((w, i) => (
              <span key={i} className="credential-bar" style={{ width: `${w}px` }} />
            ))}
            <span className="credential-scan" />
          </span>
        </div>

        <p className="credential-serial mono">{credential.serial}</p>

        <span className="credential-holo" />
      </div>
    </div>
  );
}
