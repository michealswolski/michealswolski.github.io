import { useCallback, useEffect, useState } from "react";
import "./styles/fonts.css";
import "./styles/global.css";
import "./styles/components.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { IconChevronUp } from "./components/Icons";
import { useTheme } from "./hooks/useTheme";
import { useReducedMotion } from "./hooks/useReducedMotion";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import FeaturedProjects from "./sections/FeaturedProjects";
import Proof from "./sections/Proof";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import Contact from "./sections/Contact";

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [scrollPct, setScrollPct] = useState(0);
  const [showTop, setShowTop] = useState(false);

  // Lifted so the Skills section can filter the project grid: pressing a skill
  // chip scrolls up to Projects and narrows it to the projects that used it.
  const [skillFilter, setSkillFilter] = useState(null);
  const reducedMotion = useReducedMotion();

  const selectSkill = useCallback(
    (name) => {
      setSkillFilter((current) => {
        const next = current === name ? null : name;
        if (next) {
          // Defer so the grid has re-rendered before we scroll to it.
          requestAnimationFrame(() => {
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
          });
        }
        return next;
      });
    },
    [reducedMotion]
  );

  const clearSkillFilter = useCallback(() => setSkillFilter(null), []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrollPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
      setShowTop(window.scrollY > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main id="main">
        <Hero />
        <About />
        <Experience />
        <FeaturedProjects skillFilter={skillFilter} onClearSkillFilter={clearSkillFilter} />
        <Proof />
        <Skills activeSkill={skillFilter} onSelectSkill={selectSkill} />
        <Education />
        <Contact />
      </main>

      <Footer />

      <button
        type="button"
        className={`scroll-top-btn${showTop ? " visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <IconChevronUp />
      </button>
    </>
  );
}
