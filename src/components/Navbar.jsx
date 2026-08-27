import { useEffect, useState } from "react";
import { useActiveSection } from "../hooks/useActiveSection";
import ThemeToggle from "./ThemeToggle";
import { IconMenu, IconClose } from "./Icons";
import { profile } from "../data/profile";
import BrandMark from "./BrandMark";

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

export default function Navbar({ theme, onToggleTheme, isSubPage = false, onNavigateHome }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(isSubPage ? [] : NAV_IDS);
  const home = import.meta.env.BASE_URL || "/";
  const href = (id) => (isSubPage ? `${home}#${id}` : `#${id}`);

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
        <a href={isSubPage ? home : "#home"} className="brand" onClick={isSubPage ? onNavigateHome : undefined}>
          <BrandMark />
          <span className="brand-word">
            Micheal
            <span className="brand-dot" aria-hidden="true" />
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={href(item.id)}
              className={`nav-link${active === item.id ? " active" : ""}`}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          {profile.resumeUrl && (
            <a href={profile.resumeUrl} className="btn btn-primary btn-sm nav-resume" download>
              Résumé
            </a>
          )}
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
          <a key={item.id} href={href(item.id)} className={`nav-link${active === item.id ? " active" : ""}`}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
