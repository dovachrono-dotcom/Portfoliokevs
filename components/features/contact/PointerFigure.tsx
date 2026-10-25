"use client";

import { motionPreference } from "@/lib/motion-preference";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import styles from "./Contact.module.css";

function subscribeMotion(onChange: () => void) {
  const media = motionPreference();
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
const motionSnapshot = () => motionPreference().matches;
const serverSnapshot = () => false;

export function PointerFigure() {
  const { resolvedTheme } = useTheme();
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, serverSnapshot);
  const figure = useRef<HTMLDivElement>(null);
  const previousTheme = useRef<string | null>(null);

  useEffect(() => {
    const node = figure.current;
    if (!node || !resolvedTheme) return;
    if (!previousTheme.current || previousTheme.current === resolvedTheme || node.getClientRects().length === 0) {
      previousTheme.current = resolvedTheme;
      node.dataset.visibleTheme = resolvedTheme;
      node.dataset.targetTheme = resolvedTheme;
      return;
    }

    const from = previousTheme.current;
    previousTheme.current = resolvedTheme;
    node.dataset.visibleTheme = from;
    node.dataset.targetTheme = resolvedTheme;
    const incoming = node.querySelector<HTMLElement>('[data-figure-layer="' + resolvedTheme + '"]');
    const outgoing = node.querySelector<HTMLElement>('[data-figure-layer="' + from + '"]');
    const mask = node.querySelector<HTMLElement>("[data-figure-streak]");
    const travel = node.querySelector<HTMLElement>("[data-figure-travel]");
    if (!incoming || !outgoing || !mask || !travel) return;
    let cancelled = false;
    const animations: Animation[] = [];

    if (reduced) {
      animations.push(
        incoming.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: "both" }),
        outgoing.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "both" }),
      );
    } else {
      const dark = resolvedTheme === "dark";
      const ease = "cubic-bezier(0.65,0,0.35,1)";
      animations.push(
        incoming.animate([
          { opacity: 1, clipPath: dark ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)", transform: "scale(1.04)" },
          { opacity: 1, clipPath: "inset(0 0 0 0)", transform: "scale(1)" },
        ], { duration: 600, delay: 150, easing: ease, fill: "both" }),
        outgoing.animate([
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: dark ? "translateY(-4%)" : "translateY(4%)" },
        ], { duration: 750, easing: ease, fill: "both" }),
        mask.animate([{ opacity: 0 }, { opacity: .7, offset: .2 }, { opacity: .7, offset: .8 }, { opacity: 0 }], { duration: 500, delay: 300, fill: "both" }),
        travel.animate([{ transform: "translateX(60%)" }, { transform: "translateX(-60%)" }], { duration: 500, delay: 300, easing: "ease-in-out", fill: "both" }),
      );
    }

    Promise.all(animations.map((animation) => animation.finished)).then(() => {
      if (cancelled) return;
      node.dataset.visibleTheme = resolvedTheme;
      animations.forEach((animation) => animation.cancel());
    }).catch(() => undefined);
    return () => {
      cancelled = true;
      animations.forEach((animation) => animation.cancel());
    };
  }, [reduced, resolvedTheme]);

  return (
    <div ref={figure} className={styles.figure} data-visible-theme="auto" data-target-theme="auto" aria-hidden="true">
      <div className={styles.footShadow} />
      <div className={styles.figureFacing}>
        <div data-figure-layer="light" className={styles.figureLayer}><Image src="/contact/pointer-light.webp" alt="" fill sizes="240px" priority unoptimized className={styles.figureImage} /></div>
        <div data-figure-layer="dark" className={styles.figureLayer}><Image src="/contact/pointer-dark.webp" alt="" fill sizes="240px" priority unoptimized className={styles.figureImage} /></div>
        <div data-figure-streak className={styles.figureStreak}><div data-figure-travel className={styles.streakTravel}><span /></div></div>
      </div>
    </div>
  );
}
