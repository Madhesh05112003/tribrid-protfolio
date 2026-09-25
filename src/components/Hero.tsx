"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Img } from "@/components/ui/Media";
import { Marquee } from "@/components/ui/Marquee";
import { project } from "@/content/project";

const ticker = [
  "48 V · 30 Ah Li-ion",
  "1 kW BLDC",
  "75 W Solar",
  "Self-recharge light coil",
  "ESP8266 + Blynk IoT",
  "LPG 20–50 km/h",
  "Petrol 50 km/h +",
  "Electric 0–20 km/h",
  "MPPT 20 A",
  "500 W Inverter",
];

const heroStats = [
  { k: "Power paths", v: "3 + solar" },
  { k: "Mode switching", v: "Automatic" },
  { k: "Charging inputs", v: "Solar · Grid · Dynamo" },
  { k: "Control", v: "ESP8266 / IoT" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "9%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.09]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0]);

  const eyebrow = (
    <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.34em] uppercase">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-acid opacity-70" />
        <span className="relative inline-flex size-2 rounded-full bg-acid" />
      </span>
      <span className="text-acid">Working prototype</span>
      <span aria-hidden className="h-px w-8 bg-edge" />
      <span className="text-mist">{project.year}</span>
    </div>
  );

  const headline = (
    <h1 className="mt-6 text-[clamp(2.25rem,10.5vw,3rem)] leading-[0.88] uppercase lg:mt-7 lg:text-[clamp(2.4rem,5.4vw,4.6rem)] xl:text-[clamp(3rem,4.6vw,6.4rem)]">
      <span className="block">Self-</span>
      <span className="block text-acid">Recharging</span>
      <span className="block">Solar Tri-Brid</span>
      <span className="block text-outline">Vehicle</span>
    </h1>
  );

  const thesis = (
    <p className="max-w-xl text-[15px] leading-relaxed text-chalk/80 sm:text-[17px] xl:text-[18px]">
      {project.thesis}
    </p>
  );

  const actions = (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <a
        href="#build"
        className="group inline-flex items-center gap-3 rounded-full bg-acid px-6 py-3 font-mono text-xs font-bold tracking-[0.18em] text-void uppercase transition-transform hover:-translate-y-0.5"
      >
        Explore the build
        <span aria-hidden className="transition-transform group-hover:translate-y-0.5">
          ↓
        </span>
      </a>
      <a
        href="#road"
        className="inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.18em] text-mist uppercase transition-colors hover:text-acid"
      >
        <span
          aria-hidden
          className="grid size-7 place-items-center rounded-full border border-edge text-[9px]"
        >
          ▶
        </span>
        Watch it move
      </a>
    </div>
  );

  const stats = (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-edge pt-6 sm:grid-cols-4 lg:grid-cols-2">
      {heroStats.map((s) => (
        <div key={s.k} className="border-l border-edge pl-3.5">
          <dt className="font-mono text-[10px] tracking-[0.2em] text-mist uppercase">{s.k}</dt>
          <dd className="mt-1 text-sm font-medium text-chalk">{s.v}</dd>
        </div>
      ))}
    </dl>
  );

  const telemetryChip = (
    <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-xl border border-edge bg-void/78 px-4 py-3 backdrop-blur-md">
      <div>
        <div className="font-mono text-[9px] tracking-[0.24em] text-mist uppercase">
          Live telemetry
        </div>
        <div className="mt-0.5 font-mono text-[13px] text-acid tabular-nums">
          48.2 V · 14.6 A · LPG mode
        </div>
      </div>
      <span className="flex shrink-0 items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] text-sage uppercase">
        <span aria-hidden className="size-1.5 rounded-full bg-sage" />
        Blynk
      </span>
    </div>
  );

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-14"
    >
      {/* Ambient backdrop — a heavily diffused copy of the same frame adds depth */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <Img
          slug="road-dusk"
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="size-full scale-110 object-cover opacity-30 blur-3xl"
        />
        <div className="absolute inset-0 bg-void/78" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(110%_70%_at_12%_100%,rgba(216,255,62,0.13),transparent_58%)]"
      />

      {/* ---------------------------------------------------------------- *
       * Desktop: editorial split — type left, vehicle right
       * ---------------------------------------------------------------- */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto hidden w-full max-w-[1600px] flex-1 grid-cols-[1.02fr_0.98fr] items-center gap-14 px-5 pt-2 pb-2 lg:grid lg:px-8"
      >
        <div className="flex flex-col justify-center pb-10">
          {eyebrow}
          {headline}
          <div className="mt-7">{thesis}</div>
          <div className="mt-7">{actions}</div>
          <div className="mt-9">{stats}</div>
        </div>

        <div className="relative">
          <motion.div
            style={{ y: imgY, scale: imgScale }}
            className="relative h-[min(78svh,860px)] min-h-[380px] overflow-hidden rounded-2xl border border-edge"
          >
            <Img
              slug="road-dusk"
              sizes="46vw"
              loading="eager"
              fetchPriority="high"
              className="size-full object-cover object-[50%_56%]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-void via-void/12 to-transparent"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_50%,transparent,rgba(7,9,7,0.55))]"
            />
            {telemetryChip}
          </motion.div>
        </div>
      </motion.div>

      {/* ---------------------------------------------------------------- *
       * Mobile: full-bleed frame with scrim
       * ---------------------------------------------------------------- */}
      <div className="relative flex flex-1 flex-col justify-end lg:hidden">
        <div className="absolute inset-0 -z-10">
          <Img
            slug="road-dusk"
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="size-full object-cover object-[50%_68%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-void/30" />
        </div>

        <div className="px-5 pb-6">
          {eyebrow}
          {headline}
          <div className="mt-5">{thesis}</div>
          <div className="mt-5">{actions}</div>
          <div className="mt-7 hidden [@media(min-height:641px)]:block sm:hidden">
            <dl className="flex items-center gap-4 border-t border-edge pt-4">
              {heroStats.slice(0, 2).map((s) => (
                <div key={s.k} className="flex-1 border-l border-edge pl-3">
                  <dt className="font-mono text-[9px] tracking-[0.18em] text-mist uppercase">
                    {s.k}
                  </dt>
                  <dd className="mt-0.5 text-[13px] font-medium text-chalk">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-7 hidden sm:block">{stats}</div>
        </div>
      </div>

      <div className="relative border-t border-edge/70 bg-void/60 py-3 backdrop-blur-sm">
        <Marquee duration={52}>
          {ticker.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="flex items-center gap-6 px-6 font-mono text-[11px] tracking-[0.22em] whitespace-nowrap text-mist uppercase"
            >
              {t}
              <span aria-hidden className="size-1 rounded-full bg-acid" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
