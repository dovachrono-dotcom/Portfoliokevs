"use client";

import { LazyMotion, domMax, MotionConfig } from "motion/react";
import { useEffect } from "react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.motion = "full";
    try { window.localStorage.removeItem("portfolio-motion"); } catch {}
  }, []);
  return <LazyMotion features={domMax} strict><MotionConfig reducedMotion="never">{children}</MotionConfig></LazyMotion>;
}
