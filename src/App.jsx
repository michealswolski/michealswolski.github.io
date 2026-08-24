import { useCallback, useEffect, useMemo, useState } from "react";
import "./styles/fonts.css";
import "./styles/global.css";
import "./styles/components.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { IconChevronUp } from "./components/Icons";
import { useTheme } from "./hooks/useTheme";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useRoute } from "./hooks/useRoute";
import { featuredProjects, secondaryProjects } from "./data/projects";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import FeaturedProjects from "./sections/FeaturedProjects";
import Proof from "./sections/Proof";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import ProjectPage from "./sections/ProjectPage";
import NotFound from "./sections/NotFound";

const HOME = import.meta.env.BASE_URL || "/";

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [scrollPct, setScrollPct] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [route, navigate] = useRoute();

  // Lifted so the Skills section can filter the project grid: pressing a skill
  // chip scrolls up to Projects and narrows it to the projects that used it.
  const [skillFilter, setSkillFilter] = useState(null);
  const reducedMotion = useReducedMotion();

  const projectsById = useMemo(
    () => Object.fromEntries([...featuredProjects, ...secondaryProjects].map((p) => [p.id, p])),
    []
  );

  // Intercept in-app links so a case study opens without a full page load,
  // while the href stays a real URL that works when opened directly, copied,
  // or middle-clicked.
  const linkTo = useCallback(
    (to) => (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();
      navigate(to);
    },
    [navigate]
  );

  const selectSkill = useCallback(
    (name) => {
      setSkillFilter((current) => {
        const next = current === name ? null : name;
        if (next) {
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

  const project = route.name === "project" ? projectsById[route.id] : null;
  const isSubPage = route.name !== "home";

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      <Navbar theme={theme} onToggleTheme={toggleTheme} isSubPage={isSubPage} onNavigateHome={linkTo(HOME)} />

      <main id="main">
        {route.name === "home" && (
          <>
            <Hero />
            <About />
            <Experience />
            <FeaturedProjects skillFilter={skillFilter} onClearSkillFilter={clearSkillFilter} linkTo={linkTo} />
            <Proof />
            <Skills activeSkill={skillFilter} onSelectSkill={selectSkill} />
            <Education />
            <Contact />
          </>
        )}

        {project && <ProjectPage project={project} onNavigateHome={linkTo(HOME)} />}

        {(route.name === "notFound" || (route.name === "project" && !project)) && (
          <NotFound path={route.path} onNavigateHome={linkTo(HOME)} />
        )}
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
