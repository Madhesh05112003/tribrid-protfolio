import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { problem } from "@/content/project";

export function Problem() {
  return (
    <section id="problem" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeader
          index="01"
          kicker={problem.label}
          title={
            <>
              Transport is the hardest thing
              <br className="hidden sm:block" /> to <span className="text-acid">decarbonise.</span>
            </>
          }
          lede={problem.lede}
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-3">
          {problem.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group h-full bg-carbon p-7 transition-colors hover:bg-slate-panel sm:p-9">
                <div className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-none text-acid">
                  {s.display}
                </div>
                <div className="mt-5 font-mono text-[11px] tracking-[0.18em] text-chalk uppercase">
                  {s.label}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-mist">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <div>
              <h3 className="text-[clamp(1.4rem,2.6vw,2.1rem)] uppercase">
                Why hybrids still
                <br /> didn&apos;t break through
              </h3>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-mist">
                Six constraints that every conventional hybrid or solar-assisted EV in the
                literature still carries. Each one is a design target for this build.
              </p>
            </div>
          </Reveal>

          <ul className="grid gap-px overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-2">
            {problem.drawbacks.map((d, i) => (
              <Reveal as="li" key={d.title} delay={i * 0.05}>
                <div className="h-full bg-carbon p-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-acid/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-sm font-semibold tracking-tight text-chalk">{d.title}</h4>
                  </div>
                  <p className="mt-2.5 pl-8 text-sm leading-relaxed text-mist">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
