"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Img } from "@/components/ui/Media";
import { gallery, imageAlts, imageWidths } from "@/content/project";

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((dir: number) => {
    setOpen((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length));
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const slug = open === null ? null : gallery[open];

  return (
    <section id="gallery" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeader
          index="09"
          kicker="Archive"
          title={
            <>
              Every frame
              <br /> from the <span className="text-acid">workshop floor.</span>
            </>
          }
          lede="Twenty-one photographs covering the full build — bare space frame, harness routing, bodywork and road validation. Select any frame to view it full size."
        />

        <div className="mt-14 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {gallery.map((s, i) => (
            <Reveal key={s} delay={(i % 4) * 0.04} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open image ${i + 1} of ${gallery.length}: ${imageAlts[s] ?? s}`}
                className="group relative block w-full overflow-hidden rounded-xl border border-edge bg-carbon"
              >
                <Img
                  slug={s}
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 31vw, 46vw"
                  className="w-full transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="pointer-events-none absolute bottom-3 left-3 right-3 translate-y-2 text-left font-mono text-[10px] leading-snug tracking-[0.1em] text-chalk uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {imageAlts[s]}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {slug && open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Image ${open + 1} of ${gallery.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-90 flex flex-col bg-void/94 backdrop-blur-md"
            onClick={close}
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <span className="font-mono text-[11px] tracking-[0.2em] text-mist tabular-nums">
                {String(open + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={close}
                className="grid size-9 place-items-center rounded-full border border-edge text-chalk transition-colors hover:border-acid hover:text-acid"
              >
                <span className="sr-only">Close</span>
                <span aria-hidden>✕</span>
              </button>
            </div>

            <div
              className="flex flex-1 items-center justify-center overflow-hidden px-4 pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={slug}
                src={`/media/img/${slug}-${imageWidths[slug][imageWidths[slug].length - 1]}.webp`}
                alt={imageAlts[slug] ?? ""}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="max-h-full max-w-full rounded-lg object-contain"
              />
            </div>

            <div
              className="flex items-center justify-between gap-4 border-t border-edge px-5 py-4 sm:px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="max-w-lg text-[13px] leading-snug text-mist">{imageAlts[slug]}</p>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="grid size-10 place-items-center rounded-full border border-edge text-chalk transition-colors hover:border-acid hover:text-acid"
                >
                  <span className="sr-only">Previous image</span>
                  <span aria-hidden>←</span>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="grid size-10 place-items-center rounded-full border border-edge text-chalk transition-colors hover:border-acid hover:text-acid"
                >
                  <span className="sr-only">Next image</span>
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
