import { useEffect } from "react";
import CaseStudyBody from "../components/CaseStudyBody";
import { IconArrowRight } from "../components/Icons";
import { CATEGORY_COLORS } from "../data/projects";
import { profile } from "../data/profile";

/*
  The standalone case study behind /projects/:id.

  Same content as the quick-preview modal, but with a real URL a recruiter can
  bookmark, send, or open from a résumé — and its own title, description, and
  canonical link so the page previews correctly when shared.
*/

const SITE = "https://michealswolski.github.io";

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export default function ProjectPage({ project, onNavigateHome }) {
  const accent = CATEGORY_COLORS[project.category] || "var(--accent)";

  useEffect(() => {
    const previousTitle = document.title;
    const url = `${SITE}/projects/${project.id}/`;
    const title = `${project.title} — ${profile.name}`;

    document.title = title;
    setMeta('meta[name="description"]', "content", project.summary);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", project.summary);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", project.summary);
    setMeta('link[rel="canonical"]', "href", url);

    return () => {
      document.title = previousTitle;
    };
  }, [project]);

  return (
    <div className="project-page" style={{ "--cat": accent }}>
      <div className="container project-page-inner">
        <a href={import.meta.env.BASE_URL || "/"} className="project-page-back" onClick={onNavigateHome}>
          <IconArrowRight size={13} />
          Back to all projects
        </a>

        <article className="project-page-body">
          <CaseStudyBody project={project} headingId="project-page-title" titleTag="h1" eager />
        </article>
      </div>
    </div>
  );
}
