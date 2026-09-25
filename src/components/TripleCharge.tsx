import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Img } from "@/components/ui/Media";
import { chargeSources } from "@/content/project";

function SourceIcon({ name, color }: { name: string; color: string }) {
  if (name === "sun") {
    return (
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden fill="none">
        <circle cx="16" cy="16" r="6" stroke={color} strokeWidth="1.6" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="16"
            y1="3.5"
            x2="16"
            y2="7"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
            transform={`rotate(${deg} 16 16)`}
          />
        ))}
      </svg>
    );
  }
  if (name === "plug") {
    return (
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden fill="none">
        <path d="M16 3v8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M11 11h10v4a5 5 0 0 1-5 5 5 5 0 0 1-5-5v-4Z" stroke={color} strokeWidth="1.6" />
        <path d="M16 20v9" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" className="size-7" aria-hidden fill="none">
      <circle cx="16" cy="16" r="10" stroke={color} strokeWidth="1.6" />
      <path
        d="M16 6c-4 4-4 16 0 20M16 6c4 4 4 16 0 20M6.5 13h19M6.5 19h19"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TripleCharge() {
  const [solar, grid, dynamo] = chargeSources;

  return (
    <section
      id="charge"
      className="relative scroll-mt-20 border-y border-edge bg-carbon/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeader
          index="05"
          kicker="Triple Charging"
          title={
            <>
              It charges itself
              <br /> <span className="text-acid">while it drives.</span>
            </>
          }
          lede="This is the mechanism the project is named for. Three independent paths put energy back into the packs — and one of them runs off the engine's own light coil, so the battery recovers whenever the vehicle is moving under petrol or LPG power."
        />

        {/* Convergence strip */}
        <Reveal delay={0.08}>
          <div className="mt-14 hidden items-center gap-6 lg:flex">
            <div className="flex flex-1 flex-col gap-3">
              {chargeSources.map((s) => (
                <div
                  key={s.key}
                  className="flex items-center justify-between rounded-lg border border-edge bg-carbon px-4 py-3"
                  style={{ borderLeft: `3px solid ${s.color}` }}
                >
                  <span className="text-sm font-medium">{s.name}</span>
                  <span className="font-mono text-[11px] text-mist">{s.spec}</span>
                </div>
              ))}
            </div>

            <svg viewBox="0 0 200 220" className="h-[220px] w-[200px] shrink-0" aria-hidden fill="none">
              {[40, 110, 180].map((y, i) => {
                const c = [solar.color, grid.color, dynamo.color][i];
                return (
                  <g key={y}>
                    <path
                      d={`M0 ${y} C 90 ${y}, 110 110, 176 110`}
                      stroke={c}
                      strokeWidth="2"
                      strokeOpacity="0.45"
                    />
                    <path
                      d={`M0 ${y} C 90 ${y}, 110 110, 176 110`}
                      stroke={c}
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="flow-path"
                    />
                  </g>
                );
              })}
              <circle
                cx="176"
                cy="110"
                r="22"
                fill="var(--color-acid)"
                fillOpacity="0.12"
                className="pulse-core"
              />
              <circle cx="176" cy="110" r="10" fill="var(--color-acid)" />
            </svg>

            <div className="flex-1 rounded-xl border border-acid/40 bg-acid/[0.07] p-6">
              <div className="font-mono text-[10px] tracking-[0.26em] text-acid uppercase">
                Result
              </div>
              <div className="mt-2 font-display text-4xl uppercase">Battery holds charge</div>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                There is no single point of failure. Losing daylight, parking away from a socket, or
                running out of electric range no longer stops the vehicle.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Source cards */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge lg:grid-cols-3">
          {chargeSources.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.07}>
              <article className="flex h-full flex-col bg-carbon p-7">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="grid size-12 place-items-center rounded-xl border"
                    style={{ borderColor: `${s.color}55`, background: `${s.color}12` }}
                  >
                    <SourceIcon name={s.icon} color={s.color} />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.24em] text-mist uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl uppercase" style={{ color: s.color }}>
                  {s.name}
                </h3>
                <div className="mt-2 font-mono text-[11px] tracking-[0.12em] text-mist">{s.spec}</div>
                <p className="mt-4 text-sm leading-relaxed text-mist">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Self-recharge deep dive */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-edge">
              <Img
                slug="engine-alternator-02"
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="aspect-4/3 w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <div className="font-mono text-[10px] tracking-[0.26em] text-ember uppercase">
                Highlight — the self-recharge loop
              </div>
              <h3 className="mt-4 text-[clamp(1.6rem,3.4vw,2.6rem)] uppercase">
                Kinetic energy that would
                <br /> otherwise be lost as heat
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-mist sm:text-base">
                A conventional engine dumps its surplus into the exhaust and the brake pads. Here the
                engine&apos;s light coil is wired through the charge controller straight back into the
                battery bank. The vehicle becomes its own generator — the longer the petrol or LPG
                engine runs, the more electric range you arrive with.
              </p>

              <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-3">
                {[
                  { k: "Source", v: "Engine light coil" },
                  { k: "Regulation", v: "12 V/24 V · 20 A" },
                  { k: "Payoff", v: "+ EV range, free" },
                ].map((s) => (
                  <div key={s.k} className="bg-carbon p-5">
                    <dt className="font-mono text-[10px] tracking-[0.2em] text-mist uppercase">
                      {s.k}
                    </dt>
                    <dd className="mt-2 text-sm font-medium">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
