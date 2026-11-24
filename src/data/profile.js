export const profile = {
  name: "Micheal Wolski",
  identity: "Product Cybersecurity",
  focusAreas: ["Automotive & Embedded Security", "AI Agent Security", "Detection & Response"],
  heroSummary:
    "I build defensive security tools and simulations for connected vehicles, embedded software, and AI systems.",
  tagline: "Automotive & embedded security",
  leadIn:
    "My work focuses on making security decisions easier to verify, from firmware trust and software inventory to detection and human approval.",
  motto: ["Trust", "Verify", "Ship"],
  roles: [
    { text: "Product Cybersecurity", detail: "automotive, embedded, and connected systems" },
    { text: "AI Agent Security", detail: "audit trails and human approval" },
    { text: "Detection & Response", detail: "alert triage and evidence correlation" },
  ],
  aboutParagraphs: [
    "I’m based in Metro Detroit and focus on automotive product cybersecurity. My public work includes a simulation-first ECU lab and an embedded Linux software inventory and drift-detection pipeline.",
    "During my product cybersecurity internship at Bosch Mobility, I researched automotive security topics and built reporting workflows to help teams organize and communicate project information.",
    "I also build defensive tooling around AI governance, alert investigation, and documentation. My project pages distinguish working implementations from prototypes and research.",
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
};

// Kept deliberately short. Each value is verifiable: two from the degree, and
// one counted at render time from the project list further down this same page,
// so the number can never drift away from what's actually shown.
export function getHeroStats(projectCount) {
  return [
    { value: "B.S.", label: "Info Assurance & Cyber Defense, 2026" },
    { value: "ECU", label: "Embedded security lab" },
    { value: String(projectCount), label: "Public projects & labs" },
  ];
}
