#!/usr/bin/env python3
"""Regenerate JD. icons in graphite, off-white and coral.

Editable vector reference: design/jd-monogram.svg. Requires local Pillow and
DejaVu Sans Mono Bold (system font); no font is distributed.
Usage: python3 scripts/generate-icons.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import io

REPO = Path(__file__).resolve().parent.parent if "__file__" in globals() else Path.cwd()
INK = (30, 32, 36, 255)       # dark graphite
PAPER = (243, 242, 238, 255)  # off-white
CORAL = (239, 138, 115, 255)  # coral for contrast against graphite
FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"
MASTER = 1024
FONT_SIZE = 590
DOT_RADIUS = 48
DOT_GAP = 18

def make_master():
    img = Image.new("RGBA", (MASTER, MASTER), INK)
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype(FONT_PATH, FONT_SIZE)
    left, top, right, bottom = draw.textbbox((0, 0), "JD", font=font)
    width, height = right-left, bottom-top
    combined_width = width + DOT_GAP + 2*DOT_RADIUS
    x = (MASTER-combined_width)/2-left
    y = (MASTER-height)/2-top
    draw.text((x, y), "JD", font=font, fill=PAPER)
    dot_x = x+right+DOT_GAP+DOT_RADIUS
    dot_y = y+bottom-DOT_RADIUS
    draw.ellipse((dot_x-DOT_RADIUS, dot_y-DOT_RADIUS,
                  dot_x+DOT_RADIUS, dot_y+DOT_RADIUS), fill=CORAL)
    return img

def save_png(img, dest, size, rgb=False):
    resized=img.resize((size,size), Image.LANCZOS)
    if rgb: resized=resized.convert("RGB")
    dest.parent.mkdir(parents=True, exist_ok=True)
    resized.save(dest, "PNG", optimize=True)

def main():
    master=make_master()
    (REPO/"design").mkdir(parents=True, exist_ok=True)
    master.save(REPO/"design"/"jd-monogram-master-1024.png", "PNG", optimize=True)
    save_png(master, REPO/"app"/"icon.png", 512)
    save_png(master, REPO/"app"/"apple-icon.png", 180, rgb=True)
    save_png(master, REPO/"public"/"icons"/"icon-192.png", 192)
    save_png(master, REPO/"public"/"icons"/"icon-512.png", 512)
    master.save(REPO/"app"/"favicon.ico", "ICO", sizes=[(16,16),(32,32),(48,48)])
    print("JD. icons regenerated.")

if __name__=="__main__":
    main()
