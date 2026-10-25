import { AboutHero } from "@/components/features/about/AboutHero";
import { Skills } from "@/components/features/about/Skills";
import { Certificates } from "@/components/features/about/Certificates";
import { Experience } from "@/components/features/about/Experience";
import { Education } from "@/components/features/about/Education";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "@/components/features/about/About.module.css";
import { MotionProvider } from "@/components/provider/MotionProvider";

export default function AboutPage() {
  return (
    <MotionProvider>
    <div className={styles.page}>
      <AboutHero />
      <Skills />
      <div className={styles.backgroundGrid}>
        <Education />
        <Experience />
      </div>
      <Certificates />
      <nav aria-label="Explore more about Kevin" className={styles.nextSteps}>
        <p>See what I’m building.</p>
        <div>
          <Link href="/projects">View projects <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Link href="/contact">Get in touch <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </nav>
    </div>
    </MotionProvider>
  );
}
