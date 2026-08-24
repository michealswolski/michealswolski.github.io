import { IconArrowUpRight, IconGitHub } from "./Icons";
import ScreenshotFrame from "./ScreenshotFrame";

/*
  The case study itself, with no chrome around it.

  Shared by the quick-preview modal and the standalone /projects/:id page so
  the two can't drift apart — a recruiter following a shared link and a visitor
  clicking through the grid read exactly the same thing.
*/

export default function CaseStudyBody({ project, headingId, titleTag: Title = "h2", eager = false }) {
  const { detail } = project;

  return (
    <>
      <div className="modal-head">
        <span className="badge">{project.category}</span>
        <Title id={headingId} className="modal-title">
          {project.title}
        </Title>
        <p className="modal-summary">{project.summary}</p>
      </div>

      {project.screenshot && <ScreenshotFrame screenshot={project.screenshot} size="modal" eager={eager} />}

      {project.disclaimer && <p className="modal-disclaimer">{project.disclaimer}</p>}
      {project.inProgressNote && (
        <p className="modal-disclaimer modal-disclaimer--progress">{project.inProgressNote}</p>
      )}

      <div className="modal-body">
        {detail?.problem && (
          <section>
            <h3>Problem</h3>
            <p>{detail.problem}</p>
          </section>
        )}
        {detail?.whatIBuilt && (
          <section>
            <h3>{project.status === "in-progress" ? "What I'm Building" : "What I Built"}</h3>
            <p>{detail.whatIBuilt}</p>
          </section>
        )}
        {detail?.architecture && (
          <section>
            <h3>Architecture &amp; Approach</h3>
            <p>{detail.architecture}</p>
          </section>
        )}
        {detail?.keyFeatures?.length > 0 && (
          <section>
            <h3>Key Features</h3>
            <ul className="modal-list">
              {detail.keyFeatures.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
        )}
        {detail?.securityConsiderations && (
          <section>
            <h3>Security Considerations</h3>
            <p>{detail.securityConsiderations}</p>
          </section>
        )}
        {detail?.validation && (
          <section>
            <h3>Validation &amp; Testing</h3>
            <p>{detail.validation}</p>
          </section>
        )}
        {detail?.challenges && (
          <section>
            <h3>Challenges &amp; Decisions</h3>
            <p>{detail.challenges}</p>
          </section>
        )}
        {detail?.whatILearned && (
          <section>
            <h3>What I Learned</h3>
            <p>{detail.whatILearned}</p>
          </section>
        )}
        {detail?.whatNext && (
          <section>
            <h3>What I&rsquo;d Build Next</h3>
            <p>{detail.whatNext}</p>
          </section>
        )}
        <section>
          <h3>Tech Stack</h3>
          <div className="project-tags">
            {project.tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="modal-footer">
        {project.links?.github && (
          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
            <IconGitHub size={14} />
            View Source
            <IconArrowUpRight />
          </a>
        )}
        {project.links?.demo && (
          <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
            {project.links.demoLabel || "Live demo"}
            <IconArrowUpRight />
          </a>
        )}
        {project.links?.githubSecondary && (
          <a
            href={project.links.githubSecondary}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
          >
            <IconGitHub size={14} />
            {project.links.githubSecondaryLabel || "Related repo"}
            <IconArrowUpRight />
          </a>
        )}
        {project.privateLabel && !project.links?.github && (
          <span className="project-private-tag">{project.privateLabel}</span>
        )}
      </div>
    </>
  );
}
