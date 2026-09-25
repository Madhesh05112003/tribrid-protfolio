"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Clip, Img } from "@/components/ui/Media";
import { buildLog } from "@/content/project";

const STAGE_VIDEO = "cad-model";

export function BuildLog() {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const refs = useRef<(HTMLElement | null)[]>([]);

  const activate = useCallback((i: number) => {
    setActive(i);
    setSeen((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        const idx = refs.current.indexOf(best.target as HTMLElement);
        if (idx >= 0) activate(idx);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    for (const el of refs.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [activate]);

  return (
    <section id="build" className="relative scroll-mt-20 border-y border-edge bg-carbon/40 py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeader
          index="03"
          kicker="Build Log"
          title={
            <>
              Nine stages from
              <br /> drawing to <span className="text-acid">road.</span>
            </>
          }
          lede="Everything below is the actual vehicle — fabricated, wired and tested by the team. No renders, no stock photography."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          {/* Sticky media viewer */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="sweep relative aspect-4/5 overflow-hidden rounded-2xl border border-edge bg-void">
                {seen.has(0) &&
                  (buildLog[0].image === STAGE_VIDEO ? (
                    <Clip
                      slug={STAGE_VIDEO}
                      title="CAD walkthrough of the tri-brid chassis"
                      className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
                        active === 0 ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ) : null)}

                {buildLog.map((stage, i) =>
                  i === 0 || !seen.has(i) ? null : (
                    <Img
                      key={stage.id}
                      slug={stage.image}
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      loading={i <= 1 ? "eager" : "lazy"}
                      className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
                        active === i ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ),
                )}

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.26em] text-acid uppercase">
                      {buildLog[active].week}
                    </div>
                    <div className="mt-1 font-display text-xl uppercase">
                      {buildLog[active].title}
                    </div>
                  </div>
                  <div className="font-mono text-[11px] text-mist tabular-nums">
                    {String(active + 1).padStart(2, "0")} / {String(buildLog.length).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* stage scrubber */}
              <div className="mt-4 flex gap-1" role="presentation">
                {buildLog.map((s, i) => (
                  <span
                    key={s.id}
                    className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                      i <= active ? "bg-acid" : "bg-edge"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stage list */}
          <ol className="relative space-y-4 lg:space-y-0">
            {buildLog.map((stage, i) => (
              <li
                key={stage.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="lg:min-h-[62vh] lg:py-8"
              >
                <Reveal y={20}>
                  <article
                    className={`rounded-2xl border p-6 transition-colors duration-500 sm:p-7 ${
                      active === i
                        ? "border-acid/45 bg-slate-panel"
                        : "border-edge bg-carbon/60"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[10px] tracking-[0.26em] text-acid uppercase">
                        {stage.week}
                      </span>
                      <span className="rounded-full border border-edge px-2.5 py-0.5 font-mono text-[10px] tracking-[0.14em] text-mist uppercase">
                        {stage.tag}
                      </span>
                    </div>

                    <h3 className="mt-4 text-[clamp(1.5rem,3.2vw,2.3rem)] uppercase">
                      {stage.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-mist sm:text-[15px]">
                      {stage.body}
                    </p>

                    {/* inline media on small screens */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-edge lg:hidden">
                      {stage.image === STAGE_VIDEO ? (
                        <Clip
                          slug={STAGE_VIDEO}
                          title="CAD walkthrough of the tri-brid chassis"
                          className="aspect-4/3 w-full object-cover"
                        />
                      ) : (
                        <Img
                          slug={stage.image}
                          sizes="(min-width: 640px) 80vw, 92vw"
                          className="aspect-4/3 w-full object-cover"
                        />
                      )}
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
