"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { hardware, iotFeatures } from "@/content/project";

/** Stylised live telemetry, driven by a slow interval so the dashboard feels alive. */
function useTelemetry(base: { speed: number; volts: number; amps: number; soc: number }) {
  const reduced = useReducedMotion();
  const [t, setT] = useState(base);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setT((prev) => {
        const drift = (v: number, spread: number, min: number, max: number) =>
          Math.min(max, Math.max(min, v + (Math.random() - 0.5) * spread));
        return {
          speed: Math.round(drift(prev.speed, 4, 12, 62)),
          volts: drift(prev.volts, 0.4, 46.6, 49.4),
          amps: drift(prev.amps, 1.4, 6, 24),
          soc: drift(prev.soc, 0.35, 58, 92),
        };
      });
    }, 1600);
    return () => clearInterval(id);
  }, [reduced]);

  return t;
}

export function IotBrain() {
  const t = useTelemetry({ speed: 34, volts: 48.2, amps: 14.6, soc: 78 });

  return (
    <section id="iot" className="relative scroll-mt-20 py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_80%_20%,rgba(56,189,248,0.10),transparent_60%)]"
      />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeader
          index="06"
          kicker="IoT Brain"
          accent="var(--color-plasma)"
          title={
            <>
              Every decision is
              <br /> <span className="text-plasma">logged, streamed, traceable.</span>
            </>
          }
          lede="An ESP8266 sits at the centre of the energy bus. It reads battery state and vehicle speed, drives the relay bank that switches power paths, and pushes telemetry to the Blynk cloud so the whole system can be watched from a phone."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          {/* ------------- left: features + hardware ------------- */}
          <div className="space-y-14">
            <div>
              <h3 className="font-mono text-[10px] tracking-[0.28em] text-mist uppercase">
                What the dashboard gives you
              </h3>
              <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-2">
                {iotFeatures.map((f, i) => (
                  <Reveal as="li" key={f.title} delay={i * 0.04}>
                    <div className="h-full bg-carbon p-5">
                      <div className="flex items-center gap-2.5">
                        <span aria-hidden className="size-1.5 rounded-full bg-plasma" />
                        <h4 className="text-sm font-semibold">{f.title}</h4>
                      </div>
                      <p className="mt-2 pl-4 text-[13px] leading-relaxed text-mist">{f.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[10px] tracking-[0.28em] text-mist uppercase">
                Hardware bill of materials
              </h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {hardware.map((group, i) => (
                  <Reveal key={group.group} delay={i * 0.04}>
                    <div className="border-l border-edge pl-4">
                      <h4 className="font-mono text-[10px] tracking-[0.2em] text-acid uppercase">
                        {group.group}
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {group.items.map((item) => (
                          <li key={item} className="text-[13px] leading-snug text-mist">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* ------------- right: phone ------------- */}
          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-24">
              <div className="mx-auto w-full max-w-[330px]">
                <div className="relative rounded-[2.6rem] border border-edge bg-gradient-to-b from-slate-panel to-void p-3 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]">
                  <div className="overflow-hidden rounded-[2.1rem] border border-edge bg-void">
                    {/* status bar */}
                    <div className="flex items-center justify-between px-5 pt-4 pb-2 font-mono text-[10px] text-mist">
                      <span>09:41</span>
                      <span className="flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-sage" /> Blynk · live
                      </span>
                    </div>

                    {/* header */}
                    <div className="px-5 pt-2 pb-5">
                      <div className="font-mono text-[10px] tracking-[0.24em] text-mist uppercase">
                        Tri-Brid telemetry
                      </div>
                      <div className="mt-1.5 flex items-baseline gap-2">
                        <span className="font-display text-4xl tabular-nums">{t.speed}</span>
                        <span className="font-mono text-[11px] text-mist">km/h</span>
                        <span
                          className="ml-auto rounded-full px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.14em] uppercase"
                          style={{ background: "#7FB06922", color: "#7FB069" }}
                        >
                          LPG mode
                        </span>
                      </div>
                    </div>

                    {/* state of charge */}
                    <div className="px-5 pb-5">
                      <div className="flex items-center justify-between font-mono text-[10px] text-mist uppercase">
                        <span>State of charge</span>
                        <span className="text-acid tabular-nums">{t.soc.toFixed(1)}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-edge">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-acid-deep to-acid transition-[width] duration-1000 ease-out"
                          style={{ width: `${t.soc}%` }}
                        />
                      </div>
                    </div>

                    {/* readouts */}
                    <dl className="grid grid-cols-3 gap-px bg-edge">
                      {[
                        { k: "Pack", v: `${t.volts.toFixed(1)}`, u: "V" },
                        { k: "Draw", v: `${t.amps.toFixed(1)}`, u: "A" },
                        { k: "Solar", v: "68", u: "W" },
                      ].map((r) => (
                        <div key={r.k} className="bg-carbon px-2 py-4 text-center">
                          <dt className="font-mono text-[9px] tracking-[0.16em] text-mist uppercase">
                            {r.k}
                          </dt>
                          <dd className="mt-1 font-mono text-lg font-semibold tabular-nums">
                            {r.v}
                            <span className="ml-0.5 text-[10px] font-normal text-mist">{r.u}</span>
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {/* map */}
                    <div className="relative h-40 overflow-hidden border-t border-edge bg-[#0a0f0c]">
                      <svg viewBox="0 0 300 160" className="size-full" aria-hidden>
                        <g stroke="#1b241e" strokeWidth="1">
                          {Array.from({ length: 9 }, (_, i) => (
                            <line key={`h${i}`} x1="0" y1={i * 20} x2="300" y2={i * 20} />
                          ))}
                          {Array.from({ length: 16 }, (_, i) => (
                            <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="160" />
                          ))}
                        </g>
                        <path
                          d="M28 138 C 70 120, 74 74, 118 74 S 176 96, 210 58 248 34, 274 26"
                          fill="none"
                          stroke="#38BDF8"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray="500"
                          strokeDashoffset="0"
                        />
                        <circle cx="28" cy="138" r="4" fill="#38BDF8" />
                        <circle cx="274" cy="26" r="7" fill="#D8FF3E" fillOpacity="0.25" className="pulse-core" />
                        <circle cx="274" cy="26" r="3.5" fill="#D8FF3E" />
                      </svg>
                      <div className="absolute bottom-2 left-3 font-mono text-[9px] tracking-[0.18em] text-mist uppercase">
                        GPS track · 4.2 km
                      </div>
                    </div>

                    {/* controls */}
                    <ul className="divide-y divide-edge border-t border-edge">
                      {[
                        { k: "Fault cut-off", v: "Armed", on: false },
                        { k: "Regenerative", v: "Active", on: true },
                        { k: "Auto mode select", v: "Enabled", on: true },
                      ].map((row) => (
                        <li key={row.k} className="flex items-center justify-between px-5 py-3">
                          <span className="text-[12px] text-chalk">{row.k}</span>
                          <span
                            className={`font-mono text-[10px] tracking-[0.14em] uppercase ${
                              row.on ? "text-acid" : "text-mist"
                            }`}
                          >
                            {row.v}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-5 text-center font-mono text-[10px] tracking-[0.18em] text-mist uppercase">
                  Illustrative dashboard · values reflect live telemetry format
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
