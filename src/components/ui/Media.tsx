import { imageAlts, imageWidths } from "@/content/project";

const ROOT = process.env.NEXT_PUBLIC_BASE_PATH || "";
const BASE = `${ROOT}/media/img`;

type ImgProps = {
  slug: string;
  alt?: string;
  sizes: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "auto" | "low";
};

/**
 * Art-directed responsive image. Emits AVIF + WebP with every width that the
 * media pipeline actually produced for this slug, plus a blurred LQIP backdrop.
 */
export function Img({
  slug,
  alt,
  sizes,
  className = "",
  loading = "lazy",
  fetchPriority = "auto",
}: ImgProps) {
  const widths = imageWidths[slug];
  if (!widths) {
    throw new Error(`Unknown image slug "${slug}" — add it to imageWidths in content/project.ts`);
  }

  const largest = widths[widths.length - 1];
  const srcSet = (ext: string) => widths.map((w) => `${BASE}/${slug}-${w}.${ext} ${w}w`).join(", ");

  return (
    <picture className="contents">
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`${BASE}/${slug}-${largest}.webp`}
        alt={alt ?? imageAlts[slug] ?? ""}
        width={largest}
        height={largest}
        sizes={sizes}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={className}
      />
    </picture>
  );
}

type VideoProps = {
  slug: string;
  title: string;
  className?: string;
  poster?: boolean;
};

/** Muted, looping, inline clip with WebM + MP4 fallback and a poster frame. */
export function Clip({ slug, title, className = "", poster = true }: VideoProps) {
  return (
    <video
      className={className}
      poster={poster ? `${ROOT}/media/vid/${slug}-poster.webp` : undefined}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      aria-label={title}
      disablePictureInPicture
    >
      <source src={`${ROOT}/media/vid/${slug}.webm`} type="video/webm" />
      <source src={`${ROOT}/media/vid/${slug}.mp4`} type="video/mp4" />
    </video>
  );
}
