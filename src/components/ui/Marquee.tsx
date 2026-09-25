import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * CSS-only infinite marquee. The track is duplicated once and translated -50%,
 * so it loops seamlessly without JS. Pauses on hover; disabled for reduced motion
 * in globals.css.
 */
export function Marquee({ children, duration = 42, reverse = false, className = "" }: MarqueeProps) {
  return (
    <div className={`marquee mask-fade-x overflow-hidden ${className}`} role="presentation">
      <div
        className={`marquee-track ${reverse ? "marquee-track--reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
