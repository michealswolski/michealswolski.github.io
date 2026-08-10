// Every entry below is grounded in the actual README/architecture docs of the
// linked repository (verified prior to writing this file). Nothing here
// describes functionality that isn't actually present in the source.

export const CATEGORY_COLORS = {
  "AI Security": "var(--cat-ai-security)",
  "AI / Automation": "var(--cat-ai-auto)",
  "Full Stack": "var(--cat-fullstack)",
  "Enterprise Apps": "var(--cat-enterprise)",
  Automotive: "var(--cat-automotive)",
  Systems: "var(--cat-systems)",
  Analytics: "var(--cat-analytics)",
};

export const featuredProjects = [
  {
    id: "ai-agent-governance",
    title: "AI Agent Governance Dashboard",
    category: "AI Security",
    status: "public",
    screenshot: { src: "/screenshots/ai-agent-governance.webp", alt: "AI Agent Governance Dashboard showing risk KPIs, a risk breakdown chart, and a human approval queue" },
    summary:
      "A self-hosted governance service that scores AI agent traces for risk — prompt injection, unapproved write actions, sensitive data — and routes anything risky into a human approval queue with a durable audit trail.",
    tech: ["Node.js", "node:sqlite", "Vanilla JS", "Docker"],
    highlights: [
      "Rule-based risk engine (8 weighted rules) shared by the server, dashboard, and test suite",
      "Reviewer approval queue — approve / reject / escalate, persisted with reviewer and timestamp",
      "Full audit export bundling trace + governance score + decision",
      "Zero runtime npm dependencies; 32 passing tests",
    ],
    links: { github: "https://github.com/michealswolski/ai-agent-governance" },
    detail: {
      problem:
        "Teams shipping AI agents into real workflows need to know when an agent did something risky, and to gate risky actions behind a human — without bolting together a dozen separate observability tools.",
      whatIBuilt:
        "A three-tier app: agents and pipelines POST traces to a REST API, a governance engine scores each one against 8 weighted rules, and a reviewer dashboard surfaces anything that needs a decision.",
      architecture:
        "Node HTTP server (built-ins only, no framework) → a single shared governance-engine module → SQLite via node:sqlite. The same engine module scores on ingestion, renders the dashboard, and is exercised by the test suite, so the risk shown can never drift from what's stored.",
      keyFeatures: [
        "Weighted risk scoring: prompt injection, indirect/retrieved-content injection, write tools without approval, sensitive data, low groundedness, excessive tool calls, high latency",
        "Approval queue with approve / reject / escalate + notes",
        "Audit-ready export of every trace, its score, and its decision",
        "scrypt-hashed reviewer auth (HttpOnly sessions) plus separate API-key ingestion auth",
      ],
      challenges:
        "Keeping the governance engine as one module used by the server, the browser, and the tests — so the dashboard's score can never disagree with what's persisted. Chose zero runtime dependencies and Node's built-in SQLite to keep the Docker image tiny and installs instant.",
      whatILearned:
        "How to design a scoring rubric transparent enough to defend in an audit — every rule has a name, a category, and a weight — instead of a black-box number.",
    },
  },
  {
    id: "auto-job-intel",
    title: "AutoJob Intel",
    category: "Full Stack",
    status: "public",
    screenshot: { src: "/screenshots/auto-job-intel.webp", alt: "AutoJob Intel ranked-matches view showing fit scores, verification badges, and cited requirement evidence" },
    summary:
      "A job-search pipeline that only trusts official employer postings — every requirement is cited back to the exact sentence it came from, and every alert is re-verified as still active before it reaches you.",
    tech: ["Next.js", "React", "TypeScript", "Zod"],
    highlights: [
      "Ingest → verify → extract → match → digest pipeline, each stage independently tested",
      "Explainable 0–100 fit score with matched / gap / unknown skills — no black box",
      "Status re-verification (verified / uncertain / closed) plus dedupe and change history",
      "Runs end-to-end with zero external services; 24 passing tests",
    ],
    links: { github: "https://github.com/michealswolski/auto-job-intel" },
    detail: {
      problem:
        "Most job boards optimize for volume of listings, not whether they're real, current, or a genuine fit — leading to stale postings and generic keyword matching.",
      whatIBuilt:
        "A pipeline that ingests official employer postings, extracts requirements with evidence spans, scores fit transparently, and only surfaces alerts for postings re-verified as still active.",
      architecture:
        "fetcher → parser → dedupe → verifier → matcher → digest, orchestrated over a swappable Repository interface (file-backed by default, with a ready-to-use Supabase/Postgres schema).",
      keyFeatures: [
        "Search-profile dashboard (locations, skills, role families, remote/stretch tolerance)",
        "Official-URL or pasted-HTML ingestion with verification evidence",
        "Ranked matches with cited source sentences behind every requirement",
        "Saved-jobs pipeline (saved → applied → interview → offer/rejected)",
        "Deduplicated digest with closed-job corrections",
      ],
      challenges:
        "Keeping fetching/parsing separate from matching so one verified job record can be scored against many profiles, and treating \"no fabricated links, no CAPTCHA bypass, no auto-apply\" as an explicit trust boundary rather than an afterthought.",
      whatILearned:
        "How much of a trustworthy matching tool comes from showing your work — the cited sentence, the verification status — rather than a single confidence score.",
    },
  },
  {
    id: "project-database",
    title: "Product Security Intake & Reporting Platform",
    category: "Enterprise Apps",
    status: "case-study",
    summary:
      "An 11-screen intake application plus an executive reporting dashboard, built to replace fragmented spreadsheet tracking of security work across multiple engineering divisions at a Tier 1 automotive supplier.",
    tech: ["Power Apps (Canvas)", "Power Automate", "Power BI", "DAX", "Power Query", "SharePoint Online"],
    highlights: [
      "11-screen Canvas app intake wizard with role-based admin review and ticketing",
      "Power BI reporting layer with per-division drill-through and DAX measures",
      "Automated notifications and approvals via Power Automate",
      "Packaged cross-tenant .msapp deployments",
    ],
    links: {
      github: "https://github.com/michealswolski/project-database",
      githubSecondary: "https://github.com/michealswolski/bosch-project-dashboard",
      githubSecondaryLabel: "Reporting dashboard repo",
    },
    disclaimer:
      "Public-facing case study. No confidential company information, internal data, source code, or proprietary material is disclosed.",
    detail: {
      problem:
        "Security project tracking was scattered across spreadsheets and email threads across several engineering divisions, with no shared view of status or ownership.",
      whatIBuilt:
        "A Canvas-app intake wizard (validation, draft/submit/review-style states, admin queue) backed by SharePoint, plus a Power BI dashboard that turns the same data into cross-division reporting for leadership.",
      architecture:
        "Power Apps Canvas front end → SharePoint Online lists as the backend → Power Automate flows for notifications and approvals → Power BI, DAX, and Power Query for the reporting layer.",
      keyFeatures: [
        "Multi-step intake with validation and a dark, SOC-style UI",
        "Role-based admin dashboard with an integrated ticketing workflow",
        "Cross-division drill-through reporting with scheduled refresh",
        "Cross-tenant .msapp packaging",
      ],
      challenges:
        ".msapp packages don't repack or import cleanly across different tenant environments by default — solved the cross-tenant deployment problem so the same app could ship without breaking internal references.",
      whatILearned:
        "Power Platform ALM in practice — packaging, versioning, cross-tenant deploys — and how to gather consistent requirements from stakeholders across divisions that don't agree on terminology.",
    },
  },
  {
    id: "obd2-diagnostic-scanner",
    title: "OBD-II Diagnostic Scanner",
    category: "Automotive",
    status: "in-progress",
    summary:
      "An OBD-II diagnostic scanner built for an IoT & Embedded Systems course — hardware interfacing with a vehicle's diagnostic port to read live sensor data and trouble codes.",
    tech: ["OBD-II", "Embedded Systems", "Serial Communication"],
    highlights: [
      "Direct hardware interfacing with a vehicle's OBD-II port",
      "Protocol-level communication with vehicle ECUs",
      "Live sensor data and diagnostic-trouble-code (DTC) reading",
    ],
    links: { github: "https://github.com/michealswolski/obd2-diagnostic-scanner" },
    detail: {
      problem:
        "Coursework project meant to bridge IoT/embedded-systems concepts with real automotive diagnostics.",
      whatIBuilt:
        "Hardware interfacing to a live OBD-II port to parse PIDs and DTCs and display real-time sensor data.",
      architecture: "Serial/embedded interface to the vehicle's diagnostic port, feeding a real-time data display.",
      keyFeatures: ["OBD-II port interfacing", "DTC (diagnostic trouble code) reads", "Live sensor data display"],
      challenges: "Working directly against real vehicle protocols instead of a simulator.",
      whatILearned: "Automotive diagnostic protocols (OBD-II PIDs, DTC structure) and embedded hardware-software integration.",
    },
    inProgressNote: "Active coursework project — this case study will grow as the build continues.",
  },
  {
    id: "wolski-command-center",
    title: "Wolski Command Center",
    category: "Systems",
    status: "public",
    summary:
      "A self-hosted dashboard for managing a Raspberry Pi home server — live system health, file management, and an SSH bridge backend with one-click deploy scripts for Windows and macOS.",
    tech: ["React", "Node.js", "Express", "SSH2"],
    highlights: [
      "Six management tabs: overview, hardware, health, AI agent, domain hub, file manager",
      "Real SSH bridge backend with 26 API routes",
      "System health scoring with actionable recommendations",
      "One-click deploy scripts for Windows and macOS",
    ],
    links: { github: "https://github.com/michealswolski/wolski-command-center" },
    detail: {
      problem: "Wanted one place to check on and manage a home-lab Raspberry Pi instead of SSHing in for every small task.",
      whatIBuilt:
        "A React dashboard talking to a Node/Express backend that bridges commands to the Pi over SSH2 — real-time telemetry, file management, and lightweight AI-assisted automation for common tasks.",
      architecture: "React SPA (six tabs) → Express server (26 routes) → SSH2 → Raspberry Pi OS.",
      keyFeatures: [
        "Real-time CPU / memory / disk / network telemetry",
        "Health diagnostics with actionable recommendations",
        "Browser-based file manager",
        "One-click PowerShell (Windows) and Bash (macOS) deploy scripts",
      ],
      challenges: "Building a real SSH bridge safely — scoped commands and auth — instead of just shelling out.",
      whatILearned: "Designing a backend that bridges a web UI to a remote shell without turning it into an open door.",
    },
  },
  {
    id: "document-analyzer-ai",
    title: "Document Analyzer AI",
    category: "Enterprise Apps",
    status: "public",
    summary:
      "A local-first tool that turns RFQs and sales documents into structured, review-ready records — extracting fields, flagging missing information and risks, and tracing every value back to its source sentence.",
    tech: ["Vanilla JS", "Node.js"],
    highlights: [
      "Deterministic structured extraction with source-evidence snippets",
      "Missing-info and business-risk detection with severity, plus data-quality checks",
      "Human review workflow — Approve / Needs Info / Reject — with override flags",
      "Persistent reviewer queue; JSON / CSV / CRM-style export",
    ],
    links: { github: "https://github.com/michealswolski/document-analyzer-ai" },
    detail: {
      problem:
        "RFQ and sales documents bury the fields that matter — pricing, volume, program, deadlines — in unstructured text, and manual triage is slow and inconsistent.",
      whatIBuilt:
        "A static web app that extracts structured fields deterministically, shows the exact source sentence behind each one, flags risks and missing info, and routes documents through an approve/reject review queue.",
      architecture:
        "Shared ES modules (schema, analyzer, review, store) run identically in the browser and in the Node test suite, so the same extraction logic is covered by 23 unit tests. No server, no API keys, no account.",
      keyFeatures: [
        "Source-evidence traceability for every extracted field",
        "Severity-ranked risk and missing-info detection",
        "Reviewer queue with comment, reviewer, and timestamp",
        "JSON, CSV, and CRM-style payload export",
      ],
      challenges:
        "Choosing deterministic, rule-based extraction over an LLM call so results stay explainable and reproducible with zero API cost — the repo documents how LLM-based extraction could be added later as an opt-in.",
      whatILearned: "How much of \"document AI\" trust comes from traceability — showing the source sentence — rather than the extraction method itself.",
    },
  },
  {
    id: "swoop",
    title: "Swoop",
    category: "AI / Automation",
    status: "private",
    summary:
      "A self-hosted AI agent that watches for relevant job postings, scores them against a career profile, tailors a resume and cover letter, and waits for human approval before anything is submitted.",
    tech: ["Python", "FastAPI", "React", "TypeScript", "Claude"],
    highlights: [
      "Watches roles and scores them against a configurable career profile",
      "Tailors a resume and cover letter per posting",
      "Never submits without explicit human approval",
      "Triages replies into a pipeline",
    ],
    links: {},
    privateLabel: "Private project — architecture and case study",
    detail: {
      problem: "Job searching well takes more consistent effort than most people have time for — tracking postings, tailoring materials, and following up.",
      whatIBuilt:
        "A self-hosted agent that watches relevant roles, scores them against a career profile, tailors application materials, and keeps a human in the loop before anything goes out.",
      architecture: "Python/FastAPI backend orchestrating the agent logic, a React + TypeScript front end for review and approval, self-hosted with local data.",
      keyFeatures: [
        "Role scoring against a configurable profile",
        "Per-posting resume and cover-letter tailoring",
        "Human-approval gate before submission",
        "Reply triage pipeline",
      ],
      challenges: "Keeping a human approval gate in front of every submission by design, not as an afterthought.",
      whatILearned: "Where to draw the line between agent autonomy and human sign-off in a workflow with real-world consequences.",
    },
  },
  {
    id: "forecast-ai",
    title: "ForecastAI",
    category: "Analytics",
    status: "public",
    screenshot: { src: "/screenshots/forecast-ai.webp", alt: "ForecastAI dashboard showing forecast vs. actual KPIs and an executive summary" },
    summary:
      "A forecast-vs-actual dashboard that computes variance, accuracy (MAPE), and bias, ranks the biggest customer and product drivers, and writes a grounded plain-language explanation — every sentence maps back to a number on the page.",
    tech: ["Vanilla JS"],
    highlights: [
      "KPIs: variance, forecast accuracy, MAPE, bias, rolling 3-month variance",
      "Risk scoring (Controlled / Watch / Critical) with customer and product driver analysis",
      "Scenario sensitivity — Base / Optimistic / Downside bands",
      "Deterministic explainer grounded in computed metrics, not a model call, plus CSV / Markdown export",
    ],
    links: { github: "https://github.com/michealswolski/forecast-ai" },
    detail: {
      problem: "Forecast-vs-actual reviews are usually a spreadsheet plus a gut-feel narrative; wanted the narrative to be provably grounded in the numbers.",
      whatIBuilt: "A static analytics dashboard that computes standard FP&A metrics client-side and generates a plain-language summary that only describes what's on the page.",
      architecture: "One dependency-free analytics module shared by the UI and the test suite. CSV in, computed KPIs plus narrative and exports out — no server, no account.",
      keyFeatures: [
        "Variance / MAPE / bias KPIs with rolling 3-month smoothing",
        "Customer and product driver ranking",
        "Base / Optimistic / Downside scenario bands",
        "CSV and Markdown executive-summary export",
      ],
      challenges: "Deliberately not wiring up a language model for the \"explainer\" — every sentence is templated from a real computed value, stated as a contract in both the UI and the docs.",
      whatILearned: "How to design a metrics layer trustworthy enough to hand to a finance audience without a hallucination disclaimer.",
    },
  },
];

export const secondaryProjects = [
  {
    id: "meshlink-ios",
    title: "MeshLink",
    category: "Systems",
    summary: "Native iOS app for encrypted peer-to-peer messaging over a Bluetooth Low Energy mesh — AES-256-GCM encryption with NFC or QR key exchange.",
    tech: ["Swift", "SwiftUI", "CoreBluetooth", "CryptoKit"],
    links: { github: "https://github.com/michealswolski/meshlink-ios" },
  },
  {
    id: "network-utility-tool",
    title: "Network Utility Tool v6.0",
    category: "Systems",
    summary: "A 14-menu Windows PowerShell toolkit — DNS benchmarking, adapter tuning, bufferbloat testing, DFIR tools, and full revert on every change.",
    tech: ["PowerShell"],
    links: { github: "https://github.com/michealswolski/network-utility-tool" },
  },
  {
    id: "secure-boot-research",
    title: "Secure Boot & Hardware Security Research",
    category: "Automotive",
    summary: "Academic research on chain-of-trust boot verification, TPM 2.0 attestation, and MISRA C standards for automotive ECUs.",
    tech: ["Research"],
    links: { github: "https://github.com/michealswolski/secure-boot-research" },
  },
  {
    id: "pki-ca-research",
    title: "PKI & Certificate Authority Research",
    category: "AI Security",
    summary: "Research on PKI trust chains, certificate-authority attack vectors, and real-world CA compromise case studies.",
    tech: ["Research"],
    links: { github: "https://github.com/michealswolski/pki-ca-research" },
  },
  {
    id: "network-traffic-analysis",
    title: "Network Traffic Analysis Lab",
    category: "Systems",
    summary: "Isolated VM lab capturing live traffic; TCP handshake, DNS, and HTTP session analysis with stream reconstruction in Wireshark.",
    tech: ["Wireshark", "tcpdump", "Kali Linux"],
    links: { github: "https://github.com/michealswolski/network-traffic-analysis" },
  },
  {
    id: "splunk-siem-lab",
    title: "Splunk SIEM Lab",
    category: "Systems",
    summary: "Centralized log ingestion from Linux and Windows with SPL detection queries, dashboards, and tuned spike-based alerting.",
    tech: ["Splunk", "SPL"],
    links: { github: "https://github.com/michealswolski/splunk-siem-lab" },
  },
  {
    id: "homelab-vuln-management",
    title: "Home Lab Vulnerability Management",
    category: "Systems",
    summary: "Full detect-to-validate lifecycle: Nessus scans, CVSS-based prioritization, pfSense enforcement, and re-scan validation.",
    tech: ["Nessus", "Nmap", "pfSense"],
    links: { github: "https://github.com/michealswolski/homelab-vuln-management" },
  },
  {
    id: "python-log-automation",
    title: "Python Log Automation",
    category: "AI Security",
    summary: "A regex-based brute-force detection engine that parses auth logs and fires threshold alerts — the same logic a SIEM uses, built from scratch.",
    tech: ["Python", "Regex"],
    links: { github: "https://github.com/michealswolski/python-log-automation" },
  },
];
