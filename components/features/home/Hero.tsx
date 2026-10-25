"use client";

import { useReducedMotion } from "@/lib/motion-preference";

import { useEffect } from "react";
import { ArrowDown, Download } from "lucide-react";
import { stagger, useAnimate } from "motion/react";
import { ThemePortrait } from "@/components/common/ThemePortrait";
import { PORTFOLIO } from "@/lib/portfolio";
import styles from "@/app/page.module.css";

export function Hero() {
  const [scope, animate] = useAnimate();
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion !== false) return;
    const controls = animate("[data-intro-part]", { opacity: [.65, 1], y: [14, 0] }, { duration: .55, delay: stagger(.075), ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [animate, reducedMotion]);
  return (
    <section ref={scope} className={styles.heroRegion} aria-labelledby="intro-heading">
      <div className={`${styles.hero} page-shell`}>
      <div className={styles.heroCopy}>
        <div className={styles.heroIdentity}>
        <h1 id="intro-heading" aria-label="Kevin C. Mercado." data-intro-part><span data-glow-word data-theme-motion aria-hidden="true">Kevin</span>{" "}<span data-glow-word data-theme-motion aria-hidden="true">C.</span><br /><span data-glow-word data-theme-motion aria-hidden="true">Mercado</span><span className={styles.heroPeriod} data-glow="period" data-theme-motion aria-hidden="true">.</span></h1>
        <p className={styles.heroRole} data-glow="subtle-text" data-intro-part>Web &amp; mobile developer</p>
        </div>
        <p className={styles.introduction} data-glow="subtle-text" data-intro-part>I turn everyday problems into thoughtful digital experiences. From the first idea to the final interaction.</p>
        <div className={styles.heroActions} data-intro-part>
          <a className="action-primary" href="#work">View work <ArrowDown size={17} aria-hidden="true" /></a>
          <a className="action-secondary" href={PORTFOLIO.cv} download>Download CV <Download size={16} aria-hidden="true" /></a>
        </div>
      </div>
      <div className={styles.heroPortrait} data-intro-part>
        <ThemePortrait priority sizes="(max-width: 700px) 120px, (max-width: 900px) 34vw, 350px" />
      </div>
      <div className={styles.heroFootnote}><span>Independent projects. Built with purpose.</span><a href="#work" aria-label="Scroll to selected work"><ArrowDown size={19} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}
