import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { ThemePortrait } from "@/components/common/ThemePortrait";
import { ScrollText } from "@/components/common/ScrollText";
import { Hero } from "@/components/features/home/Hero";
import { ProjectFan } from "@/components/features/home/ProjectFan";
import { Capabilities } from "@/components/features/home/Capabilities";
import { ContactActions } from "@/components/features/home/ContactActions";
import { PORTFOLIO } from "@/lib/portfolio";
import styles from "./page.module.css";
import { MotionProvider } from "@/components/provider/MotionProvider";

export const metadata: Metadata = {
  title: { absolute: "Kevin C. Mercado — Web & Mobile Developer" },
  description: "Independent web and mobile development by Kevin C. Mercado. Explore HerbalAI, Porma Studio, Digicam, and FCFS Scheduler.",
};

export default function Home() {
  return (
    <MotionProvider>
    <div className={styles.home} id="top">
      <Hero />
      <section id="work" className={`${styles.work} page-shell`} aria-labelledby="work-heading">
        <div className={styles.sectionHeading}><div><ScrollText as="h2" id="work-heading">Selected work<span>.</span></ScrollText><ScrollText>Independent ideas, brought to life.</ScrollText></div><Link className="text-link" href="/projects">All projects <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        <ProjectFan />
      </section>
      <Capabilities />
      <section className={`${styles.about} page-shell`} id="about" aria-labelledby="about-heading">
        <div className={styles.aboutPortrait}><ThemePortrait sizes="(max-width: 700px) 130px, 300px" /></div>
        <div className={styles.aboutText}>
          <ScrollText as="h2" id="about-heading">Curious by nature.<br />A builder at heart.</ScrollText>
          <ScrollText>I’m Kevin, an IT student who enjoys figuring out how things work—and how to make them work a little better.</ScrollText>
          <ScrollText>My interests sit where web development, mobile experiences, and AI meet. I learn by building: an ID photo tool, a pocket camera, a platform for Philippine herbal knowledge. Each project starts with a real problem and teaches me something new.</ScrollText>
          <Link className="text-link" href="/about">A little more about me <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>
      <section className={`${styles.contact} page-shell`} id="contact" aria-labelledby="contact-heading">
        <div className={styles.contactSymbol} aria-hidden="true"><Mail size={25} strokeWidth={1.5} /></div>
        <ScrollText as="h2" id="contact-heading">Good things start<br />with a conversation<span>.</span></ScrollText>
        <ScrollText>A project, a role, or an idea you can’t stop thinking about.<br />I’d love to hear it.</ScrollText>
        <a className="action-primary" href={`mailto:${PORTFOLIO.email}`}>Let’s talk <ArrowUpRight size={17} aria-hidden="true" /></a>
        <ContactActions />
      </section>
    </div>
    </MotionProvider>
  );
}
