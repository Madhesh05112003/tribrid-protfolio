import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Img } from "@/components/ui/Media";
import { roadmap } from "@/content/project";

const outcomes = [
  {
    k: "Emissions",
    v: "Urban kilometres are 100% electric",
    d: "The dirtiest part of any journey is the stop-start crawl. That is precisely the band the EV drivetrain owns.",
  },
  {
    k: "Energy autonomy",
    v: "Three charging paths, one pack",
    d: "Off-grid operation becomes possible without sacrificing range — even on the days the sun doesn't cooperate.",
  },
  {
    k: "Running cost",
    v: "LPG carries the mid-speed band",
    d: "Cheaper per kilometre than petrol at the load where a car spends most of its life.",
  },
  {
    k: "Scalability",
    v: "Modular by construction",
    d: "Packs, panels and controller are independently swappable — the platform accepts better chemistry as it arrives.",
  },
];

export function Impact() {
  return (
    <section id="impact" className="relative scroll-mt-20 py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(65%_50%_at_20%_30%,rgba(216,255,62,0.09),transparent_60%)]"
      />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeader
          index="08"
          kicker="Impact & Roadmap"
          title={
            <>
              A foundation, not
              <br /> a <span className="text-acid">finished product.</span>
            </>
          }
          lede="This is a working prototype that proves the architecture. What matters is that each subsystem — harvesting, storage, switching and telemetry — can be improved independently without redesigning the vehicle."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge lg:grid-cols-2">
          {outcomes.map((o, i) => (
            <Reveal key={o.k} delay={i * 0.06}>
              <article className="h-full bg-carbon p-7 sm:p-9">
                <div className="font-mono text-[10px] tracking-[0.26em] text-acid uppercase">
                  {o.k}
                </div>
                <h3 className="mt-4 text-[clamp(1.15rem,2.2vw,1.6rem)] uppercase">{o.v}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{o.d}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Roadmap */}
        <div className="mt-20">
          <Reveal>
            <h3 className="font-mono text-[10px] tracking-[0.28em] text-mist uppercase">
              Where this goes next
            </h3>
          </Reveal>

          <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge lg:grid-cols-5">
            {roadmap.map((r, i) => (
              <Reveal as="li" key={r.what} delay={i * 0.05}>
                <div className="flex h-full flex-col bg-carbon p-6">
                  <span
                    className={`self-start rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.18em] uppercase ${
                      i === 0 ? "bg-acid text-void" : "border border-edge text-mist"
                    }`}
                  >
                    {r.when}
                  </span>
                  <h4 className="mt-4 text-sm font-semibold text-chalk">{r.what}</h4>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-mist">{r.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Pull quote */}
        <div className="mt-20 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
          <Reveal>
            <blockquote className="border-l-2 border-acid pl-6 sm:pl-8">
              <p className="font-display text-[clamp(1.4rem,3.2vw,2.3rem)] leading-[1.1] uppercase">
                &ldquo;The goal was never to invent a new battery. It was to stop wasting the energy
                we already carry.&rdquo;
              </p>
              <footer className="mt-6 font-mono text-[11px] tracking-[0.2em] text-mist uppercase">
                Project design intent
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-2xl border border-edge">
              <Img
                slug="road-distance"
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="aspect-4/3 w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
