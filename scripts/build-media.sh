#!/usr/bin/env bash
#
# Regenerates public/media from the original camera files.
#
#   ./scripts/build-media.sh [SOURCE_DIR]
#
# SOURCE_DIR defaults to the parent of this repository (where the raw photos,
# videos and PDFs live). Output is deterministic, so re-running is safe: it
# wipes and rebuilds public/media.
#
# Requires: imagemagick (with AVIF + HEIC delegates), ffmpeg, ffprobe.
#
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="${1:-$(dirname "$REPO_ROOT")}"
DEST="$REPO_ROOT/public/media"

if [ ! -d "$SRC" ]; then
  echo "Source directory not found: $SRC" >&2
  exit 1
fi

for bin in magick ffmpeg ffprobe; do
  command -v "$bin" >/dev/null || { echo "Missing dependency: $bin" >&2; exit 1; }
done

rm -rf "$DEST"
mkdir -p "$DEST/img" "$DEST/vid"

echo "Source: $SRC"
echo "Output: $DEST"
echo

# ---------------------------------------------------------------------------
# Photographs
#
# Curated and de-duplicated. The four `SAVE_*` / `IMG_*_1` pairs in the source
# folder are byte-identical duplicates and are represented once here.
# ---------------------------------------------------------------------------
PHOTOS="
engine-alternator-01|IMG_20250301_194505.jpg
engine-alternator-02|IMG_20250301_194511.jpg
chassis-rollout|IMG_20250314_174729.jpg
chassis-frame|IMG_20250316_135917.jpg
chassis-floorpan|IMG_20250317_185752.jpg
chassis-wiring|IMG_20250318_195919.jpg
chassis-assembled|IMG_20250318_200222.jpg
seat-detail|IMG_20250319_185829.jpg
cockpit|IMG_20250319_221720.jpg
powertrain-mount|IMG_20250402_023400.jpg
team-rollout|IMG-20250404-WA0017.jpg
road-dusk|IMG_20250406_181628.jpg
front-trib|IMG_20250414_092039.jpg
front-trib-alt|IMG_20250414_092039_1.jpg
purple-nose|IMG-20250525-WA0001.jpg
driver-side|SAVE_20250406_210428.jpg
road-leafy-motion|SAVE_20250406_234610.jpg
road-distance|SAVE_20250410_212139.jpg
electronics-bay|Snapchat-924581219.jpg
hero-side|IMG_1542.HEIC
team-hero|IMG_1611.HEIC
"

# Widest first is irrelevant here — every width that fits the source is emitted,
# and content/project.ts lists what actually exists per slug.
WIDTHS="640 1024 1600 2200"

while IFS='|' read -r slug file; do
  [ -z "${slug:-}" ] && continue
  src="$SRC/$file"
  [ -f "$src" ] || { echo "  MISSING  $file"; continue; }

  master="/tmp/_tribrid_$slug.png"
  # -strip removes EXIF (including GPS), -auto-orient bakes in rotation first.
  magick "$src" -auto-orient -strip -colorspace sRGB -resize '2600x2600>' "$master"

  actual_w=$(magick identify -format "%w" "$master")
  built=""
  for w in $WIDTHS; do
    [ "$w" -gt "$actual_w" ] && continue
    magick "$master" -resize "${w}x" -quality 72 -define webp:method=6 "$DEST/img/$slug-$w.webp"
    magick "$master" -resize "${w}x" -quality 52 -define heic:speed=4 "$DEST/img/$slug-$w.avif"
    built="$built $w"
  done
  if [ -z "$built" ]; then
    magick "$master" -quality 72 "$DEST/img/$slug-$actual_w.webp"
    magick "$master" -quality 52 "$DEST/img/$slug-$actual_w.avif"
  fi
  # Low-quality image placeholder for the blurred backdrop.
  magick "$master" -resize 20x -quality 40 "$DEST/img/$slug-lqip.webp"
  rm -f "$master"

  printf "  img  %-22s source=%spx widths=%s\n" "$slug" "$actual_w" "${built:- $actual_w}"
done <<< "$PHOTOS"

echo

# ---------------------------------------------------------------------------
# Video
#
# Phone footage arrives portrait and up to 1080p. Everything is capped at 1280px
# on the long edge and any clip over 18s is trimmed to its most useful 13s, so
# the reel stays inside a sensible page budget. `-nostdin` is essential: without
# it ffmpeg consumes the loop's stdin and the loop silently skips entries.
# ---------------------------------------------------------------------------
VIDEOS="
cad-model|VID_20250303_233737.mp4
chassis-frame-run|VID_20250318_195826.mp4
fuel-lines|VID_20250319_221601.mp4
body-wiring|VID_20250402_190126.mp4
nose-panel|VID_20250402_190139.mp4
road-test-campus|VID_20250404_143138.mp4
team-walkaround|VID-20250404-WA0016.mp4
road-run-away|VID_20250414_074813.mp4
"

while IFS='|' read -r slug file; do
  [ -z "${slug:-}" ] && continue
  src="$SRC/$file"
  [ -f "$src" ] || { echo "  MISSING  $file"; continue; }

  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$src" | cut -d. -f1)
  trim=()
  if [ "${dur:-0}" -gt 18 ]; then trim=(-ss 3 -t 13); fi

  ffmpeg -nostdin -y -v error "${trim[@]}" -i "$src" \
    -vf "scale='min(1280,iw)':-2,fps=30" -c:v libx264 -preset slow -crf 31 \
    -pix_fmt yuv420p -movflags +faststart -an "$DEST/vid/$slug.mp4"

  ffmpeg -nostdin -y -v error "${trim[@]}" -i "$src" \
    -vf "scale='min(1280,iw)':-2,fps=30" -c:v libvpx-vp9 -crf 40 -b:v 0 -row-mt 1 -cpu-used 2 -an \
    "$DEST/vid/$slug.webm"

  ffmpeg -nostdin -y -v error -ss 2 -i "$src" -frames:v 1 -vf "scale=1280:-2" -q:v 4 \
    "$DEST/vid/$slug-poster.webp"

  printf "  vid  %-22s %ss  mp4=%s webm=%s\n" "$slug" "$dur" \
    "$(du -h "$DEST/vid/$slug.mp4" | cut -f1)" "$(du -h "$DEST/vid/$slug.webm" | cut -f1)"
done <<< "$VIDEOS"

echo

# ---------------------------------------------------------------------------
# Documents
# ---------------------------------------------------------------------------
mkdir -p "$REPO_ROOT/public/docs"
[ -f "$SRC/final project copy pdf.pdf" ] && cp "$SRC/final project copy pdf.pdf" "$REPO_ROOT/public/docs/tribrid-project-report.pdf" && echo "  doc  tribrid-project-report.pdf"
[ -f "$SRC/madhesh research paper.pdf" ] && cp "$SRC/madhesh research paper.pdf" "$REPO_ROOT/public/docs/tribrid-research-paper.pdf" && echo "  doc  tribrid-research-paper.pdf"

echo
echo "Done. Total: $(du -sh "$DEST" | cut -f1)"
echo "If you added or removed a photo, update imageWidths/imageAlts in src/content/project.ts."
