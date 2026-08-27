import BrandMark from "./BrandMark";
import { profile } from "../data/profile";

export default function Footer() {
  const year = "2025–2026";
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <span className="brand brand--sm">
          <BrandMark size={26} id="footer-brand" />
          <span className="brand-word">
            Micheal
            <span className="brand-dot" aria-hidden="true" />
          </span>
        </span>
        <span className="footer-note">© {year} Micheal Wolski · React + Vite · GitHub Pages</span>
        <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="footer-link">
          github.com/michealswolski →
        </a>
      </div>
    </footer>
  );
}
