import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Clip } from "@/components/ui/Media";
import { videoMeta, type VideoKey } from "@/content/project";

const featured: VideoKey = "road-test-campus";

const rail: VideoKey[] = [
  "road-run-away",
  "team-walkaround",
  "fuel-lines",
  "body-wiring",
];

const checks = [
  { k: "Acceleration & braking", v: "Verified under load across all three modes" },
  { k: "Mode transitions", v: "Electric → LPG → petrol switched while moving, no stall" },
  { k: "Grade climbing", v: "Petrol fallback holds torque on incline" },
  { k: "Solar charging", v: "Measured against panel specification" },
  { k: "Self-recharge", v: "Light-coil output confirmed feeding the pack" },
  { k: "GPS accuracy", v: "Track plotted live on the Blynk dashboard" },
  { k: "Thermal behaviour", v: "Battery and controller monitored for overheat" },
  { k: "System stability", v: "No brownout under simultaneous auxiliary load" },
];

export function RoadTest() {
  return (
    <section
      id="road"
      className="relative scroll-mt-20 border-y border-edge bg-carbon/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeader
          index="07"
          kicker="Road Test"
          title={
            <>
              It runs.
              <br /> <span className="text-acid">On real roads.</span>
            </>
          }
          lede="Validation was done on campus roads with the team present — acceleration, braking, grade climbing, and the transitions that matter most: switching energy source while the vehicle is moving."
        />

        <Reveal delay={0.06}>
          <figure className="mt-14 overflow-hidden rounded-2xl border border-edge bg-void">
            <Clip
              slug={featured}
              title={`${videoMeta[featured].title} — ${videoMeta[featured].note}`}
              className="aspect-16/9 w-full object-cover"
            />
            <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-edge px-5 py-4">
              <span className="font-mono text-[10px] tracking-[0.24em] text-acid uppercase">
                Featured run
              </span>
              <span className="text-sm text-mist">
                <span className="text-chalk">{videoMeta[featured].title}</span> —{" "}
                {videoMeta[featured].note}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
          <Reveal delay={0.05}>
            <div className="edge-glass h-full rounded-2xl p-6 sm:p-7">
              <h3 className="font-mono text-[10px] tracking-[0.26em] text-mist uppercase">
                Test checklist
              </h3>
              <ul className="mt-6 space-y-4">
                {checks.map((c) => (
                  <li key={c.k} className="flex gap-3.5">
                    <span
                      aria-hidden
                      className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border border-acid/60 bg-acid/15 font-mono text-[9px] text-acid"
                    >
                      ✓
                    </span>
                    <div>
                      <div className="text-[13px] font-semibold text-chalk">{c.k}</div>
                      <div className="mt-0.5 text-[12.5px] leading-snug text-mist">{c.v}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {rail.map((key, i) => (
              <Reveal key={key} delay={0.08 + i * 0.05}>
                <figure className="group h-full overflow-hidden rounded-2xl border border-edge bg-void">
                  <Clip
                    slug={key}
                    title={`${videoMeta[key].title} — ${videoMeta[key].note}`}
                    className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <figcaption className="border-t border-edge px-4 py-3">
                    <div className="font-mono text-[10px] tracking-[0.18em] text-mist uppercase">
                      {videoMeta[key].title}
                    </div>
                    <div className="mt-1 text-[12.5px] leading-snug text-mist/80">
                      {videoMeta[key].note}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
