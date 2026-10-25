"use client";

import { motionPreference } from "@/lib/motion-preference";

import { useEffect, useRef } from "react";
import { createSiteBackgroundMotion } from "./site-background-motion";
import styles from "./SiteBackground.module.css";

const staticCells = [[2, 2], [4, 4], [6, 1], [3, 6], [8, 5], [5, 3]];

export function SiteBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const content = root?.closest<HTMLElement>("[data-site-shell]");
    if (!root || !content) return;
    const reduced = motionPreference();
    const mobile = window.matchMedia("(max-width: 767px)");
    const fine = window.matchMedia("(pointer: fine)");
    let dispose: (() => void) | undefined;
    function restart() {
      dispose?.();
      dispose = createSiteBackgroundMotion(root!, content!, { pixel: styles.pixel, runner: styles.runner }, { reduced: reduced.matches, mobile: mobile.matches, fine: fine.matches });
    }
    restart();
    for (const media of [reduced, mobile, fine]) media.addEventListener("change", restart);
    return () => {
      dispose?.();
      for (const media of [reduced, mobile, fine]) media.removeEventListener("change", restart);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root} data-site-background data-motion="still" data-running="false" data-theme-motion aria-hidden="true">
      <div className={styles.glow} data-theme-motion><div className={`${styles.orb} ${styles.orbOne}`} data-theme-motion /><div className={`${styles.orb} ${styles.orbTwo}`} data-theme-motion /></div>
      <div className={styles.sweep} data-theme-motion />
      <div className={styles.pixels} data-background-pixels data-theme-motion />
      <div className={styles.staticPixels} data-static-pixels data-theme-motion>
        {staticCells.map(([column, row]) => <span key={`${column}-${row}`} className={styles.pixel} style={{ left: column * 28, top: row * 28 }} data-theme-motion />)}
      </div>
      <div className={styles.grain} data-theme-motion />
      <div className={styles.spot} data-background-spotlight data-theme-motion />
      <div className={styles.contrastGuard} data-theme-motion />
      <div className={styles.grid} data-theme-motion />
      <div className={styles.cursorPixels} data-cursor-pixels data-theme-motion />
    </div>
  );
}
