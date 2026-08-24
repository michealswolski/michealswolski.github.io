import { useMemo, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { featuredProjects, secondaryGroups, secondaryProjects, CATEGORY_COLORS } from "../data/projects";
import { skillEvidenceMap } from "../data/skills";
import { IconArrowUpRight, IconClose } from "../components/Icons";
import { projectPath } from "../hooks/useRoute";

const ALL = "All";

export default function FeaturedProjects({ skillFilter, onClearSkillFilter, linkTo }) {
  const [openProject, setOpenProject] = useState(null);
  const [category, setCategory] = useState(ALL);

  const categories = useMemo(() => [ALL, ...new Set(featuredProjects.map((p) => p.category))], []);

  // The featured six carry the page; the additional tier keeps its full case
  // studies but renders below them, so the strongest work dominates (audit #18).
  const isAdditional = (p) => p.tier === "additional";

  // A skill filter comes from the Skills section and spans both the featured and
  // secondary lists; the category chips only apply to the featured grid. When a
  // skill is active it wins, and the category chips are hidden rather than left
  // on screen doing nothing.
  const skillMatchIds = useMemo(
    () => (skillFilter ? new Set(skillEvidenceMap[skillFilter] || []) : null),
    [skillFilter]
  );

  const matching = useMemo(() => {
    if (skillMatchIds) return featuredProjects.filter((p) => skillMatchIds.has(p.id));
    if (category === ALL) return featuredProjects;
    return featuredProjects.filter((p) => p.category === category);
  }, [category, skillMatchIds]);

  const visibleFeatured = useMemo(() => matching.filter((p) => !isAdditional(p)), [matching]);
  const visibleAdditional = useMemo(() => matching.filter(isAdditional), [matching]);

  const visibleSecondaryGroups = useMemo(() => {
    if (!skillMatchIds) return secondaryGroups;
    return secondaryGroups
      .map((g) => ({ ...g, projects: g.projects.filter((p) => skillMatchIds.has(p.id)) }))
      .filter((g) => g.projects.length > 0);
  }, [skillMatchIds]);

  const secondaryMatchCount = visibleSecondaryGroups.reduce((n, g) => n + g.projects.length, 0);
  const isFiltered = Boolean(skillMatchIds) || category !== ALL;
  const spotlightEnabled = !isFiltered;

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          command="ls -la ~/projects"
          title="What I've Built"
          subtitle={`${featuredProjects.length + secondaryProjects.length} projects and labs. Every one links to public source, implementation artifacts, or a clearly labeled technical case study.`}
        />

        {skillFilter ? (
          <div className="filter-bar filter-bar--skill" role="status">
            <span className="filter-bar-label mono">Filtered by skill</span>
            <button type="button" className="filter-clear" onClick={onClearSkillFilter}>
              {skillFilter}
              <IconClose size={12} />
              <span className="visually-hidden">— clear this filter</span>
            </button>
            <span className="filter-bar-count mono">
              {matching.length + secondaryMatchCount} match
              {matching.length + secondaryMatchCount === 1 ? "" : "es"}
            </span>
          </div>
        ) : (
          <div className="filter-bar" role="group" aria-label="Filter projects by category">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`filter-chip${category === c ? " is-active" : ""}`}
                style={c === ALL ? undefined : { "--cat": CATEGORY_COLORS[c] || "var(--accent)" }}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {visibleAdditional.length > 0 && visibleFeatured.length === 0 && !skillFilter && (
          <p className="filter-empty">No featured projects in this category — see below.</p>
        )}

        {visibleFeatured.length > 0 ? (
          <div className={`grid grid-projects${spotlightEnabled ? " grid-projects--spotlight" : ""}`}>
            {visibleFeatured.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={setOpenProject}
                variant={spotlightEnabled && i === 0 && project.screenshot ? "spotlight" : "default"}
              />
            ))}
          </div>
        ) : (
          !skillFilter &&
          visibleAdditional.length === 0 && <p className="filter-empty">No featured projects in this category.</p>
        )}

        {visibleAdditional.length > 0 && (
          <div className="more-projects">
            {!skillFilter && <h3 className="more-projects-title mono">Additional Projects</h3>}
            <div className="grid grid-projects">
              {visibleAdditional.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} onOpen={setOpenProject} />
              ))}
            </div>
          </div>
        )}

        {visibleSecondaryGroups.length > 0 && (
          <div className="more-projects">
            {!skillFilter && <h3 className="more-projects-title mono">Labs &amp; Research</h3>}
            {visibleSecondaryGroups.map((group) => (
              <div key={group.id} className="secondary-group">
                <div className="secondary-group-head">
                  <h4 className="secondary-group-title">{group.title}</h4>
                  {!skillFilter && <p className="secondary-group-note">{group.note}</p>}
                </div>
                <div className="grid grid-secondary">
                  {group.projects.map((project) => (
                    <a
                      key={project.id}
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="secondary-card card"
                      style={{ "--cat": CATEGORY_COLORS[project.category] || "var(--accent)" }}
                    >
                      <div className="secondary-card-top">
                        <span className="secondary-card-rail" aria-hidden="true" />
                        <IconArrowUpRight />
                      </div>
                      <h5>{project.title}</h5>
                      <p>{project.summary}</p>
                      <div className="project-tags">
                        {project.tech.map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {skillFilter && visibleFeatured.length + visibleAdditional.length + secondaryMatchCount === 0 && (
          <p className="filter-empty">No projects on this page are tagged with {skillFilter}.</p>
        )}
      </div>

      {openProject && (
        <ProjectModal
          project={openProject}
          onClose={() => setOpenProject(null)}
          onOpenFull={(e) => {
            setOpenProject(null);
            linkTo(projectPath(openProject.id))(e);
          }}
        />
      )}
    </section>
  );
}
