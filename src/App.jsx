import { useState, useEffect, useRef, useCallback } from "react";

/* ─── GOOGLE FONTS ─────────────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');`;

/* ─── THEMES ───────────────────────────────────────────────────── */
const T = {
  light: {
    bg: "#ffffff", bgAlt: "#f8fafc", bgDeep: "#f1f5f9",
    bgNav: "rgba(255,255,255,0.85)", text: "#0f172a", textMid: "#475569",
    textDim: "#94a3b8", textFaint: "#cbd5e1",
    accent: "#4f46e5", accentHov: "#4338ca",
    accentGlow: "rgba(79,70,229,0.15)", accentLight: "rgba(79,70,229,0.06)",
    accentMid: "rgba(79,70,229,0.12)", green: "#10b981", greenBg: "rgba(16,185,129,0.08)",
    border: "#e2e8f0", borderHov: "#a5b4fc",
    card: "#ffffff", cardHov: "#fafbff",
    shadow: "0 1px 2px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06)",
    shadowMd: "0 4px 24px rgba(0,0,0,0.08)",
    shadowHov: "0 16px 48px rgba(79,70,229,0.12), 0 4px 16px rgba(0,0,0,0.08)",
    tagBg: "#f1f5f9", tagBorder: "#e2e8f0", tagText: "#64748b",
    btnBg: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    btnShadow: "0 4px 20px rgba(79,70,229,0.35)",
    badgeInternship: "#7c3aed", badgeGH: "#4f46e5",
    badgeLab: "#0891b2", badgeWork: "#64748b", badgeCW: "#d97706", badgeHome: "#db2777",
    isDark: false,
  },
  dark: {
    bg: "#07090f", bgAlt: "#0d1117", bgDeep: "#111827",
    bgNav: "rgba(7,9,15,0.92)", text: "#f1f5f9", textMid: "#94a3b8",
    textDim: "#64748b", textFaint: "#334155",
    accent: "#818cf8", accentHov: "#a5b4fc",
    accentGlow: "rgba(129,140,248,0.18)", accentLight: "rgba(129,140,248,0.08)",
    accentMid: "rgba(129,140,248,0.14)", green: "#34d399", greenBg: "rgba(52,211,153,0.08)",
    border: "#1e293b", borderHov: "#6366f1",
    card: "#111827", cardHov: "#1a2236",
    shadow: "0 1px 3px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04)",
    shadowMd: "0 4px 24px rgba(0,0,0,0.5)",
    shadowHov: "0 16px 48px rgba(129,140,248,0.15), 0 4px 20px rgba(0,0,0,0.4)",
    tagBg: "rgba(255,255,255,0.06)", tagBorder: "#1e293b", tagText: "#94a3b8",
    btnBg: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    btnShadow: "0 4px 20px rgba(79,70,229,0.45)",
    badgeInternship: "#a78bfa", badgeGH: "#818cf8",
    badgeLab: "#22d3ee", badgeWork: "#94a3b8", badgeCW: "#fbbf24", badgeHome: "#f472b6",
    isDark: true,
  },
};

/* ─── DATA ─────────────────────────────────────────────────────── */
const P = {
  name: "Micheal Wolski",
  title: "Cybersecurity Student & Product Security Intern",
  summary: "Cybersecurity student pursuing a B.S. in Information Assurance & Cyber Defense at Eastern Michigan University with hands-on internship experience at Robert Bosch supporting major OEM programs. I build security tools, IoT embedded systems, enterprise dashboards, and hands-on lab environments—combining academic coursework with real-world development and AI-assisted engineering.",
  location: "Woodhaven, MI", email: "michealswolski@gmail.com",
  focus: ["Product Cybersecurity","IoT & Embedded Systems","Power Platform Development","Automotive Security","AI-Assisted Engineering"],
};
const EDU = [
  { degree:"B.S. Information Assurance & Cyber Defense", school:"Eastern Michigan University", status:"Expected 2026", loc:"Ypsilanti, MI", honors:"GPA: 3.66 • Cum Laude" },
  { degree:"A.A.S. Cybersecurity", school:"Henry Ford College", status:"Graduated 2023", loc:"Dearborn, MI", honors:"GPA: 3.6 • Dean's List" },
];
const CERTS = [
  { name:"CompTIA A+", status:"In Progress" },
  { name:"CompTIA Security+", status:"Planned" },
  { name:"CCNA Badges", status:"Networking / Switching / Routing" },
  { name:"IT Help Desk Cert", status:"Completed" },
];

/* ─── CAREER / EXPERIENCE ──────────────────────────────────────── */
const CAREER = {
  current: {
    role: "Product Security Intern",
    company: "Robert Bosch",
    companyShort: "Bosch",
    logo: "BOSCH",
    period: "2025 – Present",
    location: "Michigan",
    domain: "Automotive Cybersecurity",
    color: "#E20015",
    points: [
      "Support product cybersecurity across multiple divisions for major OEM programs",
      "Built cross-divisional Power BI dashboard with SharePoint backend for tracking security configurations",
      "Developed LLM-based onboarding agent using prompt engineering and AI integration",
      "Participate in risk and cybersecurity review meetings and planning sessions",
      "Created Power Apps intake forms and Power Automate workflows for security processes",
      "Facilitate security awareness workshops and training sessions across teams",
    ],
  },
  past: [
    {
      role: "Warehouse Operations",
      company: "Amazon",
      logo: "AMAZON",
      period: "2022 – 2025",
      location: "Michigan",
      color: "#FF9900",
      points: [
        "Inbound process — receiving and stowing inventory at high throughput",
        "Maintained top performance metrics in a fast-paced fulfillment environment",
      ],
    },
    {
      role: "Logistics Associate",
      company: "Ascent Global Logistics",
      logo: "ASCENT",
      period: "2021 – 2022",
      location: "Michigan",
      color: "#1B4B8A",
      points: [
        "Coordinated freight shipments and managed inbound/outbound logistics flows",
        "Processed shipment documentation and maintained accuracy in logistics records",
      ],
    },
  ],
};

const PROJECTS = [
  {id:"BSH-001",title:"Cross-Divisional Project Dashboard",sub:"Power BI Analytics — Bosch Internship",desc:"Comprehensive project tracking dashboard in Power BI for a global automotive cybersecurity organization. Custom themes, cross-divisional filtering, drill-through reporting.",tags:["Power BI","DAX","SharePoint","Power Query"],cat:"INTERNSHIP",domain:"Analytics",impact:"Unified project tracking across multiple global cybersecurity divisions",details:"Built from scratch during my internship to solve fragmented project tracking across divisions. Pulls data from SharePoint via Power Query, transforms with DAX measures, custom dark-themed UI. Drill-through pages per division, KPI cards with conditional formatting, automated refresh schedules."},
  {id:"BSH-002",title:"Cross-Divisional Project Database",sub:"Power Apps Canvas App — Bosch Internship",desc:"Canvas App with dark futuristic UI, wizard workflows, admin dashboards, and ticketing system. Hardened .msapp packages for cross-tenant deployment.",tags:["Power Apps","Power Automate","SharePoint","ALM"],cat:"INTERNSHIP",domain:"Enterprise Apps",impact:"Cross-tenant deployment across global cybersecurity divisions",details:"Multi-step wizard for project intake, role-based admin dashboards, integrated ticketing system. Troubleshot PAC CLI compatibility and built hardened .msapp packages for cross-tenant deployment."},
  {id:"BSH-003",title:"LLM-Based Onboarding Agent",sub:"AI-Powered Team Onboarding — Bosch Internship",desc:"AI-powered onboarding assistant using prompt engineering and LLM integration to streamline cybersecurity team onboarding and reduce ramp-up time.",tags:["Prompt Engineering","LLM","AI","Automation"],cat:"INTERNSHIP",domain:"AI Enablement",impact:"Streamlined cybersecurity team onboarding with AI",details:"Internal AI agent helping new team members get up to speed on cybersecurity processes. Uses carefully crafted system prompts to answer procedural questions and reduce onboarding friction."},
  {id:"CW-001",title:"OBD-II Diagnostic Scanner",sub:"IoT & Embedded Systems Course — EMU",desc:"Designing and building an OBD-II vehicle diagnostic scanner. Involves hardware interfacing, protocol communication, and real-time data acquisition from vehicle ECUs.",tags:["IoT","Embedded Systems","OBD-II","Hardware","Protocols"],cat:"COURSEWORK",domain:"IoT / Automotive",impact:"Hands-on embedded systems project bridging IoT and automotive diagnostics",details:"Currently developing an OBD-II scanner for my IoT and Embedded Systems class at EMU. Hardware interfaces to communicate with vehicle ECUs, reading diagnostic trouble codes, and displaying real-time sensor data."},
  {id:"CW-002",title:"PKI & Certificate Authority Research",sub:"Cybersecurity Coursework — EMU",desc:"Research project analyzing PKI infrastructure vulnerabilities, certificate authority trust models, and real-world CA compromise case studies.",tags:["PKI","Certificate Authority","Research","Cryptography"],cat:"COURSEWORK",domain:"Cryptography",impact:"Comprehensive research report on PKI trust chains and CA vulnerabilities",details:"Deep-dive research into how PKI infrastructure works, common vulnerability patterns in certificate authority implementations, and analysis of notable CA compromises."},
  {id:"CW-003",title:"Secure Boot & Hardware Security Research",sub:"IECS Embedded Security — EMU",desc:"Researching secure boot implementations in embedded and automotive systems, covering hardware-level security mechanisms and boot attestation for connected vehicles.",tags:["Secure Boot","TPM","Embedded Security","MISRA C","Automotive"],cat:"COURSEWORK",domain:"Embedded Security",impact:"Exploring hardware-level trust chains for automotive ECU security",details:"Academic research exploring TPM integration, chain-of-trust verification, remote attestation, MISRA C coding standards, and how these apply to real-world vehicle ECU security."},
  {id:"HOME-001",title:"MeshLink",sub:"Encrypted BLE Mesh Messaging — iOS App",desc:"Native iOS app in Swift/SwiftUI with CoreBluetooth for encrypted P2P messaging over Bluetooth Low Energy mesh networks. AES-256-GCM encryption, NFC key sharing, QR exchange.",tags:["Swift","SwiftUI","CoreBluetooth","AES-256-GCM","NFC"],cat:"HOME",domain:"iOS Development",impact:"End-to-end encrypted BLE mesh communication app for iOS",details:"Built a native iOS app from scratch. Uses CoreBluetooth for BLE mesh networking where messages hop between devices. AES-256-GCM encryption with keys exchanged via NFC tap or QR code scan."},
  {id:"HOME-002",title:"Depass Grading & Landscaping",sub:"Business Website — React + EmailJS",desc:"Full-featured business website for a real landscaping client. Includes service pages, portfolio gallery, contact forms with EmailJS, admin dashboard, and SEO optimization.",tags:["React","EmailJS","SEO","Responsive Design","Business"],cat:"HOME",domain:"Web Development",impact:"Live client website with lead generation and admin portal",details:"Built a complete business website for a real client with services, portfolio, testimonials, and FAQ sections, plus a private admin dashboard. Contact form uses EmailJS for instant email notifications."},
  {id:"HOME-003",title:"S650 Mustang Mod Tracker",sub:"Vehicle Build Management App — React",desc:"Interactive build management app for tracking vehicle modifications, maintenance schedules, and budgets. Features onboarding wizard, mod templates, and progress visualization.",tags:["React","Vehicle Mods","Budget Tracking","Responsive"],cat:"HOME",domain:"Automotive",impact:"Personal tool for managing my S650 Mustang build",details:"Built to track modifications on my 2024+ Mustang S650. Onboarding wizard for vehicle setup, pre-loaded mod template library, maintenance tracking with mileage-based reminders, budget dashboard with cost breakdowns."},
  {id:"HOME-004",title:"Ford ECU Modification Detector",sub:"Raspberry Pi Forensic Scanner — Python/Flask",desc:"Forensic analysis tool on Raspberry Pi reading vehicle ECU data via OBD-II, scoring modification likelihood using behavioral analysis, with GPIO LED indicators.",tags:["Python","Flask","Raspberry Pi","OBD-II","Forensics"],cat:"HOME",domain:"Automotive Security",impact:"Prototype tool for detecting ECU tampering in Ford vehicles",details:"A Raspberry Pi-based prototype that connects to a vehicle's OBD-II port and reads ECU data. Uses a scoring algorithm based on Ford service data patterns to determine modification likelihood. Web dashboard shows forensic confidence score."},
  {id:"GH-001",title:"Wolski Command Center",sub:"Raspberry Pi Dashboard — React + Node",desc:"Full-stack Raspberry Pi dashboard with system monitoring, AI agent automation, file management, health diagnostics, and one-click Windows deployment.",tags:["React","Node.js","Raspberry Pi","PowerShell"],cat:"GITHUB",domain:"Full-Stack Dev",impact:"Complete IoT dashboard with one-click deployment",details:"Centralized home lab command center. React frontend communicates with Node.js backend on the Pi for real-time CPU/memory/disk metrics, file management, and AI agent tasks."},
  {id:"GH-002",title:"AgentForge",sub:"AI Agent Platform — Electron Desktop App",desc:"Cross-platform Electron + Vite + React app with 10 messaging channels, 17 app connectors, skills marketplace, persistent memory, native installers.",tags:["Electron","React","Vite","Node.js"],cat:"GITHUB",domain:"AI & Automation",impact:"Full desktop app with native installers across 3 platforms",details:"AI agent hub with Discord, Slack, Telegram integrations, skill marketplace, persistent memory system, and voice mode. Distributed as .exe, .dmg, and .AppImage installers."},
  {id:"GH-003",title:"Network Utility Tool v6.0",sub:"Professional Edition — PowerShell",desc:"Comprehensive network utility for Windows 10/11: DNS speed testing, adapter optimizations, bufferbloat testing, gaming latency optimization, DFIR tools.",tags:["PowerShell","Networking","DNS","DFIR"],cat:"GITHUB",domain:"Network Security",impact:"15+ network tools in a single professional script",details:"DNS benchmarking across 10+ providers, adapter-specific optimizations, Nagle algorithm toggling, DFIR tools, WiFi password recovery, profile system for Home/Work/Gaming configs. Every change reversible."},
  {id:"GH-004",title:"GamePrep Pro",sub:"Windows 11 Optimization — Python/PyQt6",desc:"System optimization for competitive gaming. Process Lasso configs for i7-14700K P/E-core affinity, network tweaks, driver management. All reversible.",tags:["Python","PyQt6","Process Lasso","Windows 11"],cat:"GITHUB",domain:"System Engineering",impact:"Reversible optimizations with safety-first design",details:"Pins games to P-cores via Process Lasso while relegating background tasks to E-cores. Network buffer optimization, driver cleanup, controller polling rate maximization."},
  {id:"LAB-001",title:"Home Lab Vulnerability Management",sub:"Nessus + Nmap + pfSense",desc:"Full vulnerability management lifecycle: Nessus scans, CVSS prioritization, patching, pfSense enforcement, re-scan validation.",tags:["Nessus","Nmap","pfSense","VirtualBox"],cat:"LAB",domain:"Vuln Management",impact:"Full detect → analyze → remediate → validate lifecycle",details:"Multi-VM business network simulation. Nessus baseline scans, CVSS prioritization, patches applied, pfSense rules enforced, then re-scanned to confirm reduced attack surface."},
  {id:"LAB-002",title:"Network Traffic Analysis",sub:"Wireshark Deep Packet Inspection",desc:"Captured live packet traffic in isolated lab. Analyzed TCP handshakes, DNS queries, HTTP sessions. Identified abnormal outbound traffic.",tags:["Wireshark","Kali Linux","tcpdump","TCP/IP"],cat:"LAB",domain:"Network Forensics",impact:"Protocol-level anomaly detection and stream reconstruction",details:"Isolated VM network with full traffic capture. TCP handshake analysis, DNS tunneling checks, HTTP stream extraction, and suspicious outbound connection identification."},
  {id:"LAB-003",title:"Splunk SIEM Lab",sub:"Dashboards, Alerts & Detection Tuning",desc:"Splunk for centralized log ingestion. SPL queries, dashboard panels, spike-based alerts, threshold tuning.",tags:["Splunk","SPL","SIEM","Log Analysis"],cat:"LAB",domain:"SIEM & Detection",impact:"Full SIEM workflow: ingest → search → visualize → alert",details:"Splunk Enterprise with Windows Event Logs and Linux syslog inputs. SPL queries for brute-force detection, trend dashboards, spike alerts, iterative threshold tuning."},
  {id:"LAB-004",title:"Python Log Automation",sub:"Brute-Force Detection Engine",desc:"Python script parsing auth logs with regex, counting failed logins over time windows, triggering threshold alerts.",tags:["Python","Regex","Linux","Automation"],cat:"LAB",domain:"Security Automation",impact:"Automated brute-force detection with threshold alerting",details:"Monitors /var/log/auth.log with regex extraction of failed logins, rolling IP counts, and threshold-based alerting. Mini detection engine demonstrating SIEM alert logic."},
  {id:"LAB-005",title:"Offensive Security Lab",sub:"Kali + Metasploitable Exploitation",desc:"Full offensive workflow: recon, Nmap enumeration, Metasploit exploitation, privilege escalation, Hydra password testing.",tags:["Kali Linux","Metasploit","Nmap","Hydra"],cat:"LAB",domain:"Offensive Security",impact:"Complete attack chain: recon to access",details:"Full pentest against Metasploitable. Recon, port scanning, service enumeration, Metasploit exploitation, privilege escalation, Hydra testing. Every step documented."},
  {id:"LAB-006",title:"Firewall + VPN Lab",sub:"pfSense Segmentation & OpenVPN",desc:"Segmented network with pfSense deny-by-default rules. OpenVPN for secure remote access.",tags:["pfSense","OpenVPN","Segmentation","ACLs"],cat:"LAB",domain:"Network Security",impact:"Least-privilege segmentation with VPN secure access",details:"pfSense between two segments with deny-by-default. Explicit allow rules, port scan testing, OpenVPN tunnel for remote access, documented with before/after evidence."},
  {id:"LAB-007",title:"System Hardening",sub:"Windows + Linux Endpoint Baselines",desc:"Hardened endpoints: disabled services, patched, restricted SSH/RDP, enforced account controls, enabled auditing.",tags:["PowerShell","Bash","SSH","Patch Mgmt"],cat:"LAB",domain:"Hardening",impact:"Validated hardening baselines with before/after docs",details:"Windows: disabled services, firewall rules, restricted RDP, strong passwords. Linux: hardened SSH, removed packages, file permissions, auditd. Validated functionality post-hardening."},
  {id:"LAB-008",title:"OpenVAS Scanning",sub:"CVE Analysis & Risk Mitigation",desc:"OpenVAS scans against vulnerable VMs, CVE/CVSS analysis, prioritized mitigation report.",tags:["OpenVAS","CVE/CVSS","Risk Assessment","Nmap"],cat:"LAB",domain:"Risk Assessment",impact:"Risk-prioritized mitigation report",details:"Targeted vulnerable VMs. Mapped findings to CVE/CVSS, categorized into severity tiers, produced remediation report with prioritized actions."},
  {id:"LAB-009",title:"Web Application Security",sub:"Burp Suite Route Discovery",desc:"DevTools and Burp Suite analysis. Hidden routes, input validation testing, misconfigured endpoints.",tags:["Burp Suite","DevTools","JavaScript","OWASP"],cat:"LAB",domain:"App Security",impact:"Hidden route discovery and input validation analysis",details:"JavaScript source inspection for hidden API routes. Burp Suite proxy interception, input validation testing with malformed data, misconfigured endpoint documentation."},
];

const SKILLS = [
  {cat:"Security Tools",items:["Nessus","OpenVAS","Splunk","Wireshark","Nmap","Metasploit","Burp Suite","Security Onion","Volatility"]},
  {cat:"Automotive & IoT",items:["Secure Boot","HSM","SecOC","CAN/LIN","OBD-II","SWDL","ISO/SAE 21434","Embedded Systems","Raspberry Pi"]},
  {cat:"Development",items:["Python","PowerShell","Bash","JavaScript","React","Node.js","Electron","Swift/SwiftUI","Power Apps","Power BI / DAX"]},
  {cat:"Infrastructure",items:["pfSense","OpenVPN","VirtualBox","Kali Linux","Windows Admin","Linux Admin","SharePoint","Power Automate","CoreBluetooth"]},
];

const HEATMAP = (()=>{
  const d=[]; const now=Date.now();
  /* Seeded hash so the map is consistent across page reloads */
  const hash = s => { let h=0; for(let i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;} return Math.abs(h)%100; };
  for(let i=364;i>=0;i--){
    const date=new Date(now-i*86400000); const day=date.getDay();
    const r=hash(date.toISOString().slice(0,10)+"mw"); let l=0;
    if(r>55)l=1; if(r>72)l=2; if(r>85)l=3; if(r>93)l=4;
    if((day===0||day===6)&&r<40)l=0;
    d.push({date:date.toISOString().slice(0,10),level:l});
  }
  return d;
})();

const NAV = [
  {id:"about",label:"About"},
  {id:"career",label:"Career"},
  {id:"projects",label:"Projects"},
  {id:"activity",label:"Activity"},
  {id:"education",label:"Education"},
  {id:"skills",label:"Skills"},
  {id:"contact",label:"Contact"},
];

const SOCIALS = [
  {label:"LinkedIn", href:"https://www.linkedin.com/in/michealwolski/"},
  {label:"GitHub",   href:"https://github.com/michealswolski"},
  {label:"Email",    href:"mailto:michealswolski@gmail.com"},
];

/* ─── COMPANY LOGOS ────────────────────────────────────────────── */

/* Bosch: bold red BOSCH wordmark — matches official brand identity */
function BoschLogo({ scale = 1, uid = "0" }) {
  const W = 200 * scale, H = 58 * scale;
  return (
    <svg width={W} height={H} viewBox="0 0 200 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="50"
        fill="#E20015"
        fontFamily="'Outfit','Arial Black','Arial',sans-serif"
        fontWeight="900"
        fontSize="52"
        letterSpacing="3">
        BOSCH
      </text>
    </svg>
  );
}

/* Amazon: lowercase "amazon" dark-gray + orange smile-arrow */
function AmazonLogo({ scale = 1 }) {
  const W = 148 * scale, H = 52 * scale;
  return (
    <svg width={W} height={H} viewBox="0 0 148 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* "amazon" text — brand dark near-black */}
      <text x="2" y="32"
        fill="#232F3E"
        fontFamily="'Helvetica Neue','Arial',sans-serif"
        fontWeight="700"
        fontSize="30"
        letterSpacing="-0.4">
        amazon
      </text>
      {/* Smile curve: starts under "a", dips down, arrowhead under "n" */}
      <path d="M14 40 C28 50, 110 50, 132 40"
        stroke="#FF9900" strokeWidth="3.8" fill="none" strokeLinecap="round"/>
      {/* Arrow tip pointing upper-right */}
      <path d="M126 35.5 L132 40 L125.5 43.5"
        fill="none" stroke="#FF9900" strokeWidth="3.2"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* Ascent Global Logistics: dot cluster (teal→navy) + "ascent" lowercase navy text */
function AscentLogo({ scale = 1 }) {
  const W = 200 * scale, H = 68 * scale;
  /* Dot positions: [cx, cy, r, color]
     Arranged as an ascending cluster — large teal top-left,
     stepping down-right to small dark-navy (mirrors the real logo) */
  const dots = [
    [23, 13, 12,  "#08C4D8"], // top — largest, bright teal
    [40, 23, 10,  "#0BB8CC"], // second row right
    [10, 28,  9,  "#0AA8C0"], // second row left
    [28, 34,  8,  "#0A90B8"], // third row centre
    [46, 36,  7.5,"#0A7CB4"], // third row right
    [16, 44,  7,  "#1468A8"], // fourth row left
    [34, 46,  6.5,"#1458A0"], // fourth row centre
    [ 6, 52,  6,  "#165099"], // bottom-left small
    [48, 50,  5.5,"#1B4B8A"], // bottom-right darkest
  ];
  return (
    <svg width={W} height={H} viewBox="0 0 200 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      {dots.map(([cx, cy, r, color], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={color}/>
      ))}
      {/* "ascent" wordmark — brand navy */}
      <text x="68" y="48"
        fill="#1B3A72"
        fontFamily="'Segoe UI','Helvetica Neue','Arial',sans-serif"
        fontWeight="700"
        fontSize="36"
        letterSpacing="-0.5">
        ascent
      </text>
    </svg>
  );
}

/* ─── HOOKS ────────────────────────────────────────────────────── */
function useReveal(thr) {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = r.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); obs.disconnect(); }
    }, { threshold: thr || 0.07 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [thr]);
  return [r, v];
}

function useTypewriter(texts) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (!texts?.length) return;
    if (pause) { const t = setTimeout(() => { setPause(false); setDel(true); }, 2200); return () => clearTimeout(t); }
    const cur = texts[idx] || "";
    const t = setTimeout(() => {
      if (!del) { setDisplay(cur.slice(0, ci + 1)); if (ci + 1 >= cur.length) setPause(true); else setCi(ci + 1); }
      else { setDisplay(cur.slice(0, ci)); if (ci <= 0) { setDel(false); setIdx((idx + 1) % texts.length); } else setCi(ci - 1); }
    }, del ? 16 : 42);
    return () => clearTimeout(t);
  }, [ci, del, pause, idx, texts]);
  return display;
}

function useTilt() {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tX = (y - 0.5) * 10;
    const tY = (0.5 - x) * 10;
    setStyle({ transform: `perspective(900px) rotateX(${tX}deg) rotateY(${tY}deg) scale3d(1.02,1.02,1.02)`, transition: "transform 0.08s ease" });
  }, []);
  const onLeave = useCallback(() => {
    setStyle({ transform: "perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)", transition: "transform 0.6s cubic-bezier(.22,1,.36,1)" });
  }, []);
  return [ref, style, onMove, onLeave];
}

/* ─── GLOBAL CSS ───────────────────────────────────────────────── */
const GCSS = `
${FONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#a5b4fc;border-radius:3px}

@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes pulse{0%,100%{transform:scale(1);opacity:0.7}50%{transform:scale(1.15);opacity:1}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes gradBorder{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes slideInLeft{from{opacity:0;transform:translateX(-32px)}to{opacity:1;transform:none}}
@keyframes slideInRight{from{opacity:0;transform:translateX(32px)}to{opacity:1;transform:none}}
@keyframes boschGlow{0%,100%{box-shadow:0 0 30px rgba(226,0,21,0.15),0 0 60px rgba(226,0,21,0.05)}50%{box-shadow:0 0 50px rgba(226,0,21,0.25),0 0 100px rgba(226,0,21,0.1)}}
@keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes breatheA{0%,100%{transform:translate(0,0) scale(1);opacity:0.45}25%{transform:translate(6%,-8%) scale(1.12);opacity:0.65}50%{transform:translate(-4%,5%) scale(0.95);opacity:0.4}75%{transform:translate(3%,2%) scale(1.08);opacity:0.55}}
@keyframes breatheB{0%,100%{transform:translate(0,0) scale(1);opacity:0.4}30%{transform:translate(-5%,6%) scale(1.1);opacity:0.6}60%{transform:translate(6%,-3%) scale(0.92);opacity:0.35}85%{transform:translate(-2%,-5%) scale(1.05);opacity:0.5}}
@keyframes breatheC{0%,100%{transform:translate(0,0) scale(1.05);opacity:0.35}20%{transform:translate(4%,7%) scale(0.9);opacity:0.55}45%{transform:translate(-7%,-2%) scale(1.15);opacity:0.3}70%{transform:translate(2%,-6%) scale(0.98);opacity:0.5}}
@keyframes driftGrid{0%{transform:translate(0,0)}100%{transform:translate(-50%,-50%)}}

.tilt-card{transform-style:preserve-3d}
.tilt-card .card-shine{
  position:absolute;inset:0;border-radius:inherit;
  background:radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.08) 0%, transparent 60%);
  pointer-events:none;opacity:0;transition:opacity 0.3s;
}
.tilt-card:hover .card-shine{opacity:1}

.desktop-nav{display:flex;align-items:center;gap:3px}
.hamburger-btn{display:none;background:none;border:none;cursor:pointer;padding:4px}
.mobile-overlay{display:none}
.mobile-overlay.open{display:flex}
@media(max-width:860px){
  .desktop-nav{display:none !important}
  .hamburger-btn{display:flex !important}
}

.scroll-top{position:fixed;bottom:28px;right:28px;z-index:150;width:42px;height:42px;border-radius:12px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;opacity:0;transform:translateY(12px);pointer-events:none}
.scroll-top.vis{opacity:1;transform:none;pointer-events:auto}
`;

/* ─── SOCIAL ICONS ────────────────────────────────────────────── */
function IconLinkedIn({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  );
}
function IconGitHub({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
function IconMail({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}
const SOCIAL_ICON = { LinkedIn: IconLinkedIn, GitHub: IconGitHub, Email: IconMail };

/* ─── SMALL ATOMS ──────────────────────────────────────────────── */
function Badge({ cat, th }) {
  const c = { INTERNSHIP:th.badgeInternship, COURSEWORK:th.badgeCW, HOME:th.badgeHome, GITHUB:th.badgeGH, LAB:th.badgeLab, WORK:th.badgeWork }[cat] || th.accent;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", fontFamily:"'IBM Plex Mono',monospace", fontSize:9, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase", color:c, background:c+"18", border:`1px solid ${c}35`, padding:"3px 8px", borderRadius:4 }}>
      {cat}
    </span>
  );
}
function Tag({ label, th }) {
  return <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10.5, color:th.tagText, background:th.tagBg, border:`1px solid ${th.tagBorder}`, padding:"4px 10px", borderRadius:5 }}>{label}</span>;
}
function Dot({ color, animated }) {
  return <div style={{ width:8, height:8, borderRadius:"50%", background:color, flexShrink:0, animation: animated ? "pulse 2s infinite" : "none" }} />;
}
function SecLabel({ children, th }) {
  const [r,v] = useReveal();
  return (
    <div ref={r} style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:12, opacity:v?1:0, transform:v?"none":"translateX(-12px)", transition:"all 0.6s cubic-bezier(.22,1,.36,1)" }}>
      <div style={{ width:28, height:2, background:`linear-gradient(90deg,${th.accent},transparent)`, borderRadius:1 }} />
      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10.5, fontWeight:600, letterSpacing:3.5, textTransform:"uppercase", color:th.accent }}>{children}</span>
    </div>
  );
}
function SecTitle({ children, sub, th }) {
  const [r,v] = useReveal();
  return (
    <div ref={r} style={{ marginBottom:52, opacity:v?1:0, transform:v?"none":"translateY(18px)", transition:"all 0.7s cubic-bezier(.22,1,.36,1) 0.08s" }}>
      <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(26px,3.5vw,40px)", fontWeight:900, color:th.text, letterSpacing:-0.8, lineHeight:1.1 }}>{children}</h2>
      {sub && <p style={{ fontFamily:"'Inter',sans-serif", fontSize:15.5, color:th.textMid, marginTop:12, maxWidth:600, lineHeight:1.75 }}>{sub}</p>}
    </div>
  );
}

/* ─── MODAL ────────────────────────────────────────────────────── */
function Modal({ project: p, onClose, th }) {
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);
  if (!p) return null;
  const bc = { INTERNSHIP:th.badgeInternship, COURSEWORK:th.badgeCW, HOME:th.badgeHome, GITHUB:th.badgeGH, LAB:th.badgeLab, WORK:th.badgeWork }[p.cat] || th.accent;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(0,0,0,0.65)", backdropFilter:"blur(10px)", display:"flex", alignItems:"center", justifyContent:"center", padding:24, animation:"fadeIn 0.2s ease" }}>
      <div onClick={e=>e.stopPropagation()} style={{ maxWidth:640, width:"100%", maxHeight:"88vh", overflowY:"auto", background:th.card, border:`1px solid ${th.border}`, borderRadius:22, padding:"36px 32px", boxShadow:"0 32px 80px rgba(0,0,0,0.25)", animation:"fadeUp 0.25s ease" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:22 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:th.textDim, letterSpacing:1.2 }}>{p.id} · {p.domain}</span>
              <Badge cat={p.cat} th={th} />
            </div>
            <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:23, fontWeight:800, color:th.text, marginBottom:4 }}>{p.title}</h2>
            <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:th.accent }}>{p.sub}</p>
          </div>
          <button onClick={onClose} style={{ background:"none", border:`1px solid ${th.border}`, borderRadius:9, width:36, height:36, cursor:"pointer", color:th.textDim, fontSize:20, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginLeft:16, transition:"all 0.2s ease" }}>×</button>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8, background:bc+"12", border:`1px solid ${bc}30`, borderRadius:9, padding:"10px 14px", marginBottom:22 }}>
          <Dot color={bc} />
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:bc, fontWeight:600 }}>{p.impact}</span>
        </div>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:14, lineHeight:1.82, color:th.textMid, marginBottom:22 }}>{p.details || p.desc}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{p.tags.map(t => <Tag key={t} label={t} th={th} />)}</div>
      </div>
    </div>
  );
}

/* ─── PROJECT CARD ─────────────────────────────────────────────── */
function ProjCard({ p, i, onClick, th }) {
  const [hov, setHov] = useState(false);
  const [r, v] = useReveal();
  const [tRef, tStyle, onMove, onLeave] = useTilt();
  const bc = { INTERNSHIP:th.badgeInternship, COURSEWORK:th.badgeCW, HOME:th.badgeHome, GITHUB:th.badgeGH, LAB:th.badgeLab, WORK:th.badgeWork }[p.cat] || th.accent;

  const setRef = el => { if (r) r.current = el; if (tRef) tRef.current = el; };

  return (
    <div
      ref={setRef}
      className="tilt-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); onLeave(); }}
      onMouseMove={onMove}
      onClick={() => onClick(p)}
      style={{
        ...tStyle,
        position:"relative", borderRadius:18, cursor:"pointer", overflow:"hidden",
        background: hov ? th.cardHov : th.card,
        border:`1px solid ${hov ? bc+"60" : th.border}`,
        boxShadow: hov ? `0 20px 60px ${bc}20, 0 4px 20px rgba(0,0,0,0.1)` : th.shadow,
        transition:`border 0.3s ease, box-shadow 0.3s ease, background 0.2s ease`,
        opacity: v ? 1 : 0, transform: v ? (tStyle.transform || "none") : "translateY(28px)",
        transitionDelay: `${i * 40}ms`,
      }}
    >
      {/* Gradient top bar */}
      <div style={{ height:3, background: hov ? `linear-gradient(90deg, ${bc}, ${th.accent}, ${bc})` : `${bc}30`, backgroundSize:"200% 100%", animation: hov ? "gradBorder 2s linear infinite" : "none", transition:"background 0.4s ease" }} />
      <div className="card-shine" />
      <div style={{ padding:"22px 24px 26px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9.5, color:th.textDim, letterSpacing:1 }}>{p.id}</span>
            <span style={{ color:th.textFaint }}>·</span>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:th.textDim }}>{p.domain}</span>
          </div>
          <Badge cat={p.cat} th={th} />
        </div>
        <h3 style={{ fontFamily:"'Outfit',sans-serif", fontSize:16.5, fontWeight:700, color: hov ? th.accent : th.text, marginBottom:3, transition:"color 0.2s ease", lineHeight:1.3 }}>{p.title}</h3>
        <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:th.accent, marginBottom:11, opacity:0.8 }}>{p.sub}</p>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:13, lineHeight:1.72, color:th.textMid, marginBottom:14 }}>{p.desc}</p>
        <div style={{ display:"flex", alignItems:"center", gap:8, background:bc+"0d", border:`1px solid ${bc}22`, borderRadius:8, padding:"8px 12px", marginBottom:14 }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:bc, flexShrink:0 }} />
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11.5, color:bc, fontWeight:600, lineHeight:1.3 }}>{p.impact}</span>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>{p.tags.slice(0,4).map(t => <Tag key={t} label={t} th={th} />)}</div>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:th.accent, marginTop:14, opacity:hov?0.9:0.3, textAlign:"right", transition:"opacity 0.2s ease", letterSpacing:1.5 }}>VIEW DETAILS →</div>
      </div>
    </div>
  );
}

/* ─── CAREER SECTION COMPONENT ─────────────────────────────────── */
function CareerSection({ th }) {
  const c = CAREER.current;
  const [r, v] = useReveal();

  return (
    <section id="career" style={{ padding:"110px 24px", background: th.isDark ? th.bgAlt : th.bg }}>
      <div style={{ maxWidth:1180, margin:"0 auto" }}>
        <SecLabel th={th}>Career</SecLabel>
        <SecTitle th={th} sub="My professional journey across automotive cybersecurity, fulfillment operations, and logistics.">
          Work Experience
        </SecTitle>

        {/* ── CURRENT ROLE (Bosch) ─── */}
        <div ref={r} style={{ marginBottom:48, opacity:v?1:0, animation:v?"slideInLeft 0.7s cubic-bezier(.22,1,.36,1) forwards":"none" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#E20015", animation:"pulse 2s infinite" }} />
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10.5, fontWeight:700, letterSpacing:2.5, color:"#E20015", textTransform:"uppercase" }}>Currently Employed</span>
          </div>

          {/* Bosch featured card */}
          <div style={{
            position:"relative", borderRadius:22, overflow:"hidden",
            background: th.isDark ? "#111520" : "#fff",
            border:`1.5px solid rgba(226,0,21,0.25)`,
            boxShadow:`0 0 0 1px rgba(226,0,21,0.08), 0 24px 80px rgba(226,0,21,0.1), 0 8px 32px rgba(0,0,0,0.08)`,
            animation:"boschGlow 4s ease-in-out infinite",
          }}>
            {/* Bosch red top border */}
            <div style={{ height:4, background:"linear-gradient(90deg, #E20015, #ff4444, #E20015)", backgroundSize:"200% 100%", animation:"gradBorder 3s linear infinite" }} />

            {/* Background Bosch watermark */}
            <div style={{ position:"absolute", right:-20, top:-10, opacity:0.04, pointerEvents:"none", userSelect:"none" }}>
              <svg viewBox="0 0 200 80" width="280" height="112" fill="none">
                <text x="100" y="70" textAnchor="middle" fill="#E20015" fontFamily="Arial Black" fontWeight="900" fontSize="80" letterSpacing="4">BOSCH</text>
              </svg>
            </div>

            <div style={{ padding:"36px 40px 40px", position:"relative" }}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:24, alignItems:"flex-start", justifyContent:"space-between", marginBottom:28 }}>
                <div>
                  {/* Logo */}
                  <div style={{ marginBottom:16 }}>
                    <BoschLogo scale={0.82} uid="career" />
                  </div>
                  <h3 style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(20px,3vw,28px)", fontWeight:900, color:th.text, marginBottom:6, letterSpacing:-0.4 }}>
                    {c.role}
                  </h3>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontFamily:"'Inter',sans-serif", fontSize:15, color:"#E20015", fontWeight:600 }}>{c.company}</span>
                    <span style={{ color:th.textFaint }}>·</span>
                    <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:th.textDim }}>{c.domain}</span>
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:8, alignItems:"flex-end" }}>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(226,0,21,0.08)", border:"1px solid rgba(226,0,21,0.2)", borderRadius:20, padding:"6px 16px" }}>
                    <Dot color="#E20015" animated />
                    <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"#E20015", fontWeight:700, letterSpacing:1.5 }}>ACTIVE</span>
                  </div>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:th.textDim, background:th.tagBg, border:`1px solid ${th.tagBorder}`, padding:"5px 12px", borderRadius:6 }}>{c.period}</span>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:th.textDim }}>{c.location}</span>
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:10 }}>
                {c.points.map((pt, i) => (
                  <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", background: th.isDark ? "rgba(255,255,255,0.025)" : "rgba(226,0,21,0.025)", border: th.isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(226,0,21,0.08)", borderRadius:10, padding:"11px 14px" }}>
                    <div style={{ width:4, height:4, borderRadius:"50%", background:"#E20015", marginTop:6, flexShrink:0 }} />
                    <span style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:th.textMid, lineHeight:1.65 }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── PAST ROLES ─── */}
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:th.textDim }} />
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, fontWeight:600, letterSpacing:2.5, color:th.textDim, textTransform:"uppercase" }}>Previously Employed</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:18 }}>
            {CAREER.past.map((e, i) => (
              <PastCard key={i} e={e} i={i} th={th} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PastCard({ e, i, th }) {
  const [r, v] = useReveal();
  const [hov, setHov] = useState(false);
  const LogoComp = { AMAZON: AmazonLogo, ASCENT: AscentLogo }[e.logo];
  return (
    <div ref={r} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: hov ? th.cardHov : th.card,
      border:`1px solid ${hov ? th.borderHov : th.border}`,
      borderRadius:18, padding:"26px 28px",
      boxShadow: hov ? th.shadowHov : th.shadow,
      transition:"all 0.3s cubic-bezier(.22,1,.36,1)",
      opacity:v?1:0, transform:v?"none":"translateY(24px)",
      transitionDelay:`${i*120}ms`,
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
        <div>
          {LogoComp && (
        <div style={{
          marginBottom:12, display:"inline-block",
          background: th.isDark ? "rgba(255,255,255,0.92)" : "transparent",
          borderRadius: th.isDark ? 8 : 0,
          padding: th.isDark ? "7px 14px 5px" : 0,
          transition:"background 0.4s ease, padding 0.4s ease, border-radius 0.4s ease",
        }}>
          <LogoComp scale={0.78} />
        </div>
      )}
          <h4 style={{ fontFamily:"'Outfit',sans-serif", fontSize:17, fontWeight:800, color:th.text, marginBottom:2 }}>{e.role}</h4>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:th.textMid, fontWeight:500 }}>{e.company}</p>
        </div>
        <div style={{ textAlign:"right" }}>
          <span style={{ display:"block", fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:th.textDim, background:th.tagBg, border:`1px solid ${th.tagBorder}`, padding:"4px 10px", borderRadius:5 }}>{e.period}</span>
          <span style={{ display:"block", fontFamily:"'IBM Plex Mono',monospace", fontSize:9.5, color:th.textDim, marginTop:5 }}>{e.location}</span>
        </div>
      </div>
      <ul style={{ listStyle:"none", padding:0, margin:0 }}>
        {e.points.map((pt, j) => (
          <li key={j} style={{ display:"flex", gap:9, alignItems:"flex-start", fontFamily:"'Inter',sans-serif", fontSize:13, color:th.textMid, lineHeight:1.65, marginBottom:5 }}>
            <span style={{ color:th.textFaint, marginTop:2, flexShrink:0 }}>›</span>{pt}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── EDUCATION ────────────────────────────────────────────────── */
function EduItem({ e, i, th }) {
  const [r, v] = useReveal();
  return (
    <div ref={r} style={{ background:th.card, border:`1px solid ${th.border}`, borderRadius:16, padding:"24px 26px", boxShadow:th.shadow, opacity:v?1:0, transform:v?"none":"translateY(18px)", transition:`all 0.6s cubic-bezier(.22,1,.36,1) ${i*100}ms` }}>
      <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
        <div style={{ width:42, height:42, borderRadius:11, background:th.accentLight, border:`1px solid ${th.accentMid}`, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={th.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        </div>
        <div>
          <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:15.5, fontWeight:800, color:th.text, marginBottom:4 }}>{e.degree}</div>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:13.5, color:th.accent, fontWeight:600, marginBottom:3 }}>{e.school}</div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10.5, color:th.textDim }}>{e.status} · {e.loc}</div>
          {e.honors && (
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:8, background:th.greenBg, border:`1px solid ${th.green}30`, borderRadius:6, padding:"4px 10px" }}>
              <Dot color={th.green} />
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10.5, color:th.green }}>{e.honors}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CertItem({ c, i, th }) {
  const [r, v] = useReveal();
  const cl = c.status === "Completed" ? th.green : c.status.includes("Progress") ? "#f59e0b" : th.textDim;
  return (
    <div ref={r} style={{ background:th.card, border:`1px solid ${th.border}`, borderRadius:12, padding:"18px 16px", textAlign:"center", boxShadow:th.shadow, opacity:v?1:0, transform:v?"scale(1)":"scale(0.92)", transition:`all 0.5s cubic-bezier(.22,1,.36,1) ${i*60}ms` }}>
      <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:14, fontWeight:700, color:th.text, marginBottom:8 }}>{c.name}</div>
      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:cl, letterSpacing:1.2, textTransform:"uppercase", background:cl+"18", padding:"4px 10px", borderRadius:5, display:"inline-block" }}>{c.status}</span>
    </div>
  );
}

/* ─── SKILLS ───────────────────────────────────────────────────── */
function SkillGroup({ s, i, th }) {
  const [r, v] = useReveal();
  return (
    <div ref={r} style={{ opacity:v?1:0, transform:v?"none":"translateY(18px)", transition:`all 0.6s cubic-bezier(.22,1,.36,1) ${i*80}ms` }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
        <div style={{ width:3, height:16, background:th.accent, borderRadius:2 }} />
        <h4 style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10.5, color:th.accent, letterSpacing:2.5, textTransform:"uppercase", fontWeight:600 }}>{s.cat}</h4>
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
        {s.items.map(it => (
          <span key={it} style={{ fontFamily:"'Inter',sans-serif", fontSize:12.5, color:th.textMid, background:th.tagBg, border:`1px solid ${th.tagBorder}`, padding:"7px 13px", borderRadius:8 }}>{it}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── GIT HEATMAP ──────────────────────────────────────────────── */
function GitMap({ th }) {
  const [r, v] = useReveal();
  const weeks = [];
  for (let i = 0; i < HEATMAP.length; i += 7) weeks.push(HEATMAP.slice(i, i + 7));
  const cs = th.isDark
    ? ["rgba(255,255,255,0.05)", "rgba(129,140,248,0.2)", "rgba(129,140,248,0.38)", "rgba(129,140,248,0.58)", "#818cf8"]
    : ["#e2e8f0", "#c7d2fe", "#a5b4fc", "#818cf8", "#4f46e5"];
  const total = HEATMAP.reduce((s, d) => s + d.level, 0);
  return (
    <div ref={r} style={{ opacity:v?1:0, transform:v?"none":"translateY(16px)", transition:"all 0.7s ease" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:8 }}>
        <span style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:th.textMid, fontWeight:500 }}>{total} contributions in the last year</span>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:th.textDim }}>Less</span>
          {cs.map((c,i) => <div key={i} style={{ width:11, height:11, borderRadius:2, background:c }} />)}
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:th.textDim }}>More</span>
        </div>
      </div>
      <div style={{ display:"flex", gap:3, overflowX:"auto", paddingBottom:6 }}>
        {weeks.map((wk, wi) => (
          <div key={wi} style={{ display:"flex", flexDirection:"column", gap:3 }}>
            {wk.map((d, di) => (
              <div key={di} title={`${d.date}: level ${d.level}`} style={{ width:11, height:11, borderRadius:2, background:cs[d.level], opacity:v?1:0, transition:`opacity 0.3s ease ${(wi*7+di)*1.5}ms` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ANIMATED CANVAS BACKGROUND ──────────────────────────────── */
function ParticleCanvas({ th }) {
  const ref = useRef(null);
  const anim = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  const init = useCallback(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth, H = window.innerHeight;
    c.width = W * dpr; c.height = H * dpr;
    c.style.width = W + "px"; c.style.height = H + "px";
    ctx.scale(dpr, dpr);

    const rgb = th.isDark ? "129,140,248" : "79,70,229";
    const al = th.isDark ? 1 : 0.5;

    const pts = Array.from({ length: Math.min(Math.floor(W * H / 22000), 60) }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x, my = mouse.current.y;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dm = Math.hypot(p.x - mx, p.y - my);
        const gw = dm < 130 ? 1 - dm / 130 : 0;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 90) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${rgb},${(1 - d / 90) * 0.04 * al + gw * 0.05})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
        const sz = p.r + gw * 2.5;
        ctx.beginPath(); ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${(0.15 + gw * 0.5) * al})`; ctx.fill();
      }
      anim.current = requestAnimationFrame(draw);
    };
    anim.current = requestAnimationFrame(draw);
  }, [th.isDark]);

  useEffect(() => {
    init();
    const resize = () => { cancelAnimationFrame(anim.current); init(); };
    const move = e => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    return () => { cancelAnimationFrame(anim.current); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", move); };
  }, [init]);

  return <canvas ref={ref} style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", opacity:0.7 }} />;
}

/* ─── BREATHING AMBIENT BACKGROUND ─────────────────────────────── */
function BreathingBg({ th }) {
  const accent = th.isDark ? "99,102,241" : "79,70,229";   // indigo
  const accent2 = th.isDark ? "139,92,246" : "124,58,237";  // violet
  const red = "226,0,21";
  const base = th.isDark ? 0.035 : 0.025;  // master opacity — very subtle
  return (
    <div style={{ position:"fixed", inset:0, zIndex:-1, pointerEvents:"none", overflow:"hidden" }}>
      {/* Orb 1 — large indigo, top-left drift */}
      <div style={{
        position:"absolute", top:"-15%", left:"-10%", width:"55vmax", height:"55vmax", borderRadius:"50%",
        background:`radial-gradient(circle, rgba(${accent},${base * 2.2}) 0%, rgba(${accent},0) 70%)`,
        animation:"breatheA 18s ease-in-out infinite", willChange:"transform,opacity",
      }} />
      {/* Orb 2 — medium violet, bottom-right */}
      <div style={{
        position:"absolute", bottom:"-10%", right:"-8%", width:"45vmax", height:"45vmax", borderRadius:"50%",
        background:`radial-gradient(circle, rgba(${accent2},${base * 1.8}) 0%, rgba(${accent2},0) 70%)`,
        animation:"breatheB 22s ease-in-out infinite", willChange:"transform,opacity",
      }} />
      {/* Orb 3 — subtle red accent, center-right (Bosch vibe) */}
      <div style={{
        position:"absolute", top:"30%", right:"15%", width:"30vmax", height:"30vmax", borderRadius:"50%",
        background:`radial-gradient(circle, rgba(${red},${base * 0.9}) 0%, rgba(${red},0) 70%)`,
        animation:"breatheC 26s ease-in-out infinite", willChange:"transform,opacity",
      }} />
      {/* Micro dot grid overlay — barely visible, adds texture */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`radial-gradient(rgba(${accent},${th.isDark ? 0.04 : 0.025}) 1px, transparent 1px)`,
        backgroundSize:"32px 32px",
        opacity: 0.5,
        animation:"driftGrid 120s linear infinite",
      }} />
    </div>
  );
}

/* ─── CYBER CAR BACKGROUND ─────────────────────────────────────── */
function BgCar() {
  const circuitNodes = [[118,216],[198,184],[308,162],[435,140],[568,144],[665,160],[750,196]];
  const branchEnds   = [[198,256],[308,112],[435,112],[568,112],[665,256]];
  return (
    <svg viewBox="0 0 900 290" width="900" height="290" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ── Car body silhouette (sedan side profile) ── */}
      <path
        d="M 55,248 L 145,248 A 74,50 0 0,0 285,248 L 618,248 A 74,50 0 0,0 758,248
           L 818,248 L 826,230 L 812,205 L 772,183 L 736,175 L 704,162
           C 674,136 642,116 620,112 L 370,112
           C 348,116 320,130 300,150 L 274,176 L 240,188 L 180,196 L 124,210 L 84,224 Z"
        fill="currentColor" fillOpacity="0.4"
      />
      {/* Windshield */}
      <path d="M 302,150 L 324,115 L 438,112 L 438,154 Z"
        stroke="currentColor" strokeWidth="1.2" fill="none"/>
      {/* Rear window */}
      <path d="M 443,112 L 620,112 L 618,154 L 443,154 Z"
        stroke="currentColor" strokeWidth="1.2" fill="none"/>
      {/* Front wheel */}
      <circle cx="215" cy="278" r="40" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="215" cy="278" r="26" stroke="currentColor" strokeWidth="0.9" strokeDasharray="4 3"/>
      <circle cx="215" cy="278" r="7" fill="currentColor"/>
      {/* Rear wheel */}
      <circle cx="688" cy="278" r="40" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="688" cy="278" r="26" stroke="currentColor" strokeWidth="0.9" strokeDasharray="4 3"/>
      <circle cx="688" cy="278" r="7" fill="currentColor"/>
      {/* Headlight detail */}
      <path d="M 78,226 L 98,218 L 108,221 L 104,230 L 80,233 Z"
        stroke="currentColor" strokeWidth="0.9" fill="none"/>
      {/* Taillight detail */}
      <path d="M 814,228 L 800,221 L 792,224 L 796,232 L 816,235 Z"
        stroke="currentColor" strokeWidth="0.9" fill="none"/>
      {/* ── Circuit traces (CAN bus / ECU network) ── */}
      {/* Main horizontal trace */}
      <polyline
        points="118,216 198,184 308,162 435,140 568,144 665,160 750,196"
        stroke="currentColor" strokeWidth="1" strokeDasharray="7 4"/>
      {/* Branch traces */}
      <line x1="198" y1="184" x2="198" y2="248" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3"/>
      <line x1="308" y1="162" x2="308" y2="113" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3"/>
      <line x1="435" y1="140" x2="435" y2="112" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3"/>
      <line x1="568" y1="144" x2="568" y2="112" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3"/>
      <line x1="665" y1="160" x2="688" y2="248" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3"/>
      {/* Secondary cross-trace */}
      <polyline points="198,184 240,162 308,162" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 4"/>
      <polyline points="568,144 620,150 665,160" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 4"/>
      {/* Circuit nodes — primary */}
      {circuitNodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5.5" stroke="currentColor" strokeWidth="1" fill="none"/>
          <circle cx={x} cy={y} r="2.2" fill="currentColor"/>
        </g>
      ))}
      {/* Circuit nodes — secondary (branch endpoints) */}
      {branchEnds.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" stroke="currentColor" strokeWidth="0.9" fill="none"/>
      ))}
    </svg>
  );
}

/* ─── MAIN APP ──────────────────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeNav, setActiveNav] = useState("about");
  const [filterCat, setFilterCat] = useState("ALL");
  const [modal, setModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const th = dark ? T.dark : T.light;
  const typed = useTypewriter(P.focus);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    const sections = NAV.map(n => document.getElementById(n.id)).filter(Boolean);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id); });
    }, { threshold: 0.25 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, [loaded]);

  const navScrolled = scrollY > 56;
  const TABS = ["ALL","INTERNSHIP","COURSEWORK","HOME","GITHUB","LAB"];
  const TAB_LABELS = { ALL:"All", INTERNSHIP:"Internship", COURSEWORK:"Coursework", HOME:"Personal", GITHUB:"GitHub", LAB:"Labs" };
  const filtered = filterCat === "ALL" ? PROJECTS : PROJECTS.filter(p => p.cat === filterCat);

  return (
    <>
      <style>{GCSS}</style>

      {/* Page background */}
      <div style={{
        position:"fixed", inset:0, zIndex:-1,
        background: th.isDark
          ? `radial-gradient(ellipse at 15% 40%, rgba(79,70,229,0.06) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(226,0,21,0.04) 0%, transparent 50%), ${th.bg}`
          : `radial-gradient(ellipse at 10% 20%, rgba(79,70,229,0.04) 0%, transparent 45%), radial-gradient(ellipse at 90% 85%, rgba(124,58,237,0.03) 0%, transparent 50%), ${th.bg}`,
        transition:"background 0.5s ease",
      }} />

      {/* Living breathing ambient orbs + dot grid */}
      <BreathingBg th={th} />

      <div style={{ opacity:loaded?1:0, transition:"opacity 0.5s ease", color:th.text, minHeight:"100vh" }}>

        {/* ── NAVBAR ─────────────────────────────── */}
        <nav style={{
          position:"fixed", top:0, left:0, right:0, zIndex:200,
          background: navScrolled ? th.bgNav : "transparent",
          backdropFilter: navScrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: navScrolled ? `1px solid ${th.border}` : "1px solid transparent",
          transition:"all 0.35s cubic-bezier(.22,1,.36,1)",
        }}>
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 28px", height:66, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <a href="#about" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:9, background:`linear-gradient(135deg,${th.accent},#7c3aed)`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 4px 12px ${th.accent}40` }}>
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1.5L2 4V8.5C2 12 4.5 15.2 8 16.5C11.5 15.2 14 12 14 8.5V4L8 1.5Z" fill="rgba(255,255,255,0.22)" stroke="white" strokeWidth="1.25" strokeLinejoin="round"/>
                  <path d="M5.5 9.2L7.2 11L10.8 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:17, fontWeight:800, color:th.text, letterSpacing:-0.3 }}>
                Micheal<span style={{ color:th.accent }}>.</span>
              </span>
            </a>
            <div style={{ display:"flex", alignItems:"center", gap:4 }}>
              {/* Desktop nav */}
              <div className="desktop-nav">
                {NAV.map(n => (
                  <a key={n.id} href={`#${n.id}`} style={{
                    fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:500,
                    color: activeNav === n.id ? th.accent : th.textMid,
                    textDecoration:"none", padding:"6px 11px", borderRadius:8,
                    background: activeNav === n.id ? th.accentLight : "transparent",
                    border:`1px solid ${activeNav === n.id ? th.accentMid : "transparent"}`,
                    transition:"all 0.2s ease",
                  }}>
                    {n.label}
                  </a>
                ))}
              </div>
              <button onClick={() => setDark(!dark)} style={{ marginLeft:6, width:36, height:36, borderRadius:10, background:th.tagBg, border:`1px solid ${th.border}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, transition:"all 0.2s ease" }}>
                {dark ? "☀️" : "🌙"}
              </button>
              {/* Hamburger for mobile */}
              <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ marginLeft:4, width:36, height:36, borderRadius:10, background:th.tagBg, border:`1px solid ${th.border}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:4 }}>
                <span style={{ width:16, height:2, background:th.textMid, borderRadius:1, transition:"all 0.2s", transform:menuOpen?"translateY(6px) rotate(45deg)":"none" }} />
                <span style={{ width:16, height:2, background:th.textMid, borderRadius:1, transition:"all 0.2s", opacity:menuOpen?0:1 }} />
                <span style={{ width:16, height:2, background:th.textMid, borderRadius:1, transition:"all 0.2s", transform:menuOpen?"translateY(-6px) rotate(-45deg)":"none" }} />
              </button>
            </div>
          </div>
          {/* Mobile dropdown */}
          {menuOpen && (
            <div style={{ background:th.bgNav, backdropFilter:"blur(20px) saturate(180%)", borderBottom:`1px solid ${th.border}`, padding:"12px 24px 18px", display:"flex", flexDirection:"column", gap:4, animation:"fadeIn 0.15s ease" }}>
              {NAV.map(n => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)} style={{
                  fontFamily:"'Inter',sans-serif", fontSize:14, fontWeight:500,
                  color: activeNav === n.id ? th.accent : th.textMid,
                  textDecoration:"none", padding:"10px 14px", borderRadius:10,
                  background: activeNav === n.id ? th.accentLight : "transparent",
                  transition:"all 0.2s ease",
                }}>
                  {n.label}
                </a>
              ))}
            </div>
          )}
          </div>
        </nav>

        {/* ── HERO ───────────────────────────────── */}
        <section id="about" style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", padding:"110px 28px 80px", overflow:"hidden" }}>
          <ParticleCanvas th={th} />

          {/* Gradient blobs */}
          <div style={{ position:"absolute", top:"10%", right:"5%", width:500, height:500, borderRadius:"50%", background:`radial-gradient(circle, ${th.accent}08 0%, transparent 70%)`, pointerEvents:"none", animation:"float 8s ease-in-out infinite" }} />
          <div style={{ position:"absolute", bottom:"10%", left:"5%", width:350, height:350, borderRadius:"50%", background:`radial-gradient(circle, rgba(226,0,21,0.04) 0%, transparent 70%)`, pointerEvents:"none", animation:"float 10s ease-in-out infinite 1s" }} />

          {/* Cyber car silhouette with circuit overlay */}
          <div style={{ position:"absolute", bottom:"0%", right:"-4%", color:th.accent, opacity:0.045, pointerEvents:"none", userSelect:"none", zIndex:0 }}>
            <BgCar />
          </div>

          <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:48, alignItems:"center" }}>
              <div style={{ flex:"1 1 480px", maxWidth:760 }}>
                {/* "Currently at Bosch" badge */}
                <div style={{ display:"inline-flex", alignItems:"center", gap:12, marginBottom:24, padding:"9px 16px 9px 12px", borderRadius:24, background:"rgba(226,0,21,0.06)", border:"1px solid rgba(226,0,21,0.2)", backdropFilter:"blur(8px)", animation:"fadeUp 0.6s ease both" }}>
                  <Dot color="#E20015" animated />
                  <BoschLogo scale={0.38} uid="badge" />
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10.5, color:"#E20015", fontWeight:700, letterSpacing:1.2 }}>Product Security Intern</span>
                </div>

                <h1 style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(40px,6.5vw,78px)", fontWeight:900, lineHeight:1.06, letterSpacing:-2, marginBottom:14, animation:"fadeUp 0.7s ease 0.1s both" }}>
                  {th.isDark ? (
                    <span style={{ color:"#f1f5f9" }}>
                      Micheal <span style={{ color:th.accent }}>Wolski</span>
                    </span>
                  ) : (
                    <span style={{ background:"linear-gradient(135deg, #0f172a 0%, #0f172a 40%, #4f46e5 70%, #7c3aed 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                      Micheal Wolski
                    </span>
                  )}
                </h1>

                <div style={{ height:30, marginBottom:20, animation:"fadeUp 0.7s ease 0.18s both" }}>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"clamp(13px,1.8vw,17px)", color:th.accent }}>
                    {typed}
                    <span style={{ animation:"blink 1s infinite", opacity:0.7 }}>|</span>
                  </span>
                </div>

                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(14px,1.15vw,16.5px)", lineHeight:1.82, color:th.textMid, maxWidth:640, marginBottom:32, animation:"fadeUp 0.7s ease 0.24s both" }}>
                  {P.summary}
                </p>

                <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:38, animation:"fadeUp 0.7s ease 0.3s both" }}>
                  {P.focus.map(f => (
                    <span key={f} style={{ fontFamily:"'Inter',sans-serif", fontSize:12.5, fontWeight:500, color:th.accent, background:th.accentLight, border:`1px solid ${th.accentMid}`, padding:"6px 14px", borderRadius:20 }}>{f}</span>
                  ))}
                </div>

                <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:52, animation:"fadeUp 0.7s ease 0.36s both" }}>
                  <a href="#projects" style={{ fontFamily:"'Inter',sans-serif", fontSize:14, fontWeight:700, color:"#fff", background:th.btnBg, textDecoration:"none", padding:"13px 30px", borderRadius:12, boxShadow:th.btnShadow, display:"inline-flex", alignItems:"center", gap:8, transition:"all 0.2s ease" }}>
                    View Projects
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13L13 3M13 3H7M13 3V9"/></svg>
                  </a>
                  <a href="#career" style={{ fontFamily:"'Inter',sans-serif", fontSize:14, fontWeight:600, color:th.text, background:th.card, textDecoration:"none", padding:"13px 30px", borderRadius:12, border:`1px solid ${th.border}`, boxShadow:th.shadow, display:"inline-flex", alignItems:"center", gap:8, transition:"all 0.2s ease" }}>
                    Career
                  </a>
                  <a href={`mailto:${P.email}`} style={{ fontFamily:"'Inter',sans-serif", fontSize:14, fontWeight:600, color:th.accent, background:th.accentLight, textDecoration:"none", padding:"13px 30px", borderRadius:12, border:`1px solid ${th.accentMid}`, display:"inline-flex", alignItems:"center", gap:8, transition:"all 0.2s ease" }}>
                    Contact
                  </a>
                </div>

                {/* Stats */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:"18px 0", animation:"fadeUp 0.7s ease 0.44s both" }}>
                  {[
                    { num:"23+", label:"Projects Built" },
                    { num:"2", label:"Degrees" },
                    { num:"Bosch", label:"Current Employer" },
                    { num:"2025", label:"Active Intern" },
                  ].map((s, i) => (
                    <div key={s.label} style={{ paddingRight:28, borderRight: i < 3 ? `1px solid ${th.border}` : "none", paddingLeft: i > 0 ? 28 : 0 }}>
                      <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:i===2?18:26, fontWeight:900, color:th.accent, lineHeight:1.1 }}>{s.num}</div>
                      <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11.5, color:th.textDim, marginTop:3 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Bosch featured panel */}
              <div style={{ display:"flex", flexDirection:"column", gap:14, width:260, flexShrink:0, animation:"slideInRight 0.8s cubic-bezier(.22,1,.36,1) 0.2s both" }}>
                <div style={{
                  background: th.isDark ? "rgba(226,0,21,0.05)" : "rgba(226,0,21,0.04)",
                  border:"1.5px solid rgba(226,0,21,0.2)", borderRadius:20,
                  padding:"28px 24px", textAlign:"center",
                  boxShadow:"0 8px 40px rgba(226,0,21,0.1), 0 2px 8px rgba(0,0,0,0.06)",
                  animation:"boschGlow 4s ease-in-out infinite",
                }}>
                  <div style={{ marginBottom:14, display:"flex", justifyContent:"center" }}>
                    <BoschLogo scale={0.82} uid="panel" />
                  </div>
                  <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:700, color:th.text, marginBottom:4 }}>Product Security Intern</div>
                  <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9.5, color:th.textDim, marginBottom:14 }}>Automotive Cybersecurity</div>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(226,0,21,0.08)", border:"1px solid rgba(226,0,21,0.2)", borderRadius:12, padding:"5px 12px" }}>
                    <Dot color="#E20015" animated />
                    <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"#E20015", fontWeight:700, letterSpacing:1.2 }}>ACTIVE · 2025</span>
                  </div>
                </div>

                {/* Social links */}
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {SOCIALS.map(s => {
                    const Ic = SOCIAL_ICON[s.label];
                    return (
                      <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{
                        fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600, color:th.textMid,
                        background:th.card, border:`1px solid ${th.border}`, borderRadius:10,
                        padding:"10px 16px", textDecoration:"none", display:"flex", alignItems:"center", justifyContent:"space-between",
                        boxShadow:th.shadow, transition:"all 0.2s ease",
                      }}>
                        <span style={{ display:"flex", alignItems:"center", gap:8 }}>
                          {Ic && <Ic size={13} color={th.accent} />}
                          {s.label}
                        </span>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 10L10 2M10 2H5M10 2V7"/></svg>
                      </a>
                    );
                  })}
                </div>

                {/* Location badge */}
                <div style={{ background:th.tagBg, border:`1px solid ${th.tagBorder}`, borderRadius:10, padding:"12px 16px", textAlign:"center" }}>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:th.textDim }}>📍 {P.location}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CAREER ─────────────────────────────── */}
        <CareerSection th={th} />

        {/* ── PROJECTS ───────────────────────────── */}
        <section id="projects" style={{ padding:"110px 28px", background: th.isDark ? th.bg : th.bgAlt }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <SecLabel th={th}>Projects</SecLabel>
            <SecTitle th={th} sub="Security tools, enterprise systems, IoT builds, and lab work spanning internship, coursework, and personal projects.">
              What I've Built
            </SecTitle>

            {/* Filter bar */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:42, padding:"6px", background:th.tagBg, border:`1px solid ${th.border}`, borderRadius:14, width:"fit-content" }}>
              {TABS.map(t => (
                <button key={t} onClick={() => setFilterCat(t)} style={{
                  fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600,
                  letterSpacing:0.5, padding:"9px 18px", borderRadius:10, cursor:"pointer",
                  background: filterCat === t ? th.accent : "transparent",
                  color: filterCat === t ? "#fff" : th.textMid,
                  border: `1px solid ${filterCat === t ? th.accent : "transparent"}`,
                  boxShadow: filterCat === t ? th.btnShadow : "none",
                  transition:"all 0.2s cubic-bezier(.22,1,.36,1)",
                }}>
                  {TAB_LABELS[t]}{t !== "ALL" && <span style={{ opacity:0.6, marginLeft:4 }}>({PROJECTS.filter(p => p.cat === t).length})</span>}
                </button>
              ))}
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(330px,1fr))", gap:22 }}>
              {filtered.map((p, i) => <ProjCard key={p.id} p={p} i={i} onClick={setModal} th={th} />)}
            </div>
          </div>
        </section>

        {/* ── ACTIVITY ───────────────────────────── */}
        <section id="activity" style={{ padding:"110px 28px", background: th.isDark ? th.bgAlt : th.bg }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <SecLabel th={th}>Activity</SecLabel>
            <SecTitle th={th} sub="Development activity across all repositories over the past year.">
              Development Activity
            </SecTitle>
            <div style={{ background:th.card, border:`1px solid ${th.border}`, borderRadius:20, padding:"32px 36px", boxShadow:th.shadowMd }}>
              <GitMap th={th} />
            </div>
          </div>
        </section>

        {/* ── EDUCATION ──────────────────────────── */}
        <section id="education" style={{ padding:"110px 28px", background: th.isDark ? th.bg : th.bgAlt }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <SecLabel th={th}>Education</SecLabel>
            <SecTitle th={th}>Academic Background</SecTitle>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:18, marginBottom:56 }}>
              {EDU.map((e, i) => <EduItem key={i} e={e} i={i} th={th} />)}
            </div>
            <SecLabel th={th}>Certifications</SecLabel>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14, marginTop:16 }}>
              {CERTS.map((c, i) => <CertItem key={i} c={c} i={i} th={th} />)}
            </div>
          </div>
        </section>

        {/* ── SKILLS ─────────────────────────────── */}
        <section id="skills" style={{ padding:"110px 28px", background: th.isDark ? th.bgAlt : th.bg }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <SecLabel th={th}>Skills</SecLabel>
            <SecTitle th={th} sub="Tools and technologies spanning security, development, automotive, and infrastructure.">
              Technical Skills
            </SecTitle>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:44 }}>
              {SKILLS.map((s, i) => <SkillGroup key={i} s={s} i={i} th={th} />)}
            </div>
          </div>
        </section>

        {/* ── CONTACT ────────────────────────────── */}
        <section id="contact" style={{ padding:"110px 28px", background: th.isDark ? th.bg : th.bgAlt }}>
          <div style={{ maxWidth:680, margin:"0 auto", textAlign:"center" }}>
            <SecLabel th={th}>Contact</SecLabel>
            <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(30px,4.5vw,48px)", fontWeight:900, letterSpacing:-1, lineHeight:1.1, marginBottom:18, color:th.text }}>
              Let's Work <span style={{ color:th.accent }}>Together</span>
            </h2>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:16, color:th.textMid, lineHeight:1.8, marginBottom:44 }}>
              Looking for internships, co-ops, and entry-level roles in cybersecurity, IoT security, or product security. Let's connect.
            </p>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:14, marginBottom:44 }}>
              {SOCIALS.map(s => {
                const Ic = SOCIAL_ICON[s.label];
                return (
                  <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{
                    display:"flex", alignItems:"center", justifyContent:"center", gap:9,
                    fontFamily:"'Inter',sans-serif", fontSize:14, fontWeight:600, color:th.text,
                    background:th.card, border:`1px solid ${th.border}`, borderRadius:14,
                    padding:"16px 22px", textDecoration:"none", boxShadow:th.shadow, transition:"all 0.2s ease",
                  }}>
                    {Ic && <Ic size={16} color={th.accent} />}
                    {s.label}
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke={th.accent} strokeWidth="2" strokeLinecap="round"><path d="M2 10L10 2M10 2H5M10 2V7"/></svg>
                  </a>
                );
              })}
            </div>

            <div style={{ display:"inline-flex", alignItems:"center", gap:12, background:th.accentLight, border:`1px solid ${th.accentMid}`, borderRadius:16, padding:"18px 28px" }}>
              <Dot color={th.green} animated />
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:th.accent, fontWeight:600 }}>
                {P.location} · {P.email}
              </span>
            </div>
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────── */}
        <footer style={{ borderTop:`1px solid ${th.border}`, padding:"30px 28px", background:th.isDark?th.bgAlt:th.bg, textAlign:"center" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", maxWidth:1200, margin:"0 auto", flexWrap:"wrap", gap:8 }}>
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:15, fontWeight:800, color:th.text }}>
              Micheal<span style={{ color:th.accent }}>.</span>
            </span>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10.5, color:th.textDim, letterSpacing:0.5 }}>
              © 2025–2026 Micheal Wolski · React + Vite · GitHub Pages
            </span>
            <a href="https://github.com/michealswolski" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10.5, color:th.accent, textDecoration:"none" }}>
              github.com/michealswolski →
            </a>
          </div>
        </footer>

      </div>

      {/* Scroll to top */}
      <button
        className={`scroll-top ${scrollY > 400 ? "vis" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ background:th.accent, boxShadow:th.btnShadow, color:"#fff" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
      </button>

      {modal && <Modal project={modal} onClose={() => setModal(null)} th={th} />}
    </>
  );
}
