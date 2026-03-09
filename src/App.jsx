import { useState, useEffect, useRef, useCallback } from "react";

/* ─── GOOGLE FONTS ─────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');`;

/* ─── THEMES ────────────────────────────────────────────── */
const T = {
  light: {
    bg:"#ffffff", bgAlt:"#f8fafc", bgNav:"rgba(255,255,255,0.92)",
    text:"#0f172a", textMid:"#475569", textDim:"#94a3b8", textFaint:"#cbd5e1",
    accent:"#4f46e5", accentLight:"rgba(79,70,229,0.08)", accentMid:"rgba(79,70,229,0.15)",
    green:"#10b981", greenLight:"rgba(16,185,129,0.1)",
    border:"#e2e8f0", borderHov:"#c7d2fe",
    card:"#ffffff", cardHov:"#f8fafc",
    shadow:"0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)",
    shadowHov:"0 8px 30px rgba(79,70,229,0.12), 0 2px 8px rgba(0,0,0,0.08)",
    tagBg:"#f1f5f9", tagBorder:"#e2e8f0", tagText:"#64748b",
    btnBg:"#4f46e5", btnText:"#ffffff", btnShadow:"0 4px 14px rgba(79,70,229,0.35)",
    mono:"rgba(79,70,229,0.65)", badgeInternship:"#7c3aed", badgeGH:"#4f46e5",
    badgeLab:"#0891b2", badgeWork:"#64748b", badgeCW:"#d97706", badgeHome:"#db2777",
    isDark: false,
  },
  dark: {
    bg:"#0f172a", bgAlt:"#111827", bgNav:"rgba(15,23,42,0.92)",
    text:"#f1f5f9", textMid:"#94a3b8", textDim:"#475569", textFaint:"#334155",
    accent:"#818cf8", accentLight:"rgba(129,140,248,0.08)", accentMid:"rgba(129,140,248,0.15)",
    green:"#34d399", greenLight:"rgba(52,211,153,0.1)",
    border:"#1e293b", borderHov:"#4338ca",
    card:"#1e293b", cardHov:"#243149",
    shadow:"0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)",
    shadowHov:"0 8px 30px rgba(129,140,248,0.15), 0 2px 8px rgba(0,0,0,0.3)",
    tagBg:"rgba(255,255,255,0.04)", tagBorder:"rgba(255,255,255,0.08)", tagText:"#94a3b8",
    btnBg:"#4f46e5", btnText:"#ffffff", btnShadow:"0 4px 14px rgba(79,70,229,0.4)",
    mono:"rgba(129,140,248,0.7)", badgeInternship:"#a78bfa", badgeGH:"#818cf8",
    badgeLab:"#22d3ee", badgeWork:"#94a3b8", badgeCW:"#fbbf24", badgeHome:"#f472b6",
    isDark: true,
  },
};

/* ─── PROFILE & DATA ─────────────────────────────────────── */
const P = {
  name:"Micheal Wolski", title:"Cybersecurity Student & Product Security Intern",
  summary:"Cybersecurity student pursuing a B.S. in Information Assurance & Cyber Defense at Eastern Michigan University with hands-on internship experience at a Tier 1 automotive supplier supporting major OEM programs. I build security tools, IoT embedded systems, enterprise dashboards, and hands-on lab environments—combining academic coursework with real-world development and AI-assisted engineering.",
  location:"Woodhaven, MI", email:"michealswolski@gmail.com",
  focus:["Product Cybersecurity","IoT & Embedded Systems","Power Platform Development","Automotive Security","AI-Assisted Engineering"],
};
const EDU = [
  {degree:"B.S. Information Assurance & Cyber Defense",school:"Eastern Michigan University",status:"Expected 2026",loc:"Ypsilanti, MI",honors:""},
  {degree:"A.A.S. Cybersecurity",school:"Henry Ford College",status:"Graduated 2023",loc:"Dearborn, MI",honors:"GPA: 3.6 • Dean's List"},
];
const CERTS = [
  {name:"CompTIA A+",status:"In Progress"},
  {name:"CompTIA Security+",status:"Planned"},
  {name:"CCNA Badges",status:"Networking / Switching / Routing"},
  {name:"IT Help Desk Cert",status:"Completed"},
];
const EXP = [
  {role:"Product Cybersecurity Intern",company:"Tier 1 Automotive Supplier",period:"2025 – Present",type:"INTERNSHIP",
    points:["Support product cybersecurity across multiple divisions for major OEM programs","Built cross-divisional Power BI dashboard with SharePoint backend for tracking security configurations across programs","Developed LLM-based onboarding agent using prompt engineering","Participate in risk and cybersecurity review meetings and planning sessions","Created Power Apps intake forms and Power Automate workflows","Facilitate security awareness workshops and training sessions"]},
  {role:"Warehouse Team Member",company:"Amazon",period:"2022 – Present",type:"WORK",
    points:["Inbound process receiving and stowing inventory","Maintained high performance metrics in fast-paced operational environment"]},
];
const PROJECTS = [
  {id:"BSH-001",title:"Cross-Divisional Project Dashboard",sub:"Power BI Analytics — Automotive Internship",desc:"Comprehensive project tracking dashboard in Power BI for a global Tier 1 automotive supplier's cybersecurity organization. Custom themes, cross-divisional filtering, drill-through reporting for security configurations.",tags:["Power BI","DAX","SharePoint","Power Query"],cat:"INTERNSHIP",domain:"Analytics",impact:"Unified project tracking across multiple global cybersecurity divisions",details:"Built from scratch during my internship to solve fragmented project tracking across divisions. Pulls data from SharePoint via Power Query, transforms with DAX measures, custom dark-themed UI. Drill-through pages per division, KPI cards with conditional formatting, automated refresh schedules."},
  {id:"BSH-002",title:"Cross-Divisional Project Database",sub:"Power Apps Canvas App — Automotive Internship",desc:"Canvas App with dark futuristic UI, wizard workflows, admin dashboards, and ticketing system. Hardened .msapp packages for cross-tenant deployment.",tags:["Power Apps","Power Automate","SharePoint","ALM"],cat:"INTERNSHIP",domain:"Enterprise Apps",impact:"Cross-tenant deployment across global cybersecurity divisions",details:"Multi-step wizard for project intake, role-based admin dashboards, integrated ticketing system. Troubleshot PAC CLI compatibility and built hardened .msapp packages for cross-tenant deployment."},
  {id:"BSH-003",title:"LLM-Based Onboarding Agent",sub:"AI-Powered Team Onboarding — Automotive Internship",desc:"AI-powered onboarding assistant using prompt engineering and LLM integration to streamline cybersecurity team onboarding and reduce ramp-up time.",tags:["Prompt Engineering","LLM","AI","Automation"],cat:"INTERNSHIP",domain:"AI Enablement",impact:"Streamlined cybersecurity team onboarding with AI",details:"Internal AI agent helping new team members get up to speed on cybersecurity processes. Uses carefully crafted system prompts to answer procedural questions and reduce onboarding friction."},
  {id:"CW-001",title:"OBD-II Diagnostic Scanner",sub:"IoT & Embedded Systems Course — EMU",desc:"Designing and building an OBD-II vehicle diagnostic scanner as part of an IoT embedded systems course. Involves hardware interfacing, protocol communication, and real-time data acquisition from vehicle ECUs.",tags:["IoT","Embedded Systems","OBD-II","Hardware","Protocols"],cat:"COURSEWORK",domain:"IoT / Automotive",impact:"Hands-on embedded systems project bridging IoT and automotive diagnostics",details:"Currently developing an OBD-II scanner for my IoT and Embedded Systems class at EMU. The project involves working with hardware interfaces to communicate with vehicle ECUs, reading diagnostic trouble codes, and displaying real-time sensor data. Combines my interest in automotive systems with embedded programming and protocol-level communication."},
  {id:"CW-002",title:"PKI & Certificate Authority Research",sub:"Cybersecurity Coursework — EMU",desc:"Research project analyzing PKI infrastructure vulnerabilities, certificate authority trust models, and real-world CA compromise case studies. Produced as an academic deliverable and professional writing sample.",tags:["PKI","Certificate Authority","Research","Cryptography"],cat:"COURSEWORK",domain:"Cryptography",impact:"Comprehensive research report on PKI trust chains and CA vulnerabilities",details:"Deep-dive research into how PKI infrastructure works, common vulnerability patterns in certificate authority implementations, and analysis of notable CA compromises. Produced a comprehensive report submitted as academic coursework and used as a professional writing sample."},
  {id:"CW-003",title:"Secure Boot & Hardware Security Research",sub:"IECS Embedded Security — EMU",desc:"Researching secure boot implementations in embedded and automotive systems, covering hardware-level security mechanisms, trusted platform modules, and boot attestation for connected vehicles.",tags:["Secure Boot","TPM","Embedded Security","MISRA C","Automotive"],cat:"COURSEWORK",domain:"Embedded Security",impact:"Exploring hardware-level trust chains for automotive ECU security",details:"Academic research exploring how secure boot is implemented in embedded automotive systems. Covering TPM integration, chain-of-trust verification, remote attestation, MISRA C coding standards for safety-critical systems, and how these concepts apply to real-world vehicle ECU security."},
  {id:"HOME-001",title:"MeshLink",sub:"Encrypted BLE Mesh Messaging — iOS App",desc:"Native iOS app built in Swift/SwiftUI with CoreBluetooth for encrypted peer-to-peer messaging over Bluetooth Low Energy mesh networks. Features AES-256-GCM encryption, NFC key sharing, QR exchange, and multi-hop relay.",tags:["Swift","SwiftUI","CoreBluetooth","AES-256-GCM","NFC"],cat:"HOME",domain:"iOS Development",impact:"End-to-end encrypted BLE mesh communication app for iOS",details:"Built a native iOS app from scratch using Swift and SwiftUI. Uses CoreBluetooth for BLE mesh networking where messages hop between devices. AES-256-GCM encryption with keys exchanged via NFC tap or QR code scan. Features account management, chat sessions, peer nicknames, auto-reconnect, and debug logging."},
  {id:"HOME-002",title:"Depass Grading & Landscaping",sub:"Business Website — React + EmailJS",desc:"Full-featured business website for a real landscaping client in Rock Hill, SC. Includes service pages, portfolio gallery, contact forms with EmailJS integration, admin dashboard, and SEO optimization.",tags:["React","EmailJS","SEO","Responsive Design","Business"],cat:"HOME",domain:"Web Development",impact:"Live client website with lead generation and admin portal",details:"Built a complete business website for a real client. Features include a public-facing site with services, portfolio, testimonials, and FAQ sections, plus a private admin dashboard for managing leads and orders. Contact form uses EmailJS for instant email notifications. SEO-optimized with JSON-LD schema markup."},
  {id:"HOME-003",title:"S650 Mustang Mod Tracker",sub:"Vehicle Build Management App — React",desc:"Interactive build management app for tracking vehicle modifications, maintenance schedules, and budgets. Features onboarding wizard, mod templates, cost tracking, and progress visualization.",tags:["React","Vehicle Mods","Budget Tracking","Responsive"],cat:"HOME",domain:"Automotive",impact:"Personal tool for managing my S650 Mustang build",details:"Built to track modifications on my 2024+ Ford Mustang S650. Onboarding wizard for vehicle setup, pre-loaded mod template library, maintenance tracking with mileage-based reminders, budget dashboard with cost breakdowns, and progress rings showing build completion percentage."},
  {id:"HOME-004",title:"Ford ECU Modification Detector",sub:"Raspberry Pi Forensic Scanner — Python/Flask",desc:"Forensic analysis tool running on Raspberry Pi that reads vehicle ECU data via OBD-II, scores modification likelihood using behavioral analysis, and displays results through a web dashboard with GPIO LED indicators.",tags:["Python","Flask","Raspberry Pi","OBD-II","Forensics"],cat:"HOME",domain:"Automotive Security",impact:"Prototype tool for detecting ECU tampering in Ford vehicles",details:"A Raspberry Pi-based prototype that connects to a vehicle's OBD-II port and reads ECU data including calibration IDs, flash counters, fuel trim values, and timing data. Uses a scoring algorithm based on Ford service data patterns to determine modification likelihood. Web dashboard shows results with a forensic confidence score, and GPIO-connected LEDs provide physical status indication."},
  {id:"GH-001",title:"Wolski Command Center",sub:"Raspberry Pi Dashboard — React + Node",desc:"Full-stack Raspberry Pi dashboard with system monitoring, AI agent automation, file management, health diagnostics, and one-click Windows deployment.",tags:["React","Node.js","Raspberry Pi","PowerShell"],cat:"GITHUB",domain:"Full-Stack Dev",impact:"Complete IoT dashboard with one-click deployment",details:"Centralized home lab command center. React frontend communicates with Node.js backend on the Pi for real-time CPU/memory/disk metrics, file management, and AI agent tasks. PowerShell deployment script handles entire setup with a single click."},
  {id:"GH-002",title:"AgentForge",sub:"AI Agent Platform — Electron Desktop App",desc:"Cross-platform Electron + Vite + React app with 10 messaging channels, 17 app connectors, skills marketplace, persistent memory, native installers.",tags:["Electron","React","Vite","Node.js"],cat:"GITHUB",domain:"AI & Automation",impact:"Full desktop app with native installers across 3 platforms",details:"AI agent hub with Discord, Slack, Telegram integrations, skill marketplace, persistent memory system, and voice mode. Distributed as .exe, .dmg, and .AppImage installers."},
  {id:"GH-003",title:"Network Utility Tool v6.0",sub:"Professional Edition — PowerShell",desc:"Comprehensive network utility for Windows 10/11: DNS speed testing, adapter optimizations, bufferbloat testing, gaming latency optimization, DFIR tools.",tags:["PowerShell","Networking","DNS","DFIR"],cat:"GITHUB",domain:"Network Security",impact:"15+ network tools in a single professional script",details:"DNS benchmarking across 10+ providers, adapter-specific optimizations, Nagle algorithm toggling, DFIR tools, WiFi password recovery, profile system for Home/Work/Gaming configs. Every change reversible."},
  {id:"GH-004",title:"GamePrep Pro",sub:"Windows 11 Optimization — Python/PyQt6",desc:"System optimization for competitive gaming. Process Lasso configs for i7-14700K P/E-core affinity, network tweaks, driver management. All reversible.",tags:["Python","PyQt6","Process Lasso","Windows 11"],cat:"GITHUB",domain:"System Engineering",impact:"Reversible optimizations with safety-first design",details:"Pins games to P-cores via Process Lasso while relegating background tasks to E-cores. Network buffer optimization, driver cleanup, controller polling rate maximization, anti-cheat compatibility checks."},
  {id:"LAB-001",title:"Home Lab Vulnerability Management",sub:"Nessus + Nmap + pfSense",desc:"Full vulnerability management lifecycle: Nessus scans, CVSS prioritization, patching, pfSense enforcement, re-scan validation.",tags:["Nessus","Nmap","pfSense","VirtualBox"],cat:"LAB",domain:"Vuln Management",impact:"Full detect → analyze → remediate → validate lifecycle",details:"Multi-VM business network simulation. Nessus baseline scans, CVSS prioritization, patches applied, pfSense rules enforced, then re-scanned to confirm reduced attack surface with before/after documentation."},
  {id:"LAB-002",title:"Network Traffic Analysis",sub:"Wireshark Deep Packet Inspection",desc:"Captured live packet traffic in isolated lab. Analyzed TCP handshakes, DNS queries, HTTP sessions. Identified abnormal outbound traffic.",tags:["Wireshark","Kali Linux","tcpdump","TCP/IP"],cat:"LAB",domain:"Network Forensics",impact:"Protocol-level anomaly detection and stream reconstruction",details:"Isolated VM network with full traffic capture. TCP handshake analysis, DNS tunneling checks, HTTP stream extraction, and suspicious outbound connection identification from compromised VM."},
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
  const d=[];const now=Date.now();
  for(let i=364;i>=0;i--){
    const date=new Date(now-i*86400000);const day=date.getDay();
    const r=Math.random();let l=0;
    if(r>0.55)l=1;if(r>0.72)l=2;if(r>0.85)l=3;if(r>0.93)l=4;
    if((day===0||day===6)&&r<0.4)l=0;
    d.push({date:date.toISOString().slice(0,10),level:l});
  }
  return d;
})();

const NAV = [
  {id:"about",label:"About"},
  {id:"projects",label:"Projects"},
  {id:"experience",label:"Experience"},
  {id:"activity",label:"Activity"},
  {id:"education",label:"Education"},
  {id:"skills",label:"Skills"},
  {id:"contact",label:"Contact"},
];

const SOCIALS = [
  {label:"LinkedIn",href:"https://www.linkedin.com/in/michealwolski/",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},
  {label:"GitHub",href:"https://github.com/michealswolski",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>},
  {label:"Email",href:"mailto:michealswolski@gmail.com",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>},
];

/* ─── HOOKS ──────────────────────────────────────────────── */
function useReveal(thr) {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = r.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); obs.disconnect(); }
    }, { threshold: thr || 0.08 });
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
    if (!texts || !texts.length) return;
    if (pause) {
      const t = setTimeout(() => { setPause(false); setDel(true); }, 2200);
      return () => clearTimeout(t);
    }
    const cur = texts[idx] || "";
    const t = setTimeout(() => {
      if (!del) {
        setDisplay(cur.slice(0, ci + 1));
        if (ci + 1 >= cur.length) setPause(true);
        else setCi(ci + 1);
      } else {
        setDisplay(cur.slice(0, ci));
        if (ci <= 0) { setDel(false); setIdx((idx + 1) % texts.length); }
        else setCi(ci - 1);
      }
    }, del ? 16 : 40);
    return () => clearTimeout(t);
  }, [ci, del, pause, idx, texts]);
  return display;
}

/* ─── GLOBAL STYLES ──────────────────────────────────────── */
const GLOBAL_CSS = `
${FONTS}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #c7d2fe; border-radius: 3px; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
`;

/* ─── BADGE ──────────────────────────────────────────────── */
function Badge({ cat, th }) {
  const colors = {
    INTERNSHIP: th.badgeInternship,
    COURSEWORK: th.badgeCW,
    HOME: th.badgeHome,
    GITHUB: th.badgeGH,
    LAB: th.badgeLab,
    WORK: th.badgeWork,
  };
  const c = colors[cat] || th.accent;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, fontWeight: 600,
      letterSpacing: 1.5, textTransform: "uppercase",
      color: c, background: c + "15", border: `1px solid ${c}40`,
      padding: "3px 8px", borderRadius: 4,
    }}>
      {cat}
    </span>
  );
}

/* ─── TAG ────────────────────────────────────────────────── */
function Tag({ label, th }) {
  return (
    <span style={{
      fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5,
      color: th.tagText, background: th.tagBg, border: `1px solid ${th.tagBorder}`,
      padding: "4px 10px", borderRadius: 5,
    }}>
      {label}
    </span>
  );
}

/* ─── SECTION LABEL ──────────────────────────────────────── */
function SecLabel({ children, th }) {
  const [r, v] = useReveal();
  return (
    <div ref={r} style={{
      display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 12,
      opacity: v ? 1 : 0, transform: v ? "none" : "translateX(-10px)",
      transition: "all 0.6s cubic-bezier(.22,1,.36,1)",
    }}>
      <div style={{ width: 24, height: 2, background: th.accent, borderRadius: 1 }} />
      <span style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, fontWeight: 600,
        letterSpacing: 3, textTransform: "uppercase", color: th.accent,
      }}>
        {children}
      </span>
    </div>
  );
}

/* ─── SECTION TITLE ──────────────────────────────────────── */
function SecTitle({ children, sub, th }) {
  const [r, v] = useReveal();
  return (
    <div ref={r} style={{
      marginBottom: 48,
      opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)",
      transition: "all 0.7s cubic-bezier(.22,1,.36,1) 0.08s",
    }}>
      <h2 style={{
        fontFamily: "'Outfit', sans-serif", fontSize: "clamp(26px,3.5vw,38px)",
        fontWeight: 800, color: th.text, letterSpacing: -0.5, lineHeight: 1.15,
      }}>
        {children}
      </h2>
      {sub && (
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 15, color: th.textMid,
          marginTop: 10, maxWidth: 580, lineHeight: 1.7,
        }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ─── MODAL ──────────────────────────────────────────────── */
function Modal({ project: p, onClose, th }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  if (!p) return null;
  const badgeColors = {
    INTERNSHIP: th.badgeInternship, COURSEWORK: th.badgeCW,
    HOME: th.badgeHome, GITHUB: th.badgeGH, LAB: th.badgeLab, WORK: th.badgeWork,
  };
  const bc = badgeColors[p.cat] || th.accent;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(15,23,42,0.6)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, animation: "fadeIn 0.2s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        maxWidth: 620, width: "100%", maxHeight: "85vh", overflowY: "auto",
        background: th.card, border: `1px solid ${th.border}`,
        borderRadius: 20, padding: "36px 32px",
        boxShadow: "0 25px 80px rgba(0,0,0,0.2)",
        animation: "fadeUp 0.25s ease",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: th.textDim, letterSpacing: 1.2,
              }}>
                {p.id} • {p.domain}
              </span>
              <Badge cat={p.cat} th={th} />
            </div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: th.text, marginBottom: 4 }}>
              {p.title}
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, color: th.accent }}>
              {p.sub}
            </p>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: `1px solid ${th.border}`, borderRadius: 8,
            width: 34, height: 34, cursor: "pointer", color: th.textDim, fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 16,
          }}>×</button>
        </div>
        <div style={{
          background: bc + "10", border: `1px solid ${bc}30`,
          borderRadius: 8, padding: "10px 14px", marginBottom: 20,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: bc, flexShrink: 0 }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: bc, fontWeight: 600 }}>
            {p.impact}
          </span>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.8, color: th.textMid, marginBottom: 20 }}>
          {p.details || p.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.tags.map(t => <Tag key={t} label={t} th={th} />)}
        </div>
      </div>
    </div>
  );
}

/* ─── PROJECT CARD ───────────────────────────────────────── */
function ProjCard({ p, i, onClick, th }) {
  const [hov, setHov] = useState(false);
  const [r, v] = useReveal();
  const bc = { INTERNSHIP: th.badgeInternship, COURSEWORK: th.badgeCW, HOME: th.badgeHome, GITHUB: th.badgeGH, LAB: th.badgeLab, WORK: th.badgeWork }[p.cat] || th.accent;
  return (
    <div
      ref={r}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onClick(p)}
      style={{
        position: "relative", borderRadius: 16, cursor: "pointer",
        background: hov ? th.cardHov : th.card,
        border: `1px solid ${hov ? th.borderHov : th.border}`,
        boxShadow: hov ? th.shadowHov : th.shadow,
        transition: `all 0.35s cubic-bezier(.22,1,.36,1) ${i * 35}ms`,
        opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)",
        overflow: "hidden",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 3, background: hov ? `linear-gradient(90deg, ${bc}, ${th.accent})` : "transparent",
        transition: "background 0.3s ease",
      }} />
      <div style={{ padding: "22px 24px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, color: th.textDim, letterSpacing: 1 }}>
              {p.id}
            </span>
            <span style={{ color: th.textFaint }}>·</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: th.textDim }}>
              {p.domain}
            </span>
          </div>
          <Badge cat={p.cat} th={th} />
        </div>
        <h3 style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 16.5, fontWeight: 700,
          color: hov ? th.accent : th.text, marginBottom: 3,
          transition: "color 0.2s ease",
        }}>
          {p.title}
        </h3>
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: th.accent,
          marginBottom: 10, opacity: 0.8,
        }}>
          {p.sub}
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.7, color: th.textMid, marginBottom: 14 }}>
          {p.desc}
        </p>
        <div style={{
          display: "flex", alignItems: "center", gap: 7, marginBottom: 14,
          background: bc + "0d", border: `1px solid ${bc}25`,
          borderRadius: 7, padding: "8px 12px",
        }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: bc, flexShrink: 0 }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11.5, color: bc, fontWeight: 600 }}>
            {p.impact}
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {p.tags.slice(0, 4).map(t => <Tag key={t} label={t} th={th} />)}
        </div>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: th.accent,
          marginTop: 14, opacity: hov ? 0.9 : 0.4, textAlign: "right",
          transition: "opacity 0.2s ease", letterSpacing: 1.2,
        }}>
          VIEW DETAILS →
        </div>
      </div>
    </div>
  );
}

/* ─── EXP ITEM ───────────────────────────────────────────── */
function ExpItem({ e, i, isLast, th }) {
  const [r, v] = useReveal();
  return (
    <div ref={r} style={{
      position: "relative", paddingLeft: 48, paddingBottom: isLast ? 0 : 36,
      opacity: v ? 1 : 0, transform: v ? "none" : "translateX(-16px)",
      transition: `all 0.7s cubic-bezier(.22,1,.36,1) ${i * 150}ms`,
    }}>
      {/* Timeline line */}
      {!isLast && (
        <div style={{
          position: "absolute", left: 16, top: 22, bottom: 0,
          width: 1, background: th.border,
        }} />
      )}
      {/* Timeline dot */}
      <div style={{
        position: "absolute", left: 9, top: 8, width: 16, height: 16,
        borderRadius: "50%", border: `2px solid ${th.accent}`,
        background: i === 0 ? th.accent : th.card,
        boxShadow: i === 0 ? `0 0 12px ${th.accent}60` : "none",
      }} />
      <div style={{
        background: th.card, border: `1px solid ${th.border}`,
        borderRadius: 14, padding: "22px 24px", boxShadow: th.shadow,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          <div>
            <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: th.text }}>
              {e.role}
            </h4>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: th.accent, fontWeight: 600, marginTop: 2 }}>
              {e.company}
            </p>
          </div>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            color: th.textDim, letterSpacing: 0.8, alignSelf: "flex-start",
            background: th.tagBg, border: `1px solid ${th.tagBorder}`,
            padding: "4px 10px", borderRadius: 5, whiteSpace: "nowrap",
          }}>
            {e.period}
          </span>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {e.points.map((pt, j) => (
            <li key={j} style={{
              fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: th.textMid,
              lineHeight: 1.7, marginBottom: 4, paddingLeft: 14, position: "relative",
            }}>
              <span style={{ position: "absolute", left: 0, color: th.accent }}>›</span>
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── EDU ITEM ───────────────────────────────────────────── */
function EduItem({ e, i, th }) {
  const [r, v] = useReveal();
  return (
    <div ref={r} style={{
      background: th.card, border: `1px solid ${th.border}`, borderRadius: 14,
      padding: "22px 24px", boxShadow: th.shadow,
      opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)",
      transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${i * 100}ms`,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, background: th.accentLight,
          border: `1px solid ${th.accentMid}`, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={th.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15.5, fontWeight: 700, color: th.text, marginBottom: 4 }}>
            {e.degree}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: th.accent, fontWeight: 600, marginBottom: 4 }}>
            {e.school}
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: th.textDim }}>
            {e.status} • {e.loc}
          </div>
          {e.honors && (
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: th.green,
              marginTop: 6, display: "flex", alignItems: "center", gap: 6,
            }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: th.green }} />
              {e.honors}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── CERT ITEM ──────────────────────────────────────────── */
function CertItem({ c, i, th }) {
  const [r, v] = useReveal();
  const cl = c.status === "Completed" ? th.green : c.status.includes("Progress") ? "#f59e0b" : th.textDim;
  return (
    <div ref={r} style={{
      background: th.card, border: `1px solid ${th.border}`, borderRadius: 10,
      padding: "16px 18px", textAlign: "center", boxShadow: th.shadow,
      opacity: v ? 1 : 0, transform: v ? "scale(1)" : "scale(0.94)",
      transition: `all 0.5s cubic-bezier(.22,1,.36,1) ${i * 60}ms`,
    }}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, color: th.text, marginBottom: 6 }}>
        {c.name}
      </div>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: cl,
        letterSpacing: 1.2, textTransform: "uppercase",
        background: cl + "15", padding: "3px 8px", borderRadius: 4, display: "inline-block",
      }}>
        {c.status}
      </div>
    </div>
  );
}

/* ─── SKILL GROUP ────────────────────────────────────────── */
function SkillGroup({ s, i, th }) {
  const [r, v] = useReveal();
  return (
    <div ref={r} style={{
      opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)",
      transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${i * 80}ms`,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, marginBottom: 14,
      }}>
        <div style={{ width: 3, height: 14, background: th.accent, borderRadius: 2 }} />
        <h4 style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: th.accent,
          letterSpacing: 2, textTransform: "uppercase", fontWeight: 600,
        }}>
          {s.cat}
        </h4>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {s.items.map(it => (
          <span key={it} style={{
            fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: th.textMid,
            background: th.tagBg, border: `1px solid ${th.tagBorder}`,
            padding: "6px 12px", borderRadius: 7,
          }}>
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── GIT HEATMAP ────────────────────────────────────────── */
function GitMap({ th }) {
  const [r, v] = useReveal();
  const weeks = [];
  for (let i = 0; i < HEATMAP.length; i += 7) weeks.push(HEATMAP.slice(i, i + 7));
  const cs = th.isDark
    ? ["rgba(255,255,255,0.05)", "rgba(129,140,248,0.18)", "rgba(129,140,248,0.35)", "rgba(129,140,248,0.55)", "rgba(129,140,248,0.8)"]
    : ["#e2e8f0", "#c7d2fe", "#a5b4fc", "#818cf8", "#4f46e5"];
  const total = HEATMAP.reduce((s, d) => s + d.level, 0);
  return (
    <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)", transition: "all 0.7s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: th.textMid, fontWeight: 500 }}>
          {total} contributions in the last year
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: th.textDim }}>Less</span>
          {cs.map((c, i) => <div key={i} style={{ width: 11, height: 11, borderRadius: 2, background: c }} />)}
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: th.textDim }}>More</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 3, overflowX: "auto", paddingBottom: 6 }}>
        {weeks.map((wk, wi) => (
          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {wk.map((d, di) => (
              <div key={di} title={`${d.date}: level ${d.level}`} style={{
                width: 11, height: 11, borderRadius: 2, background: cs[d.level],
                opacity: v ? 1 : 0, transition: `opacity 0.3s ease ${(wi * 7 + di) * 1.5}ms`,
              }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── MAIN APP ───────────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeNav, setActiveNav] = useState("about");
  const [filterCat, setFilterCat] = useState("ALL");
  const [modal, setModal] = useState(null);
  const th = dark ? T.dark : T.light;
  const typed = useTypewriter(P.focus);

  // Fade in on load
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  // Scroll tracking
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Active nav tracking
  useEffect(() => {
    const sections = NAV.map(n => document.getElementById(n.id)).filter(Boolean);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id); });
    }, { threshold: 0.3 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, [loaded]);

  const navScrolled = scrollY > 60;
  const tabs = ["ALL","INTERNSHIP","COURSEWORK","HOME","GITHUB","LAB"];
  const tabLabels = { ALL:"All", INTERNSHIP:"Internship", COURSEWORK:"Coursework", HOME:"Personal", GITHUB:"GitHub", LAB:"Labs" };
  const filtered = filterCat === "ALL" ? PROJECTS : PROJECTS.filter(p => p.cat === filterCat);

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* Background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: -1,
        background: th.isDark
          ? "radial-gradient(ellipse at 20% 50%, rgba(79,70,229,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(129,140,248,0.03) 0%, transparent 50%), " + th.bg
          : "radial-gradient(ellipse at 10% 20%, rgba(79,70,229,0.04) 0%, transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(99,102,241,0.03) 0%, transparent 50%), " + th.bg,
        transition: "background 0.4s ease",
      }} />

      {/* Page wrapper */}
      <div style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s ease",
        color: th.text,
        minHeight: "100vh",
      }}>

        {/* ── NAV ─────────────────────────────────── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: navScrolled ? th.bgNav : "transparent",
          backdropFilter: navScrolled ? "blur(16px)" : "none",
          borderBottom: navScrolled ? `1px solid ${th.border}` : "1px solid transparent",
          transition: "all 0.3s ease",
        }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="#about" style={{ textDecoration: "none" }}>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 800, color: th.text, letterSpacing: -0.3 }}>
                Micheal<span style={{ color: th.accent }}>.</span>
              </span>
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {NAV.map(n => (
                <a key={n.id} href={`#${n.id}`} style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
                  color: activeNav === n.id ? th.accent : th.textMid,
                  textDecoration: "none", padding: "6px 10px", borderRadius: 7,
                  background: activeNav === n.id ? th.accentLight : "transparent",
                  transition: "all 0.2s ease",
                }}>
                  {n.label}
                </a>
              ))}
              {/* Theme toggle */}
              <button onClick={() => setDark(!dark)} style={{
                marginLeft: 8, width: 36, height: 36, borderRadius: 9,
                background: th.tagBg, border: `1px solid ${th.border}`,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                color: th.textMid, fontSize: 16, transition: "all 0.2s ease",
              }}>
                {dark ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────── */}
        <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 24px 80px" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", width: "100%" }}>
            <div style={{ maxWidth: 780 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 14px", borderRadius: 20, background: th.accentLight, border: `1px solid ${th.accentMid}` }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: th.green, animation: "blink 2s infinite" }} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: th.accent, fontWeight: 600, letterSpacing: 1.5 }}>
                  AVAILABLE FOR OPPORTUNITIES
                </span>
              </div>

              <h1 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(38px, 6vw, 72px)",
                fontWeight: 900, lineHeight: 1.08, letterSpacing: -1.5,
                color: th.text, marginBottom: 16,
                animation: "fadeUp 0.7s ease both",
              }}>
                {P.name}
              </h1>

              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "clamp(14px, 2vw, 18px)",
                color: th.accent, marginBottom: 24, height: 28,
                animation: "fadeUp 0.7s ease 0.1s both",
              }}>
                {typed}
                <span style={{ animation: "blink 1s infinite", opacity: 0.7 }}>|</span>
              </div>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(14px,1.2vw,17px)",
                lineHeight: 1.8, color: th.textMid,
                maxWidth: 660, marginBottom: 36,
                animation: "fadeUp 0.7s ease 0.2s both",
              }}>
                {P.summary}
              </p>

              {/* Focus areas */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40, animation: "fadeUp 0.7s ease 0.3s both" }}>
                {P.focus.map(f => (
                  <span key={f} style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 12.5, fontWeight: 500,
                    color: th.accent, background: th.accentLight, border: `1px solid ${th.accentMid}`,
                    padding: "6px 14px", borderRadius: 20,
                  }}>
                    {f}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "fadeUp 0.7s ease 0.4s both" }}>
                <a href="#projects" style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600,
                  color: th.btnText, background: th.btnBg, textDecoration: "none",
                  padding: "13px 28px", borderRadius: 10, boxShadow: th.btnShadow,
                  transition: "all 0.2s ease", display: "inline-flex", alignItems: "center", gap: 8,
                }}>
                  View Projects
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 13L13 3M13 3H7M13 3V9"/>
                  </svg>
                </a>
                <a href={`mailto:${P.email}`} style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600,
                  color: th.text, background: th.card, textDecoration: "none",
                  padding: "13px 28px", borderRadius: 10, border: `1px solid ${th.border}`,
                  boxShadow: th.shadow, transition: "all 0.2s ease",
                  display: "inline-flex", alignItems: "center", gap: 8,
                }}>
                  Contact Me
                </a>
              </div>

              {/* Stats row */}
              <div style={{ display: "flex", gap: 32, marginTop: 56, animation: "fadeUp 0.7s ease 0.5s both", flexWrap: "wrap" }}>
                {[
                  { num: "23+", label: "Projects Built" },
                  { num: "2", label: "Degrees" },
                  { num: "Tier 1", label: "Automotive Intern" },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 800, color: th.accent, lineHeight: 1 }}>
                      {s.num}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: th.textDim, marginTop: 4 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ────────────────────────────── */}
        <section id="projects" style={{ background: th.bgAlt, padding: "100px 24px" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <SecLabel th={th}>Projects</SecLabel>
            <SecTitle th={th} sub="A collection of security tools, enterprise systems, IoT builds, and lab work spanning internship, coursework, and personal projects.">
              What I've Built
            </SecTitle>

            {/* Filter tabs */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 40 }}>
              {tabs.map(t => (
                <button key={t} onClick={() => setFilterCat(t)} style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 600,
                  letterSpacing: 0.8, padding: "8px 16px", borderRadius: 8, cursor: "pointer",
                  background: filterCat === t ? th.accent : th.card,
                  color: filterCat === t ? "#fff" : th.textMid,
                  border: `1px solid ${filterCat === t ? th.accent : th.border}`,
                  boxShadow: filterCat === t ? th.btnShadow : th.shadow,
                  transition: "all 0.2s ease",
                }}>
                  {tabLabels[t]} {t !== "ALL" && <span style={{ opacity: 0.6 }}>({PROJECTS.filter(p => p.cat === t).length})</span>}
                </button>
              ))}
            </div>

            {/* Project grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
              {filtered.map((p, i) => (
                <ProjCard key={p.id} p={p} i={i} onClick={setModal} th={th} />
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ──────────────────────────── */}
        <section id="experience" style={{ padding: "100px 24px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <SecLabel th={th}>Experience</SecLabel>
            <SecTitle th={th} sub="Professional experience in automotive cybersecurity and operations.">
              Work History
            </SecTitle>
            <div style={{ position: "relative", paddingLeft: 4 }}>
              {EXP.map((e, i) => (
                <ExpItem key={i} e={e} i={i} isLast={i === EXP.length - 1} th={th} />
              ))}
            </div>
          </div>
        </section>

        {/* ── ACTIVITY ────────────────────────────── */}
        <section id="activity" style={{ background: th.bgAlt, padding: "100px 24px" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <SecLabel th={th}>Activity</SecLabel>
            <SecTitle th={th} sub="Development activity over the past year across all projects and repositories.">
              Development Activity
            </SecTitle>
            <div style={{
              background: th.card, border: `1px solid ${th.border}`,
              borderRadius: 16, padding: "28px 28px 24px", boxShadow: th.shadow,
            }}>
              <GitMap th={th} />
            </div>
          </div>
        </section>

        {/* ── EDUCATION ───────────────────────────── */}
        <section id="education" style={{ padding: "100px 24px" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <SecLabel th={th}>Education</SecLabel>
            <SecTitle th={th}>Academic Background</SecTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: 16, marginBottom: 48 }}>
              {EDU.map((e, i) => <EduItem key={i} e={e} i={i} th={th} />)}
            </div>
            <div style={{ marginBottom: 16 }}>
              <SecLabel th={th}>Certifications</SecLabel>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 12 }}>
              {CERTS.map((c, i) => <CertItem key={i} c={c} i={i} th={th} />)}
            </div>
          </div>
        </section>

        {/* ── SKILLS ──────────────────────────────── */}
        <section id="skills" style={{ background: th.bgAlt, padding: "100px 24px" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <SecLabel th={th}>Skills</SecLabel>
            <SecTitle th={th} sub="Technical tools and technologies I work with across security, development, and infrastructure.">
              Technical Skills
            </SecTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 36 }}>
              {SKILLS.map((s, i) => <SkillGroup key={i} s={s} i={i} th={th} />)}
            </div>
          </div>
        </section>

        {/* ── CONTACT ─────────────────────────────── */}
        <section id="contact" style={{ padding: "100px 24px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <SecLabel th={th}>Contact</SecLabel>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif", fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 900, color: th.text, letterSpacing: -0.8, marginBottom: 16, lineHeight: 1.15,
            }}>
              Let's Work Together
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: th.textMid, lineHeight: 1.75, marginBottom: 40 }}>
              I'm currently looking for internships, co-ops, and entry-level roles in cybersecurity, IoT security, or product security. Let's connect.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 48 }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 9,
                  fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600,
                  color: th.text, background: th.card,
                  border: `1px solid ${th.border}`, borderRadius: 10,
                  padding: "12px 22px", textDecoration: "none",
                  boxShadow: th.shadow, transition: "all 0.2s ease",
                }}>
                  <span style={{ color: th.accent }}>{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>

            <div style={{
              background: th.accentLight, border: `1px solid ${th.accentMid}`,
              borderRadius: 14, padding: "24px 28px",
              display: "inline-flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: th.green, animation: "blink 2s infinite" }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: th.accent, fontWeight: 600 }}>
                {P.location} · {P.email}
              </span>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────── */}
        <footer style={{
          borderTop: `1px solid ${th.border}`, padding: "28px 24px",
          background: th.bgAlt, textAlign: "center",
        }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: th.textDim, letterSpacing: 0.5 }}>
            © 2025 Micheal Wolski · Built with React + Vite · Deployed on GitHub Pages
          </p>
        </footer>

      </div>

      {/* Modal */}
      {modal && <Modal project={modal} onClose={() => setModal(null)} th={th} />}
    </>
  );
}
