export const profile = {
  name: "Micheal Wolski",
  // Cybersecurity is the identity; automotive/embedded comes first among the
  // specialisations inside it, then AI. Kept in lockstep with the GitHub
  // profile README — the two are read side by side.
  // The Bosch internship deliberately does NOT lead here; it's a past role and
  // belongs in Experience, not in the first sentence someone reads.
  identity: "Cybersecurity",
  focusAreas: ["Automotive & Embedded", "AI Security & Agents", "Full-Stack"],
  heroSummary:
    "Cybersecurity engineer building secure, practical software — with a specialty focus in automotive and embedded systems and AI agent security, alongside full-stack and enterprise tooling.",
  aboutParagraphs: [
    "I'm a cybersecurity engineer based in Michigan. My work sits in two places most people treat as separate: securing the embedded computers inside vehicles, and securing AI systems. I graduated from Eastern Michigan University with a B.S. in Information Assurance & Cyber Defense, after an A.A.S. in Computer Information Systems from Henry Ford College.",
    "Most of my security background comes from building things rather than reading about them: home-lab intrusion detection, SIEM tuning, offensive-security labs, and full detect-to-remediate vulnerability management cycles. During a Product Cybersecurity internship at Bosch Mobility I got to do that at enterprise scale — shipping an intake and reporting platform used across multiple engineering divisions, and researching secure boot for automotive ECUs.",
    "Lately most of my building has been on the AI side: a governance layer that scores agent traces for prompt injection and gates risky actions behind a human, an onboarding assistant built at an internal AI hackathon, and document tooling that traces every extracted value back to the sentence it came from. The through-line is the same one that matters in automotive security — a system you can audit beats a system you have to trust.",
    "I'm looking for full-time cybersecurity roles. Automotive and product security is where I'd most like to land, with AI security close behind — but any role where I'm actually shipping software works for me.",
  ],
  currentlyExploring: [
    "AI agent governance patterns",
    "Automotive SecOC / secure boot",
    "RAG pipeline design",
    "Prompt-injection detection",
  ],
  location: "Woodhaven, Michigan",
  socials: {
    github: "https://github.com/michealswolski",
    linkedin: "https://www.linkedin.com/in/michealwolski/",
  },
  resumeUrl: null,
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
