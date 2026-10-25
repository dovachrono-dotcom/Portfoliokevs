"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { animate, cubicBezier, useMotionValue, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";

const serverSnapshot = () => false;
const revealEase = cubicBezier(.65, 0, .35, 1);

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function reducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type ThemePortraitProps = {
  lightSrc?: string;
  darkSrc?: string;
  caption?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function ThemePortrait({
  lightSrc = "/portraits/kevin-light.png",
  darkSrc = "/portraits/kevin-dark.png",
  caption = "The person behind the pixels.",
  alt = "Kevin C. Mercado",
  className,
  priority = false,
  sizes = "(max-width: 700px) 120px, 380px",
}: ThemePortraitProps) {
  const { resolvedTheme } = useTheme();
  const reduced = useSyncExternalStore(subscribeReducedMotion, reducedMotionSnapshot, serverSnapshot);
  const frameRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const reveal = useTransform(progress, [.15, .75], [0, 1], { ease: revealEase });
  const darkClip = useTransform(reveal, (value) => "inset(" + ((1 - value) * 100) + "% 0% 0% 0%)");
  const lightY = useTransform(progress, [0, 1], ["0%", "-8%"]);
  const darkY = useTransform(progress, [0, 1], ["8%", "0%"]);
  const lightScale = useTransform(progress, [0, 1], [1, 1.16]);
  const darkScale = useTransform(progress, [0, 1], [1.16, 1]);
  const lightOpacity = useTransform(progress, [0, 1], [1, 0]);
  const darkOpacity = useTransform(progress, [0, 1], [0, 1]);
  const scaleTarget = useTransform(progress, [0, .15, .75, 1], [1, .98, .98, 1]);
  const scale = useSpring(scaleTarget, { stiffness: 360, damping: 22, mass: .5, restDelta: .0001, restSpeed: .001 });
  const streakX = useTransform(progress, [.3, .8], ["-60%", "60%"]);
  const streakOpacity = useTransform(progress, [0, .29, .35, .7, .8, 1], [0, 0, .7, .7, 0, 0]);

  useEffect(() => {
    const node = frameRef.current;
    if (!node || !resolvedTheme) return;
    const target = resolvedTheme === "dark" ? 1 : 0;
    if (node.dataset.portraitReady !== "true") {
      progress.set(target);
      const readyFrame = window.requestAnimationFrame(() => {
        node.dataset.portraitReady = "true";
      });
      return () => window.cancelAnimationFrame(readyFrame);
    }
    const distance = Math.abs(target - progress.get());
    if (distance < .0001) return;
    const controls = animate(progress, target, {
      duration: reduced ? .3 : distance,
      ease: "linear",
    });
    return () => controls.stop();
  }, [progress, reduced, resolvedTheme]);

  return (
    <figure className={"theme-portrait m-0 w-full [--portrait-frame:hsl(var(--portrait-stage))] [--portrait-caption:hsl(var(--muted-foreground))] [--portrait-shadow:0_12px_28px_-16px_hsl(var(--shadow)/.35)] dark:[--portrait-shadow:0_16px_32px_-18px_rgba(0,0,0,.65)]" + (className ? " " + className : "")}>
      <m.div ref={frameRef} data-portrait-ready="false" data-glow="portrait" role="img" aria-label={alt}
        className="relative isolate aspect-[3/4] overflow-hidden rounded-[16px] bg-[var(--portrait-frame)] shadow-[var(--portrait-shadow)] data-[portrait-ready=false]:[&_[data-portrait-light]]:opacity-100! data-[portrait-ready=false]:[&_[data-portrait-light]]:transform-none! dark:data-[portrait-ready=false]:[&_[data-portrait-light]]:opacity-0! data-[portrait-ready=false]:[&_[data-portrait-dark]]:opacity-0! data-[portrait-ready=false]:[&_[data-portrait-dark]]:[clip-path:inset(0)]! dark:data-[portrait-ready=false]:[&_[data-portrait-dark]]:opacity-100! data-[portrait-ready=false]:[&_[data-portrait-dark-image]]:transform-none! data-[portrait-ready=false]:[&_[data-portrait-streak]]:opacity-0!"
        style={{ scale: reduced ? 1 : scale }}>
        <m.div data-portrait-light className="absolute inset-0"
          style={{ y: reduced ? "0%" : lightY, scale: reduced ? 1 : lightScale, opacity: reduced ? lightOpacity : 1 }}>
          <Image src={lightSrc} alt="" aria-hidden="true" fill sizes={sizes} priority={priority} loading={priority ? undefined : "eager"} decoding="async" className="object-cover object-[50%_56%]" />
        </m.div>
        <m.div data-portrait-dark className="absolute inset-0"
          style={{ clipPath: reduced ? "inset(0% 0% 0% 0%)" : darkClip, opacity: reduced ? darkOpacity : 1 }}>
          <m.div data-portrait-dark-image className="absolute inset-0" style={{ y: reduced ? "0%" : darkY, scale: reduced ? 1 : darkScale }}>
            <Image src={darkSrc} alt="" aria-hidden="true" fill sizes={sizes} priority={priority} loading={priority ? undefined : "eager"} decoding="async" className="object-cover object-[53%_50%]" />
          </m.div>
        </m.div>
        <m.div data-portrait-streak aria-hidden="true" className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={{ x: streakX, opacity: reduced ? 0 : streakOpacity }}>
          <span className="absolute inset-y-0 left-1/2 w-[2px] blur-[0.6px]" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,.95), transparent)" }} />
        </m.div>
      </m.div>
      {caption && <figcaption data-glow="subtle-text" className="portrait-caption mt-3 text-[12px] leading-[1.6] text-[var(--portrait-caption)]">{caption}</figcaption>}
    </figure>
  );
}
