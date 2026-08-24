/*
  Two tiers, on purpose.

  "Hands-on" means it was used to build something that shipped — most entries
  carry an `evidence` array naming the projects on this page that used it, and
  those become clickable filters over the project grid.

  "Working knowledge" is coursework, research, and internal work with no public
  repository to point at. Listing it separately is the honest version: the
  knowledge is real, the public proof isn't, and an interviewer can tell which
  is which without having to ask.

  `brand` is the technology's own brand colour. It is only ever used as an
  accent — a dot, a tint, a border — never as text colour, so text contrast
  stays on the theme's own tokens in both themes.
*/

export const skillTiers = [
  {
    id: "hands-on",
    label: "Hands-on",
    note: "Used to build and ship something. Where a project on this page used it, the chip filters to that project.",
    groups: [
      {
        category: "Languages",
        glyph: "code",
        items: [
          { name: "Python", brand: "#3776AB", evidence: ["python-log-automation", "obd2-diagnostic-scanner", "swoop"] },
          { name: "JavaScript", brand: "#F7DF1E", evidence: ["ai-agent-governance", "document-analyzer-ai", "forecast-ai"] },
          { name: "TypeScript", brand: "#3178C6", evidence: ["auto-job-intel", "swoop"] },
          { name: "Swift", brand: "#F05138", evidence: ["meshlink-ios"] },
          { name: "PowerShell", brand: "#5391FE", evidence: ["network-utility-tool"] },
          { name: "Bash / Shell", brand: "#4EAA25", evidence: ["wolski-command-center"] },
          { name: "SQL", brand: "#336791", evidence: ["ai-agent-governance"] },
          { name: "HTML", brand: "#E34F26", evidence: ["quishing-awareness", "document-analyzer-ai"] },
          { name: "CSS", brand: "#1572B6", evidence: ["quishing-awareness"] },
        ],
      },
      {
        category: "Frameworks & Runtimes",
        glyph: "stack",
        items: [
          { name: "React", brand: "#61DAFB", evidence: ["auto-job-intel", "wolski-command-center", "swoop"] },
          { name: "Next.js", brand: "#8B93FF", evidence: ["auto-job-intel"] },
          { name: "Node.js", brand: "#339933", evidence: ["ai-agent-governance", "wolski-command-center", "document-analyzer-ai"] },
          { name: "Express", brand: "#6D7B8D", evidence: ["wolski-command-center"] },
          { name: "FastAPI", brand: "#009688", evidence: ["swoop"] },
          { name: "SQLite", brand: "#4A9CC7", evidence: ["ai-agent-governance"] },
          { name: "REST APIs", brand: "#5EEAD4", evidence: ["ai-agent-governance", "wolski-command-center"] },
        ],
      },
      {
        category: "Security Tooling",
        glyph: "shield",
        items: [
          { name: "Wireshark", brand: "#1679A7", evidence: ["network-traffic-analysis"] },
          { name: "Splunk", brand: "#EC1C24", evidence: ["splunk-siem-lab"] },
          { name: "Nmap", brand: "#7DA0C4", evidence: ["offensive-security-lab", "homelab-vuln-management"] },
          { name: "Nessus", brand: "#00C176", evidence: ["homelab-vuln-management"] },
          { name: "OpenVAS", brand: "#66B032", evidence: ["openvas-scanning"] },
          { name: "Metasploit", brand: "#2596CD", evidence: ["offensive-security-lab"] },
          { name: "Burp Suite", brand: "#FF6633", evidence: ["web-app-security-lab"] },
          { name: "pfSense", brand: "#B0B7C3", evidence: ["firewall-vpn-lab", "homelab-vuln-management"] },
          { name: "Kali Linux", brand: "#557C94", evidence: ["offensive-security-lab", "network-traffic-analysis"] },
          { name: "Hydra", brand: "#E86A5B", evidence: ["offensive-security-lab"] },
        ],
      },
      {
        category: "AI & Data",
        glyph: "brain",
        items: [
          { name: "AI Agent Design", brand: "#A78BFA", evidence: ["ai-agent-governance", "swoop", "llm-onboarding-agent"] },
          { name: "Prompt Engineering", brand: "#A78BFA", evidence: ["llm-onboarding-agent", "swoop"] },
          { name: "Prompt-Injection Detection", brand: "#C084FC", evidence: ["ai-agent-governance"] },
          { name: "Retrieval-Augmented Generation", brand: "#C084FC", evidence: ["llm-onboarding-agent"] },
          { name: "Structured Data Extraction", brand: "#8B93FF", evidence: ["document-analyzer-ai", "auto-job-intel"] },
          { name: "Document Workflow Automation", brand: "#8B93FF", evidence: ["document-analyzer-ai"] },
          { name: "Data Visualization", brand: "#62A6FF", evidence: ["forecast-ai", "project-database"] },
        ],
      },
      {
        category: "Microsoft & Enterprise Platform",
        glyph: "grid",
        items: [
          { name: "Power Apps", brand: "#742774", evidence: ["project-database"] },
          { name: "Power Automate", brand: "#0066FF", evidence: ["project-database"] },
          { name: "Power BI", brand: "#F2C811", evidence: ["project-database"] },
          { name: "SharePoint Online", brand: "#038387", evidence: ["project-database"] },
          { name: "Power Fx", brand: "#742774", evidence: ["project-database"] },
          { name: "DAX", brand: "#F2C811", evidence: ["project-database"] },
        ],
      },
      {
        category: "Automotive & Embedded",
        glyph: "chip",
        items: [
          { name: "OBD-II Interfacing", brand: "#F0765F", evidence: ["obd2-diagnostic-scanner"] },
          { name: "Vehicle ECU Communication", brand: "#F0765F", evidence: ["obd2-diagnostic-scanner"] },
          { name: "Embedded / IoT Protocols", brand: "#FB923C", evidence: ["obd2-diagnostic-scanner"] },
          { name: "Raspberry Pi", brand: "#A22846", evidence: ["wolski-command-center", "obd2-diagnostic-scanner"] },
        ],
      },
      {
        category: "Platform & Tooling",
        glyph: "terminal",
        items: [
          { name: "Linux Administration", brand: "#FCC624", evidence: ["system-hardening-lab", "wolski-command-center"] },
          { name: "Windows Administration", brand: "#0078D4", evidence: ["system-hardening-lab", "network-utility-tool"] },
          { name: "Docker", brand: "#2496ED", evidence: ["ai-agent-governance"] },
          { name: "Git", brand: "#F05032" },
          { name: "GitHub Actions", brand: "#8B949E" },
        ],
      },
    ],
  },
  {
    id: "working-knowledge",
    label: "Working knowledge",
    note: "Coursework, research, and internal work. Real experience, but no public repository to point at — so it's listed separately rather than mixed in above.",
    groups: [
      {
        category: "Languages",
        glyph: "code",
        items: [
          { name: "C", brand: "#00599C" },
          { name: "C++", brand: "#00599C" },
        ],
      },
      {
        category: "Frameworks",
        glyph: "stack",
        items: [{ name: "Tauri", brand: "#24C8D8" }],
      },
      {
        category: "Automotive & Embedded",
        glyph: "chip",
        items: [
          { name: "CAN Bus", brand: "#F0765F" },
          { name: "UDS", brand: "#F0765F" },
          { name: "Secure Boot & Chain of Trust", brand: "#FB923C", evidence: ["secure-boot-research"] },
          { name: "TPM 2.0 / Remote Attestation", brand: "#FB923C", evidence: ["secure-boot-research"] },
          { name: "ISO/SAE 21434 & TARA", brand: "#E3AC52" },
          { name: "AUTOSAR", brand: "#E3AC52" },
          { name: "MISRA C", brand: "#E3AC52", evidence: ["secure-boot-research"] },
        ],
      },
      {
        category: "Security & Cryptography",
        glyph: "shield",
        items: [
          { name: "PKI & Trust Chains", brand: "#5EEAD4", evidence: ["pki-ca-research"] },
          { name: "Certificate Authority Attacks", brand: "#5EEAD4", evidence: ["pki-ca-research"] },
        ],
      },
      {
        category: "Enterprise Data",
        glyph: "grid",
        items: [{ name: "Dataverse", brand: "#742774", evidence: ["project-database"] }],
      },
    ],
  },
];

// Flat lookup used by the project grid to resolve a clicked skill into a set of
// project ids, and by the skills section to know which chips are interactive.
export const skillEvidenceMap = Object.fromEntries(
  skillTiers
    .flatMap((tier) => tier.groups.flatMap((group) => group.items))
    .filter((item) => item.evidence?.length)
    .map((item) => [item.name, item.evidence])
);
