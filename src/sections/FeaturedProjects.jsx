import { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { featuredProjects, secondaryProjects, CATEGORY_COLORS } from "../data/projects";
import { IconArrowUpRight } from "../components/Icons";

export default function FeaturedProjects() {
  const [openProject, setOpenProject] = useState(null);

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Projects"
          title="What I've Built"
          subtitle="A curated set of the projects most relevant to cybersecurity, automotive, and AI engineering roles — each backed by a real, inspectable repository unless noted otherwise."
        />

        <div className="grid grid-projects">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpen={setOpenProject} />
          ))}
        </div>

        <div className="more-projects">
          <h3 className="more-projects-title mono">More Projects</h3>
          <div className="grid grid-secondary">
            {secondaryProjects.map((project) => (
              <a
                key={project.id}
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-card card"
                style={{ "--cat": CATEGORY_COLORS[project.category] || "var(--accent)" }}
              >
                <div className="secondary-card-top">
                  <span className="badge">{project.category}</span>
                  <IconArrowUpRight />
                </div>
                <h4>{project.title}</h4>
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
      </div>

      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
    </section>
  );
}
