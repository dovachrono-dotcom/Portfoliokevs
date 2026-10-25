"use client";

import { motionPreference } from "@/lib/motion-preference";

import { useEffect, type RefObject } from "react";

export function useSiteScrollMotion(root: RefObject<HTMLDivElement | null>, pathname: string) {
  useEffect(() => {
    const container = root.current;
    if (!container || !window.IntersectionObserver || !Element.prototype.animate) return;

    const reduced = motionPreference();
    let seen = new WeakSet<HTMLElement>();
    let wasReduced = reduced.matches;
    const arrivals = new WeakSet<HTMLElement>();
    const pending = new Map<HTMLElement, HTMLElement[]>();
    const playing = new Map<HTMLElement, Animation[]>();

    function clear(block: HTMLElement) {
      playing.get(block)?.forEach((animation) => animation.cancel());
      playing.delete(block);
      pending.get(block)?.forEach((word) => {
        word.style.removeProperty("opacity");
        word.style.removeProperty("transform");
      });
      pending.delete(block);
      block.removeAttribute("data-scroll-pending");
    }

    function reveal(block: HTMLElement) {
      observer.unobserve(block);
      const words = pending.get(block);
      if (!words || reduced.matches) { clear(block); return; }

      const heading = /^H[1-3]$/.test(block.tagName);
      const arrival = arrivals.has(block);
      const stagger = Math.min(heading ? 32 : 18, 280 / Math.max(words.length - 1, 1));
      const animations = words.map((word, index) => word.animate(
        [
          { opacity: arrival ? .65 : 0, transform: `translate3d(0,${heading ? 16 : 8}px,0)`, clipPath: arrival ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" },
          { opacity: 1, transform: "translate3d(0,0,0)", clipPath: "inset(0 0 0 0)" },
        ],
        { duration: heading ? 620 : 460, delay: index * stagger, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" },
      ));
      playing.set(block, animations);
      Promise.all(animations.map((animation) => animation.finished)).then(() => clear(block)).catch(() => {});
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) reveal(entry.target as HTMLElement); });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });

    function scan(rearm = false) {
      if (!container) return;
      // Measure all new blocks before writing animation styles to avoid repeated layout work.
      const blocks = [...container.querySelectorAll<HTMLElement>("[data-scroll-text]")]
        .filter((block) => !seen.has(block))
        .map((block) => ({ block, bounds: block.getBoundingClientRect() }));
      blocks.forEach(({ block, bounds }) => {
        seen.add(block);
        const visible = bounds.top < window.innerHeight && bounds.bottom > 0;
        // Restored visits stay steady. Fresh page headings enter from a readable state.
        if (reduced.matches || (visible && (rearm || window.scrollY > 8)) || (!rearm && bounds.top < 0)) return;
        if (visible) arrivals.add(block);
        const words = Array.from(block.querySelectorAll<HTMLElement>("[data-scroll-word]"));
        if (!words.length) return;
        pending.set(block, words);
        block.setAttribute("data-scroll-pending", "");
        words.forEach((word) => {
          word.style.opacity = visible ? ".65" : "0";
          word.style.transform = `translate3d(0,${/^H/.test(block.tagName) ? 16 : 8}px,0)`;
        });
        observer.observe(block);
      });
    }

    const onMotionChange = () => {
      if (wasReduced === reduced.matches) return;
      wasReduced = reduced.matches;
      if (reduced.matches) {
        observer.disconnect();
        Array.from(pending.keys()).forEach(clear);
      } else {
        seen = new WeakSet();
        scan(true);
      }
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const block = event.target.closest<HTMLElement>("[data-scroll-text]");
      if (block) { observer.unobserve(block); clear(block); }
    };
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted && window.scrollY < 8) return;
      pending.forEach((_, block) => {
        if (block.getBoundingClientRect().top < window.innerHeight) { observer.unobserve(block); clear(block); }
      });
    };

    scan();
    const mutations = new MutationObserver(() => scan());
    mutations.observe(container, { childList: true, subtree: true });
    reduced.addEventListener("change", onMotionChange);
    container.addEventListener("focusin", onFocus);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      mutations.disconnect();
      observer.disconnect();
      reduced.removeEventListener("change", onMotionChange);
      container.removeEventListener("focusin", onFocus);
      window.removeEventListener("pageshow", onPageShow);
      Array.from(pending.keys()).forEach(clear);
    };
  }, [root, pathname]);
}
