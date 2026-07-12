import { useState, useEffect, useRef, useCallback } from "react";
import { P, SOCIALS, NAV, CATS, EDU, CERTS, EXPERIENCE, PROJECTS, SKILLS, DEVELOPMENT, EXPLORING } from "./data";

/* ─── FONTS ─────────────────────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');`;

/* ─── THEME (charcoal + teal, enterprise/automotive) ────────────── */
const T = {
  dark: {
    isDark: true,
    bg: "#0a0e14", bgAlt: "#0e131b", bgDeep: "#121821",
    text: "#e6edf3", textMid: "#aab6c4", textDim: "#78899a", textFaint: "#4b5866",
    accent: "#22d3ee", accent2: "#2dd4bf",
    accentSoft: "rgba(34,211,238,0.12)", accentLine: "rgba(34,211,238,0.30)",
    border: "#1c2531", borderHov: "rgba(34,211,238,0.45)",
    card: "#0f151d", cardHov: "#131c26",
    tagBg: "rgba(255,255,255,0.04)", tagBorder: "#1c2531", tagText: "#9fb0c0",
    red: "#ff2740", green: "#34d399", violet: "#a78bfa", cyan: "#22d3ee", teal: "#2dd4bf", blue: "#60a5fa", amber: "#fbbf24",
    shadow: "0 1px 2px rgba(0,0,0,0.4), 0 8px 28px rgba(0,0,0,0.35)",
    shadowHov: "0 18px 50px rgba(0,0,0,0.5)",
    btnText: "#04121a",
  },
  light: {
    isDark: false,
    bg: "#ffffff", bgAlt: "#f5f8fa", bgDeep: "#eceff3",
    text: "#0b1622", textMid: "#33414f", textDim: "#5d6b7a", textFaint: "#93a1b0",
    accent: "#0e7490", accent2: "#0891b2",
    accentSoft: "rgba(14,116,144,0.08)", accentLine: "rgba(14,116,144,0.28)",
    border: "#e2e8f0", borderHov: "rgba(14,116,144,0.4)",
    card: "#ffffff", cardHov: "#f8fbfc",
    tagBg: "#f1f5f9", tagBorder: "#e2e8f0", tagText: "#4b5b6b",
    red: "#E20015", green: "#059669", violet: "#7c3aed", cyan: "#0891b2", teal: "#0d9488", blue: "#2563eb", amber: "#d97706",
    shadow: "0 1px 2px rgba(0,0,0,0.05), 0 6px 20px rgba(15,30,50,0.06)",
    shadowHov: "0 16px 44px rgba(15,30,50,0.12)",
    btnText: "#ffffff",
  },
};

const catColor = (th, token) => ({ red: th.red, violet: th.violet, cyan: th.cyan, green: th.green, teal: th.teal, blue: th.blue }[token] || th.accent);
const catMeta = (key) => CATS.find((c) => c.key === key) || { label: key, token: "cyan" };
const badgeColor = (th, p) => catColor(th, catMeta(p.cat[0]).token);
const statusColor = (th, s) => ({
  "Completed": th.green, "In Development": th.amber, "Prototype": th.violet,
  "Research": th.blue, "Academic": th.blue, "Lab": th.teal, "Archived": th.textFaint,
}[s] || th.accent);

/* ─── GLOBAL CSS ────────────────────────────────────────────────── */
const GCSS = `
${FONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;font-size:16px}
body{font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.7}
::-webkit-scrollbar{width:10px;height:10px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(120,137,154,0.4);border-radius:5px;border:2px solid transparent;background-clip:padding-box}

@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes softPulse{0%,100%{opacity:1}50%{opacity:0.45}}

a{color:inherit}
button{font-family:inherit}
:focus-visible{outline:2px solid ${T.dark.accent};outline-offset:2px;border-radius:6px}
section[id]{scroll-margin-top:82px}

.spb{position:fixed;top:0;left:0;height:2px;z-index:9999;pointer-events:none;transition:width 0.1s linear}
.desktop-nav{display:flex;align-items:center;gap:2px}
.hamburger-btn{display:none}
@media(max-width:940px){
  .desktop-nav{display:none !important}
  .hamburger-btn{display:flex !important}
  .hero-aside{display:none !important}
}
.scroll-top{position:fixed;bottom:26px;right:26px;z-index:150;width:44px;height:44px;border-radius:12px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:opacity .3s,transform .3s;opacity:0;transform:translateY(12px);pointer-events:none}
.scroll-top.vis{opacity:1;transform:none;pointer-events:auto}

@media (prefers-reduced-motion: reduce){
  *{animation:none !important;transition:none !important;scroll-behavior:auto !important}
}

/* Print — only the resume document prints */
@media print{
  nav,.spb,.scroll-top,.no-print{display:none !important}
  body{background:#fff !important}
  .print-area{position:absolute;inset:0;margin:0 !important;box-shadow:none !important;border-radius:0 !important}
  .print-area *{color:#000 !important}
}
`;

/* ─── HOOK: reveal on scroll ────────────────────────────────────── */
function useReveal(thr) {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = r.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: thr || 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [thr]);
  return [r, v];
}

/* ─── ICONS ─────────────────────────────────────────────────────── */
const IconLinkedIn = ({ s = 15, c = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);
const IconGitHub = ({ s = 15, c = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={c} aria-hidden="true"><path d="M12 0c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4 0-6.6-5.4-12-12-12z" /></svg>
);
const IconMail = ({ s = 15, c = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const SOCIAL_ICON = { LinkedIn: IconLinkedIn, GitHub: IconGitHub, Email: IconMail };

/* ─── STATIC CAN-BUS / CIRCUIT MOTIF (decorative) ───────────────── */
function BgCircuit({ color, opacity }) {
  const nodes = [[118, 216], [198, 184], [308, 162], [435, 140], [568, 144], [665, 160], [750, 196]];
  return (
    <svg viewBox="0 0 900 290" width="900" height="290" fill="none" aria-hidden="true" style={{ color, opacity }}>
      <polyline points="118,216 198,184 308,162 435,140 568,144 665,160 750,196" stroke="currentColor" strokeWidth="1" strokeDasharray="7 5" />
      <line x1="198" y1="184" x2="198" y2="240" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 4" />
      <line x1="308" y1="162" x2="308" y2="110" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 4" />
      <line x1="435" y1="140" x2="435" y2="108" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 4" />
      <line x1="568" y1="144" x2="568" y2="108" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 4" />
      <line x1="665" y1="160" x2="665" y2="240" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 4" />
      {nodes.map(([x, y], i) => (
        <g key={i}><circle cx={x} cy={y} r="5" stroke="currentColor" strokeWidth="1" fill="none" /><circle cx={x} cy={y} r="2" fill="currentColor" /></g>
      ))}
    </svg>
  );
}

/* ─── ATOMS ─────────────────────────────────────────────────────── */
const Mono = { fontFamily: "'IBM Plex Mono',monospace" };
const Head = { fontFamily: "'Outfit',sans-serif" };

function Badge({ p, th }) {
  const c = badgeColor(th, p); const label = catMeta(p.cat[0]).label;
  return <span style={{ ...Mono, fontSize: 9.5, fontWeight: 600, letterSpacing: 1.4, textTransform: "uppercase", color: c, background: c + "1e", border: `1px solid ${c}44`, padding: "3px 8px", borderRadius: 5 }}>{label}</span>;
}
function StatusPill({ status, th }) {
  const c = statusColor(th, status);
  return (
    <span style={{ ...Mono, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 9.5, fontWeight: 600, letterSpacing: 0.8, color: c, background: c + "16", border: `1px solid ${c}33`, padding: "3px 9px", borderRadius: 20 }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />{status}
    </span>
  );
}
function Tag({ label, th }) {
  return <span style={{ ...Mono, fontSize: 10.5, color: th.tagText, background: th.tagBg, border: `1px solid ${th.tagBorder}`, padding: "4px 10px", borderRadius: 6 }}>{label}</span>;
}
function SecLabel({ children, th }) {
  const [r, v] = useReveal();
  return (
    <div ref={r} style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14, opacity: v ? 1 : 0, transform: v ? "none" : "translateX(-10px)", transition: "all .6s cubic-bezier(.22,1,.36,1)" }}>
      <span style={{ width: 26, height: 2, background: `linear-gradient(90deg,${th.accent},transparent)`, borderRadius: 1 }} />
      <span style={{ ...Mono, fontSize: 10.5, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: th.accent }}>{children}</span>
    </div>
  );
}
function SecTitle({ children, sub, th }) {
  const [r, v] = useReveal();
  return (
    <div ref={r} style={{ marginBottom: 48, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)", transition: "all .7s cubic-bezier(.22,1,.36,1) .05s" }}>
      <h2 style={{ ...Head, fontSize: "clamp(26px,3.4vw,38px)", fontWeight: 800, color: th.text, letterSpacing: -0.6, lineHeight: 1.12 }}>{children}</h2>
      {sub && <p style={{ fontSize: 15, color: th.textMid, marginTop: 12, maxWidth: 620, lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

/* ─── PROJECT CARD + MODAL ──────────────────────────────────────── */
function ExtIcon({ s = 11 }) { return <svg width={s} height={s} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M2 10L10 2M10 2H5M10 2V7" /></svg>; }

/* Category watermark icon for project-card headers */
function CatIcon({ p, size = 60, color }) {
  const paths = {
    INTERNSHIP: <><path d="M3 21h18" /><path d="M5 21V8l7-4 7 4v13" /><path d="M9 21v-4h6v4" /><path d="M9 10h.01M15 10h.01M9 13.5h.01M15 13.5h.01" /></>,
    AI: <><rect x="4" y="4" width="16" height="16" rx="3" /><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /></>,
    AUTOMOTIVE: <><path d="M3 12h18l-2-5H5z" /><path d="M3 12v4h2M21 12v4h-2M7 16h10" /><circle cx="7" cy="16.5" r="1.6" /><circle cx="17" cy="16.5" r="1.6" /></>,
    SECURITY: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>,
    PERSONAL: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9l3 3-3 3M13 15h4" /></>,
    ACADEMIC: <><path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1.3 2.7 3 6 3s6-1.7 6-3v-5" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[p.cat[0]] || paths.PERSONAL}
    </svg>
  );
}

function ProjCard({ p, i, onOpen, th }) {
  const [r, v] = useReveal();
  const [hov, setHov] = useState(false);
  const bc = badgeColor(th, p);
  return (
    <article
      ref={r}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => onOpen(p)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(p); } }}
      tabIndex={0} role="button" aria-label={`${p.title} — view details`}
      style={{
        position: "relative", borderRadius: 16, cursor: "pointer", overflow: "hidden",
        background: hov ? th.cardHov : th.card,
        border: `1px solid ${hov ? th.borderHov : th.border}`,
        boxShadow: hov ? th.shadowHov : th.shadow,
        transition: "border .25s, box-shadow .25s, background .2s, transform .25s",
        transform: v ? (hov ? "translateY(-3px)" : "none") : "translateY(22px)",
        opacity: v ? 1 : 0, transitionDelay: v ? `${(i % 3) * 50}ms` : "0ms",
      }}
    >
      <div style={{ position: "relative", height: 74, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(120deg, ${bc}2b, ${bc}0d 55%, transparent)` }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${th.isDark ? "rgba(255,255,255,0.05)" : "rgba(15,30,50,0.05)"} 1px, transparent 1px)`, backgroundSize: "13px 13px", opacity: 0.6 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: bc, opacity: hov ? 1 : 0.6, transition: "opacity .3s" }} />
        <div style={{ position: "absolute", right: -4, top: "50%", transform: `translateY(-50%) scale(${hov ? 1.05 : 1})`, color: bc, opacity: hov ? 0.5 : 0.34, transition: "all .3s" }}><CatIcon p={p} size={62} color={bc} /></div>
        <div style={{ position: "absolute", left: 16, bottom: 11 }}><Badge p={p} th={th} /></div>
      </div>
      <div style={{ padding: "16px 22px 22px" }}>
        <div style={{ marginBottom: 10 }}>
          <span style={{ ...Mono, fontSize: 10.5, color: th.textDim }}>{p.id} · {p.domain}</span>
        </div>
        <h3 style={{ ...Head, fontSize: 16.5, fontWeight: 700, color: hov ? th.accent : th.text, marginBottom: 3, transition: "color .2s", lineHeight: 1.3 }}>{p.title}</h3>
        <p style={{ ...Mono, fontSize: 11, color: th.accent, marginBottom: 10, opacity: 0.85 }}>{p.sub}</p>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: th.textMid, marginBottom: 14 }}>{p.desc}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <StatusPill status={p.status} th={th} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{p.tags.slice(0, 4).map((t) => <Tag key={t} label={t} th={th} />)}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 15 }}>
          {p.link
            ? <a href={p.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ ...Mono, fontSize: 10.5, color: th.textDim, display: "inline-flex", alignItems: "center", gap: 5, textDecoration: "none" }}>Repo <ExtIcon /></a>
            : <span />}
          <span style={{ ...Mono, fontSize: 10.5, color: th.accent, opacity: hov ? 0.95 : 0.4, transition: "opacity .2s", letterSpacing: 1 }}>DETAILS →</span>
        </div>
      </div>
    </article>
  );
}

function Modal({ p, onClose, th }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn); document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);
  if (!p) return null;
  const bc = badgeColor(th, p);
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label={p.title} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(3,6,10,0.72)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 22, animation: "fadeIn .2s ease" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640, width: "100%", maxHeight: "88vh", overflowY: "auto", background: th.card, border: `1px solid ${th.border}`, borderRadius: 20, padding: "32px 30px", boxShadow: "0 30px 80px rgba(0,0,0,0.5)", animation: "fadeUp .25s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 18 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9, flexWrap: "wrap" }}>
              <span style={{ ...Mono, fontSize: 10, color: th.textDim }}>{p.id} · {p.domain}</span>
              <Badge p={p} th={th} /><StatusPill status={p.status} th={th} />
            </div>
            <h2 style={{ ...Head, fontSize: 22, fontWeight: 800, color: th.text, marginBottom: 4 }}>{p.title}</h2>
            <p style={{ ...Mono, fontSize: 11, color: th.accent }}>{p.sub}</p>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: "none", border: `1px solid ${th.border}`, borderRadius: 9, width: 36, height: 36, cursor: "pointer", color: th.textDim, fontSize: 20, flexShrink: 0, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: bc + "14", border: `1px solid ${bc}30`, borderRadius: 9, padding: "10px 14px", marginBottom: 20 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: bc, flexShrink: 0 }} />
          <span style={{ fontSize: 12.5, color: bc, fontWeight: 600 }}>{p.impact}</span>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: th.textMid, marginBottom: 20 }}>{p.details || p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: p.link ? 20 : 0 }}>{p.tags.map((t) => <Tag key={t} label={t} th={th} />)}</div>
        {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ ...Mono, fontSize: 12, fontWeight: 600, color: th.btnText, background: th.accent, borderRadius: 9, padding: "10px 18px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7 }}>View Repository <ExtIcon /></a>}
      </div>
    </div>
  );
}

/* ─── SECTION WRAPPER ───────────────────────────────────────────── */
function Section({ id, alt, th, children }) {
  return (
    <section id={id} style={{ padding: "104px 26px", background: alt ? th.bgAlt : th.bg }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const s = localStorage.getItem("mw-theme");
    return s ? s === "dark" : true; // charcoal-first; user toggle persists
  });
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeNav, setActiveNav] = useState("about");
  const [filter, setFilter] = useState("FEATURED");
  const [modal, setModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const th = dark ? T.dark : T.light;

  useEffect(() => { setLoaded(true); }, []);
  useEffect(() => { try { localStorage.setItem("mw-theme", dark ? "dark" : "light"); } catch (e) { /* ignore */ } }, [dark]);
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    const secs = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const obs = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActiveNav(e.target.id); }), { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [loaded]);

  const navScrolled = scrollY > 40;
  const TABS = ["FEATURED", "ALL", ...CATS.map((c) => c.key)];
  const tabLabel = (t) => t === "FEATURED" ? "Featured" : t === "ALL" ? "All" : catMeta(t).label;
  const countFor = (t) => t === "FEATURED" ? PROJECTS.filter((p) => p.featured).length : t === "ALL" ? PROJECTS.length : PROJECTS.filter((p) => p.cat.includes(t)).length;
  const filtered = filter === "FEATURED" ? PROJECTS.filter((p) => p.featured) : filter === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.cat.includes(filter));

  const scrollPct = Math.min(100, (scrollY / Math.max(1, (typeof document !== "undefined" ? document.body.scrollHeight - window.innerHeight : 1))) * 100);

  return (
    <>
      <style>{GCSS}</style>
      <div className="spb" style={{ width: `${scrollPct}%`, background: `linear-gradient(90deg,${th.accent},${th.accent2})` }} />

      {/* Static ambient background */}
      <div style={{ position: "fixed", inset: 0, zIndex: -1, background: th.isDark
        ? `radial-gradient(ellipse at 12% 8%, rgba(34,211,238,0.05) 0%, transparent 45%), radial-gradient(ellipse at 88% 92%, rgba(45,212,191,0.04) 0%, transparent 50%), ${th.bg}`
        : `radial-gradient(ellipse at 12% 8%, rgba(14,116,144,0.05) 0%, transparent 45%), ${th.bg}` }} />
      <div style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", backgroundImage: `radial-gradient(${th.isDark ? "rgba(120,137,154,0.05)" : "rgba(15,30,50,0.04)"} 1px, transparent 1px)`, backgroundSize: "34px 34px" }} />

      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity .4s ease", color: th.text, minHeight: "100vh" }}>

        {/* ── NAV ── */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: navScrolled ? (th.isDark ? "rgba(10,14,20,0.82)" : "rgba(255,255,255,0.82)") : "transparent", backdropFilter: navScrolled ? "blur(18px) saturate(160%)" : "none", borderBottom: `1px solid ${navScrolled ? th.border : "transparent"}`, transition: "all .35s cubic-bezier(.22,1,.36,1)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 26px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="#about" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }} aria-label="Home">
              <span style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg,${th.accent},${th.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", color: th.btnText, fontWeight: 800, ...Head, fontSize: 15 }}>M</span>
              <span style={{ ...Head, fontSize: 16.5, fontWeight: 800, color: th.text, letterSpacing: -0.3 }}>Micheal Wolski</span>
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div className="desktop-nav">
                {NAV.map((n) => (
                  <a key={n.id} href={`#${n.id}`} style={{ fontSize: 12.5, fontWeight: 500, color: activeNav === n.id ? th.accent : th.textMid, textDecoration: "none", padding: "6px 10px", borderRadius: 7, background: activeNav === n.id ? th.accentSoft : "transparent", transition: "all .2s" }}>{n.label}</a>
                ))}
              </div>
              <button onClick={() => setDark(!dark)} aria-label="Toggle color theme" style={{ marginLeft: 6, width: 36, height: 36, borderRadius: 9, background: th.tagBg, border: `1px solid ${th.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{dark ? "☀" : "☾"}</button>
              <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen} style={{ marginLeft: 4, width: 36, height: 36, borderRadius: 9, background: th.tagBg, border: `1px solid ${th.border}`, cursor: "pointer", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4 }}>
                <span style={{ width: 15, height: 2, background: th.textMid, borderRadius: 1, transition: "all .2s", transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
                <span style={{ width: 15, height: 2, background: th.textMid, borderRadius: 1, transition: "all .2s", opacity: menuOpen ? 0 : 1 }} />
                <span style={{ width: 15, height: 2, background: th.textMid, borderRadius: 1, transition: "all .2s", transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
              </button>
            </div>
          </div>
          {menuOpen && (
            <div style={{ background: th.isDark ? "rgba(10,14,20,0.96)" : "rgba(255,255,255,0.98)", borderBottom: `1px solid ${th.border}`, padding: "10px 22px 16px", display: "flex", flexDirection: "column", gap: 3 }}>
              {NAV.map((n) => <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)} style={{ fontSize: 14, fontWeight: 500, color: activeNav === n.id ? th.accent : th.textMid, textDecoration: "none", padding: "10px 12px", borderRadius: 9, background: activeNav === n.id ? th.accentSoft : "transparent" }}>{n.label}</a>)}
            </div>
          )}
        </nav>

        {/* ── HERO ── */}
        <section id="about" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 26px 72px", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: "6%", right: "-3%", color: th.accent, opacity: th.isDark ? 0.07 : 0.05, pointerEvents: "none", zIndex: 0 }}><BgCircuit color={th.accent} opacity={1} /></div>
          <div style={{ maxWidth: 1160, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>
              <div style={{ flex: "1 1 500px", maxWidth: 720 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 9, marginBottom: 22, padding: "7px 14px", borderRadius: 20, background: th.accentSoft, border: `1px solid ${th.accentLine}`, animation: "fadeUp .6s ease both" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: th.green, animation: "softPulse 2.4s infinite" }} />
                  <span style={{ ...Mono, fontSize: 10.5, color: th.accent, fontWeight: 600, letterSpacing: 0.8 }}>{P.availability}</span>
                </div>
                <h1 style={{ ...Head, fontSize: "clamp(38px,6vw,72px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.6, marginBottom: 18, animation: "fadeUp .7s ease .05s both" }}>
                  Micheal <span style={{ background: `linear-gradient(120deg,${th.accent},${th.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Wolski</span>
                </h1>
                <p style={{ ...Head, fontSize: "clamp(17px,2.4vw,24px)", fontWeight: 600, color: th.text, marginBottom: 8, animation: "fadeUp .7s ease .12s both" }}>{P.title}</p>
                <p style={{ ...Mono, fontSize: "clamp(12px,1.5vw,13.5px)", color: th.accent, marginBottom: 22, animation: "fadeUp .7s ease .16s both" }}>{P.subtitle}</p>
                <p style={{ fontSize: "clamp(14px,1.1vw,16px)", lineHeight: 1.8, color: th.textMid, maxWidth: 640, marginBottom: 26, animation: "fadeUp .7s ease .2s both" }}>{P.summary}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 34, animation: "fadeUp .7s ease .26s both" }}>
                  {P.focus.map((f) => <span key={f} style={{ fontSize: 12, fontWeight: 500, color: th.accent, background: th.accentSoft, border: `1px solid ${th.accentLine}`, padding: "6px 13px", borderRadius: 18 }}>{f}</span>)}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "fadeUp .7s ease .32s both" }}>
                  <a href="#projects" style={{ fontSize: 14, fontWeight: 700, color: th.btnText, background: `linear-gradient(135deg,${th.accent},${th.accent2})`, textDecoration: "none", padding: "13px 26px", borderRadius: 11, display: "inline-flex", alignItems: "center", gap: 8 }}>View My Work<ExtIcon s={12} /></a>
                  <a href="#resume" style={{ fontSize: 14, fontWeight: 600, color: th.text, background: th.card, textDecoration: "none", padding: "13px 26px", borderRadius: 11, border: `1px solid ${th.border}` }}>Resume</a>
                  {SOCIALS.map((s) => { const Ic = SOCIAL_ICON[s.label]; return (
                    <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" aria-label={s.label} style={{ width: 46, height: 46, borderRadius: 11, background: th.card, border: `1px solid ${th.border}`, display: "inline-flex", alignItems: "center", justifyContent: "center", color: th.textMid }}><Ic s={17} c={th.accent} /></a>
                  ); })}
                </div>
              </div>

              {/* Aside info card (restrained, replaces terminal widget) */}
              <div className="hero-aside" style={{ width: 288, flexShrink: 0, animation: "fadeUp .8s ease .2s both" }}>
                <div style={{ background: th.card, border: `1px solid ${th.border}`, borderRadius: 18, padding: "24px 22px", boxShadow: th.shadow }}>
                  <div style={{ ...Mono, fontSize: 10, color: th.textDim, letterSpacing: 1.5, marginBottom: 16 }}>AT A GLANCE</div>
                  {[
                    ["Role", "Former Product Cybersecurity Intern"],
                    ["Employer", "Bosch Mobility · 2025–2026"],
                    ["Degree", "B.S. InfoAssurance & Cyber Defense"],
                    ["Honors", "Cum Laude · GPA 3.9"],
                    ["Based in", P.location],
                  ].map(([k, val], i, a) => (
                    <div key={k} style={{ padding: "10px 0", borderBottom: i < a.length - 1 ? `1px solid ${th.border}` : "none" }}>
                      <div style={{ ...Mono, fontSize: 9.5, color: th.textDim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>{k}</div>
                      <div style={{ fontSize: 13, color: th.text, fontWeight: 500, lineHeight: 1.4 }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <Section id="experience" alt th={th}>
          <SecLabel th={th}>Experience</SecLabel>
          <SecTitle th={th} sub="Product cybersecurity and digitalization at Bosch Mobility, plus earlier operations roles.">Where I've Worked</SecTitle>
          {/* Bosch featured */}
          <BoschCard th={th} />
          {/* Past roles */}
          <div style={{ marginTop: 40 }}>
            <div style={{ ...Mono, fontSize: 10, fontWeight: 600, letterSpacing: 2, color: th.textDim, textTransform: "uppercase", marginBottom: 16 }}>Earlier Roles</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 16 }}>
              {EXPERIENCE.past.map((e, i) => <PastCard key={i} e={e} i={i} th={th} />)}
            </div>
          </div>
        </Section>

        {/* ── PROJECTS ── */}
        <Section id="projects" th={th}>
          <SecLabel th={th}>Projects</SecLabel>
          <SecTitle th={th} sub="Bosch case studies, current builds, automotive and academic work, and hands-on security labs. Filter by area; each card opens full detail.">What I've Built</SecTitle>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 34 }}>
            {TABS.map((t) => (
              <button key={t} onClick={() => setFilter(t)} style={{ ...Mono, fontSize: 11, fontWeight: 600, padding: "8px 15px", borderRadius: 9, cursor: "pointer", background: filter === t ? th.accent : th.tagBg, color: filter === t ? th.btnText : th.textMid, border: `1px solid ${filter === t ? th.accent : th.border}`, transition: "all .2s" }}>
                {tabLabel(t)}<span style={{ opacity: 0.6, marginLeft: 5 }}>{countFor(t)}</span>
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 20 }}>
            {filtered.map((p, i) => <ProjCard key={p.id} p={p} i={i} onOpen={setModal} th={th} />)}
          </div>
        </Section>

        {/* ── SKILLS ── */}
        <Section id="skills" alt th={th}>
          <SecLabel th={th}>Skills</SecLabel>
          <SecTitle th={th} sub="Grouped by function. No ratings — just the tools, standards, and concepts I actually work with.">Technical Skills</SecTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 36 }}>
            {SKILLS.map((s, i) => <SkillGroup key={i} s={s} i={i} th={th} />)}
          </div>
        </Section>

        {/* ── EDUCATION ── */}
        <Section id="education" th={th}>
          <SecLabel th={th}>Education</SecLabel>
          <SecTitle th={th}>Academic Background</SecTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 16, marginBottom: 44 }}>
            {EDU.map((e, i) => <EduItem key={i} e={e} i={i} th={th} />)}
          </div>
          <SecLabel th={th}>Certifications</SecLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
            {CERTS.map((c, i) => <CertItem key={i} c={c} i={i} th={th} />)}
          </div>
        </Section>

        {/* ── DEVELOPMENT ── */}
        <Section id="development" alt th={th}>
          <SecLabel th={th}>Professional Development</SecLabel>
          <SecTitle th={th} sub="Conferences, internal events, training, and what I'm currently exploring.">Beyond the Resume</SecTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 26 }}>
            <ListCard title="Development & Events" items={DEVELOPMENT} th={th} tone={th.accent} />
            <ListCard title="Currently Exploring" items={EXPLORING} th={th} tone={th.teal} />
          </div>
        </Section>

        {/* ── RESUME ── */}
        <Section id="resume" th={th}>
          <SecLabel th={th}>Resume</SecLabel>
          <SecTitle th={th} sub="A one-page summary. Use “Save as PDF” in the print dialog for a clean copy.">Professional Resume</SecTitle>
          <div className="no-print" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 26, background: th.card, border: `1px solid ${th.border}`, borderRadius: 12, padding: "14px 20px", boxShadow: th.shadow }}>
            <span style={{ ...Mono, fontSize: 11.5, color: th.accent, fontWeight: 600 }}>{P.availability} · Graduated May 2026</span>
            <button onClick={() => window.print()} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: th.btnText, background: `linear-gradient(135deg,${th.accent},${th.accent2})`, border: "none", borderRadius: 9, padding: "10px 20px", cursor: "pointer" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Download / Print PDF
            </button>
          </div>
          <ResumeDoc th={th} />
        </Section>

        {/* ── CONTACT ── */}
        <Section id="contact" alt th={th}>
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <SecLabel th={th}>Contact</SecLabel>
            <h2 style={{ ...Head, fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, letterSpacing: -0.8, marginBottom: 16, color: th.text }}>Let's Work <span style={{ color: th.accent }}>Together</span></h2>
            <p style={{ fontSize: 15.5, color: th.textMid, lineHeight: 1.8, marginBottom: 36 }}>Recent graduate seeking full-time roles in automotive and product cybersecurity, digitalization, AI enablement, and security automation. I'd be glad to connect.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginBottom: 30 }}>
              {SOCIALS.map((s) => { const Ic = SOCIAL_ICON[s.label]; return (
                <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, fontSize: 14, fontWeight: 600, color: th.text, background: th.card, border: `1px solid ${th.border}`, borderRadius: 12, padding: "15px 20px", textDecoration: "none", boxShadow: th.shadow }}><Ic s={16} c={th.accent} />{s.label}</a>
              ); })}
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: th.accentSoft, border: `1px solid ${th.accentLine}`, borderRadius: 14, padding: "14px 22px", ...Mono, fontSize: 12, color: th.accent, fontWeight: 600 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: th.green }} />{P.location} · {P.email}
            </div>
          </div>
        </Section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: `1px solid ${th.border}`, padding: "28px 26px", background: th.bg }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1160, margin: "0 auto", flexWrap: "wrap", gap: 8 }}>
            <span style={{ ...Head, fontSize: 15, fontWeight: 800, color: th.text }}>Micheal Wolski</span>
            <span style={{ ...Mono, fontSize: 10.5, color: th.textDim }}>© 2026 · React + Vite · GitHub Pages</span>
            <a href="https://github.com/michealswolski" target="_blank" rel="noopener noreferrer" style={{ ...Mono, fontSize: 10.5, color: th.accent, textDecoration: "none" }}>github.com/michealswolski →</a>
          </div>
        </footer>
      </div>

      <button className={`scroll-top ${scrollY > 500 ? "vis" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" style={{ background: th.accent, color: th.btnText }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6" /></svg>
      </button>

      {modal && <Modal p={modal} onClose={() => setModal(null)} th={th} />}
    </>
  );
}

/* ─── EXPERIENCE CARDS ──────────────────────────────────────────── */
function BoschCard({ th }) {
  const c = EXPERIENCE.current;
  const [r, v] = useReveal();
  return (
    <div ref={r} style={{ position: "relative", borderRadius: 20, overflow: "hidden", background: th.card, border: `1px solid ${th.red}44`, boxShadow: th.shadow, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(.22,1,.36,1)" }}>
      <div style={{ height: 4, background: th.red }} />
      <div style={{ padding: "30px 32px 32px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ ...Head, fontSize: 26, fontWeight: 900, color: th.red, letterSpacing: 1, marginBottom: 10 }}>BOSCH</div>
            <h3 style={{ ...Head, fontSize: "clamp(19px,2.6vw,25px)", fontWeight: 800, color: th.text, marginBottom: 6 }}>{c.role}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 14.5, color: th.red, fontWeight: 600 }}>{c.company}</span>
              <span style={{ color: th.textFaint }}>·</span>
              <span style={{ ...Mono, fontSize: 11, color: th.textDim }}>{c.domain}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            <span style={{ ...Mono, fontSize: 10, color: th.textDim, background: th.tagBg, border: `1px solid ${th.tagBorder}`, padding: "5px 12px", borderRadius: 6 }}>{c.period}</span>
            <span style={{ ...Mono, fontSize: 10, color: th.textDim }}>{c.location}</span>
            <span style={{ ...Mono, fontSize: 9.5, color: th.green, background: th.green + "16", border: `1px solid ${th.green}33`, padding: "4px 10px", borderRadius: 20 }}>{c.statusLabel}</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 10 }}>
          {c.points.map((pt, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: th.bgAlt, border: `1px solid ${th.border}`, borderRadius: 10, padding: "12px 14px" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: th.red, marginTop: 7, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: th.textMid, lineHeight: 1.6 }}>{pt}</span>
            </div>
          ))}
        </div>
        <div style={{ ...Mono, fontSize: 10.5, color: th.textFaint, marginTop: 18 }}>Public summary only — no confidential Bosch information, customers, or internal systems are disclosed.</div>
      </div>
    </div>
  );
}
function PastCard({ e, i, th }) {
  const [r, v] = useReveal();
  return (
    <div ref={r} style={{ background: th.card, border: `1px solid ${th.border}`, borderRadius: 16, padding: "22px 24px", boxShadow: th.shadow, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(18px)", transition: `all .6s cubic-bezier(.22,1,.36,1) ${i * 90}ms` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <h4 style={{ ...Head, fontSize: 16, fontWeight: 700, color: th.text }}>{e.role}</h4>
          <p style={{ fontSize: 13, color: th.textMid, fontWeight: 500 }}>{e.company}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ ...Mono, fontSize: 10, color: th.textDim }}>{e.period}</div>
          <div style={{ ...Mono, fontSize: 9.5, color: th.textFaint, marginTop: 4 }}>{e.location}</div>
        </div>
      </div>
      <ul style={{ listStyle: "none" }}>
        {e.points.map((pt, j) => <li key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12.5, color: th.textMid, lineHeight: 1.6, marginBottom: 5 }}><span style={{ color: th.textFaint, marginTop: 1 }}>›</span>{pt}</li>)}
      </ul>
    </div>
  );
}

/* ─── SKILLS / EDU / CERTS / LISTS ──────────────────────────────── */
function SkillGroup({ s, i, th }) {
  const [r, v] = useReveal();
  return (
    <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)", transition: `all .6s cubic-bezier(.22,1,.36,1) ${i * 70}ms` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ width: 3, height: 15, background: th.accent, borderRadius: 2 }} />
        <h4 style={{ ...Mono, fontSize: 10.5, color: th.accent, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>{s.cat}</h4>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {s.items.map((it) => <span key={it} style={{ fontSize: 12.5, color: th.textMid, background: th.tagBg, border: `1px solid ${th.tagBorder}`, padding: "7px 12px", borderRadius: 8 }}>{it}</span>)}
      </div>
    </div>
  );
}
function EduItem({ e, i, th }) {
  const [r, v] = useReveal();
  return (
    <div ref={r} style={{ background: th.card, border: `1px solid ${th.border}`, borderRadius: 15, padding: "22px 24px", boxShadow: th.shadow, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)", transition: `all .6s cubic-bezier(.22,1,.36,1) ${i * 90}ms` }}>
      <div style={{ ...Head, fontSize: 15.5, fontWeight: 700, color: th.text, marginBottom: 4 }}>{e.degree}</div>
      <div style={{ fontSize: 13.5, color: th.accent, fontWeight: 600, marginBottom: 4 }}>{e.school}</div>
      <div style={{ ...Mono, fontSize: 10.5, color: th.textDim, marginBottom: 10 }}>{e.status} · {e.loc}</div>
      <span style={{ ...Mono, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, color: th.green, background: th.green + "16", border: `1px solid ${th.green}33`, borderRadius: 6, padding: "4px 10px" }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: th.green }} />{e.honors}
      </span>
    </div>
  );
}
function CertItem({ c, i, th }) {
  const [r, v] = useReveal();
  const cl = c.status === "Completed" ? th.green : c.status.includes("Progress") ? th.amber : th.textDim;
  return (
    <div ref={r} style={{ background: th.card, border: `1px solid ${th.border}`, borderRadius: 12, padding: "16px 14px", textAlign: "center", boxShadow: th.shadow, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(12px)", transition: `all .5s cubic-bezier(.22,1,.36,1) ${i * 60}ms` }}>
      <div style={{ ...Head, fontSize: 13.5, fontWeight: 700, color: th.text, marginBottom: 8 }}>{c.name}</div>
      <span style={{ ...Mono, fontSize: 9, color: cl, letterSpacing: 1, textTransform: "uppercase", background: cl + "18", padding: "4px 9px", borderRadius: 5 }}>{c.status}</span>
    </div>
  );
}
function ListCard({ title, items, th, tone }) {
  const [r, v] = useReveal();
  return (
    <div ref={r} style={{ background: th.card, border: `1px solid ${th.border}`, borderRadius: 16, padding: "24px 26px", boxShadow: th.shadow, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)", transition: "all .6s cubic-bezier(.22,1,.36,1)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <span style={{ width: 3, height: 15, background: tone, borderRadius: 2 }} />
        <h4 style={{ ...Mono, fontSize: 10.5, color: tone, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>{title}</h4>
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
        {items.map((it) => <li key={it} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13.5, color: th.textMid, lineHeight: 1.5 }}><span style={{ color: tone, marginTop: 6, flexShrink: 0, width: 5, height: 5, borderRadius: "50%", background: tone }} />{it}</li>)}
      </ul>
    </div>
  );
}

/* ─── RÉSUMÉ DOCUMENT (print-friendly) ──────────────────────────── */
function ResumeDoc({ th }) {
  const c = EXPERIENCE.current;
  const key = PROJECTS.filter((p) => p.featured).slice(0, 6);
  return (
    <div className="print-area" style={{ background: "#ffffff", borderRadius: 18, boxShadow: "0 8px 40px rgba(0,0,0,0.18)", overflow: "hidden", color: "#0f172a" }}>
      <div style={{ background: "linear-gradient(135deg,#0b2b33 0%,#0e7490 60%,#14b8c6 100%)", padding: "40px 48px 32px", color: "#fff" }}>
        <div style={{ ...Head, fontSize: "clamp(24px,4vw,38px)", fontWeight: 900, letterSpacing: -0.8, marginBottom: 6 }}>Micheal Wolski</div>
        <div style={{ fontSize: 14.5, fontWeight: 500, opacity: 0.9, marginBottom: 16 }}>{P.title}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 26px", fontSize: 12, opacity: 0.85, ...Mono }}>
          <span>{P.email}</span><span>{P.location}</span><span>linkedin.com/in/michealwolski</span><span>github.com/michealswolski</span>
        </div>
      </div>
      <div style={{ padding: "40px 48px", display: "flex", flexDirection: "column", gap: 32 }}>
        <ResumeBlock title="Summary"><p style={{ fontSize: 13.5, lineHeight: 1.75, color: "#334155" }}>{P.summary}</p></ResumeBlock>
        <ResumeBlock title="Experience">
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4, marginBottom: 4 }}>
            <span style={{ fontSize: 14.5, fontWeight: 700 }}>{c.role} · {c.company}</span>
            <span style={{ fontSize: 12, color: "#64748b", ...Mono }}>{c.period} · {c.location}</span>
          </div>
          <ul style={{ paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
            {c.points.map((pt, i) => <li key={i} style={{ fontSize: 12.5, lineHeight: 1.65, color: "#334155" }}>{pt}</li>)}
          </ul>
        </ResumeBlock>
        <ResumeBlock title="Education">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
            {EDU.map((e, i) => (
              <div key={i} style={{ background: "#f8fafc", borderRadius: 10, padding: "14px 18px", borderLeft: "3px solid #0e7490" }}>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>{e.degree}</div>
                <div style={{ fontSize: 12.5, color: "#475569", marginBottom: 3 }}>{e.school}</div>
                <div style={{ fontSize: 11, color: "#0e7490", ...Mono }}>{e.honors} · {e.status}</div>
              </div>
            ))}
          </div>
        </ResumeBlock>
        <ResumeBlock title="Selected Projects">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {key.map((p) => (
              <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0e7490", flexShrink: 0, marginTop: 6 }} />
                <div>
                  <span style={{ fontSize: 12.5, fontWeight: 700 }}>{p.title}</span>
                  <span style={{ fontSize: 10.5, color: "#0e7490", ...Mono, marginLeft: 8 }}>{p.tags.slice(0, 4).join(" · ")}</span>
                  <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.55, marginTop: 2 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </ResumeBlock>
        <ResumeBlock title="Skills">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14 }}>
            {SKILLS.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>{s.cat}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {s.items.slice(0, 7).map((it, j) => <span key={j} style={{ fontSize: 10, color: "#475569", background: "#f1f5f9", border: "1px solid #e2e8f0", padding: "3px 8px", borderRadius: 4, ...Mono }}>{it}</span>)}
                </div>
              </div>
            ))}
          </div>
        </ResumeBlock>
      </div>
    </div>
  );
}
function ResumeBlock({ title, children }) {
  return (
    <div>
      <div style={{ ...Mono, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#0e7490", marginBottom: 8 }}>{title}</div>
      <div style={{ width: 34, height: 3, background: "linear-gradient(90deg,#0e7490,#14b8c6)", borderRadius: 2, marginBottom: 16 }} />
      {children}
    </div>
  );
}
