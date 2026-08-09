import SectionHeader from "../components/SectionHeader";
import ExperienceTimeline from "../components/ExperienceTimeline";
import { boschExperience, additionalExperience } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="section section--alt">
      <div className="container">
        <SectionHeader
          eyebrow="Experience"
          title="Work Experience"
          subtitle="A Product Cybersecurity internship at an automotive Tier 1 supplier, plus earlier operations work."
        />
        <ExperienceTimeline bosch={boschExperience} additional={additionalExperience} />
      </div>
    </section>
  );
}
