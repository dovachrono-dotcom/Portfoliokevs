"use client";

import { motionPreference } from "@/lib/motion-preference";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import * as m from "motion/react-m";
import { ToggleGroup } from "radix-ui";
import { FEATURED_PROJECTS } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import styles from "@/app/page.module.css";
import motionStyles from "./ProjectMotion.module.css";
import { useProjectScrollMotion } from "./useProjectScrollMotion";

const projects = FEATURED_PROJECTS.slice(0, 3);

function subscribeReducedMotion(onChange: () => void) {
  const preference = motionPreference();
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

const reducedMotionSnapshot = () => motionPreference().matches;
const serverMotionSnapshot = () => false;

export function ProjectFan() {
  const [{ selected, previous, direction, revision }, setSelection] = useState({ selected: 0, previous: 0, direction: 1, revision: 0 });
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, reducedMotionSnapshot, serverMotionSnapshot);
  const stageRef = useRef<HTMLDivElement>(null);
  useProjectScrollMotion(stageRef);

  function choose(index: number) {
    const next = (index + projects.length) % projects.length;
    setSelection((current) => {
      if (next === current.selected) return current;
      const forward = (next - current.selected + projects.length) % projects.length;
      return { selected: next, previous: current.selected, direction: forward === 1 ? 1 : -1, revision: current.revision + 1 };
    });
  }
  return (
    <div className={styles.projectShowcase} role="region" aria-label="Selected projects">
      <div ref={stageRef} className={styles.fanStage}>
        {projects.map((project, index) => {
          let offset = (index - selected + projects.length) % projects.length;
          if (offset === 2) offset = -1;
          const active = offset === 0;
          const position = offset;
          const resting = { x: `${position * 48}%`, y: Math.abs(position) * 35, rotate: position * 9, scale: active ? 1 : .9, opacity: active ? 1 : .72 };
          const shuffle = active
            ? { x: [null, `${-direction * 5}%`, "0%"], y: [null, -24, 0], rotate: [null, -direction * 2.5, 0], scale: [null, 1.015, 1], opacity: [null, 1, 1] }
            : { x: [null, `${position * (index === previous ? 56 : 64)}%`, resting.x], y: [null, index === previous ? 18 : 66, resting.y], rotate: [null, position * 13, resting.rotate], scale: [null, .87, .9], opacity: [null, index === previous ? .72 : .6, .72] };
          return (
            <m.div key={project.id} className={cn(styles.fanSlot, !active && styles.fanBack)} data-active={active} initial={false}
              animate={reducedMotion || revision === 0 ? resting : shuffle}
              transition={{ duration: reducedMotion ? .16 : .62, times: [0, .58, 1], ease: [0.16, 1, 0.3, 1] }} style={{ zIndex: active ? 3 : index === previous ? 2 : 1 }}>
              <div className={motionStyles.entrance} data-project-entrance data-entry-side={position === 0 ? "center" : position < 0 ? "left" : "right"}>
              <article className={styles.fanCard} inert={!active} aria-hidden={!active} aria-label={project.title}>
                <div className={styles.cardScreenshot}><Image data-project-preview src={project.image} alt={project.imageAlt} width={1280} height={720} sizes="(max-width: 600px) 85vw, 430px" /><span className={styles.cardHost}>{project.host}</span></div>
                <div className={styles.cardContent}>
                  <p className={styles.projectCategory}>{project.category.split(" · ")[0]}</p>
                  <h3><a href={project.url} target="_blank" rel="noopener noreferrer">{project.title}<ArrowUpRight size={22} aria-hidden="true" /></a></h3>
                  <p className={styles.projectDescription}>{project.summary}</p>
                  <ul className={styles.projectTech} aria-label={`${project.title} technologies`}>{project.tech.slice(0, 3).map((tech) => <li key={tech}>{tech}</li>)}</ul>
                </div>
              </article>
              {!active && <button type="button" tabIndex={-1} className={styles.cardSelectOverlay} onClick={() => choose(index)} aria-label={`Show ${project.title}`} />}
              </div>
            </m.div>
          );
        })}
      </div>
      <div className={styles.projectControls}>
        <button type="button" onClick={() => choose(selected - 1)} className={styles.roundControl} aria-label="Previous project"><ArrowLeft size={18} aria-hidden="true" /></button>
        <ToggleGroup.Root type="single" value={projects[selected].id} onValueChange={(id) => { const index = projects.findIndex((project) => project.id === id); if (index >= 0) choose(index); }} className={styles.projectSelector} aria-label="Choose a project">
          {projects.map((project) => <ToggleGroup.Item key={project.id} value={project.id}>{project.title}</ToggleGroup.Item>)}
        </ToggleGroup.Root>
        <button type="button" onClick={() => choose(selected + 1)} className={styles.roundControl} aria-label="Next project"><ArrowRight size={18} aria-hidden="true" /></button>
        <p className={styles.projectStatus} role="status" aria-live="polite">{selected + 1} of {projects.length} · {projects[selected].title}</p>
      </div>
    </div>
  );
}
