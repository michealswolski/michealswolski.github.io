/* ─────────────────────────────────────────────────────────────
   CONTENT DATA — single source of truth for the portfolio.
   Edit values here; the UI in App.jsx renders from these objects.

   NOTE: Public-facing only. No confidential employer information,
   customer names, internal system names, or proprietary data.
   ───────────────────────────────────────────────────────────── */

export const P = {
  name: "Micheal Wolski",
  title: "Automotive Cybersecurity, Digitalization & AI",
  subtitle: "Cybersecurity Graduate · Former Bosch Product Cybersecurity Intern",
  location: "Michigan, USA",
  email: "michealswolski@gmail.com",
  availability: "Open to full-time roles",
  summary:
    "I'm an early-career automotive cybersecurity and digitalization professional. During my internship with Bosch Mobility I supported product cybersecurity initiatives across multiple divisions — building enterprise visibility tooling on the Power Platform, automating internal security workflows, researching secure boot for automotive controllers, and prototyping AI-assisted knowledge tools. I hold a B.S. in Information Assurance & Cyber Defense (Cum Laude) from Eastern Michigan University and an A.A.S. in Cybersecurity from Henry Ford College.",
  focus: [
    "Automotive & Product Cybersecurity",
    "Digitalization & Automation",
    "AI Enablement",
    "Embedded / Vehicle Security",
    "Security Analytics",
  ],
};

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/michealwolski/" },
  { label: "GitHub", href: "https://github.com/michealswolski" },
  { label: "Email", href: "mailto:michealswolski@gmail.com" },
];

export const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "development", label: "Development" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

/* Category metadata — `key` matches project.cat entries; `token` maps
   to an accent in the theme (see CAT_COLORS in App.jsx). */
export const CATS = [
  { key: "INTERNSHIP", label: "Bosch", token: "red" },
  { key: "AI", label: "AI", token: "violet" },
  { key: "AUTOMOTIVE", label: "Automotive", token: "cyan" },
  { key: "SECURITY", label: "Security", token: "green" },
  { key: "PERSONAL", label: "Personal", token: "teal" },
  { key: "ACADEMIC", label: "Academic", token: "blue" },
];

export const EDU = [
  {
    degree: "B.S. Information Assurance & Cyber Defense",
    school: "Eastern Michigan University",
    status: "Graduated May 2026",
    loc: "Ypsilanti, MI",
    honors: "GPA 3.9 · Cum Laude",
  },
  {
    degree: "A.A.S. Cybersecurity",
    school: "Henry Ford College",
    status: "Graduated 2023",
    loc: "Dearborn, MI",
    honors: "Dean's List",
  },
];

export const CERTS = [
  { name: "CompTIA Security+", status: "In Progress" },
  { name: "CompTIA A+", status: "In Progress" },
  { name: "CCNA (Cisco)", status: "Networking Badges" },
  { name: "IT Help Desk", status: "Completed" },
];

export const EXPERIENCE = {
  current: {
    role: "Product Cybersecurity Intern",
    company: "Bosch Mobility",
    period: "2025 – 2026",
    location: "Farmington Hills, MI",
    domain: "Automotive Product Cybersecurity & Digitalization",
    statusLabel: "Internship complete",
    points: [
      "Supported product cybersecurity and digitalization activities across multiple Bosch Mobility divisions.",
      "Designed and built a cross-divisional cybersecurity visibility platform on the Power Platform (Power Apps, Dataverse / SharePoint, Power Automate, Power BI) — structured project intake with draft, submitted, returned, and archived states, executive reporting, and automated notifications.",
      "Automated a previously manual internal cybersecurity portal workflow and added administrative status visibility, reducing repetitive coordination.",
      "Researched secure boot for safety-critical automotive controllers through documentation review and subject-matter-expert interviews — technical research and communication, not production implementation.",
      "Built an LLM-powered onboarding and knowledge assistant using retrieval-augmented generation during an internal AI hackathon.",
      "Served as game master for an internal automotive cybersecurity fire drill and supported senior-leadership workshops, cybersecurity events, and Automotive Innovations Tech Day materials.",
    ],
  },
  past: [
    {
      role: "Warehouse Operations",
      company: "Amazon",
      period: "2022 – 2025",
      location: "Michigan",
      points: [
        "Inbound receiving and stowing at high throughput.",
        "Maintained strong performance metrics in a fast-paced fulfillment environment.",
      ],
    },
    {
      role: "Logistics Associate",
      company: "Ascent Global Logistics",
      period: "2021 – 2022",
      location: "Michigan",
      points: [
        "Coordinated freight shipments and inbound/outbound logistics flows.",
        "Processed shipment documentation and maintained accuracy in logistics records.",
      ],
    },
  ],
};

/* status ∈ Completed | In Development | Prototype | Research | Academic | Lab | Archived
   cat  = array of CATS keys (first entry drives the badge color)
   link = public repo URL, or null when private / not linkable          */
export const PROJECTS = [
  /* ── Bosch Mobility ── */
  {
    id: "BSH-01",
    title: "Cybersecurity Visibility Platform",
    sub: "Power Platform · Bosch Mobility",
    cat: ["INTERNSHIP", "AI"],
    status: "Completed",
    featured: true,
    domain: "Enterprise Analytics",
    desc: "A cross-divisional platform that pulled fragmented security-project information into one place: Power Apps intake portal → SharePoint / Dataverse data layer → Power Automate workflows → Power BI executive dashboard.",
    impact: "Consolidated fragmented project data and improved visibility across participating divisions.",
    details:
      "Self-initiated after seeing security-project information scattered across teams with no central view. I built the full stack: a multi-step Power Apps intake form with lifecycle states (draft, submitted, returned, archived), a SharePoint / Dataverse backend, Power Automate notifications, and a Power BI dashboard with drill-through reporting, KPI cards, division and customer filtering, and automated refresh. Documented the process and presented to business-unit leadership. Public summary only — no confidential data or internal system details are shown.",
    tags: ["Power BI", "DAX", "Power Apps", "Power Automate", "SharePoint", "Dataverse", "Power Query"],
    link: null,
  },
  {
    id: "BSH-02",
    title: "Internal Cybersecurity Portal Automation",
    sub: "Power Automate · Bosch Mobility",
    cat: ["INTERNSHIP"],
    status: "Completed",
    featured: true,
    domain: "Enterprise Automation",
    desc: "Converted a previously manual internal cybersecurity submission process into an automated workflow with routing, notifications, status tracking, and an administrative overview.",
    impact: "Reduced repetitive manual coordination and added administrative status visibility.",
    details:
      "Redesigned a manual internal security submission and approval process as an automated Power Automate workflow — submission routing, real-time status notifications, and an administrative queue for oversight — and documented it for maintainability. Framed generically; no confidential internal systems or data are described.",
    tags: ["Power Automate", "SharePoint", "Power Apps", "Microsoft 365", "Workflow Automation"],
    link: null,
  },
  {
    id: "BSH-03",
    title: "AI Onboarding & Knowledge Assistant",
    sub: "Bosch AI Hackathon · RAG",
    cat: ["INTERNSHIP", "AI"],
    status: "Prototype",
    featured: true,
    domain: "AI Enablement",
    desc: "An onboarding assistant built at an internal Bosch AI hackathon: an LLM connected to a retrieval-augmented-generation pipeline that ingests documentation into a vector store and answers with retrieved context.",
    impact: "Collaborative hackathon prototype — RAG assistant for onboarding and knowledge discovery.",
    details:
      "Covers the full pipeline: document ingestion, embedding, vector retrieval, and conversational output, so answers are grounded in retrieved context instead of hallucinated. Built and demoed within a single hackathon event. A collaborative prototype — not a deployed production system.",
    tags: ["LLM", "RAG", "Vector Search", "Python", "AI Agents"],
    link: null,
  },
  {
    id: "BSH-04",
    title: "Secure Boot Research",
    sub: "Technical Research · Bosch Mobility",
    cat: ["INTERNSHIP", "AUTOMOTIVE"],
    status: "Research",
    featured: true,
    domain: "Embedded Security",
    desc: "Technical research into secure boot for safety-critical automotive controllers — root of trust, HSM concepts, signature verification, anti-rollback, key management, and OTA / software-download considerations.",
    impact: "Research and technical communication — not production implementation.",
    details:
      "Reviewed documentation and interviewed subject-matter experts to understand secure boot on safety-critical ECUs: root of trust, HSM concepts, signature verification, anti-rollback, key management, boot-time constraints, hardware variation, fault-injection considerations, AUTOSAR SecOC awareness, and secure software download / OTA. Produced a concise technical summary. This was research and technical communication — I did not implement production secure boot or perform formal TARA.",
    tags: ["Secure Boot", "HSM", "Root of Trust", "AUTOSAR SecOC", "OTA", "ISO/SAE 21434"],
    link: null,
  },
  {
    id: "BSH-05",
    title: "365 Whitepaper Agent",
    sub: "AI Document Processing · Bosch Mobility",
    cat: ["INTERNSHIP", "AI"],
    status: "Prototype",
    featured: false,
    domain: "AI Enablement",
    desc: "An LLM-based assistant wired to Microsoft 365 document APIs to help draft and summarize technical security documentation, with prompts tuned for the domain.",
    impact: "Reduced manual overhead in technical documentation workflows.",
    details:
      "Connected an LLM to Microsoft 365 document APIs so it can read from and help write internal documents — whitepaper drafting, summarization, and structure formatting with prompts tuned for cybersecurity and engineering content. A prototype focused on reducing manual documentation overhead.",
    tags: ["LLM", "Python", "NLP", "Microsoft 365 APIs", "Prompt Engineering"],
    link: null,
  },

  /* ── Current personal work ── */
  {
    id: "PRJ-01",
    title: "Tempest",
    sub: "Offensive-Security Toolkit",
    cat: ["SECURITY", "PERSONAL"],
    status: "In Development",
    featured: true,
    domain: "Offensive Security",
    desc: "A modular offensive-security toolkit for authorized penetration testing — reusable scripts and tooling for reconnaissance and assessment. For authorized or owned systems only.",
    impact: "Personal project — strictly authorized / owned systems only.",
    details:
      "A toolkit I'm building to consolidate common offensive-security tasks into reusable, modular tooling for authorized penetration testing and lab work. Strictly for use on systems I own or am explicitly authorized to test.",
    tags: ["Python", "Offensive Security", "Penetration Testing", "Automation"],
    link: null,
  },
  {
    id: "PRJ-02",
    title: "Squint",
    sub: "AI Application · powered by The Pipe",
    cat: ["AI", "PERSONAL"],
    status: "In Development",
    featured: true,
    domain: "AI Application",
    desc: "An application built on “The Pipe,” a custom AI backend I developed to handle its model calls and data flow.",
    impact: "In development — application plus a custom AI backend.",
    details:
      "Squint is an application powered by “The Pipe,” a custom AI backend I built to orchestrate its model calls and data flow. Currently in active development.",
    tags: ["AI", "LLM", "Python", "Backend", "APIs"],
    link: null,
  },
  {
    id: "PRJ-03",
    title: "Job Swoop",
    sub: "AI Job-Search Assistant",
    cat: ["AI", "PERSONAL"],
    status: "In Development",
    featured: false,
    domain: "AI Agents",
    desc: "An AI-assisted tool that helps find and apply to jobs — an AI-agent workflow over listings and applications.",
    impact: "In development — AI-agent job-search assistant.",
    details:
      "An AI-agent workflow that assists with finding and applying to relevant roles, streamlining the repetitive parts of the job search. In active development.",
    tags: ["AI Agents", "Python", "Automation", "LLM"],
    link: null,
  },
  {
    id: "PRJ-04",
    title: "Aim Trainer AI",
    sub: "Machine-Learning Model",
    cat: ["AI", "PERSONAL"],
    status: "Prototype",
    featured: false,
    domain: "Machine Learning",
    desc: "A machine-learning model for gaming aim training and analysis — a personal ML experiment.",
    impact: "Prototype — personal machine-learning project.",
    details:
      "A personal experiment applying machine learning to gaming aim training and analysis — model training and evaluation on aim/tracking data.",
    tags: ["Machine Learning", "Python", "Computer Vision"],
    link: null,
  },
  {
    id: "PRJ-05",
    title: "Wolski Command Center",
    sub: "Raspberry Pi Dashboard · React + Node",
    cat: ["PERSONAL"],
    status: "Completed",
    featured: true,
    domain: "Full-Stack",
    desc: "A full-stack Raspberry Pi management dashboard — React frontend, Node.js / Express backend, SSH, real-time system metrics, file management, health diagnostics, and AI-assisted administration.",
    impact: "A single control panel for my home-lab infrastructure.",
    details:
      "React frontend talking to a Node.js / Express backend on the Pi over SSH: real-time CPU / memory / disk metrics, file management, health diagnostics, deployment scripts, and AI-assisted admin tasks — everything in one place.",
    tags: ["React", "Node.js", "Express", "Raspberry Pi", "SSH", "PowerShell"],
    link: "https://github.com/michealswolski/wolski-command-center",
  },
  {
    id: "PRJ-06",
    title: "Network Utility Tool",
    sub: "PowerShell · Windows",
    cat: ["SECURITY", "PERSONAL"],
    status: "Completed",
    featured: false,
    domain: "Network Security",
    desc: "A PowerShell Windows network utility bundling DNS benchmarking, adapter diagnostics, system information, and defensive-security functions — every change reversible.",
    impact: "15+ network and diagnostic tools in one script.",
    details:
      "Grew from a personal script into a single utility with DNS benchmarking across providers, adapter diagnostics, system information, and defensive-security helpers. Designed so every change is reversible.",
    tags: ["PowerShell", "Networking", "DNS", "DFIR"],
    link: "https://github.com/michealswolski/network-utility-tool",
  },
  {
    id: "PRJ-07",
    title: "MeshLink",
    sub: "Encrypted BLE Messaging · iOS",
    cat: ["PERSONAL"],
    status: "Completed",
    featured: false,
    domain: "iOS / Applied Crypto",
    desc: "A native iOS app for encrypted messaging that works without internet — messages hop between devices over Bluetooth Low Energy with AES-256-GCM encryption and offline key exchange.",
    impact: "End-to-end encrypted BLE mesh communication for iOS.",
    details:
      "CoreBluetooth handles the mesh layer so messages route between nearby devices with no server. AES-256-GCM handles encryption; keys are exchanged offline via NFC tap or QR scan. Native Swift / SwiftUI.",
    tags: ["Swift", "SwiftUI", "CoreBluetooth", "AES-256-GCM", "NFC"],
    link: null,
  },
  {
    id: "PRJ-08",
    title: "Depass Grading & Landscaping",
    sub: "Client Website · React",
    cat: ["PERSONAL"],
    status: "Completed",
    featured: false,
    domain: "Web Development",
    desc: "A complete business website for a real client — service pages, gallery, contact forms via EmailJS, a private admin portal, and basic SEO.",
    impact: "Live client website with lead generation and an admin portal.",
    details:
      "Built and delivered a full business website for a real client: services, portfolio, testimonials, FAQ, a private admin dashboard, and EmailJS-powered contact forms for instant lead notifications.",
    tags: ["React", "EmailJS", "SEO", "Responsive Design"],
    link: null,
  },
  {
    id: "PRJ-09",
    title: "S650 Mustang Mod Tracker",
    sub: "Vehicle Build App · React",
    cat: ["PERSONAL", "AUTOMOTIVE"],
    status: "Completed",
    featured: false,
    domain: "Automotive",
    desc: "A React app to track every modification, maintenance item, and expense on my S650 Mustang — setup wizard, mod library, mileage-based reminders, and a budget dashboard.",
    impact: "Personal tool for managing a vehicle build.",
    details:
      "Onboarding wizard for vehicle setup, a pre-loaded mod template library, mileage-based maintenance reminders, and a budget dashboard with cost breakdowns.",
    tags: ["React", "Budget Tracking", "Responsive"],
    link: null,
  },

  /* ── Academic / automotive ── */
  {
    id: "ACA-01",
    title: "CAN Bus Intrusion Detection System",
    sub: "Raspberry Pi 5 · Capstone",
    cat: ["AUTOMOTIVE", "ACADEMIC"],
    status: "Completed",
    featured: true,
    domain: "Automotive Security",
    desc: "A Raspberry Pi 5 that plugs into a vehicle's OBD-II port, learns normal CAN-bus traffic, and flags anomalies — with a Flask dashboard for live traffic and detected threats. Capstone project.",
    impact: "Real-time CAN-bus anomaly detection with a web dashboard.",
    details:
      "The Pi talks to the vehicle via ELM327 over OBD-II, logs CAN frames to SQLite, builds statistical baselines of normal traffic, and flags outliers. A Flask dashboard shows live traffic, detected anomalies, VIN info, and DTC reads. A low-cost in-vehicle IDS, relevant to ISO/SAE 21434 threat modeling.",
    tags: ["Python", "Flask", "SQLite", "Raspberry Pi 5", "ELM327", "CAN", "OBD-II"],
    link: null,
  },
  {
    id: "ACA-02",
    title: "OBD-II Diagnostic Scanner",
    sub: "IoT & Embedded Systems · EMU",
    cat: ["AUTOMOTIVE", "ACADEMIC"],
    status: "Academic",
    featured: false,
    domain: "IoT / Automotive",
    desc: "An OBD-II diagnostic scanner built for an IoT and Embedded Systems course — hardware interfacing to read ECU diagnostic trouble codes and live sensor data.",
    impact: "Hands-on embedded project bridging IoT and automotive diagnostics.",
    details:
      "Hardware interfaces with vehicle ECUs to read diagnostic trouble codes and display real-time sensor data — a coursework project in IoT and embedded systems.",
    tags: ["IoT", "Embedded Systems", "OBD-II", "Hardware"],
    link: null,
  },

  /* ── Security labs ── */
  {
    id: "LAB-01",
    title: "Splunk SIEM Lab",
    sub: "Dashboards, Alerts & Detection Tuning",
    cat: ["SECURITY"],
    status: "Lab",
    featured: false,
    domain: "SIEM & Detection",
    desc: "A full SIEM workflow in Splunk — Windows and Linux log ingestion, SPL detection queries for brute-force, dashboards, and tuned spike-based alerting.",
    impact: "End-to-end SIEM workflow: ingest → search → visualize → alert.",
    details:
      "Splunk Enterprise with Windows Event Log and Linux syslog inputs, SPL queries for brute-force detection, trend dashboards, spike alerts, and iterative threshold tuning.",
    tags: ["Splunk", "SPL", "SIEM", "Log Analysis"],
    link: null,
  },
  {
    id: "LAB-02",
    title: "Home Lab Vulnerability Management",
    sub: "Nessus + Nmap + pfSense",
    cat: ["SECURITY"],
    status: "Lab",
    featured: false,
    domain: "Vulnerability Management",
    desc: "A full detect → analyze → remediate → validate cycle on a multi-VM network: Nessus scans, CVSS prioritization, patching, pfSense rules, then re-scan to confirm a smaller attack surface.",
    impact: "Complete vulnerability-management lifecycle with before/after evidence.",
    details:
      "Multi-VM business-network simulation. Nessus baseline scans, CVSS prioritization, patch remediation, pfSense rule enforcement, then re-scan validation to confirm a reduced attack surface.",
    tags: ["Nessus", "Nmap", "pfSense", "VirtualBox"],
    link: null,
  },
  {
    id: "LAB-03",
    title: "Network Traffic Analysis",
    sub: "Wireshark Deep Packet Inspection",
    cat: ["SECURITY"],
    status: "Lab",
    featured: false,
    domain: "Network Forensics",
    desc: "Captured and analyzed live traffic in an isolated lab — TCP handshakes, DNS queries, HTTP sessions — and traced suspicious outbound connections.",
    impact: "Protocol-level anomaly detection and stream reconstruction.",
    details:
      "Isolated VM network with full capture. TCP handshake analysis, DNS checks, HTTP stream extraction, and suspicious outbound-connection identification in Wireshark with tcpdump backups.",
    tags: ["Wireshark", "Kali Linux", "tcpdump", "TCP/IP"],
    link: null,
  },
  {
    id: "LAB-04",
    title: "Offensive Security Lab",
    sub: "Kali + Metasploitable",
    cat: ["SECURITY"],
    status: "Lab",
    featured: false,
    domain: "Offensive Security",
    desc: "A full pentest workflow against Metasploitable in an isolated lab — recon, scanning, enumeration, exploitation, privilege escalation, and credential testing — fully documented.",
    impact: "Complete attack chain, recon to access, in a controlled lab.",
    details:
      "Recon, Nmap scanning, service enumeration, exploitation, privilege escalation, and Hydra credential testing against Metasploitable — every step documented. Lab practice on intentionally vulnerable targets only.",
    tags: ["Kali Linux", "Metasploit", "Nmap", "Hydra"],
    link: null,
  },
  {
    id: "LAB-05",
    title: "HackTheBox & CTF Practice",
    sub: "Ongoing · Web, Binary, Crypto, AI/LLM",
    cat: ["SECURITY"],
    status: "In Development",
    featured: false,
    domain: "Offensive Security",
    desc: "Ongoing HackTheBox and CTF practice across web, binary, crypto, and forensics — plus AI/LLM CTFs involving prompt injection and adversarial prompting.",
    impact: "Continuous hands-on offensive-security skill development.",
    details:
      "Regular HackTheBox machines and CTF categories (web, binary, crypto, forensics), plus AI/LLM-focused CTF challenges — prompt injection, prompt leaking, and reverse prompt engineering — applying adversarial thinking to generative-AI systems.",
    tags: ["HackTheBox", "CTF", "Prompt Injection", "Web Security"],
    link: null,
  },
];

export const SKILLS = [
  {
    cat: "Automotive & Embedded Security",
    items: [
      "Automotive cybersecurity fundamentals", "CAN bus", "OBD-II", "Secure-boot concepts",
      "HSM & root-of-trust concepts", "ECU architecture awareness", "ISO/SAE 21434",
      "UN R155 / R156", "AUTOSAR SecOC", "V-model", "TARA (conceptual)", "OTA security concepts",
    ],
  },
  {
    cat: "Enterprise Digitalization",
    items: [
      "Power Apps", "Power Automate", "Power BI", "Dataverse", "SharePoint",
      "Workflow & intake design", "Process automation", "Dashboards",
      "Requirements gathering", "Technical documentation",
    ],
  },
  {
    cat: "AI & Data",
    items: [
      "AI agents & assistants", "Retrieval-augmented generation", "Prompt design",
      "Document-retrieval workflows", "Vector-database concepts", "Python", "SQL",
      "Power Query", "DAX fundamentals", "Data visualization",
    ],
  },
  {
    cat: "Cybersecurity",
    items: [
      "Wireshark", "Security Onion", "Splunk", "Nessus", "Nmap", "Burp Suite", "Linux",
      "Windows administration", "Network analysis", "Vulnerability assessment",
      "Log & traffic analysis", "SecOps fundamentals",
    ],
  },
  {
    cat: "Development",
    items: [
      "Python", "PowerShell", "C++", "JavaScript", "React", "Node.js", "Git & GitHub",
      "REST APIs", "Raspberry Pi", "Basic database design",
    ],
  },
];

/* Professional development & conferences — brief's "Professional Development" */
export const DEVELOPMENT = [
  "Auto-ISAC Cybersecurity Summit 2026",
  "IQPC Automotive Cybersecurity Conference 2026",
  "Bosch internal cybersecurity CTF",
  "Bosch internal AI hackathon",
  "Automotive cybersecurity fire drill (game master)",
  "Senior-leadership workshops",
  "Corporate IP & data-protection training",
  "Secure-boot subject-matter-expert interviews",
  "Automotive Innovations Tech Day",
];

/* Forward-looking — brief's "Currently Exploring" */
export const EXPLORING = [
  "Enterprise AI agents & knowledge assistants",
  "Agentic cybersecurity tools for authorized labs",
  "Raspberry Pi & mobile-accessible system management",
  "Router / IoT security research (authorized)",
  "Automotive embedded-security research",
  "Power Platform automation",
  "Azure fundamentals",
  "Databricks-style enterprise analytics",
];
