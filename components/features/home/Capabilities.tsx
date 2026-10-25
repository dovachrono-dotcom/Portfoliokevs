"use client";

import { useReducedMotion } from "@/lib/motion-preference";

import Image from "next/image";
import { useState } from "react";
import { Accordion } from "radix-ui";
import { ArrowUpRight, Plus } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { FEATURED_PROJECTS } from "@/lib/portfolio";
import { ScrollText } from "@/components/common/ScrollText";
import styles from "@/app/page.module.css";

const capabilities = [
  { id: "interfaces", title: "Considered interfaces", description: "Responsive web experiences with useful details. Porma Studio brings photo editing and print layouts into the browser.", tech: "React · TypeScript · Tailwind CSS", project: FEATURED_PROJECTS[1] },
  { id: "systems", title: "Connected systems", description: "Frontend, backend, and the connections between them. HerbalAI combines a plant library with a source-grounded AI assistant.", tech: "Next.js · Node.js · PostgreSQL", project: FEATURED_PROJECTS[0] },
  { id: "mobile", title: "Everyday mobile tools", description: "Experiences made for the device in your hand. Digicam explores camera controls, photo editing, and local media.", tech: "Flutter · CameraX · Local processing", project: FEATURED_PROJECTS[2] },
];

export function Capabilities() {
  const [selected, setSelected] = useState(capabilities[0].id);
  const current = capabilities.find((item) => item.id === selected) ?? capabilities[0];
  const reducedMotion = useReducedMotion();
  return (
    <section className={`${styles.capabilities} page-shell`} aria-labelledby="capabilities-heading">
      <div className={styles.capabilitiesHeading}><ScrollText as="h2" id="capabilities-heading">From interface<br />to implementation.</ScrollText><ScrollText>I like understanding how the pieces fit together, then making the whole thing feel simple.</ScrollText></div>
      <div className={styles.capabilitiesInner}>
        <Accordion.Root type="single" value={selected} onValueChange={setSelected} className={styles.capabilityList}>
          {capabilities.map((item) => <Accordion.Item value={item.id} key={item.id} className={styles.capabilityItem}>
            <Accordion.Header><Accordion.Trigger className={styles.capabilityTrigger}>{item.title}<Plus size={20} aria-hidden="true" /></Accordion.Trigger></Accordion.Header>
            <Accordion.Content className={styles.capabilityContent}><p>{item.description}</p><span>{item.tech}</span><a className="text-link" href={item.project.url} target="_blank" rel="noopener noreferrer">Explore {item.project.title} <ArrowUpRight size={16} aria-hidden="true" /></a></Accordion.Content>
          </Accordion.Item>)}
        </Accordion.Root>
        <div className={styles.capabilityPreview}>
          <div className={styles.capabilityImages}>
            <AnimatePresence initial={false}>
              <m.div key={current.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .18 }}>
                <Image src={current.project.image} alt={current.project.imageAlt} width={1280} height={720} sizes="(max-width: 700px) 90vw, 600px" />
              </m.div>
            </AnimatePresence>
          </div>
          <div className={styles.capabilityCaption}><span>{current.project.title}</span><span>A working example <ArrowUpRight size={15} aria-hidden="true" /></span></div>
        </div>
      </div>
    </section>
  );
}
