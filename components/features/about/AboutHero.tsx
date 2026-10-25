import { RESUME_DATA } from "@/lib/data";
import { PORTFOLIO } from "@/lib/portfolio";
import { Download } from "lucide-react";
import { ThemePortrait } from "@/components/common/ThemePortrait";
import { ScrollText } from "@/components/common/ScrollText";
import styles from "./About.module.css";

export function AboutHero() {
  return (
    <section aria-labelledby="about-name" className={styles.hero}>
      <header className={styles.identity}>
        <ScrollText as="h1" id="about-name">{RESUME_DATA.profile.name}</ScrollText>
        <p className={styles.role}>{RESUME_DATA.profile.role}</p>
        <a href={PORTFOLIO.cv} download data-glow="button" className={styles.cvButton}>
          <Download size={17} aria-hidden="true" /> Download CV
        </a>
      </header>
      <div className={styles.portrait}>
        <ThemePortrait priority sizes="(min-width: 800px) 240px, (min-width: 600px) 176px, 112px" />
      </div>
      <div className={styles.bio}>
        <ScrollText>{RESUME_DATA.profile.about}</ScrollText>
        <ScrollText>{RESUME_DATA.profile.approach}</ScrollText>
        <ScrollText className={styles.personalNote}>{RESUME_DATA.profile.interests}</ScrollText>
      </div>
    </section>
  );
}
