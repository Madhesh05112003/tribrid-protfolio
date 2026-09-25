"use client";

import { useEffect } from "react";

/**
 * Lenis smooth scrolling. Destroyed entirely when the visitor has asked for
 * reduced motion, so native scrolling stays intact.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | undefined;
    let frame = 0;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const instance = new Lenis({
        duration: 1.05,
        lerp: 0.09,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        autoRaf: false,
      });
      lenis = instance;

      const raf = (time: number) => {
        instance.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
