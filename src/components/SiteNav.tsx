"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { navItems, project } from "@/content/project";

export function SiteNav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-acid focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:text-void"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="border-b border-edge/70 bg-void/72 backdrop-blur-xl">
          <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-6 px-5 sm:px-8">
            <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
              <span
                aria-hidden
                className="grid size-6 place-items-center rounded-[5px] bg-acid font-mono text-[11px] font-bold text-void transition-transform group-hover:rotate-[-8deg]"
              >
                T
              </span>
              <span className="font-display text-[15px] tracking-[0.18em] uppercase">
                {project.codename}
              </span>
            </a>

            <nav aria-label="Sections" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => {
                  const on = active === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        aria-current={on ? "true" : undefined}
                        className={`relative block rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors ${
                          on ? "text-void" : "text-mist hover:text-chalk"
                        }`}
                      >
                        {on && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-acid"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <span className="hidden font-mono text-[10px] tracking-[0.22em] text-mist uppercase sm:block">
                {project.year}
              </span>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                className="grid size-9 place-items-center rounded-full border border-edge text-chalk transition-colors hover:border-acid hover:text-acid lg:hidden"
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                <span aria-hidden className="flex flex-col gap-[5px]">
                  <span
                    className={`block h-px w-4 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
                  />
                  <span
                    className={`block h-px w-4 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="h-[2px] origin-left bg-gradient-to-r from-acid via-acid to-plasma"
        />

        <div
          id="mobile-nav"
          hidden={!open}
          className="border-b border-edge bg-void/95 backdrop-blur-xl lg:hidden"
        >
          <ul className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px px-5 py-4 sm:px-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-mono text-xs tracking-[0.18em] text-mist uppercase hover:text-acid"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}
