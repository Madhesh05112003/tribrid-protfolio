"use client";

import { useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Img } from "@/components/ui/Media";
import { modes } from "@/content/project";

const MAX_SPEED = 90;

const presets = [
  { label: "City crawl", speed: 10 },
  { label: "Suburban", speed: 35 },
  { label: "Highway", speed: 72 },
];

export function ModeSwitcher() {
  const [speed, setSpeed] = useState(35);
  const sliderId = useId();
  const reduced = useReducedMotion();

  const active = useMemo(
    () => modes.find((m) => speed >= m.min && (speed < m.max || m.key === "petrol")) ?? modes[0],
    [speed],
  );

  return (
    <section id="modes" className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 transition-colors duration-700"
        style={{
          background: `radial-gradient(80% 55% at 50% 100%, ${active.color}1f, transparent 65%)`,
        }}
      />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeader
          index="04"
          kicker="Mode Switching"
          accent={active.color}
          title={
            <>
              The vehicle picks
              <br /> the <span style={{ color: active.color }}>best fuel</span> for the moment.
            </>
          }
          lede="Speed is the primary input. Below 20 km/h there is no reason to run an engine; between 20 and 50 LPG is cheaper and cleaner per kilometre; above 50 the petrol engine gives the torque the other two cannot. Drag the dial and watch the controller decide."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12">
          {/* ---------------- control panel ---------------- */}
          <Reveal>
            <div className="edge-glass rounded-2xl p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.26em] text-mist uppercase">
                    Vehicle speed
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <motion.span
                      key={speed}
                      initial={reduced ? false : { opacity: 0.4, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="font-display text-[clamp(3.2rem,9vw,5.5rem)] leading-none tabular-nums"
                      style={{ color: active.color }}
                    >
                      {speed}
                    </motion.span>
                    <span className="font-mono text-sm text-mist">km/h</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-[10px] tracking-[0.26em] text-mist uppercase">
                    Controller selects
                  </div>
                  <div
                    className="mt-1 font-display text-3xl uppercase transition-colors duration-500"
                    style={{ color: active.color }}
                  >
                    {active.name}
                  </div>
                  <div className="font-mono text-[11px] text-mist">{active.range}</div>
                </div>
              </div>

              {/* banded track */}
              <div className="relative mt-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-0.5 top-1/2 z-0 flex h-2 -translate-y-1/2 overflow-hidden rounded-full"
                >
                  <span
                    className="h-full transition-opacity duration-500"
                    style={{
                      width: `${(20 / MAX_SPEED) * 100}%`,
                      background: modes[0].color,
                      opacity: active.key === "electric" ? 1 : 0.35,
                    }}
                  />
                  <span
                    className="h-full transition-opacity duration-500"
                    style={{
                      width: `${(30 / MAX_SPEED) * 100}%`,
                      background: modes[1].color,
                      opacity: active.key === "lpg" ? 1 : 0.35,
                    }}
                  />
                  <span
                    className="h-full transition-opacity duration-500"
                    style={{
                      width: `${(40 / MAX_SPEED) * 100}%`,
                      background: modes[2].color,
                      opacity: active.key === "petrol" ? 1 : 0.35,
                    }}
                  />
                </div>

                <label htmlFor={sliderId} className="sr-only">
                  Simulated vehicle speed in kilometres per hour
                </label>
                <input
                  id={sliderId}
                  type="range"
                  min={0}
                  max={MAX_SPEED}
                  step={1}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  aria-valuetext={`${speed} kilometres per hour — ${active.name} mode`}
                  className="relative z-10 h-10 w-full cursor-pointer appearance-none rounded-full bg-transparent accent-acid outline-none"
                  style={{ ["--thumb-color" as string]: active.color }}
                />
              </div>

              <div className="-mt-4 flex justify-between font-mono text-[10px] tracking-[0.14em] text-mist uppercase">
                <span>0</span>
                <span className="text-plasma">20</span>
                <span className="text-sage">50</span>
                <span>90</span>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setSpeed(p.speed)}
                    aria-pressed={speed === p.speed}
                    className={`rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors ${
                      speed === p.speed
                        ? "border-transparent text-void"
                        : "border-edge text-mist hover:border-acid/60 hover:text-chalk"
                    }`}
                    style={speed === p.speed ? { background: active.color } : undefined}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* band legend */}
              <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-3">
                {modes.map((m) => {
                  const on = m.key === active.key;
                  return (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setSpeed(Math.round((m.min + Math.min(m.max, MAX_SPEED)) / 2))}
                      className={`bg-carbon p-4 text-left transition-colors ${
                        on ? "bg-slate-panel" : "hover:bg-slate-panel/60"
                      }`}
                      aria-pressed={on}
                    >
                      <span
                        className="block h-0.5 w-8 rounded-full transition-all duration-500"
                        style={{ background: m.color, width: on ? "100%" : "2rem" }}
                      />
                      <dt className="mt-3 text-sm font-semibold" style={{ color: on ? m.color : undefined }}>
                        {m.name}
                      </dt>
                      <dd className="font-mono text-[11px] text-mist">{m.range}</dd>
                    </button>
                  );
                })}
              </dl>
            </div>
          </Reveal>

          {/* ---------------- active mode detail ---------------- */}
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col gap-5">
              <div className="edge-glass relative flex-1 overflow-hidden rounded-2xl p-6 sm:p-8">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 transition-colors duration-500"
                  style={{ background: active.color }}
                />
                <div className="font-mono text-[10px] tracking-[0.26em] uppercase" style={{ color: active.color }}>
                  {active.range}
                </div>
                <h3 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] uppercase">{active.headline}</h3>
                <p className="mt-4 text-sm leading-relaxed text-mist">{active.body}</p>

                <dl className="mt-7 space-y-3 border-t border-edge pt-6">
                  {active.specs.map((s) => (
                    <div key={s.k} className="flex items-baseline justify-between gap-6">
                      <dt className="font-mono text-[11px] tracking-[0.14em] text-mist uppercase">
                        {s.k}
                      </dt>
                      <dd className="text-right text-sm font-medium">{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="relative aspect-16/9 overflow-hidden rounded-2xl border border-edge">
                <Img
                  slug="road-leafy-motion"
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  className="size-full object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-void/85 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-4 font-mono text-[10px] tracking-[0.2em] text-mist uppercase">
                  Live transition logging · Blynk telemetry
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
