"use client";

import { useReducedMotion } from "@/lib/motion-preference";

import Image from "next/image";
import { useId, useState } from "react";
import { Accordion, Tabs } from "radix-ui";
import { AnimatePresence, LayoutGroup } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, ChevronDown, Folder, FolderOpen } from "lucide-react";
import { FEATURED_PROJECTS, type FeaturedProject } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import styles from "./Projects.module.css";

const spring = { type: "spring" as const, stiffness: 260, damping: 30 };

function FolderSurface({ projectId, open, reduced }: { projectId: string; open?: boolean; reduced: boolean }) {
  return (
    <m.span layoutId={"folder-surface-" + projectId} transition={reduced ? { duration: 0 } : spring}
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit] border border-[var(--archive-border)]",
        open ? "bg-[var(--archive-surface)] shadow-[0_18px_48px_-30px_var(--archive-shadow),inset_0_1px_0_var(--archive-highlight)]" : "bg-[var(--archive-tab)] shadow-[4px_8px_18px_-14px_var(--archive-shadow),inset_0_1px_0_var(--archive-highlight)]")}>
      {open && <span className="absolute -left-px -top-[17px] h-[18px] w-40 rounded-t-[12px] border border-b-0 border-[var(--archive-border)] bg-[var(--archive-surface)]" />}
    </m.span>
  );
}

function FolderName({ project, reduced, vertical = false }: { project: FeaturedProject; reduced: boolean; vertical?: boolean }) {
  return (
    <m.span layout="position" layoutId={"folder-name-" + project.id} transition={reduced ? { duration: 0 } : spring}
      className={cn("relative inline-block", vertical && "text-[15px] font-medium [writing-mode:vertical-rl]")}>
      {project.title}
    </m.span>
  );
}

function ProjectBody({ project, reduced = false, sharedName = false }: { project: FeaturedProject; reduced?: boolean; sharedName?: boolean }) {
  return (
    <div className={styles.projectBody}>
      <div className={styles.bodyHeader}>
        <div>
          <p className={styles.projectName}><FolderOpen size={16} aria-hidden="true" className="text-[var(--archive-accent)]" />{sharedName ? <FolderName key={project.id} project={project} reduced={reduced} /> : project.title}</p>
          <p className={styles.projectCategory}>{project.category}</p>
        </div>
        <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={"Visit " + project.title + " (opens in a new tab)"}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-[var(--archive-border)] text-[var(--archive-text)] transition-colors hover:bg-[var(--archive-tab)] focus-visible:outline-[var(--archive-accent)]">
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
      {/* Keep the shared folder name outside the preview's entrance animation. */}
      <AnimatePresence initial={false}>
        <m.div key={project.id} className={styles.projectDetails} initial={sharedName ? { opacity: 0, y: reduced ? 0 : 12 } : false}
          animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .22, ease: "easeOut" }}>
          <div className="overflow-hidden rounded-[10px] border border-[var(--archive-border)] bg-[var(--archive-page)]">
            <div className="flex h-7 items-center gap-3 border-b border-[var(--archive-border)] px-3">
              <span className="flex gap-1" aria-hidden="true"><i className="size-1.5 rounded-full bg-[var(--archive-muted)] opacity-40" /><i className="size-1.5 rounded-full bg-[var(--archive-muted)] opacity-40" /><i className="size-1.5 rounded-full bg-[var(--archive-muted)] opacity-40" /></span>
              <span className="min-w-0 truncate text-[11px] text-[var(--archive-muted)]">{project.host}</span>
            </div>
            <div className={styles.preview} data-static-project-preview>
              <Image src={project.image} alt={project.imageAlt} width={1280} height={720} loading="eager"
                sizes="(max-width: 700px) 88vw, (max-width: 1100px) 65vw, 860px" className={styles.previewImage} />
            </div>
          </div>
          <p className={styles.summary}>{project.summary}</p>
          <div className={styles.bodyActions}>
            <ul className="flex flex-wrap gap-2" aria-label={project.title + " technologies"}>
              {project.tech.slice(0, 3).map((tech) => <li key={tech} className="rounded-md border border-[var(--archive-border)] bg-[var(--archive-tab)] px-2.5 py-1.5 text-[12px] text-[var(--archive-muted)]">{tech}</li>)}
            </ul>
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-3 text-[14px] font-medium text-[var(--archive-text)] underline decoration-[var(--archive-border)] underline-offset-[6px] hover:text-[var(--archive-accent)] focus-visible:outline-[var(--archive-accent)]">
              Open live project <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </m.div>
      </AnimatePresence>
    </div>
  );
}

export function ProjectsList() {
  const [selected, setSelected] = useState(FEATURED_PROJECTS[0].id);
  const reduced = useReducedMotion() === true;
  const instanceId = useId();
  const noiseId = "archive-grain-" + instanceId.replace(/:/g, "");
  const project = FEATURED_PROJECTS.find((item) => item.id === selected) ?? FEATURED_PROJECTS[0];
  const transition = reduced ? { duration: 0 } : spring;

  return (
    <section aria-label="Project archive"
      className={styles.archive + " archive-root relative text-[var(--archive-text)] [--archive-page:#f4f6f9] [--archive-surface:#ffffff] [--archive-tab:#e9edf3] [--archive-active:#dfe6f2] [--archive-text:#1a1d25] [--archive-muted:#5d6472] [--archive-border:#cbd1dc] [--archive-accent:#244fc7] [--archive-shadow:rgba(15,23,42,0.22)] [--archive-highlight:rgba(255,255,255,0.8)] dark:[--archive-page:#0b0c0f] dark:[--archive-surface:#14161b] dark:[--archive-tab:#1a1d23] dark:[--archive-active:#242a36] dark:[--archive-text:#eef1f6] dark:[--archive-muted:#a0a7b5] dark:[--archive-border:rgba(255,255,255,0.06)] dark:[--archive-accent:#7aa2ff] dark:[--archive-shadow:rgba(0,0,0,0.65)] dark:[--archive-highlight:rgba(255,255,255,0.035)]"}>
      <div className={styles.archiveHeading}>
        <p className="flex items-center gap-2.5 text-[14px] font-medium"><FolderOpen size={17} aria-hidden="true" />Project archive</p>
        <span className="text-[12px] text-[var(--archive-muted)]">{FEATURED_PROJECTS.length} folders · Select one to explore</span>
      </div>

      <LayoutGroup id={instanceId}>
        <Tabs.Root value={selected} onValueChange={setSelected} className="relative hidden grid-cols-[minmax(0,3fr)_minmax(180px,1fr)] min-[701px]:grid">
          <Tabs.List aria-label="Choose a project folder" className="col-start-2 row-start-1 flex min-w-0 items-stretch pb-3 pt-7">
            {FEATURED_PROJECTS.map((item, index) => <Tabs.Trigger key={item.id} value={item.id} asChild>
              <m.button layout transition={transition} whileHover={reduced ? undefined : { y: -4 }}
                style={{ marginTop: index * 14, zIndex: FEATURED_PROJECTS.length - index }}
                className={cn("relative -ml-2 flex min-w-0 flex-1 flex-col items-center gap-6 rounded-r-[12px] px-3 pb-6 pt-7 text-[var(--archive-muted)] outline-offset-4 first:ml-0 hover:text-[var(--archive-text)] focus-visible:outline-[var(--archive-accent)]",
                  selected === item.id && "bg-[var(--archive-active)] text-[var(--archive-text)]")}>
                {selected !== item.id && <FolderSurface projectId={item.id} reduced={reduced} />}
                {selected === item.id ? <FolderOpen size={20} aria-hidden="true" className="relative text-[var(--archive-accent)]" /> : <Folder size={20} aria-hidden="true" className="relative" />}
                {selected === item.id ? <span className="relative text-[15px] font-medium [writing-mode:vertical-rl]">{item.title}</span> : <FolderName project={item} reduced={reduced} vertical />}
              </m.button>
            </Tabs.Trigger>)}
          </Tabs.List>
          <m.div layout transition={transition} className="relative z-10 col-start-1 row-start-1 min-w-0 rounded-[14px_0_14px_14px]">
            <FolderSurface key={selected} projectId={selected} open reduced={reduced} />
            <Tabs.Content value={selected} className={styles.panelContent}>
              <article>
                <ProjectBody project={project} reduced={reduced} sharedName />
              </article>
            </Tabs.Content>
          </m.div>
        </Tabs.Root>

        <Accordion.Root type="single" value={selected} onValueChange={setSelected} className="space-y-3 min-[701px]:hidden" aria-label="Project folders">
          {FEATURED_PROJECTS.map((item) => <Accordion.Item key={item.id} value={item.id} asChild>
            <m.div layout transition={transition} className="relative isolate rounded-[12px] border border-[var(--archive-border)] bg-[var(--archive-surface)]">
              <Accordion.Header>
                <Accordion.Trigger className="group flex min-h-[64px] w-full items-center gap-3 rounded-[12px] px-4 text-left text-[15px] font-medium text-[var(--archive-muted)] data-[state=open]:text-[var(--archive-text)] focus-visible:outline-[var(--archive-accent)]">
                  {selected === item.id ? <FolderOpen size={20} aria-hidden="true" className="shrink-0 text-[var(--archive-accent)]" /> : <Folder size={20} aria-hidden="true" className="shrink-0" />}
                  <span className="flex-1">{item.title}</span><ChevronDown size={17} aria-hidden="true" className="shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="archive-mobile-content px-4 pb-5">
                <article>
                  <ProjectBody project={item} />
                </article>
              </Accordion.Content>
            </m.div>
          </Accordion.Item>)}
        </Accordion.Root>
      </LayoutGroup>

      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 size-full opacity-[0.03]">
        <filter id={noiseId}><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter={"url(#" + noiseId + ")"} />
      </svg>
      <style jsx global>{"@media(prefers-reduced-motion:no-preference){html:not([data-motion=reduced]) .archive-mobile-content[data-state=open]>article{animation:archive-content-in 250ms ease-out}}html[data-motion=full] .archive-mobile-content[data-state=open]>article{animation:archive-content-in 250ms ease-out}@keyframes archive-content-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}"}</style>
    </section>
  );
}
