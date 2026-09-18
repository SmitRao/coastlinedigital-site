#!/usr/bin/env python3
"""Render img/og-share-1200x630.png, the social share card for coastlinedigital.net.

The card reuses the site palette (styles.css), the favicon wave mark, and copy
that already appears on the site. Run it after a brand change:

    pip install pillow
    python3 tools/make-og-image.py

Playfair Display + DM Sans (SIL OFL) are the site webfonts; the script pulls the
same TTFs Google Fonts serves, and falls back to system serif/sans if offline.
"""

import math
import os
import re
import tempfile
import urllib.request

from PIL import Image, ImageDraw, ImageFilter, ImageFont

SCALE = 2  # render at 2x and downsample for antialiasing
WIDTH, HEIGHT = 1200, 630
OUT = os.path.join(os.path.dirname(__file__), os.pardir, "img", "og-share-1200x630.png")

NAVY = (15, 39, 68)  # --color-navy  #0F2744
NAVY_LIGHT = (26, 58, 92)  # --color-navy-light #1a3a5c
SAND = (212, 196, 168)  # --color-sand #D4C4A8
CREAM = (247, 243, 236)  # --color-cream #F7F3EC

GOOGLE_FONTS_CSS = (
    "https://fonts.googleapis.com/css2?"
    "family=Playfair+Display:wght@500;600&family=DM+Sans:wght@400;500;600&display=swap"
)
FALLBACK_DISPLAY = {
    500: "/usr/share/fonts/truetype/noto/NotoSerifDisplay-Regular.ttf",
    600: "/usr/share/fonts/truetype/noto/NotoSerifDisplay-Bold.ttf",
}
FALLBACK_BODY = {
    400: "/usr/share/fonts/truetype/macos/Inter-Regular.ttf",
    500: "/usr/share/fonts/truetype/macos/Inter-Medium.ttf",
    600: "/usr/share/fonts/truetype/macos/Inter-SemiBold.ttf",
}


def google_font_paths():
    """Return {family: {weight: ttf path}}, downloading when the network allows."""
    cache = os.path.join(tempfile.gettempdir(), "coastline-og-fonts")
    os.makedirs(cache, exist_ok=True)
    families = {}
    try:
        req = urllib.request.Request(
            GOOGLE_FONTS_CSS,
            headers={
                # Older Firefox so Google Fonts CSS returns TTF, not woff2.
                "User-Agent": "Mozilla/5.0 (Windows NT 6.1; rv:45.0) Gecko/20100101 Firefox/45.0"
            },
        )
        css = urllib.request.urlopen(req, timeout=20).read().decode("utf-8")
        family = None
        for block in css.split("@font-face"):
            fam = re.search(r"font-family:\s*'([^']+)'", block)
            weight = re.search(r"font-weight:\s*(\d+)", block)
            url = re.search(r"url\((https://[^)]+\.ttf)\)", block)
            if fam:
                family = fam.group(1)
            if not (family and weight and url):
                continue
            path = os.path.join(cache, "%s-%s.ttf" % (family.replace(" ", ""), weight.group(1)))
            if not os.path.exists(path):
                urllib.request.urlretrieve(url.group(1), path)
            families.setdefault(family, {})[int(weight.group(1))] = path
    except Exception as exc:
        print("Google Fonts unavailable (%s); using fallback fonts" % exc)
    return families


def font(family, weight, size):
    table = FONTS.get(family) or {}
    fallback = FALLBACK_DISPLAY if family == "Playfair Display" else FALLBACK_BODY
    path = table.get(weight) or fallback[weight]
    return ImageFont.truetype(path, size * SCALE)


def px(value):
    return value * SCALE


def vertical_gradient(size, top, bottom):
    w, h = size
    grad = Image.new("RGB", (1, h))
    for y in range(h):
        t = y / max(h - 1, 1)
        grad.putpixel(
            (0, y),
            tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3)),
        )
    return grad.resize((w, h))


def draw_waves(canvas):
    """Hero-style sand wave bands along the bottom edge."""
    w, h = canvas.size
    for amplitude, baseline, alpha, phase in (
        (px(28), h - px(126), 70, 0.2),
        (px(36), h - px(78), 110, 1.3),
        (px(22), h - px(32), 160, 2.4),
    ):
        layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        pen = ImageDraw.Draw(layer)
        pts = []
        for x in range(0, w + 1, px(4)):
            t = x / w
            y = baseline + amplitude * math.sin(2 * math.pi * (t * 1.55) + phase)
            pts.append((x, y))
        pen.polygon(pts + [(w, h), (0, h)], fill=SAND + (alpha,))
        canvas.alpha_composite(layer)


def draw_wave_mark(canvas, cx, cy, radius):
    """Favicon circle + wave strokes, scaled for the card."""
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    pen = ImageDraw.Draw(layer)

    glow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse(
        [cx - radius * 1.35, cy - radius * 1.35, cx + radius * 1.35, cy + radius * 1.35],
        fill=SAND + (40,),
    )
    canvas.alpha_composite(glow.filter(ImageFilter.GaussianBlur(px(18))))

    pen.ellipse(
        [cx - radius, cy - radius, cx + radius, cy + radius],
        fill=NAVY_LIGHT + (255,),
        outline=SAND + (220,),
        width=max(px(3), 2),
    )

    def wave(y_mid, amp, width, alpha):
        pts = []
        left = cx - radius * 0.62
        right = cx + radius * 0.62
        steps = 32
        for i in range(steps + 1):
            t = i / steps
            x = left + (right - left) * t
            y = y_mid + amp * math.sin(math.pi * t * 2.0)
            pts.append((x, y))
        pen.line(pts, fill=SAND + (alpha,), width=width)

    wave(cy + radius * 0.08, radius * 0.16, max(px(5), 4), 255)
    wave(cy + radius * 0.36, radius * 0.12, max(px(4), 3), 150)
    canvas.alpha_composite(layer)


def main():
    canvas = Image.new("RGBA", (px(WIDTH), px(HEIGHT)))
    canvas.paste(vertical_gradient(canvas.size, NAVY, NAVY_LIGHT), (0, 0))

    glow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse(
        [px(720), px(-240), px(1380), px(400)], fill=SAND + (28,)
    )
    canvas.alpha_composite(glow.filter(ImageFilter.GaussianBlur(px(70))))
    draw_waves(canvas)
    draw_wave_mark(canvas, px(168), px(248), px(86))

    pen = ImageDraw.Draw(canvas)
    # Existing on-site copy only: brand wordmark, hero/footer tagline, nav labels, domain.
    pen.text(
        (px(286), px(148)),
        "Coastline Digital",
        font=font("Playfair Display", 600, 72),
        fill=CREAM,
    )
    pen.text(
        (px(288), px(248)),
        "SoCal local sites and listing video",
        font=font("DM Sans", 500, 36),
        fill=SAND,
    )
    pen.text(
        (px(288), px(318)),
        "Local websites  ·  Google Business  ·  Listing video",
        font=font("DM Sans", 400, 28),
        fill=(226, 216, 196),
    )
    pen.text(
        (px(288), px(500)),
        "coastlinedigital.net",
        font=font("DM Sans", 500, 26),
        fill=(186, 174, 154),
    )

    os.makedirs(os.path.dirname(os.path.normpath(OUT)), exist_ok=True)
    out = os.path.normpath(OUT)
    canvas.convert("RGB").resize((WIDTH, HEIGHT), Image.LANCZOS).save(out, optimize=True)
    print("wrote %s" % out)


FONTS = google_font_paths()

if __name__ == "__main__":
    main()
