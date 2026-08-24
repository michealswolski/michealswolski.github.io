import { useEffect, useState } from "react";
import { useActiveSection } from "../hooks/useActiveSection";
import ThemeToggle from "./ThemeToggle";
import { IconMenu, IconClose } from "./Icons";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "proof", label: "Proof" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const NAV_IDS = NAV_ITEMS.map((n) => n.id);

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(NAV_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [active]);

  return (
    <header className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="navbar-inner">
        <a href="#home" className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
              <path
                d="M8 1.5L2 4V8.5C2 12 4.5 15.2 8 16.5C11.5 15.2 14 12 14 8.5V4L8 1.5Z"
                fill="rgba(4,34,43,0.35)"
                stroke="#04222b"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
              <path d="M5.5 9.2L7.2 11L10.8 7.5" stroke="#04222b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Micheal<span className="brand-dot">.</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={`nav-link${active === item.id ? " active" : ""}`} aria-current={active === item.id ? "true" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="icon-btn hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <IconClose size={16} /> : <IconMenu size={16} />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" className={`mobile-menu${menuOpen ? " open" : ""}`} aria-label="Mobile">
        {NAV_ITEMS.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={`nav-link${active === item.id ? " active" : ""}`}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
