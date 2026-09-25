import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  index: string;
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  accent?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  index,
  kicker,
  title,
  lede,
  accent = "var(--color-acid)",
  align = "left",
}: SectionHeaderProps) {
  return (
    <header className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}>
      <Reveal>
        <div
          className={`flex items-center gap-4 font-mono text-[11px] tracking-[0.32em] uppercase ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span style={{ color: accent }}>{index}</span>
          <span aria-hidden className="h-px w-10" style={{ background: accent, opacity: 0.5 }} />
          <span className="text-mist">{kicker}</span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-6 text-[clamp(2.1rem,6vw,4.4rem)] uppercase">{title}</h2>
      </Reveal>

      {lede ? (
        <Reveal delay={0.12}>
          <p
            className={`mt-6 text-base leading-relaxed text-mist sm:text-lg ${
              align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
            }`}
          >
            {lede}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}
