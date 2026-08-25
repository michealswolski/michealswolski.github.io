export const profile = {
  name: "Micheal Wolski",
  // Cybersecurity is the identity. Automotive/embedded and AI agent security
  // are the two lanes inside it, in that order, with detection and response
  // as the third. Full-stack stays visible in the skills and projects, but as
  // an engineering capability rather than a professional identity.
  // The Bosch internship deliberately does NOT lead the hero; it's a past role
  // and belongs in Experience, not in the first sentence someone reads.
  identity: "Cybersecurity Engineer",
  focusAreas: ["Automotive & Embedded Security", "AI Agent Security", "Detection & Response"],
  heroSummary:
    "Cybersecurity engineer — automotive and embedded security, AI agent security, and the detection and tooling work around both. Product security background at Bosch Mobility.",
  // The one-line promise. Carried over from the profile README so the two
  // read as the same person's work.
  tagline: "Security that survives contact with production — not just the threat model.",
  // The lead-in on the README's About block. Sharper than the biographical
  // paragraphs below it, so the site uses it as the pull quote above them.
  leadIn:
    "I build systems where the security controls are part of the product, not a document filed next to it — secure-boot and trust-chain designs grounded in automotive architectures, detections built around real traffic, and governance layers that gate risky agent actions.",
  motto: ["Trust", "Verify", "Ship"],
  // Cycled under the name in the hero. The first entry is the resting state:
  // if the cycle never runs — reduced motion, no CSS animation — this is what
  // stays on screen, so it has to be the strongest one on its own.
  roles: [
    { text: "Cybersecurity Engineer", detail: "secure by construction" },
    { text: "Automotive & Embedded Security", detail: "CAN / UDS / secure boot" },
    { text: "AI Agent Security", detail: "guardrails, audit trails, human approval" },
    { text: "Detection & Response", detail: "SIEM tuning, log automation, vuln management" },
  ],
  shell: {
    host: "micheal@secops — zsh",
    command: "./whoami --role engineer --scope full",
  },
  // The hero console. Every line describes a control one of the projects on
  // this page actually implements — but the timestamps and numbers are made
  // up, so it is labelled illustrative on screen and never presented as
  // telemetry. Inventing measurements and passing them off as real is the one
  // thing the rest of this site refuses to do.
  console: {
    title: "secops — control pipeline",
    note: "Illustrative: the shape of the controls behind the projects below, not live telemetry.",
    lines: [
      { time: "09:41:02", level: "ok", tag: "BOOT", text: "chain of trust verified: ROM to app" },
      { time: "09:41:02", level: "ok", tag: "CAN", text: "SecOC freshness ok, 0 replays" },
      { time: "09:41:03", level: "warn", tag: "CAN", text: "0x7DF flood, 214 frames/s" },
      { time: "09:41:03", level: "act", tag: "GATE", text: "rate limit applied at gateway" },
      { time: "09:41:05", level: "ok", tag: "AGENT", text: "trace 1038: 6 tool calls scored" },
      { time: "09:41:05", level: "warn", tag: "AGENT", text: "prompt-injection 0.82 on write_file" },
      { time: "09:41:06", level: "act", tag: "GATE", text: "held for human approval" },
      { time: "09:41:08", level: "ok", tag: "SIEM", text: "brute-force rule fired, src blocked" },
    ],
  },
  availability: "Full-time · on-site, hybrid, or remote",
  aboutParagraphs: [
    "I'm a cybersecurity engineer based in Michigan. Most of my work sits in two places: the embedded computers inside vehicles — how an ECU boots, how ECUs talk to each other, and what an attacker does with either — and the AI agents that are starting to take real actions on real systems. I graduated from Eastern Michigan University with a B.S. in Information Assurance & Cyber Defense, after an A.A.S. in Computer Information Systems from Henry Ford College.",
    "During a Product Cybersecurity internship at Bosch Mobility I worked inside the automotive product-security lifecycle: researching secure boot for automotive ECUs — chain-of-trust verification and TPM-based attestation — and shipping an intake and reporting platform used across multiple engineering divisions, replacing spreadsheet tracking of security work with a shared system of record.",
    "Around that, most of my security background comes from building rather than reading: home-lab intrusion detection, SIEM tuning, offensive-security labs, and full detect-to-remediate vulnerability management cycles. On the software side I've built a governance layer that scores AI agent traces for prompt injection and gates risky actions behind a human, and document tooling that traces every extracted value back to the sentence it came from. The through-line is the one that matters in product security: a system you can audit beats a system you have to trust.",
    "I'm looking for full-time work in cybersecurity engineering — automotive and embedded security, AI agent security, and detection and response roles.",
  ],
  // Leads with the automotive lab: it is the current build and the strongest
  // signal for the roles being targeted. AI agent governance stays a selected
  // project rather than the defining "currently building" line.
  currentlyExploring: [
    "Automotive ECU Cybersecurity Lab",
    "Secure boot & AUTOSAR SecOC",
    "ISO/SAE 21434 TARA practice",
    "ECU key lifecycle",
    "In-vehicle network defence",
  ],
  // Metro Detroit rather than the exact suburb: recruiters get the location
  // signal they need, it reads as a recognisable market, and it doesn't publish
  // a home town.
  location: "Metro Detroit, Michigan",
  socials: {
    github: "https://github.com/michealswolski",
    linkedin: "https://www.linkedin.com/in/michealwolski/",
  },
  // Drop a public-safe PDF at public/Micheal_Wolski_Resume.pdf and set this to
  // "/Micheal_Wolski_Resume.pdf". Every résumé link on the site — hero, navbar,
  // contact — renders only when this is set, so leaving it null never produces
  // a button that 404s.
  resumeUrl: null,
  // Set to a job-search address to surface an "Email" action in Contact. Left
  // null on purpose: publishing an address is your call, not a default.
  email: null,
  openToWork: true,
};

// Kept deliberately short. Each value is verifiable: two from the degree, and
// one counted at render time from the project list further down this same page,
// so the number can never drift away from what's actually shown.
export function getHeroStats(projectCount) {
  return [
    { value: "B.S.", label: "Info Assurance & Cyber Defense, 2026" },
    { value: "3.66", label: "GPA · Cum Laude" },
    { value: String(projectCount), label: "Public projects & labs" },
  ];
}
