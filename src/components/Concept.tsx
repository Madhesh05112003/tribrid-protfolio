"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Node = {
  id: string;
  label: string;
  sub: string;
  color: string;
  x: number;
  y: number;
};

const INPUTS: Node[] = [
  { id: "solar", label: "Solar array", sub: "75 W · MPPT", color: "#D8FF3E", x: 60, y: 75 },
  { id: "mains", label: "AC mains", sub: "48 V · 5 A", color: "#38BDF8", x: 60, y: 235 },
  { id: "coil", label: "Light coil", sub: "Self-recharge", color: "#FF6B35", x: 60, y: 395 },
];

const OUTPUTS: Node[] = [
  { id: "motor", label: "BLDC motor", sub: "0–20 km/h", color: "#38BDF8", x: 810, y: 75 },
  { id: "lpg", label: "LPG circuit", sub: "20–50 km/h", color: "#7FB069", x: 810, y: 235 },
  { id: "petrol", label: "Petrol engine", sub: "50 km/h +", color: "#FF6B35", x: 810, y: 395 },
];

const NODE_W = 230;
const NODE_H = 74;
const BAT_X = 350;
const BAT_Y = 150;
const BAT_W = 175;
const BAT_H = 245;
const CTRL_X = 590;
const CTRL_Y = 150;
const CTRL_W = 175;
const CTRL_H = 245;

export function Concept() {
  const [hover, setHover] = useState<string | null>(null);

  const dim = (id: string) => (hover && hover !== id ? 0.22 : 1);

  return (
    <section id="concept" className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="blueprint absolute inset-0 -z-10 opacity-[0.35]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(56,189,248,0.09),transparent_65%)]"
      />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeader
          index="02"
          kicker="The Concept"
          accent="var(--color-plasma)"
          title={
            <>
              Four energy paths.
              <br />
              <span className="text-plasma">One control loop.</span>
            </>
          }
          lede="Charge comes in from three independent sources. The ESP8266 watches speed and battery state, then routes power to whichever drivetrain is most efficient at that moment — and closes the loop by harvesting charge back off the running engine."
        />

        {/* ---------------------------------------------------------- *
         * Desktop diagram
         * ---------------------------------------------------------- */}
        <Reveal delay={0.1}>
          <div className="mt-16 hidden overflow-hidden rounded-2xl border border-edge bg-carbon/60 p-6 backdrop-blur-sm md:block lg:p-10">
            <svg
              viewBox="0 0 1100 530"
              className="w-full"
              role="img"
              aria-label="Energy flow diagram: solar array, AC mains and a light-coil dynamo feed a 48-volt battery pack; the ESP8266 controller routes power to a BLDC motor, an LPG circuit or the petrol engine, and the engine returns charge to the light coil."
            >
              <defs>
                <linearGradient id="busGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#D8FF3E" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.9" />
                </linearGradient>
                <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="9" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* charging input → battery */}
              {INPUTS.map((n) => {
                const y1 = n.y + NODE_H / 2;
                const y2 = BAT_Y + BAT_H / 2;
                return (
                  <path
                    key={`e-${n.id}`}
                    d={`M ${n.x + NODE_W} ${y1} C ${n.x + NODE_W + 60} ${y1}, ${BAT_X - 70} ${y2}, ${BAT_X} ${y2}`}
                    fill="none"
                    stroke={n.color}
                    strokeWidth="2"
                    strokeOpacity={dim(n.id) * 0.8}
                    className="transition-[stroke-opacity] duration-300"
                  />
                );
              })}

              {/* animated flow dots on the input paths */}
              {INPUTS.map((n) => {
                const y1 = n.y + NODE_H / 2;
                const y2 = BAT_Y + BAT_H / 2;
                return (
                  <path
                    key={`f-${n.id}`}
                    d={`M ${n.x + NODE_W} ${y1} C ${n.x + NODE_W + 60} ${y1}, ${BAT_X - 70} ${y2}, ${BAT_X} ${y2}`}
                    fill="none"
                    stroke={n.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="flow-path"
                    style={{ opacity: dim(n.id) }}
                  />
                );
              })}

              {/* battery → controller */}
              <path
                d={`M ${BAT_X + BAT_W} ${BAT_Y + BAT_H / 2} H ${CTRL_X}`}
                stroke="url(#busGrad)"
                strokeWidth="3"
                fill="none"
              />

              {/* controller → outputs */}
              {OUTPUTS.map((n) => {
                const y1 = CTRL_Y + CTRL_H / 2;
                const y2 = n.y + NODE_H / 2;
                return (
                  <path
                    key={`o-${n.id}`}
                    d={`M ${CTRL_X + CTRL_W} ${y1} C ${CTRL_X + CTRL_W + 60} ${y1}, ${n.x - 70} ${y2}, ${n.x} ${y2}`}
                    fill="none"
                    stroke={n.color}
                    strokeWidth="2"
                    strokeOpacity={dim(n.id) * 0.8}
                    className="transition-[stroke-opacity] duration-300"
                  />
                );
              })}

              {/* self-recharge feedback loop */}
              <path
                d={`M ${CTRL_X + CTRL_W / 2} ${CTRL_Y + CTRL_H} V 490 H 175 V ${395 + NODE_H}`}
                fill="none"
                stroke="var(--color-ember)"
                strokeWidth="2"
                strokeDasharray="7 7"
                strokeOpacity={hover && hover !== "coil" ? 0.25 : 0.85}
                className="transition-[stroke-opacity] duration-300"
              />
              <path
                d={`M ${CTRL_X + CTRL_W / 2} ${CTRL_Y + CTRL_H} V 490 H 175 V ${395 + NODE_H}`}
                fill="none"
                stroke="var(--color-ember)"
                strokeWidth="3"
                strokeLinecap="round"
                className="flow-path"
                style={{ opacity: hover && hover !== "coil" ? 0.25 : 1 }}
              />
              <rect x="470" y="478" width="220" height="24" rx="12" fill="var(--color-void)" />
              <text
                x="580"
                y="495"
                textAnchor="middle"
                fill="var(--color-ember)"
                style={{ font: "600 12px var(--font-mono)", letterSpacing: "0.22em" }}
              >
                SELF-RECHARGE LOOP
              </text>

              {/* ---- cards ---- */}
              {[...INPUTS, ...OUTPUTS].map((n) => (
                <g
                  key={n.id}
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(null)}
                  className="cursor-default"
                  style={{ opacity: dim(n.id), transition: "opacity 300ms" }}
                >
                  <rect
                    x={n.x}
                    y={n.y}
                    width={NODE_W}
                    height={NODE_H}
                    rx="10"
                    fill="var(--color-slate-panel)"
                    stroke="var(--color-edge)"
                  />
                  <rect x={n.x} y={n.y} width="3.5" height={NODE_H} rx="2" fill={n.color} />
                  <text
                    x={n.x + 20}
                    y={n.y + 32}
                    fill="var(--color-chalk)"
                    style={{ font: "500 17px var(--font-sans)" }}
                  >
                    {n.label}
                  </text>
                  <text
                    x={n.x + 20}
                    y={n.y + 55}
                    fill="var(--color-mist)"
                    style={{ font: "400 12.5px var(--font-mono)", letterSpacing: "0.08em" }}
                  >
                    {n.sub}
                  </text>
                </g>
              ))}

              {/* battery */}
              <g onMouseEnter={() => setHover("battery")} onMouseLeave={() => setHover(null)}>
                <rect
                  x={BAT_X}
                  y={BAT_Y}
                  width={BAT_W}
                  height={BAT_H}
                  rx="14"
                  fill="var(--color-carbon)"
                  stroke="var(--color-acid)"
                  strokeOpacity={hover === "battery" ? 1 : 0.45}
                />
                <circle
                  cx={BAT_X + BAT_W / 2}
                  cy={BAT_Y + 92}
                  r="34"
                  fill="var(--color-acid)"
                  fillOpacity="0.12"
                  className="pulse-core"
                />
                <text
                  x={BAT_X + BAT_W / 2}
                  y={BAT_Y + 90}
                  textAnchor="middle"
                  fill="var(--color-acid)"
                  filter="url(#glow)"
                  style={{ font: "700 30px var(--font-mono)" }}
                >
                  48V
                </text>
                <text
                  x={BAT_X + BAT_W / 2}
                  y={BAT_Y + 150}
                  textAnchor="middle"
                  fill="var(--color-chalk)"
                  style={{ font: "500 15px var(--font-sans)" }}
                >
                  Li-ion pack
                </text>
                <text
                  x={BAT_X + BAT_W / 2}
                  y={BAT_Y + 172}
                  textAnchor="middle"
                  fill="var(--color-mist)"
                  style={{ font: "400 12.5px var(--font-mono)" }}
                >
                  30 Ah · BMS
                </text>
                <text
                  x={BAT_X + BAT_W / 2}
                  y={BAT_Y + 208}
                  textAnchor="middle"
                  fill="var(--color-mist)"
                  style={{ font: "400 12.5px var(--font-mono)" }}
                >
                  + 12 V lead-acid
                </text>
              </g>

              {/* controller */}
              <g onMouseEnter={() => setHover("ctrl")} onMouseLeave={() => setHover(null)}>
                <rect
                  x={CTRL_X}
                  y={CTRL_Y}
                  width={CTRL_W}
                  height={CTRL_H}
                  rx="14"
                  fill="var(--color-carbon)"
                  stroke="var(--color-plasma)"
                  strokeOpacity={hover === "ctrl" ? 1 : 0.45}
                />
                <text
                  x={CTRL_X + CTRL_W / 2}
                  y={CTRL_Y + 92}
                  textAnchor="middle"
                  fill="var(--color-plasma)"
                  filter="url(#glow)"
                  style={{ font: "700 26px var(--font-mono)" }}
                >
                  ESP8266
                </text>
                <text
                  x={CTRL_X + CTRL_W / 2}
                  y={CTRL_Y + 148}
                  textAnchor="middle"
                  fill="var(--color-chalk)"
                  style={{ font: "500 15px var(--font-sans)" }}
                >
                  Energy bus
                </text>
                <text
                  x={CTRL_X + CTRL_W / 2}
                  y={CTRL_Y + 170}
                  textAnchor="middle"
                  fill="var(--color-mist)"
                  style={{ font: "400 12.5px var(--font-mono)" }}
                >
                  4-ch relay bank
                </text>
                <text
                  x={CTRL_X + CTRL_W / 2}
                  y={CTRL_Y + 206}
                  textAnchor="middle"
                  fill="var(--color-mist)"
                  style={{ font: "400 12.5px var(--font-mono)" }}
                >
                  Blynk IoT ↗
                </text>
              </g>

              {/* column captions */}
              <text
                x="175"
                y="42"
                textAnchor="middle"
                fill="var(--color-mist)"
                style={{ font: "400 12px var(--font-mono)", letterSpacing: "0.28em" }}
              >
                CHARGING INPUTS
              </text>
              <text
                x="920"
                y="42"
                textAnchor="middle"
                fill="var(--color-mist)"
                style={{ font: "400 12px var(--font-mono)", letterSpacing: "0.28em" }}
              >
                DRIVE OUTPUTS
              </text>
            </svg>

            <p className="mt-6 border-t border-edge pt-6 text-sm text-mist">
              Hover any node to isolate its path. Flow along the dashed lines is live energy
              transfer — note the return loop from the engine back to the charge controller.
            </p>
          </div>
        </Reveal>

        {/* ---------------------------------------------------------- *
         * Mobile: stacked topology
         * ---------------------------------------------------------- */}
        <div className="mt-14 md:hidden">
          <MobileFlow />
        </div>
      </div>
    </section>
  );
}

function MobileFlow() {
  const row = "flex items-center justify-between rounded-lg border border-edge bg-carbon px-4 py-3";

  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] tracking-[0.28em] text-mist uppercase">
        Charging inputs
      </p>
      {INPUTS.map((n) => (
        <div key={n.id} className={row} style={{ borderLeft: `3px solid ${n.color}` }}>
          <div>
            <div className="text-sm font-medium">{n.label}</div>
            <div className="font-mono text-[11px] text-mist">{n.sub}</div>
          </div>
          <span aria-hidden className="font-mono text-xs text-mist">
            →
          </span>
        </div>
      ))}

      <div className="grid place-items-center py-2">
        <div className="rounded-lg border border-acid/50 bg-acid/10 px-5 py-3 text-center">
          <div className="font-mono text-lg font-bold text-acid">48 V · 30 Ah</div>
          <div className="font-mono text-[11px] text-mist">Li-ion + 12 V lead-acid · BMS</div>
        </div>
      </div>

      <div className="grid place-items-center py-2">
        <div className="rounded-lg border border-plasma/50 bg-plasma/10 px-5 py-3 text-center">
          <div className="font-mono text-lg font-bold text-plasma">ESP8266</div>
          <div className="font-mono text-[11px] text-mist">Energy bus · relay bank · Blynk</div>
        </div>
      </div>

      <p className="pt-2 font-mono text-[10px] tracking-[0.28em] text-mist uppercase">
        Drive outputs
      </p>
      {OUTPUTS.map((n) => (
        <div key={n.id} className={row} style={{ borderLeft: `3px solid ${n.color}` }}>
          <div>
            <div className="text-sm font-medium">{n.label}</div>
            <div className="font-mono text-[11px] text-mist">{n.sub}</div>
          </div>
        </div>
      ))}

      <div
        className="mt-3 rounded-lg border border-dashed border-ember/60 px-4 py-3 text-center"
        style={{ borderStyle: "dashed" }}
      >
        <div className="font-mono text-[11px] tracking-[0.18em] text-ember uppercase">
          ↺ Self-recharge loop
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-mist">
          Engine light coil feeds charge back to the battery while driving.
        </p>
      </div>
    </div>
  );
}
