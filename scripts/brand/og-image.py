"""Render og-image.png (1200x630) for social sharing.

Usage: python3 scripts/brand/og-image.py
Requires Pillow. Uses the Manrope font bundled in scripts/ads/fonts.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
FONT = ROOT / "scripts/ads/fonts/Manrope.ttf"
W, H = 1200, 630
INK, INK_DEEP = (7, 26, 43), (4, 12, 22)
TEAL, BLUE = (94, 214, 203), (127, 178, 255)
ON_DARK, MUTED = (234, 240, 245), (169, 182, 195)


def font(size, weight="Bold"):
    f = ImageFont.truetype(str(FONT), size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


img = Image.new("RGB", (W, H), INK_DEEP)
# Soft teal glow, top right.
glow = Image.new("L", (W, H), 0)
gd = ImageDraw.Draw(glow)
for i in range(60, 0, -1):
    r = i * 9
    gd.ellipse((980 - r, 40 - r, 980 + r, 40 + r), fill=int(70 * (1 - i / 60)))
img.paste(Image.new("RGB", (W, H), (21, 120, 120)), mask=glow)
d = ImageDraw.Draw(img)
# Grid lines.
for x in range(0, W, 60):
    d.line([(x, 0), (x, H)], fill=(14, 32, 48))
for y in range(0, H, 60):
    d.line([(0, y), (W, y)], fill=(14, 32, 48))

logo = Image.open(ROOT / "assets/brand/coastline-logo-light.webp").convert("RGBA")
logo = logo.resize((int(logo.width * 64 / logo.height), 64), Image.LANCZOS)
img.paste(logo, (80, 72), logo)

d.text((80, 214), "Senior engineering expertise.", font=font(60), fill=(255, 255, 255))
d.text((80, 288), "Practical AI.", font=font(60), fill=TEAL)
d.text((80, 362), "Software built for business.", font=font(60), fill=BLUE)
d.line([(80, 482), (1120, 482)], fill=(40, 62, 82), width=2)
d.text((80, 512), "Software engineering and AI consulting · San Diego, CA", font=font(26, "Medium"), fill=MUTED)
d.text((80, 552), "Custom software · AI and ML · Cloud and data · Modernization · Dedicated teams", font=font(22, "Regular"), fill=(132, 148, 166))
url = "coastlinedigital.net"
uf = font(26, "SemiBold")
d.text((1120 - d.textlength(url, font=uf), 512), url, font=uf, fill=ON_DARK)
img.save(ROOT / "og-image.png", optimize=True)
print("wrote og-image.png")
