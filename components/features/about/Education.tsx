import { GraduationCap } from "lucide-react";
import { RESUME_DATA } from "@/lib/data";
import { ScrollText } from "@/components/common/ScrollText";
import styles from "./About.module.css";

export function Education() {
  return (
    <section aria-labelledby="education-heading" className={styles.backgroundSection}>
      <h2 id="education-heading" className={styles.sectionTitle}>
        <GraduationCap size={20} aria-hidden="true" /> Education
      </h2>
      <div className={styles.educationList}>
        {RESUME_DATA.education.map((item, index) => (
          <article key={item.school} className={styles.educationItem}>
            <ScrollText as="h3">{item.school}</ScrollText>
            <ScrollText>{item.qualification}{item.detail && ` · ${item.detail}`}</ScrollText>
            <p className={styles.meta}>{item.period}</p>
            {index === 0 && <ScrollText className={styles.leadership}>{RESUME_DATA.profile.leadership.description}</ScrollText>}
          </article>
        ))}
      </div>
    </section>
  );
}
