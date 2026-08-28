#!/usr/bin/env python3
"""Regenerate the JD monogram favicon/icon set from scratch.

Design reference: design/jd-monogram.svg (same colors, font and layout).
This script draws directly with Pillow instead of rasterizing the SVG
because the build environment has no SVG->raster tool installed (no
Inkscape/rsvg-convert/cairosvg). If you change the design, update both
files consistently.

Requires: Python 3 with Pillow (not a project runtime dependency; this is
a one-off maintenance script, run manually when the mark needs to change).

Usage:
    python3 scripts/generate-icons.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

REPO = Path(__file__).resolve().parent.parent

INK = (17, 17, 17, 255)  # --ink (app/globals.css)
GOLD = (212, 160, 23, 255)  # --gold (app/globals.css)
FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"
MASTER = 1024
TEXT = "JD"
SAFE_WIDTH_RATIO = 0.74
SAFE_HEIGHT_RATIO = 0.60


def make_master() -> Image.Image:
    img = Image.new("RGBA", (MASTER, MASTER), INK)
    draw = ImageDraw.Draw(img)
    size = 700
    font = ImageFont.truetype(FONT_PATH, size)
    bbox = draw.textbbox((0, 0), TEXT, font=font)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    budget_w, budget_h = MASTER * SAFE_WIDTH_RATIO, MASTER * SAFE_HEIGHT_RATIO
    while (w > budget_w or h > budget_h) and size > 10:
        size -= 4
        font = ImageFont.truetype(FONT_PATH, size)
        bbox = draw.textbbox((0, 0), TEXT, font=font)
        w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (MASTER - w) / 2 - bbox[0]
    y = (MASTER - h) / 2 - bbox[1]
    draw.text((x, y), TEXT, font=font, fill=GOLD)
    return img


def save_png(im: Image.Image, path: Path, size: int, *, rgb: bool = False) -> None:
    resized = im.resize((size, size), Image.LANCZOS)
    if rgb:
        resized = resized.convert("RGB")
    path.parent.mkdir(parents=True, exist_ok=True)
    resized.save(path, format="PNG")


def main() -> None:
    master = make_master()
    master.save(REPO / "design" / "jd-monogram-master-1024.png")

    save_png(master, REPO / "app" / "icon.png", 512)
    save_png(master, REPO / "app" / "apple-icon.png", 180, rgb=True)
    save_png(master, REPO / "public" / "icons" / "icon-192.png", 192)
    save_png(master, REPO / "public" / "icons" / "icon-512.png", 512)

    master.save(REPO / "app" / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

    print("Icons regenerated.")


if __name__ == "__main__":
    main()
