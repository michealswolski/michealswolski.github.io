export const profile = {
  name: "Micheal Wolski",
  // Automotive/product cybersecurity is the primary lane, with embedded, AI
  // agent security, and security automation as the supporting specialisations.
  // Full-stack stays visible in the skills and projects, but as an engineering
  // capability rather than a third professional identity.
  // The Bosch internship deliberately does NOT lead the hero; it's a past role
  // and belongs in Experience, not in the first sentence someone reads.
  identity: "Automotive & Product Cybersecurity",
  focusAreas: ["Embedded Security", "AI Agent Security", "Security Automation"],
  heroSummary:
    "Automotive and product cybersecurity engineer — vehicle and embedded security, secure boot, and the software and AI-security tooling around it. Product security background at Bosch Mobility.",
  aboutParagraphs: [
    "I'm a cybersecurity engineer based in Michigan, working in automotive and product security. My focus is the embedded computers inside vehicles — how they boot, how they talk to each other, and what an attacker does with either. I graduated from Eastern Michigan University with a B.S. in Information Assurance & Cyber Defense, after an A.A.S. in Computer Information Systems from Henry Ford College.",
    "During a Product Cybersecurity internship at Bosch Mobility I worked inside that lifecycle: researching secure boot for automotive ECUs — chain-of-trust verification and TPM-based attestation — and shipping an intake and reporting platform used across multiple engineering divisions, replacing spreadsheet tracking of security work with a shared system of record.",
    "Around that, most of my security background comes from building rather than reading: home-lab intrusion detection, SIEM tuning, offensive-security labs, and full detect-to-remediate vulnerability management cycles. On the software side I've built a governance layer that scores AI agent traces for prompt injection and gates risky actions behind a human, and document tooling that traces every extracted value back to the sentence it came from. The through-line is the one that matters in product security: a system you can audit beats a system you have to trust.",
    "I'm looking for full-time work in automotive and product cybersecurity, embedded security, and adjacent security engineering roles.",
  ],
  currentlyExploring: [
    "ISO/SAE 21434 TARA practice",
    "Automotive SecOC / secure boot",
    "AI agent governance patterns",
    "Prompt-injection detection",
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
