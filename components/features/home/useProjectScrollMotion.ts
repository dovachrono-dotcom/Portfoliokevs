"use client";

import { motionPreference } from "@/lib/motion-preference";

import { useEffect, useRef, type RefObject } from "react";

export function useProjectScrollMotion(stageRef: RefObject<HTMLDivElement | null>) {
  const entered = useRef(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduced = motionPreference();
    const wrappers = [...stage.querySelectorAll<HTMLElement>("[data-project-entrance]")];
    const images = [...stage.querySelectorAll<HTMLImageElement>("[data-project-preview]")];
    const animations = new Set<Animation>();
    let frame = 0;
    let near = false;
    const ownsJSClass = !document.documentElement.classList.contains("js");
    document.documentElement.classList.add("js");

    function clearWrapper(wrapper: HTMLElement) {
      wrapper.removeAttribute("data-entry-pending");
      wrapper.style.removeProperty("will-change");
    }
    function finish() {
      entered.current = true;
      for (const animation of animations) { animation.onfinish = null; animation.cancel(); }
      animations.clear();
      wrappers.forEach(clearWrapper);
    }
    function resetImages() {
      images.forEach((image) => image.style.removeProperty("transform"));
    }
    function play() {
      if (entered.current) return;
      if (reduced.matches || typeof Element.prototype.animate !== "function") { finish(); return; }
      entered.current = true;
      for (const wrapper of wrappers) {
        const from = getComputedStyle(wrapper).transform;
        wrapper.style.willChange = "transform, opacity";
        const animation = wrapper.animate([{ opacity: 0, transform: from }, { opacity: 1, transform: "none" }], {
          duration: 1400,
          delay: wrapper.dataset.entrySide === "center" ? 0 : 350,
          easing: "cubic-bezier(.65,0,.35,1)",
          fill: "both",
        });
        animations.add(animation);
        animation.onfinish = () => { clearWrapper(wrapper); animations.delete(animation); animation.cancel(); };
      }
    }
    function update() {
      frame = 0;
      const rect = stage!.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (!entered.current) {
        if (rect.bottom <= 0) finish();
        else if (window.scrollY > 0 && (near || (viewport * .78 < rect.height * .25 && rect.top < viewport * .78 && rect.bottom > 0))) play();
      }
      if (reduced.matches || window.innerWidth < 900) { resetImages(); return; }
      if (rect.bottom < 0 || rect.top > viewport) return;
      const positions = images.map((image) => {
        const parent = image.parentElement!;
        const bounds = parent.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, ((bounds.top + bounds.height / 2) - viewport / 2) / viewport));
        const scale = image.clientHeight >= parent.clientHeight + 80 ? 1 : 1.2;
        const travel = Math.min(40, Math.max(0, (image.clientHeight * scale - parent.clientHeight) / 2));
        const y = Math.max(-travel, Math.min(travel, progress * -40));
        return { image, y, scale };
      });
      positions.forEach(({ image, y, scale }) => { image.style.transform = `translate3d(0,${y.toFixed(1)}px,0) scale(${scale})`; });
    }
    function requestUpdate() { if (!frame) frame = requestAnimationFrame(update); }
    function preferenceChanged() {
      if (reduced.matches) { finish(); resetImages(); }
      requestUpdate();
    }
    const observer = typeof IntersectionObserver === "undefined" ? undefined : new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting && entry.intersectionRatio >= .25;
      if (entry.boundingClientRect.bottom <= 0) finish();
      requestUpdate();
    }, { threshold: .25, rootMargin: "0px 0px -22% 0px" });

    if (reduced.matches || !observer || window.scrollY > 0 || entered.current || typeof Element.prototype.animate !== "function") finish();
    else wrappers.forEach((wrapper) => wrapper.setAttribute("data-entry-pending", ""));
    observer?.observe(stage);
    stage.addEventListener("focusin", finish);
    stage.addEventListener("load", requestUpdate, true);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    window.addEventListener("pageshow", requestUpdate);
    reduced.addEventListener("change", preferenceChanged);
    requestUpdate();

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      for (const animation of animations) { animation.onfinish = null; animation.cancel(); }
      wrappers.forEach(clearWrapper);
      resetImages();
      stage.removeEventListener("focusin", finish);
      stage.removeEventListener("load", requestUpdate, true);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("pageshow", requestUpdate);
      reduced.removeEventListener("change", preferenceChanged);
      if (ownsJSClass) document.documentElement.classList.remove("js");
    };
  }, [stageRef]);
}
