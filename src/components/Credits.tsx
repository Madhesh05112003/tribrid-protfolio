import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Img } from "@/components/ui/Media";
import { project } from "@/content/project";

const docs = [
  {
    href: "/docs/tribrid-project-report.pdf",
    title: "Full project report",
    meta: "85 pages · design, methodology, circuit schematics, testing",
    cta: "Open PDF",
  },
  {
    href: "/docs/tribrid-research-paper.pdf",
    title: "Research paper",
    meta: "Self-Recharging Solar Tri-Brid Vehicle with Integrated IoT Electric, Petrol and LPG Systems",
    cta: "Open PDF",
  },
];

export function Credits() {
  return (
    <section
      id="credits"
      className="relative scroll-mt-20 border-t border-edge bg-carbon/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeader
          index="10"
          kicker="Team & Documentation"
          title={
            <>
              Built by three
              <br /> <span className="text-acid">undergraduates.</span>
            </>
          }
          lede="Final-year project work carried out in the Department of Electronics & Communication Engineering."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <figure className="overflow-hidden rounded-2xl border border-edge">
              <Img
                slug="team-hero"
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="aspect-4/3 w-full object-cover"
              />
              <figcaption className="border-t border-edge bg-carbon px-5 py-4 font-mono text-[10px] tracking-[0.2em] text-mist uppercase">
                The team with the completed vehicle
              </figcaption>
            </figure>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.06}>
              <div className="edge-glass rounded-2xl p-6 sm:p-7">
                <h3 className="font-mono text-[10px] tracking-[0.26em] text-mist uppercase">
                  Project team
                </h3>
                <ul className="mt-5 divide-y divide-edge">
                  {project.team.map((m) => (
                    <li key={m.roll} className="flex items-baseline justify-between gap-4 py-3.5">
                      <span className="text-[15px] font-semibold text-chalk">{m.name}</span>
                      <span className="font-mono text-[11px] text-mist tabular-nums">{m.roll}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 font-mono text-[10px] tracking-[0.26em] text-mist uppercase">
                  Project guide
                </h3>
                <p className="mt-3 text-[15px] font-semibold text-chalk">
                  {project.guide.name}{" "}
                  <span className="font-normal text-mist">{project.guide.credentials}</span>
                </p>

                <div className="mt-8 border-t border-edge pt-6">
                  <div className="text-sm font-semibold text-chalk">{project.institution}</div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-mist">
                    {project.institutionNote}
                    <br />
                    {project.department}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-2">
                {docs.map((d) => (
                  <a
                    key={d.href}
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col bg-carbon p-6 transition-colors hover:bg-slate-panel"
                  >
                    <span className="font-mono text-[10px] tracking-[0.24em] text-acid uppercase">
                      {d.cta} ↗
                    </span>
                    <span className="mt-3 text-[15px] font-semibold text-chalk">{d.title}</span>
                    <span className="mt-2 text-[12.5px] leading-relaxed text-mist">{d.meta}</span>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <ul className="flex flex-wrap gap-2">
                {project.keywords.map((k) => (
                  <li
                    key={k}
                    className="rounded-full border border-edge px-3.5 py-1.5 font-mono text-[10px] tracking-[0.14em] text-mist uppercase"
                  >
                    {k}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      <footer className="mx-auto mt-24 max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-col gap-8 border-t border-edge pt-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-display text-[clamp(2rem,7vw,4.5rem)] leading-none uppercase">
              {project.codename}
            </div>
            <p className="mt-3 max-w-md text-[13px] leading-relaxed text-mist">
              {project.title} — {project.subtitle}. {project.year}, {project.institution}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="#top"
              className="inline-flex items-center gap-2 py-2 font-mono text-[11px] tracking-[0.18em] text-mist uppercase transition-colors hover:text-acid"
            >
              <span aria-hidden>↑</span> Back to top
            </a>
            <span className="font-mono text-[11px] tracking-[0.18em] text-mist/60 uppercase">
              Engineering portfolio
            </span>
          </div>
        </div>

        <p className="mt-8 pb-10 text-[11px] leading-relaxed text-mist/60">
          Photography, video and CAD footage captured by the project team during fabrication and
          testing. Performance figures reflect prototype measurements recorded on campus test runs.
        </p>
      </footer>
    </section>
  );
}
