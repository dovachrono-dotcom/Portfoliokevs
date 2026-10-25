import { RESUME_DATA } from "@/lib/data";
import { FEATURED_PROJECTS } from "@/lib/portfolio";
import { Terminal } from "lucide-react";
import { ScrollText } from "@/components/common/ScrollText";
import styles from "./About.module.css";

export function Skills() {
  const capstone = FEATURED_PROJECTS.find((project) => project.id === "herbalai")!;

  return (
    <section aria-labelledby="skills-title" className={styles.section}>
      <h2 id="skills-title" className={styles.sectionTitle}>
        <Terminal size={20} aria-hidden="true" /> Skills
      </h2>
      <ScrollText className={styles.sectionIntro}>
        The technologies I use in <a href={capstone.url} target="_blank" rel="noopener noreferrer">HerbalAI<span className="sr-only"> (opens in a new tab)</span></a>, my capstone thesis project.
      </ScrollText>
      <div className={styles.skillGroups}>
        {RESUME_DATA.skillGroups.map((group) => (
          <div key={group.title} className={styles.skillGroup}>
            <ScrollText as="h3">{group.title}</ScrollText>
            <ScrollText>{group.description}</ScrollText>
            <ul aria-label={`${group.title} technologies`}>
              {group.technologies.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <ScrollText className={styles.otherSkills}><strong>Also used in my side projects:</strong> {RESUME_DATA.otherSkills.join(", ")}.</ScrollText>
    </section>
  );
}
