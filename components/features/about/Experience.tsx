"use client";

import Image from "next/image";
import { useState } from "react";
import { RESUME_DATA } from "@/lib/data";
import { Briefcase } from "lucide-react";
import { ScrollText } from "@/components/common/ScrollText";
import styles from "./About.module.css";

export function Experience() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section aria-labelledby="experience-heading" className={styles.backgroundSection}>
      <h2 id="experience-heading" className={styles.sectionTitle}>
        <Briefcase size={20} aria-hidden="true" /> Work experience
      </h2>
      {RESUME_DATA.experience.map((exp) => (
        <article key={exp.id} className={styles.experienceItem}>
          <div className={styles.experienceHeading}>
            <ScrollText as="h3">{exp.role}</ScrollText>
            <p className={styles.meta}>{exp.date}</p>
          </div>
          <p className={styles.company}>{exp.company}</p>
          <ScrollText className={styles.experienceDescription}>{exp.description}</ScrollText>
          <div className={styles.workPhoto}>
            {failedImages[exp.id] ? (
              <p className={styles.imageFallback}>Workplace photo unavailable.</p>
            ) : (
              <Image src={exp.imageUrl} alt={`Workplace photo for ${exp.company}`} fill sizes="(min-width: 800px) 480px, (min-width: 600px) 640px, 100vw" onError={() => setFailedImages((previous) => ({ ...previous, [exp.id]: true }))} />
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
