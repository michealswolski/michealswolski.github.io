import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════
   THEMES — all values are complete, no partial strings
   ═══════════════════════════════════════════════ */
const T = {
  dark: {
    bg:"#060608", text:"#eee", textMid:"rgba(200,210,225,0.7)", textDim:"rgba(200,210,225,0.45)",
    textFaint:"rgba(200,210,225,0.25)", accent:"#b496ff", accentDim:"rgba(180,150,255,0.6)",
    mint:"#7affc1", surface:"rgba(255,255,255,0.03)", border:"rgba(255,255,255,0.04)",
    borderHov:"rgba(255,255,255,0.1)", particle:"160,170,190",
    cardBg:"rgba(255,255,255,0.02)", cardBgH:"rgba(255,255,255,0.05)",
    shimmer:"rgba(180,140,255,0.08)", shimmerH:"rgba(180,140,255,0.4)",
    impBg:"rgba(180,140,255,0.04)", impBorder:"rgba(180,150,255,0.1)", impDot:"rgba(180,150,255,0.7)", impText:"rgba(200,180,255,0.85)",
    tagBg:"rgba(255,255,255,0.03)", tagBorder:"rgba(255,255,255,0.05)", tagText:"rgba(200,210,225,0.65)",
    btnBg:"linear-gradient(135deg, rgba(180,140,255,0.8), rgba(100,180,255,0.6))",
    btnShadow:"0 0 30px rgba(180,140,255,0.15)",
    navBgFull:"rgba(6,6,8,0.92)", vigA:"rgba(6,6,8,0.4)", vigB:"rgba(6,6,8,0.92)",
    badgeEnt:"#7affc1", badgeGH:"#b496ff", badgeLab:"#64d8ff", badgeWork:"rgba(200,210,225,0.5)",
    filterAct:"rgba(180,150,255,0.08)", filterActBorder:"rgba(180,150,255,0.25)",
    isDark: true,
  },
  light: {
    bg:"#f5f5f8", text:"#1a1a2e", textMid:"rgba(30,30,60,0.7)", textDim:"rgba(30,30,60,0.45)",
    textFaint:"rgba(30,30,60,0.2)", accent:"#6c3dc8", accentDim:"rgba(100,60,200,0.5)",
    mint:"#10b981", surface:"rgba(0,0,0,0.03)", border:"rgba(0,0,0,0.06)",
    borderHov:"rgba(0,0,0,0.12)", particle:"80,60,140",
    cardBg:"rgba(255,255,255,0.7)", cardBgH:"rgba(255,255,255,0.9)",
    shimmer:"rgba(100,60,200,0.1)", shimmerH:"rgba(100,60,200,0.35)",
    impBg:"rgba(100,60,200,0.05)", impBorder:"rgba(100,60,200,0.12)", impDot:"rgba(100,60,200,0.6)", impText:"rgba(80,50,180,0.85)",
    tagBg:"rgba(0,0,0,0.04)", tagBorder:"rgba(0,0,0,0.06)", tagText:"rgba(30,30,60,0.6)",
    btnBg:"linear-gradient(135deg, rgba(100,60,200,0.85), rgba(60,140,220,0.7))",
    btnShadow:"0 0 30px rgba(100,60,200,0.12)",
    navBgFull:"rgba(245,245,248,0.92)", vigA:"rgba(245,245,248,0.4)", vigB:"rgba(245,245,248,0.92)",
    badgeEnt:"#10b981", badgeGH:"#6c3dc8", badgeLab:"#3b82f6", badgeWork:"rgba(30,30,60,0.4)",
    filterAct:"rgba(100,60,200,0.08)", filterActBorder:"rgba(100,60,200,0.25)",
    isDark: false,
  },
};

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */
const P = {
  name:"Micheal Wolski", title:"Cybersecurity Student & Product Security Intern",
  summary:"Cybersecurity student pursuing a B.S. in Information Assurance & Cyber Defense at Eastern Michigan University with hands-on internship experience at Robert Bosch supporting Ford and GM automotive programs. I build security tools, IoT embedded systems, enterprise dashboards, and hands-on lab environments\u2014combining academic coursework with real-world development and AI-assisted engineering.",
  location:"Woodhaven, MI", email:"michealswolski@gmail.com",
  focus:["Product Cybersecurity","IoT & Embedded Systems","Power Platform Development","Automotive Security","AI-Assisted Engineering"],
};
const EDU = [
  {degree:"B.S. Information Assurance & Cyber Defense",school:"Eastern Michigan University",status:"Expected 2026",loc:"Ypsilanti, MI",honors:""},
  {degree:"A.A.S. Cybersecurity",school:"Henry Ford College",status:"Graduated 2023",loc:"Dearborn, MI",honors:"GPA: 3.6 \u2022 Dean\u2019s List"},
];
const CERTS = [{name:"CompTIA A+",status:"In Progress"},{name:"CompTIA Security+",status:"Planned"},{name:"CCNA Badges",status:"Networking / Switching / Routing"},{name:"IT Help Desk Cert",status:"Completed"}];
const EXP = [
  {role:"Product Cybersecurity Intern",company:"Robert Bosch",period:"2025 \u2013 Present",type:"INTERNSHIP",
    points:["Support product cybersecurity across PS, VM, and EM divisions for Ford and GM programs","Built cross-divisional Power BI dashboard with SharePoint backend tracking HSM, SWDL, bootloader, SecOC configs","Developed LLM-based onboarding agent using prompt engineering","Participate in risk/RP meetings and cybersecurity fire drill planning","Created Power Apps intake forms and Power Automate workflows","Facilitate security awareness workshops and training sessions"]},
  {role:"Warehouse Team Member",company:"Amazon",period:"2022 \u2013 Present",type:"WORK",
    points:["Operated material handling equipment safely while maintaining accuracy and productivity standards"]},
  {role:"Summer Intern \u2014 Data Entry",company:"Ascent Global Logistics",period:"Jun \u201921 \u2013 Aug \u201921",type:"INTERNSHIP",
    points:["Supported logistics operations by contacting vendors, maintaining system records, and providing technical support"]},
];
const PROJECTS = [
  // ─── INTERNSHIP (Bosch) ───
  {id:"BSH-001",title:"Cross-Divisional Project Dashboard",sub:"Power BI Analytics \u2014 Bosch Internship",desc:"Comprehensive project tracking dashboard in Power BI for Bosch\u2019s global divisions (VM, PS, XC, EM, 2WP). Custom themes, cross-divisional filtering, drill-through reporting for security configurations.",tags:["Power BI","DAX","SharePoint","Power Query"],cat:"INTERNSHIP",domain:"Analytics",impact:"Unified tracking across 5 Bosch divisions for Ford/GM",details:"Built from scratch during my internship to solve fragmented project tracking. Pulls data from SharePoint via Power Query, transforms with DAX measures, custom dark-themed UI matching Bosch branding. Drill-through pages per division, KPI cards with conditional formatting, automated refresh schedules."},
  {id:"BSH-002",title:"Cross-Divisional Project Database",sub:"Power Apps Canvas App \u2014 Bosch Internship",desc:"Canvas App with dark futuristic UI, wizard workflows, admin dashboards, and ticketing system. Hardened .msapp packages for cross-tenant deployment.",tags:["Power Apps","Power Automate","SharePoint","ALM"],cat:"INTERNSHIP",domain:"Enterprise Apps",impact:"Cross-tenant deployment across Bosch global",details:"Multi-step wizard for project intake, role-based admin dashboards, integrated ticketing system. Troubleshot PAC CLI compatibility and built hardened .msapp packages for cross-tenant deployment."},
  {id:"BSH-003",title:"LLM-Based Onboarding Agent",sub:"AI-Powered Team Onboarding \u2014 Bosch Internship",desc:"AI-powered onboarding assistant using prompt engineering and LLM integration to streamline cybersecurity team onboarding and reduce ramp-up time.",tags:["Prompt Engineering","LLM","AI","Automation"],cat:"INTERNSHIP",domain:"AI Enablement",impact:"Streamlined cybersecurity team onboarding with AI",details:"Internal AI agent helping new team members get up to speed on cybersecurity processes. Uses carefully crafted system prompts to answer procedural questions and reduce onboarding friction."},
  // ─── COURSEWORK ───
  {id:"CW-001",title:"OBD-II Diagnostic Scanner",sub:"IoT & Embedded Systems Course \u2014 EMU",desc:"Designing and building an OBD-II vehicle diagnostic scanner as part of an IoT embedded systems course. Involves hardware interfacing, protocol communication, and real-time data acquisition from vehicle ECUs.",tags:["IoT","Embedded Systems","OBD-II","Hardware","Protocols"],cat:"COURSEWORK",domain:"IoT / Automotive",impact:"Hands-on embedded systems project bridging IoT and automotive diagnostics",details:"Currently developing an OBD-II scanner for my IoT and Embedded Systems class at EMU. The project involves working with hardware interfaces to communicate with vehicle ECUs, reading diagnostic trouble codes, and displaying real-time sensor data. Combines my interest in automotive systems with embedded programming and protocol-level communication."},
  {id:"CW-002",title:"PKI & Certificate Authority Research",sub:"Cybersecurity Coursework \u2014 EMU",desc:"Research project analyzing PKI infrastructure vulnerabilities, certificate authority trust models, and real-world CA compromise case studies. Produced deliverable report for internship application.",tags:["PKI","Certificate Authority","Research","Cryptography"],cat:"COURSEWORK",domain:"Cryptography",impact:"Research deliverable submitted as internship work sample",details:"Deep-dive research into how PKI infrastructure works, common vulnerability patterns in certificate authority implementations, and analysis of notable CA compromises. Produced a comprehensive report that I used as a deliverable for my Bosch internship."},
  {id:"CW-003",title:"Secure Boot & Hardware Security Research",sub:"IECS Embedded Security \u2014 EMU",desc:"Researching secure boot implementations in embedded and automotive systems, covering hardware-level security mechanisms, trusted platform modules, and boot attestation for connected vehicles.",tags:["Secure Boot","TPM","Embedded Security","MISRA C","Automotive"],cat:"COURSEWORK",domain:"Embedded Security",impact:"Exploring hardware-level trust chains for automotive ECU security",details:"Academic research exploring how secure boot is implemented in embedded automotive systems. Covering TPM integration, chain-of-trust verification, remote attestation, MISRA C coding standards for safety-critical systems, and how these concepts apply to real-world vehicle ECU security."},
  // ─── PERSONAL / HOME ───
  {id:"HOME-001",title:"MeshLink",sub:"Encrypted BLE Mesh Messaging \u2014 iOS App",desc:"Native iOS app built in Swift/SwiftUI with CoreBluetooth for encrypted peer-to-peer messaging over Bluetooth Low Energy mesh networks. Features AES-256-GCM encryption, NFC key sharing, QR exchange, and multi-hop relay.",tags:["Swift","SwiftUI","CoreBluetooth","AES-256-GCM","NFC"],cat:"HOME",domain:"iOS Development",impact:"End-to-end encrypted BLE mesh communication app for iOS",details:"Built a native iOS app from scratch using Swift and SwiftUI. Uses CoreBluetooth for BLE mesh networking where messages hop between devices. AES-256-GCM encryption with keys exchanged via NFC tap or QR code scan. Features account management, chat sessions, peer nicknames, auto-reconnect, and debug logging."},
  {id:"HOME-002",title:"Depass Grading & Landscaping",sub:"Business Website \u2014 React + EmailJS",desc:"Full-featured business website for a real landscaping client in Rock Hill, SC. Includes service pages, portfolio gallery, contact forms with EmailJS integration, admin dashboard, and SEO optimization.",tags:["React","EmailJS","SEO","Responsive Design","Business"],cat:"HOME",domain:"Web Development",impact:"Live client website with lead generation and admin portal",details:"Built a complete business website for a real client. Features include a public-facing site with services, portfolio, testimonials, and FAQ sections, plus a private admin dashboard for managing leads and orders. Contact form uses EmailJS for instant email notifications. SEO-optimized with JSON-LD schema markup."},
  {id:"HOME-003",title:"S650 Mustang Mod Tracker",sub:"Vehicle Build Management App \u2014 React",desc:"Interactive build management app for tracking vehicle modifications, maintenance schedules, and budgets. Features onboarding wizard, mod templates, cost tracking, and progress visualization.",tags:["React","Vehicle Mods","Budget Tracking","Responsive"],cat:"HOME",domain:"Automotive",impact:"Personal tool for managing my S650 Mustang build",details:"Built to track modifications on my 2024+ Ford Mustang S650. Onboarding wizard for vehicle setup, pre-loaded mod template library, maintenance tracking with mileage-based reminders, budget dashboard with cost breakdowns, and progress rings showing build completion percentage."},
  {id:"HOME-004",title:"Ford ECU Modification Detector",sub:"Raspberry Pi Forensic Scanner \u2014 Python/Flask",desc:"Forensic analysis tool running on Raspberry Pi that reads vehicle ECU data via OBD-II, scores modification likelihood using behavioral analysis, and displays results through a web dashboard with GPIO LED indicators.",tags:["Python","Flask","Raspberry Pi","OBD-II","Forensics"],cat:"HOME",domain:"Automotive Security",impact:"Prototype tool for detecting ECU tampering in Ford vehicles",details:"A Raspberry Pi-based prototype that connects to a vehicle\u2019s OBD-II port and reads ECU data including calibration IDs, flash counters, fuel trim values, and timing data. Uses a scoring algorithm based on Ford service data patterns to determine modification likelihood. Web dashboard shows results with a forensic confidence score, and GPIO-connected LEDs provide physical status indication."},
  // ─── GITHUB ───
  {id:"GH-001",title:"Wolski Command Center",sub:"Raspberry Pi Dashboard \u2014 React + Node",desc:"Full-stack Raspberry Pi dashboard with system monitoring, AI agent automation, file management, health diagnostics, and one-click Windows deployment.",tags:["React","Node.js","Raspberry Pi","PowerShell"],cat:"GITHUB",domain:"Full-Stack Dev",impact:"Complete IoT dashboard with one-click deployment",details:"Centralized home lab command center. React frontend communicates with Node.js backend on the Pi for real-time CPU/memory/disk metrics, file management, and AI agent tasks. PowerShell deployment script handles entire setup with a single click."},
  {id:"GH-002",title:"AgentForge",sub:"AI Agent Platform \u2014 Electron Desktop App",desc:"Cross-platform Electron + Vite + React app with 10 messaging channels, 17 app connectors, skills marketplace, persistent memory, native installers.",tags:["Electron","React","Vite","Node.js"],cat:"GITHUB",domain:"AI & Automation",impact:"Full desktop app with native installers across 3 platforms",details:"AI agent hub with Discord, Slack, Telegram integrations, skill marketplace, persistent memory system, and voice mode. Distributed as .exe, .dmg, and .AppImage installers."},
  {id:"GH-003",title:"Network Utility Tool v6.0",sub:"Professional Edition \u2014 PowerShell",desc:"Comprehensive network utility for Windows 10/11: DNS speed testing, adapter optimizations, bufferbloat testing, gaming latency optimization, DFIR tools.",tags:["PowerShell","Networking","DNS","DFIR"],cat:"GITHUB",domain:"Network Security",impact:"15+ network tools in a single professional script",details:"DNS benchmarking across 10+ providers, adapter-specific optimizations, Nagle algorithm toggling, DFIR tools, WiFi password recovery, profile system for Home/Work/Gaming configs. Every change reversible."},
  {id:"GH-004",title:"GamePrep Pro",sub:"Windows 11 Optimization \u2014 Python/PyQt6",desc:"System optimization for competitive gaming. Process Lasso configs for i7-14700K P/E-core affinity, network tweaks, driver management. All reversible.",tags:["Python","PyQt6","Process Lasso","Windows 11"],cat:"GITHUB",domain:"System Engineering",impact:"Reversible optimizations with safety-first design",details:"Pins games to P-cores via Process Lasso while relegating background tasks to E-cores. Network buffer optimization, driver cleanup, controller polling rate maximization, anti-cheat compatibility checks."},
  // ─── LABS ───
  {id:"LAB-001",title:"Home Lab Vulnerability Management",sub:"Nessus + Nmap + pfSense",desc:"Full vulnerability management lifecycle: Nessus scans, CVSS prioritization, patching, pfSense enforcement, re-scan validation.",tags:["Nessus","Nmap","pfSense","VirtualBox"],cat:"LAB",domain:"Vuln Management",impact:"Full detect \u2192 analyze \u2192 remediate \u2192 validate lifecycle",details:"Multi-VM business network simulation. Nessus baseline scans, CVSS prioritization, patches applied, pfSense rules enforced, then re-scanned to confirm reduced attack surface with before/after documentation."},
  {id:"LAB-002",title:"Network Traffic Analysis",sub:"Wireshark Deep Packet Inspection",desc:"Captured live packet traffic in isolated lab. Analyzed TCP handshakes, DNS queries, HTTP sessions. Identified abnormal outbound traffic.",tags:["Wireshark","Kali Linux","tcpdump","TCP/IP"],cat:"LAB",domain:"Network Forensics",impact:"Protocol-level anomaly detection and stream reconstruction",details:"Isolated VM network with full traffic capture. TCP handshake analysis, DNS tunneling checks, HTTP stream extraction, and suspicious outbound connection identification from compromised VM."},
  {id:"LAB-003",title:"Splunk SIEM Lab",sub:"Dashboards, Alerts & Detection Tuning",desc:"Splunk for centralized log ingestion. SPL queries, dashboard panels, spike-based alerts, threshold tuning.",tags:["Splunk","SPL","SIEM","Log Analysis"],cat:"LAB",domain:"SIEM & Detection",impact:"Full SIEM workflow: ingest \u2192 search \u2192 visualize \u2192 alert",details:"Splunk Enterprise with Windows Event Logs and Linux syslog inputs. SPL queries for brute-force detection, trend dashboards, spike alerts, iterative threshold tuning."},
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
const HEATMAP=(()=>{const d=[];const now=Date.now();for(let i=364;i>=0;i--){const date=new Date(now-i*86400000);const day=date.getDay();const r=Math.random();let l=0;if(r>0.55)l=1;if(r>0.72)l=2;if(r>0.85)l=3;if(r>0.93)l=4;if((day===0||day===6)&&r<0.4)l=0;d.push({date:date.toISOString().slice(0,10),level:l});}return d;})();

/* ═══════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════ */
function useReveal(thr){const r=useRef(null);const[v,setV]=useState(false);useEffect(()=>{const el=r.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);obs.disconnect();}},{threshold:thr||0.1});obs.observe(el);return()=>obs.disconnect();},[thr]);return[r,v];}
function useTypewriter(texts){const[display,setDisplay]=useState("");const[idx,setIdx]=useState(0);const[ci,setCi]=useState(0);const[del,setDel]=useState(false);const[pause,setPause]=useState(false);useEffect(()=>{if(!texts||!texts.length)return;if(pause){const t=setTimeout(()=>{setPause(false);setDel(true);},2000);return()=>clearTimeout(t);}const cur=texts[idx]||"";const t=setTimeout(()=>{if(!del){setDisplay(cur.slice(0,ci+1));if(ci+1>=cur.length)setPause(true);else setCi(ci+1);}else{setDisplay(cur.slice(0,ci));if(ci<=0){setDel(false);setIdx((idx+1)%texts.length);}else setCi(ci-1);}},del?18:42);return()=>clearTimeout(t);},[ci,del,pause,idx,texts]);return display;}
function useMag(s){const ref=useRef(null);const[st,setSt]=useState({});useEffect(()=>{const el=ref.current;if(!el)return;const str=s||0.3;const mv=(e)=>{const r=el.getBoundingClientRect();const x=e.clientX-r.left-r.width/2;const y=e.clientY-r.top-r.height/2;setSt({transform:`translate(${x*str}px,${y*str}px)`,transition:"transform 0.15s ease"});};const lv=()=>setSt({transform:"translate(0,0)",transition:"transform 0.4s cubic-bezier(.22,1,.36,1)"});el.addEventListener("mousemove",mv);el.addEventListener("mouseleave",lv);return()=>{el.removeEventListener("mousemove",mv);el.removeEventListener("mouseleave",lv);};},[s]);return[ref,st];}

/* ═══════════════════════════════════════════════
   BOOT SEQUENCE
   ═══════════════════════════════════════════════ */
function Boot({onDone}){
  const[lines,setLines]=useState([]);const[fade,setFade]=useState(false);const[gone,setGone]=useState(false);
  const bl=[{t:"[SYS] Initializing secure environment...",d:0},{t:"[NET] Scanning network interfaces... 2 found",d:300},{t:"[SEC] Loading NIST CSF modules...",d:500},{t:"[SEC] Loading MITRE ATT&CK mappings... OK",d:700},{t:"[AUTH] Verifying credentials... AUTHORIZED",d:1000},{t:"[SYS] Mounting /home/wolski/portfolio...",d:1200},{t:"[GPU] Rendering liquid chrome pipeline... OK",d:1500},{t:"[SYS] All systems operational. Welcome, Micheal.",d:1800}];
  useEffect(()=>{const ts=bl.map((l,i)=>setTimeout(()=>{setLines(p=>[...p,l.t]);if(i===bl.length-1){setTimeout(()=>setFade(true),500);setTimeout(()=>{setGone(true);onDone();},1300);}},l.d));return()=>ts.forEach(clearTimeout);},[]);
  if(gone)return null;
  return(<div style={{position:"fixed",inset:0,zIndex:9999,background:"#060608",display:"flex",alignItems:"center",justifyContent:"center",opacity:fade?0:1,transition:"opacity 0.8s ease"}}><div style={{maxWidth:600,padding:"0 24px",width:"100%"}}><div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,marginBottom:20,color:"rgba(180,150,255,0.5)",letterSpacing:3}}>WOLSKI SECURITY SYSTEMS v2.0</div>{lines.map((l,i)=>(<div key={i} style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:12.5,color:l.includes("AUTHORIZED")||l.includes("Welcome")?"rgba(122,255,193,0.9)":l.includes("OK")?"rgba(122,255,193,0.7)":"rgba(200,210,225,0.6)",marginBottom:6,animation:"fi 0.3s ease forwards"}}>{l}</div>))}<div style={{width:"100%",height:2,background:"rgba(255,255,255,0.05)",borderRadius:1,marginTop:20,overflow:"hidden"}}><div style={{height:"100%",background:"linear-gradient(90deg, rgba(180,140,255,0.6), rgba(100,220,255,0.5))",width:(lines.length/bl.length*100)+"%",transition:"width 0.3s ease"}}/></div></div></div>);
}

/* ═══════════════════════════════════════════════
   CANVAS
   ═══════════════════════════════════════════════ */
function Chrome({isDark}){
  const ref=useRef(null);const anim=useRef(null);const mouse=useRef({x:-9999,y:-9999});
  const init=useCallback(()=>{const c=ref.current;if(!c)return;const ctx=c.getContext("2d");const dpr=Math.min(window.devicePixelRatio||1,2);const W=window.innerWidth,H=window.innerHeight;c.width=W*dpr;c.height=H*dpr;c.style.width=W+"px";c.style.height=H+"px";ctx.scale(dpr,dpr);
    const blobs=Array.from({length:5},(_,i)=>({x:W*(0.2+Math.random()*0.6),y:H*(0.3+Math.random()*0.5),r:90+Math.random()*110,vx:(Math.random()-0.5)*0.35,vy:(Math.random()-0.5)*0.25,ph:Math.random()*Math.PI*2,hue:[200,280,340,30,180][i]}));
    const pts=Array.from({length:Math.floor((W*H)/32000)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-0.5)*0.08,vy:(Math.random()-0.5)*0.08,s:Math.random()*1.1+0.3,p:Math.random()*Math.PI*2}));
    const pc=isDark?"160,170,190":"80,60,140";const al=isDark?1:0.4;
    const draw=(t)=>{ctx.clearRect(0,0,W,H);const mx=mouse.current.x,my=mouse.current.y;const ti=t*0.001;
      for(const b of blobs){b.ph+=0.003;b.x+=b.vx+Math.sin(ti*0.5+b.ph)*0.3;b.y+=b.vy+Math.cos(ti*0.4+b.ph)*0.2;if(b.x<-80||b.x>W+80)b.vx*=-1;if(b.y<-80||b.y>H+80)b.vy*=-1;b.x=Math.max(-100,Math.min(W+100,b.x));b.y=Math.max(-100,Math.min(H+100,b.y));const dm=Math.hypot(b.x-mx,b.y-my);if(dm<300&&dm>1){b.x+=(mx-b.x)*0.002;b.y+=(my-b.y)*0.002;}const radius=b.r*(1+Math.sin(ti+b.ph)*0.15);const hue=b.hue+Math.sin(ti*0.3+b.ph)*40;const g=ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,radius);g.addColorStop(0,`hsla(${hue},80%,60%,${0.06*al})`);g.addColorStop(0.5,`hsla(${hue+30},70%,50%,${0.025*al})`);g.addColorStop(1,"transparent");ctx.beginPath();ctx.arc(b.x,b.y,radius,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();}
      for(let i=0;i<pts.length;i++){const p=pts[i];p.x+=p.vx;p.y+=p.vy;p.p+=0.005;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;const dm=Math.hypot(p.x-mx,p.y-my);const gw=dm<140?1-dm/140:0;for(let j=i+1;j<pts.length;j++){const q=pts[j];const d=Math.hypot(p.x-q.x,p.y-q.y);if(d<75){const a=(1-d/75)*(0.035+gw*0.06)*al;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(${pc},${a})`;ctx.lineWidth=0.4;ctx.stroke();}}const sz=p.s+Math.sin(p.p)*0.2+gw*2;ctx.beginPath();ctx.arc(p.x,p.y,sz,0,Math.PI*2);ctx.fillStyle=`rgba(${pc},${(0.12+gw*0.4)*al})`;ctx.fill();}
      anim.current=requestAnimationFrame(draw);};anim.current=requestAnimationFrame(draw);},[isDark]);
  useEffect(()=>{init();const r=()=>{cancelAnimationFrame(anim.current);init();};const m=(e)=>{mouse.current={x:e.clientX,y:e.clientY};};window.addEventListener("resize",r);window.addEventListener("mousemove",m);return()=>{cancelAnimationFrame(anim.current);window.removeEventListener("resize",r);window.removeEventListener("mousemove",m);};},[init]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}/>;
}

/* ═══════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════ */
function Modal({project:p,onClose,th}){
  useEffect(()=>{const fn=(e)=>{if(e.key==="Escape")onClose();};window.addEventListener("keydown",fn);return()=>window.removeEventListener("keydown",fn);},[onClose]);
  if(!p)return null;
  return(<div onClick={onClose} style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"fi 0.25s ease"}}><div onClick={e=>e.stopPropagation()} style={{maxWidth:640,width:"100%",maxHeight:"80vh",overflowY:"auto",background:th.cardBg,backdropFilter:"blur(24px)",border:"1px solid "+th.borderHov,borderRadius:18,padding:"36px 32px",boxShadow:"0 40px 100px rgba(0,0,0,0.5)"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
      <div><span style={{fontFamily:"var(--m)",fontSize:10,color:th.textDim,letterSpacing:1.5}}>{p.id} {"\u2022"} {p.domain}</span><h2 style={{fontFamily:"var(--h)",fontSize:24,fontWeight:800,color:th.text,margin:"6px 0 2px"}}>{p.title}</h2><p style={{fontFamily:"var(--m)",fontSize:12,color:th.accent}}>{p.sub}</p></div>
      <button onClick={onClose} style={{background:"none",border:"1px solid "+th.border,borderRadius:8,width:36,height:36,cursor:"pointer",color:th.textDim,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>{"\u00D7"}</button>
    </div>
    <div style={{background:th.impBg,border:"1px solid "+th.impBorder,borderRadius:8,padding:"10px 14px",margin:"16px 0",display:"flex",alignItems:"center",gap:8}}><div style={{width:6,height:6,borderRadius:"50%",background:th.impDot,flexShrink:0}}/><span style={{fontFamily:"var(--b)",fontSize:13,color:th.impText,fontWeight:600}}>{p.impact}</span></div>
    <p style={{fontFamily:"var(--b)",fontSize:14,lineHeight:1.8,color:th.textMid,margin:"20px 0"}}>{p.details||p.desc}</p>
    <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{p.tags.map(t=><span key={t} style={{fontFamily:"var(--m)",fontSize:10.5,color:th.tagText,background:th.tagBg,border:"1px solid "+th.tagBorder,padding:"5px 12px",borderRadius:5}}>{t}</span>)}</div>
  </div></div>);
}

/* ═══════════════════════════════════════════════
   ITEM COMPONENTS (hooks at top level, never in maps)
   ═══════════════════════════════════════════════ */
function SL({children,th}){const[r,v]=useReveal();return<div ref={r} style={{opacity:v?1:0,transform:v?"none":"translateX(-12px)",transition:"all 0.6s cubic-bezier(.22,1,.36,1)",display:"inline-flex",alignItems:"center",gap:12,marginBottom:14}}><div style={{width:28,height:2,background:"linear-gradient(90deg,"+th.accent+",transparent)",borderRadius:1}}/><span style={{fontFamily:"var(--m)",fontSize:10.5,color:th.accent,letterSpacing:3.5,textTransform:"uppercase",fontWeight:700}}>{children}</span></div>;}
function ST({children,sub,th}){const[r,v]=useReveal();return<div ref={r} style={{marginBottom:48,opacity:v?1:0,transform:v?"none":"translateY(16px)",transition:"all 0.8s cubic-bezier(.22,1,.36,1) 0.1s"}}><h2 style={{fontFamily:"var(--h)",fontSize:"clamp(24px,3.5vw,38px)",fontWeight:800,color:th.text,margin:0,letterSpacing:-0.7,lineHeight:1.12}}>{children}</h2>{sub&&<p style={{fontFamily:"var(--b)",fontSize:14.5,color:th.textMid,marginTop:12,maxWidth:580,lineHeight:1.75}}>{sub}</p>}</div>;}

function BadgeEl({t,th}){const c={INTERNSHIP:th.badgeEnt,COURSEWORK:"#fbbf24",HOME:"#f472b6",GITHUB:th.badgeGH,LAB:th.badgeLab,WORK:th.badgeWork}[t]||th.accent;return<span style={{fontFamily:"var(--m)",fontSize:8.5,fontWeight:700,letterSpacing:1.8,color:c,padding:"3px 9px",borderRadius:4,border:"1px solid "+c,opacity:0.7}}>{t}</span>;}

function ProjCard({p,i,onClick,th}){const[h,setH]=useState(false);const[r,v]=useReveal();const[mR,mS]=useMag(0.06);
  return(<div ref={el=>{r.current=el;mR.current=el;}} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={()=>onClick(p)}
    style={{...mS,position:"relative",overflow:"hidden",borderRadius:14,cursor:"pointer",background:h?th.cardBgH:th.cardBg,backdropFilter:"blur(20px)",border:"1px solid "+(h?th.borderHov:th.border),boxShadow:h?"0 20px 60px rgba(0,0,0,0.35)":"0 4px 24px rgba(0,0,0,0.15)",transition:"all 0.45s cubic-bezier(.22,1,.36,1) "+(i*40)+"ms, transform 0.15s ease",opacity:v?1:0,marginTop:v?0:30}}>
    <div style={{height:2,background:h?"linear-gradient(90deg, transparent, "+th.shimmerH+" 20%, rgba(100,220,255,0.4) 50%, rgba(255,180,100,0.3) 80%, transparent)":"linear-gradient(90deg, transparent, "+th.shimmer+" 20%, transparent)",transition:"all 0.5s ease"}}/>
    <div style={{padding:"22px 24px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:6}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}><span style={{fontFamily:"var(--m)",fontSize:10,color:th.textDim,letterSpacing:1.5,fontWeight:600}}>{p.id}</span><span style={{color:th.textFaint}}>|</span><span style={{fontFamily:"var(--m)",fontSize:9.5,color:th.textDim}}>{p.domain}</span></div>
        <BadgeEl t={p.cat} th={th}/>
      </div>
      <h3 style={{fontFamily:"var(--h)",fontSize:17,fontWeight:800,color:th.text,margin:"0 0 2px"}}>{p.title}</h3>
      <p style={{fontFamily:"var(--m)",fontSize:10.5,color:th.accent,margin:"0 0 11px"}}>{p.sub}</p>
      <p style={{fontFamily:"var(--b)",fontSize:13,lineHeight:1.72,color:th.textMid,margin:"0 0 14px"}}>{p.desc}</p>
      <div style={{background:th.impBg,border:"1px solid "+th.impBorder,borderRadius:7,padding:"8px 12px",marginBottom:14,display:"flex",alignItems:"center",gap:7}}><div style={{width:5,height:5,borderRadius:"50%",background:th.impDot,flexShrink:0}}/><span style={{fontFamily:"var(--b)",fontSize:11.5,color:th.impText,fontWeight:600}}>{p.impact}</span></div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{p.tags.map(t=><span key={t} style={{fontFamily:"var(--m)",fontSize:9.5,color:th.tagText,background:th.tagBg,border:"1px solid "+th.tagBorder,padding:"3px 9px",borderRadius:4}}>{t}</span>)}</div>
      <div style={{fontFamily:"var(--m)",fontSize:9,color:th.textFaint,marginTop:12,letterSpacing:1.5,textAlign:"right"}}>CLICK FOR DETAILS {"\u2192"}</div>
    </div>
  </div>);
}

function TLItem({e,i,isLast,th}){const[r,v]=useReveal();
  return(<div ref={r} style={{position:"relative",paddingLeft:48,paddingBottom:isLast?0:40,opacity:v?1:0,transform:v?"none":"translateX(-20px)",transition:"all 0.7s cubic-bezier(.22,1,.36,1) "+(i*150)+"ms"}}>
    <div style={{position:"absolute",left:9,top:6,width:16,height:16,borderRadius:"50%",border:"2px solid "+th.accent,background:i===0?th.accent:th.bg,boxShadow:i===0?"0 0 16px "+th.accent:"none"}}/>
    <div style={{background:th.cardBg,backdropFilter:"blur(16px)",border:"1px solid "+th.border,borderRadius:12,padding:"22px 24px",boxShadow:"0 4px 20px rgba(0,0,0,0.15)"}}>
      <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:8}}>
        <div><h4 style={{fontFamily:"var(--h)",fontSize:16,fontWeight:700,color:th.text,margin:0}}>{e.role}</h4><p style={{fontFamily:"var(--m)",fontSize:12,color:th.accent,margin:"3px 0 0",fontWeight:600}}>{e.company}</p></div>
        <span style={{fontFamily:"var(--m)",fontSize:10,color:th.textDim,letterSpacing:1}}>{e.period}</span>
      </div>
      <ul style={{listStyle:"none",padding:0,margin:0}}>{e.points.map((p,j)=><li key={j} style={{fontFamily:"var(--b)",fontSize:13,color:th.textMid,lineHeight:1.7,marginBottom:3,paddingLeft:13,position:"relative"}}><span style={{position:"absolute",left:0,color:th.textDim}}>{"\u203A"}</span>{p}</li>)}</ul>
    </div>
  </div>);
}

function EduItem({e,i,th}){const[r,v]=useReveal();return<div ref={r} style={{background:th.cardBg,backdropFilter:"blur(16px)",border:"1px solid "+th.border,borderRadius:10,padding:"20px 22px",opacity:v?1:0,transform:v?"none":"translateY(18px)",transition:"all 0.6s cubic-bezier(.22,1,.36,1) "+(i*100)+"ms"}}><div style={{fontFamily:"var(--h)",fontSize:15,fontWeight:700,color:th.text,marginBottom:3}}>{e.degree}</div><div style={{fontFamily:"var(--b)",fontSize:13,color:th.accent,fontWeight:600,marginBottom:2}}>{e.school}</div><div style={{fontFamily:"var(--m)",fontSize:10.5,color:th.textDim}}>{e.status} {"\u2022"} {e.loc}</div>{e.honors&&<div style={{fontFamily:"var(--m)",fontSize:10,color:th.mint,marginTop:6}}>{e.honors}</div>}</div>;}
function CertItem({c,i,th}){const[r,v]=useReveal();const cl=c.status==="Completed"?th.mint:c.status.includes("Progress")?"#fbbf24":th.textDim;return<div ref={r} style={{background:th.cardBg,backdropFilter:"blur(12px)",border:"1px solid "+th.border,borderRadius:8,padding:"14px 18px",textAlign:"center",opacity:v?1:0,transform:v?"scale(1)":"scale(0.92)",transition:"all 0.5s cubic-bezier(.22,1,.36,1) "+(i*60)+"ms"}}><div style={{fontFamily:"var(--h)",fontSize:13.5,fontWeight:700,color:th.text}}>{c.name}</div><div style={{fontFamily:"var(--m)",fontSize:8.5,color:cl,letterSpacing:1.2,marginTop:4,textTransform:"uppercase"}}>{c.status}</div></div>;}
function SkillGrp({s,i,th}){const[r,v]=useReveal();return<div ref={r} style={{opacity:v?1:0,transform:v?"none":"translateY(18px)",transition:"all 0.6s cubic-bezier(.22,1,.36,1) "+(i*80)+"ms"}}><h4 style={{fontFamily:"var(--m)",fontSize:10,color:th.accent,letterSpacing:2.5,textTransform:"uppercase",marginBottom:12,fontWeight:700}}>{s.cat}</h4><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{s.items.map(it=><span key={it} style={{fontFamily:"var(--b)",fontSize:12,color:th.textMid,background:th.tagBg,border:"1px solid "+th.tagBorder,padding:"6px 12px",borderRadius:6}}>{it}</span>)}</div></div>;}
function CLink({link,th}){const[mR,mS]=useMag(0.1);return<a ref={mR} href={link.href} target={link.href.startsWith("http")?"_blank":undefined} rel={link.href.startsWith("http")?"noopener noreferrer":undefined} download={link.isResume?"Micheal_Wolski_Resume.pdf":undefined} style={{...mS,fontFamily:"var(--m)",fontSize:11,fontWeight:600,color:link.isResume?"#fff":th.textMid,textDecoration:"none",padding:"12px 22px",borderRadius:7,background:link.isResume?th.btnBg:th.surface,border:link.isResume?"none":"1px solid "+th.border,backdropFilter:"blur(16px)",display:"inline-flex",alignItems:"center",gap:8,letterSpacing:0.8,transition:"all 0.3s ease",boxShadow:link.isResume?th.btnShadow:"none"}} onMouseEnter={e=>{if(!link.isResume){e.currentTarget.style.borderColor=th.accentDim;e.currentTarget.style.color=th.accent;}}} onMouseLeave={e=>{if(!link.isResume){e.currentTarget.style.borderColor=th.border;e.currentTarget.style.color=th.textMid;}}}><svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d={link.isResume?"M6 1V8M6 8L3 5.5M6 8L9 5.5M2 10H10":"M3 9L9 3M9 3H5M9 3V7"} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{link.label}</a>;}
function GitMap({th}){const[r,v]=useReveal();const weeks=[];for(let i=0;i<HEATMAP.length;i+=7)weeks.push(HEATMAP.slice(i,i+7));const cs=th.isDark?["rgba(255,255,255,0.04)","rgba(180,150,255,0.15)","rgba(180,150,255,0.3)","rgba(180,150,255,0.5)","rgba(180,150,255,0.75)"]:["rgba(0,0,0,0.04)","rgba(100,60,200,0.12)","rgba(100,60,200,0.25)","rgba(100,60,200,0.4)","rgba(100,60,200,0.6)"];const total=HEATMAP.reduce((s,d)=>s+d.level,0);
  return<div ref={r} style={{opacity:v?1:0,transform:v?"none":"translateY(20px)",transition:"all 0.8s cubic-bezier(.22,1,.36,1)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}><span style={{fontFamily:"var(--m)",fontSize:11,color:th.textMid,fontWeight:600}}>{total} contributions in the last year</span><div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontFamily:"var(--m)",fontSize:9,color:th.textDim}}>Less</span>{cs.map((c,i)=><div key={i} style={{width:10,height:10,borderRadius:2,background:c}}/>)}<span style={{fontFamily:"var(--m)",fontSize:9,color:th.textDim}}>More</span></div></div><div style={{display:"flex",gap:3,overflowX:"auto",paddingBottom:8}}>{weeks.map((wk,wi)=><div key={wi} style={{display:"flex",flexDirection:"column",gap:3}}>{wk.map((d,di)=><div key={di} title={d.date+": "+d.level} style={{width:11,height:11,borderRadius:2,background:cs[d.level],opacity:v?1:0,transition:"opacity 0.3s ease "+(wi*7+di)*2+"ms"}}/>)}</div>)}</div></div>;}

/* ═══════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════ */
export default function App(){
  const[booted,setBooted]=useState(false);const[loaded,setLoaded]=useState(false);const[scrollY,setScrollY]=useState(0);
  const[tab,setTab]=useState("ALL");const[dark,setDark]=useState(true);const[modal,setModal]=useState(null);
  const[mR1,mS1]=useMag(0.12);const[mR2,mS2]=useMag(0.12);
  const th=dark?T.dark:T.light;const typed=useTypewriter(P.focus);
  useEffect(()=>{if(booted)setTimeout(()=>setLoaded(true),100);},[booted]);
  useEffect(()=>{const fn=()=>setScrollY(window.scrollY);window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn);},[]);
  const tabs=["ALL","INTERNSHIP","COURSEWORK","HOME","GITHUB","LAB"];const tl={ALL:"All",INTERNSHIP:"Internship",COURSEWORK:"Coursework",HOME:"Personal",GITHUB:"GitHub",LAB:"Labs"};
  const filtered=tab==="ALL"?PROJECTS:PROJECTS.filter(p=>p.cat===tab);
  const navO=Math.min(scrollY/120,0.92);const px=scrollY*0.04;
  const cls=[{label:"GitHub",href:"#"},{label:"LinkedIn",href:"https://linkedin.com/in/michealwolski"},{label:"Email",href:"mailto:"+P.email},{label:"Download Resume",href:"#",isResume:true}];
  const secs=["About","Projects","Experience","Activity","Education","Skills","Contact"];

  return(<>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap');:root{--h:'Outfit',sans-serif;--b:'DM Sans',sans-serif;--m:'IBM Plex Mono',monospace}*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{overflow-x:hidden}::selection{background:rgba(180,140,255,0.25);color:#fff}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(180,140,255,0.15);border-radius:2px}@keyframes fi{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}@keyframes pd{0%,100%{box-shadow:0 0 0 0 rgba(122,255,193,0.4)}50%{box-shadow:0 0 0 7px rgba(122,255,193,0)}}@keyframes bl{0%,100%{opacity:1}50%{opacity:0}}@keyframes sw{0%{width:0}100%{width:100%}}`}</style>

    <div style={{background:th.bg,minHeight:"100vh",transition:"background 0.6s ease"}}>
    {!booted&&<Boot onDone={()=>setBooted(true)}/>}
    {booted&&<>
      <Chrome isDark={dark}/>
      <div style={{position:"fixed",inset:0,zIndex:1,pointerEvents:"none",background:"radial-gradient(ellipse at 50% 20%, transparent 0%, "+th.vigA+" 45%, "+th.vigB+" 100%)",transition:"all 0.6s ease"}}/>
      {modal&&<Modal project={modal} onClose={()=>setModal(null)} th={th}/>}

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"0 clamp(16px,3.5vw,48px)",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",background:navO>0.1?th.navBgFull:"transparent",backdropFilter:navO>0.1?"blur(24px) saturate(1.4)":"none",borderBottom:"1px solid "+(navO>0.1?th.border:"transparent"),transition:"all 0.4s ease"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M13 2L23 6V13C23 19 19 23 13 25C7 23 3 19 3 13V6L13 2Z" stroke={th.accentDim} strokeWidth="1.3" fill="none"/><path d="M9 13L11.5 15.5L17 10" stroke={th.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div><div style={{fontFamily:"var(--h)",fontSize:14,fontWeight:800,color:th.text,letterSpacing:1.2,lineHeight:1}}>MICHEAL WOLSKI</div><div style={{fontFamily:"var(--m)",fontSize:7.5,color:th.textFaint,letterSpacing:2}}>CYBERSECURITY PORTFOLIO</div></div>
        </div>
        <div style={{display:"flex",gap:16,alignItems:"center"}}>
          {secs.map(s=><a key={s} href={"#"+s.toLowerCase()} style={{fontFamily:"var(--m)",fontSize:10,color:th.textDim,textDecoration:"none",letterSpacing:1.3,textTransform:"uppercase",transition:"color 0.25s",fontWeight:500}} onMouseEnter={e=>{e.target.style.color=th.accent;}} onMouseLeave={e=>{e.target.style.color=th.textDim;}}>{s}</a>)}
          <button onClick={()=>setDark(!dark)} style={{background:th.surface,border:"1px solid "+th.border,borderRadius:8,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:th.textMid,fontSize:16,transition:"all 0.3s"}}>{dark?"\u2600":"\u263E"}</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="about" style={{position:"relative",zIndex:2,minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"130px clamp(20px,5.5vw,72px) 90px",transform:"translateY("+px+"px)"}}>
        <div style={{position:"absolute",top:84,left:"clamp(20px,5.5vw,72px)",right:"clamp(20px,5.5vw,72px)",height:2,background:th.surface,borderRadius:1,overflow:"hidden",opacity:loaded?1:0,transition:"opacity 0.8s ease 0.3s"}}><div style={{height:"100%",background:"linear-gradient(90deg, rgba(180,140,255,0.6), rgba(100,220,255,0.4), rgba(255,180,100,0.3))",animation:loaded?"sw 2s cubic-bezier(.22,1,.36,1) forwards":"none",animationDelay:"0.5s",width:0}}/></div>
        <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:24,opacity:loaded?1:0,transform:loaded?"none":"translateY(14px)",transition:"all 0.7s cubic-bezier(.22,1,.36,1) 0.2s"}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:th.mint,animation:"pd 2s ease infinite"}}/><span style={{fontFamily:"var(--m)",fontSize:10.5,color:th.mint,letterSpacing:2,fontWeight:600}}>OPEN TO OPPORTUNITIES</span><span style={{fontFamily:"var(--m)",fontSize:10,color:th.textFaint}}>{"\u2014"} {P.location}</span>
        </div>
        <h1 style={{fontFamily:"var(--h)",fontSize:"clamp(40px,7vw,80px)",fontWeight:800,color:th.text,lineHeight:0.95,letterSpacing:-2,margin:"0 0 6px",opacity:loaded?1:0,transform:loaded?"none":"translateY(24px)",transition:"all 1s cubic-bezier(.22,1,.36,1) 0.35s"}}>Micheal Wolski<span style={{background:"linear-gradient(135deg,#b490ff,#64d8ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>.</span></h1>
        <p style={{fontFamily:"var(--h)",fontSize:"clamp(16px,2.2vw,24px)",fontWeight:600,color:th.textMid,margin:"0 0 16px",opacity:loaded?1:0,transform:loaded?"none":"translateY(18px)",transition:"all 1s cubic-bezier(.22,1,.36,1) 0.5s"}}>{P.title}</p>
        <div style={{fontFamily:"var(--m)",fontSize:"clamp(11px,1.2vw,13px)",color:th.accent,marginBottom:24,minHeight:20,opacity:loaded?1:0,transition:"opacity 0.6s ease 0.65s"}}>{">"} {typed}<span style={{animation:"bl 1s step-end infinite",borderRight:"2px solid "+th.accentDim,marginLeft:1}}>&nbsp;</span></div>
        <p style={{fontFamily:"var(--b)",fontSize:"clamp(13.5px,1.4vw,15.5px)",color:th.textMid,lineHeight:1.8,maxWidth:620,marginBottom:36,opacity:loaded?1:0,transform:loaded?"none":"translateY(18px)",transition:"all 1s cubic-bezier(.22,1,.36,1) 0.75s"}}>{P.summary}</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",opacity:loaded?1:0,transform:loaded?"none":"translateY(18px)",transition:"all 1s cubic-bezier(.22,1,.36,1) 0.9s"}}>
          <a ref={mR1} href="#projects" style={{...mS1,fontFamily:"var(--m)",fontSize:11,fontWeight:700,color:"#fff",background:th.btnBg,padding:"13px 26px",borderRadius:8,textDecoration:"none",letterSpacing:1.5,boxShadow:th.btnShadow,display:"inline-flex",alignItems:"center",gap:9}}>VIEW PROJECTS</a>
          <a ref={mR2} href="#contact" style={{...mS2,fontFamily:"var(--m)",fontSize:11,fontWeight:600,color:th.textMid,background:th.surface,border:"1px solid "+th.border,padding:"13px 26px",borderRadius:8,textDecoration:"none",letterSpacing:1.5,backdropFilter:"blur(16px)",transition:"all 0.3s ease"}}>CONNECT</a>
        </div>
        <div style={{display:"flex",gap:"clamp(20px,3.5vw,44px)",marginTop:56,flexWrap:"wrap",opacity:loaded?1:0,transform:loaded?"none":"translateY(18px)",transition:"all 1s cubic-bezier(.22,1,.36,1) 1.1s"}}>
          {[{v:"23+",l:"Projects Built"},{v:"9",l:"Security Labs"},{v:"5",l:"Bosch Divisions"},{v:"4",l:"Personal Apps"}].map(s=><div key={s.l}><div style={{fontFamily:"var(--h)",fontSize:26,fontWeight:800,color:th.text,lineHeight:1}}>{s.v}</div><div style={{fontFamily:"var(--m)",fontSize:9,color:th.textFaint,letterSpacing:1.5,marginTop:3,textTransform:"uppercase"}}>{s.l}</div></div>)}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{position:"relative",zIndex:2,padding:"72px clamp(20px,5.5vw,72px) 90px",transform:"translateY("+(-scrollY*0.02)+"px)"}}>
        <SL th={th}>Projects</SL><ST th={th} sub="Enterprise deployments at Bosch, personal GitHub repos, and hands-on cybersecurity labs. Click any card for details.">Engineering Portfolio</ST>
        <div style={{display:"flex",gap:5,marginBottom:40,flexWrap:"wrap"}}>
          {tabs.map(t=>{const cnt=t==="ALL"?PROJECTS.length:PROJECTS.filter(p=>p.cat===t).length;return<button key={t} onClick={()=>setTab(t)} style={{fontFamily:"var(--m)",fontSize:9.5,letterSpacing:1.8,fontWeight:600,padding:"7px 16px",borderRadius:6,cursor:"pointer",border:"1px solid "+(tab===t?th.filterActBorder:th.border),background:tab===t?th.filterAct:th.surface,color:tab===t?th.accent:th.textDim,transition:"all 0.3s ease"}}>{tl[t]} <span style={{opacity:0.5,marginLeft:3}}>{cnt}</span></button>;})}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 380px), 1fr))",gap:14,maxWidth:1280}}>{filtered.map((p,i)=><ProjCard key={p.id} p={p} i={i} onClick={setModal} th={th}/>)}</div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{position:"relative",zIndex:2,padding:"72px clamp(20px,5.5vw,72px) 90px"}}><SL th={th}>Experience</SL><ST th={th} sub="Internship at Bosch supporting Ford and GM automotive cybersecurity programs.">Work & Internships</ST>
        <div style={{position:"relative",maxWidth:700}}><div style={{position:"absolute",left:16,top:8,bottom:8,width:2,background:"linear-gradient(180deg,"+th.accent+","+th.border+")",borderRadius:1}}/>{EXP.map((e,i)=><TLItem key={i} e={e} i={i} isLast={i===EXP.length-1} th={th}/>)}</div>
      </section>

      {/* ACTIVITY */}
      <section id="activity" style={{position:"relative",zIndex:2,padding:"72px clamp(20px,5.5vw,72px) 90px"}}><SL th={th}>Activity</SL><ST th={th} sub="Contribution activity across personal projects, security labs, and enterprise tooling.">GitHub Contributions</ST><div style={{maxWidth:900}}><GitMap th={th}/></div></section>

      {/* EDUCATION */}
      <section id="education" style={{position:"relative",zIndex:2,padding:"72px clamp(20px,5.5vw,72px) 90px"}}><SL th={th}>Education</SL><ST th={th} sub="Academic foundation in cybersecurity, networking, and information assurance.">Academic Background</ST>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:14,maxWidth:700,marginBottom:40}}>{EDU.map((e,i)=><EduItem key={i} e={e} i={i} th={th}/>)}</div>
        <h3 style={{fontFamily:"var(--h)",fontSize:16,fontWeight:700,color:th.text,marginBottom:16}}>Certifications & Badges</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))",gap:10,maxWidth:750}}>{CERTS.map((c,i)=><CertItem key={c.name} c={c} i={i} th={th}/>)}</div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{position:"relative",zIndex:2,padding:"72px clamp(20px,5.5vw,72px) 90px"}}><SL th={th}>Skills</SL><ST th={th} sub="Tools, frameworks, and platforms across labs, internship, and personal projects.">Technical Expertise</ST>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",gap:36,maxWidth:1050}}>{SKILLS.map((s,i)=><SkillGrp key={s.cat} s={s} i={i} th={th}/>)}</div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{position:"relative",zIndex:2,padding:"72px clamp(20px,5.5vw,72px) 56px"}}><SL th={th}>Connect</SL><ST th={th} sub="Looking for cybersecurity roles, SOC analyst positions, and security engineering opportunities.">Let's Connect</ST>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",maxWidth:700}}>{cls.map(l=><CLink key={l.label} link={l} th={th}/>)}</div>
        <div style={{marginTop:90,paddingTop:24,borderTop:"1px solid "+th.border,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12}}><span style={{fontFamily:"var(--m)",fontSize:9.5,color:th.textFaint,letterSpacing:1.5}}>{"\u00A9"} {new Date().getFullYear()} Micheal Wolski</span><span style={{fontFamily:"var(--m)",fontSize:9.5,color:th.textFaint,letterSpacing:1.5}}>BUILT WITH PRECISION</span></div>
      </section>
    </>}
    </div>
  </>);
}
