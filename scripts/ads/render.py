#!/usr/bin/env python3
"""Render original Coastline Digital campaign graphics and motion ads.

Requires Python 3.10+, Pillow, NumPy, and FFmpeg with libx264/AAC.
Run from any directory: python3 scripts/ads/render.py [--only real-estate] [--posters-only]
No network access, third-party music, or AI service is needed to render.
"""

from __future__ import annotations

import utils.http_session
import utils.transport
import utils.session
import argparse
import math
from pathlib import Path
import shutil
import subprocess
import tempfile
import wave

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[2]
W, H, FPS, DURATION = 1080, 1920, 30, 15
NAVY = "#082a39"
DEEP = "#061e2b"
TEAL = "#22c4b7"
CREAM = "#f7f7ee"
MUTED = "#a4bcc3"
LIME = "#e6f39e"
FONT = Path(__file__).parent / "fonts/Manrope.ttf"
LOGO = Image.open(ROOT / "assets/brand/coastline-header-logo.webp").convert("RGBA")

CONCEPTS = {
    "real-estate": {
        "industry": "REAL ESTATE",
        "company": "Seabright Realty Studio",
        "hook": ["Your next lead", "is buried", "in a DM."],
        "bridge": ["One place.", "Every lead."],
        "solution": ["From inquiry", "to follow-up."],
        "card": "Inquiry workspace",
        "flow": "Website + messages → One queue",
        "rows": ["New inquiry captured", "Draft response for review", "Next step ready"],
        "notifications": ["New website inquiry", "A DM needs a reply", "Follow-up still pending"],
        "summary": "Bring inquiries and follow-ups together.",
    },
    "restaurant": {
        "industry": "RESTAURANTS",
        "company": "Juniper Table",
        "hook": ["Dinner rush.", "Not spreadsheet", "rush."],
        "bridge": ["One shift.", "One clear view."],
        "solution": ["Less chasing.", "More serving."],
        "card": "Service workspace",
        "flow": "Bookings + prep → One team view",
        "rows": ["Bookings together", "Prep tasks assigned", "Team handoff ready"],
        "notifications": ["A booking just changed", "Which prep list is current?", "Who has the handoff?"],
        "summary": "Connect bookings, prep, and team handoffs.",
    },
    "retail": {
        "industry": "SHOPS & RETAIL",
        "company": "Tide & Thread",
        "hook": ["Three versions", "of “in stock”.", "One shop."],
        "bridge": ["Your stock.", "One clear view."],
        "solution": ["Connect the dots.", "Keep selling."],
        "card": "Inventory workspace",
        "flow": "In-store + online → One view",
        "rows": ["Stock counts connected", "Order exceptions flagged", "Restock list prepared"],
        "notifications": ["Online says available", "Shelf says sold out", "Spreadsheet says… maybe?"],
        "summary": "Connect stock, orders, and everyday tasks.",
    },
    "healthcare": {
        "industry": "HEALTHCARE ADMIN",
        "company": "Harborlight Care Studio",
        "hook": ["Less inbox", "ping-pong.", "More time for people."],
        "bridge": ["Admin work.", "A clearer path."],
        "solution": ["Organize the work.", "Keep staff in control."],
        "card": "Front-desk workspace",
        "flow": "Forms + requests → Admin queue",
        "rows": ["Forms in one queue", "Missing details flagged", "Staff review before action"],
        "notifications": ["An intake form is missing", "Who handles this request?", "Another inbox handoff"],
        "summary": "Bring administrative workflows together.",
    },
}

FONTS = {}


def font(size, weight=750):
    key = (int(size), weight)
    if key not in FONTS:
        f = ImageFont.truetype(str(FONT), int(size))
        f.set_variation_by_axes([weight])
        FONTS[key] = f
    return FONTS[key]


def text(im, xy, value, size=32, fill=CREAM, weight=750, max_width=None):
    d = ImageDraw.Draw(im)
    if max_width:
        while d.textlength(value, font=font(size, weight)) > max_width and size > 18:
            size -= 1
    d.text(xy, value, font=font(size, weight), fill=fill, anchor="lt")


def rect(im, box, fill, radius=24, outline=None, width=1):
    ImageDraw.Draw(im).rounded_rectangle(tuple(map(int, box)), radius=radius, fill=fill, outline=outline, width=width)


def ease(v):
    return 1 - (1 - max(0, min(v, 1))) ** 3


def brand(im, y=235, small=False):
    width = 326 if small else 350
    logo = LOGO.resize((width, round(width * LOGO.height / LOGO.width)), Image.Resampling.LANCZOS)
    rect(im, (80, y - 13, 80 + width + 22, y + logo.height + 9), CREAM, 16)
    im.paste(logo, (91, y - 2), logo)


def base(height=H, t=0):
    im = Image.new("RGB", (W, height), NAVY)
    d = ImageDraw.Draw(im)
    # Original vector geometry, slowly moving behind the legible foreground.
    shift = math.sin(t * .65) * 18
    for r in (510, 610, 710, 810):
        cx, cy = 1110 + shift, height * .53
        d.ellipse((cx - r, cy - r, cx + r, cy + r), outline="#143c49", width=2)
    d.polygon([(0, height - 240), (1080, height - 420), (1080, height), (0, height)], fill=DEEP)
    return im


def eyebrow(im, c, y=390):
    rect(im, (80, y - 7, 91, y + 27), TEAL, 4)
    text(im, (110, y), c["industry"], 27, TEAL, 800)


def headline(im, lines, y=470, size=88, gap=11, accent_last=True, x=80):
    for i, line in enumerate(lines):
        color = LIME if accent_last and i == len(lines) - 1 else CREAM
        text(im, (x, y + i * (size + gap)), line, size, color, 800, 920)


def photo_panel(im, photo, box, zoom=1.0):
    x0, y0, x1, y1 = map(int, box)
    size = (x1 - x0, y1 - y0)
    # Standard layout crop/resize only; generated source photos are unchanged.
    scaled = ImageOps.fit(photo, (round(size[0] * zoom), round(size[1] * zoom)), method=Image.Resampling.LANCZOS)
    dx, dy = (scaled.width - size[0]) // 2, (scaled.height - size[1]) // 2
    crop = scaled.crop((dx, dy, dx + size[0], dy + size[1]))
    mask = Image.new("L", size)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, *size), radius=28, fill=255)
    im.paste(crop, (x0, y0), mask)


def disclosure(im, c, y=1482, dark=False):
    color = NAVY if dark else MUTED
    text(im, (80, y), "FICTIONAL DEMO · " + c["company"], 32, color, 700, 920)
    text(im, (80, y + 44), "Illustrative concept. No client results claimed.", 28, color, 500)


def arrow(im, x, y, color=NAVY, size=23):
    d = ImageDraw.Draw(im)
    d.line((x-size,y+size,x+size,y-size), fill=color, width=5)
    d.line((x-size+5,y-size,x+size,y-size,x+size,y+size-5), fill=color, width=5)


def cta(im, y=1270, compact=False):
    rect(im, (80, y, 1000, y + 106), LIME, 18)
    text(im, (112, y + 28), "Let’s talk", 40, NAVY, 800)
    arrow(im, 938, y + 53)
    text(im, (80, y + 134), "coastlinedigital.net", 40 if not compact else 36, CREAM, 700)


def dashboard(im, c, top=850, progress=1, compact=False):
    height = 420 if compact else 466
    rect(im, (80, top + 12, 1000, top + height + 12), "#041924", 28)
    rect(im, (80, top, 1000, top + height), CREAM, 28)
    text(im, (114, top + 32), c["card"], 39, NAVY, 800)
    text(im, (114, top + 90), c["flow"], 28, "#47616a", 600)
    for i, row in enumerate(c["rows"]):
        yy = top + 158 + i * (77 if compact else 90)
        active = progress >= (i + 1) / 3
        rect(im, (110, yy, 968, yy + 68), "#e8efeb", 12)
        rect(im, (128, yy + 18, 160, yy + 50), "#108c83" if active else "#bfd0cd", 8)
        if active:
            ImageDraw.Draw(im).line((135, yy+34, 142, yy+41, 154, yy+28), fill="white", width=4)
        text(im, (180, yy + 17), row, 29, NAVY, 650, 753)


def render_frame(c, photo, t):
    im = base(t=t)
    brand(im)
    eyebrow(im, c)
    if t < 3.4:
        enter = round(36 * (1 - ease(t / .35)))
        headline(im, c["hook"], y=477 + enter, size=86)
        photo_panel(im, photo, (80, 844, 1000, 1394), 1.025 + .035 * t / 3.4)
        for i, label in enumerate(c["notifications"]):
            start = .5 + i * .65
            if t >= start:
                xx = 125 + i * 22 + round((1-ease((t-start)/.3))*150)
                yy = 933 + i * 122
                rect(im, (xx, yy, xx + 770, yy + 100), CREAM, 18)
                rect(im, (xx + 20, yy + 29, xx + 59, yy + 68), TEAL, 12)
                text(im, (xx + 81, yy + 31), label, 31, NAVY, 750, 665)
    elif t < 6.7:
        s = t - 3.4
        headline(im, c["bridge"], y=490 + round(30*(1-ease(s/.3))), size=96)
        photo_panel(im, photo, (80, 767, 1000, 1005), 1.04)
        dashboard(im, c, top=1030, progress=min(s / 2.2, 1), compact=True)
    elif t < 10.8:
        s = t - 6.7
        headline(im, c["solution"], y=490 + round(30*(1-ease(s/.3))), size=82)
        text(im, (80, 735), "A workflow built around your team.", 35, MUTED, 600)
        dashboard(im, c, top=842, progress=min((s+.2) / 2.5, 1))
        rect(im, (80, 1340, 1000, 1435), "#124b50", 18)
        text(im, (111, 1369), "CUSTOM SOFTWARE + PRACTICAL AI", 30, CREAM, 800)
    else:
        s = t - 10.8
        headline(im, ["Less busywork.", "More business."], y=505, size=89)
        text(im, (80, 770), "Software + practical AI", 43, CREAM, 600)
        text(im, (80, 833), "for Southern California businesses.", 38, MUTED, 600, 920)
        rect(im, (80, 948, 1000, 1110), "#124b50", 22)
        text(im, (115, 982), "Start with the work.", 40, CREAM, 750)
        text(im, (115, 1041), "Build the right thing.", 34, TEAL, 650)
        cta(im, y=1216)
    disclosure(im, c)
    # Progress tabs sit inside the safe composition, not at the screen edge.
    d = ImageDraw.Draw(im)
    for i, (start, end) in enumerate(((0,3.4),(3.4,6.7),(6.7,10.8),(10.8,15))):
        x = 80 + i * 235
        d.rounded_rectangle((x, 1630, x+215, 1636), radius=3, fill="#254c58")
        frac = min(1, max(0, (t-start)/(end-start)))
        if frac > 0:
            d.rounded_rectangle((x,1630,x+max(6,int(215*frac)),1636),radius=3,fill=TEAL)
    return im


def poster(c, photo, height):
    im = base(height)
    if height == 1920:
        brand(im)
        eyebrow(im, c)
        headline(im, c["hook"], y=475, size=86)
        photo_panel(im, photo, (80, 837, 1000, 1170), 1.02)
        rect(im, (109, 1060, 970, 1196), CREAM, 18)
        text(im, (140, 1084), c["card"], 36, NAVY, 800)
        text(im, (140, 1140), c["flow"], 27, "#47616a", 600)
        text(im, (80, 1240), "Custom software. Practical AI. Built for you.", 33, CREAM, 600, 920)
        cta(im, y=1322)
        disclosure(im, c, y=1580)
    else:
        brand(im, y=61, small=True)
        eyebrow(im, c, y=216)
        headline(im, c["hook"], y=281, size=81, gap=9)
        photo_panel(im, photo, (80, 590, 1000, 900), 1.02)
        rect(im, (110, 813, 970, 920), CREAM, 16)
        text(im, (140, 838), c["card"], 34, NAVY, 800)
        text(im, (80, 963), "Custom software + practical AI for SoCal.", 32, CREAM, 600)
        cta(im, y=1027, compact=True)
        disclosure(im, c, y=1220)
    return im


def soundtrack(path):
    """Original 112-BPM synthesis: kick, hi-hat, bass, and soft chord stabs."""
    sr = 48000
    tt = np.arange(sr * DURATION) / sr
    audio = np.zeros(len(tt), dtype=np.float64)
    rng = np.random.default_rng(20261027)
    beat = 60 / 112
    for n in range(int(DURATION / (beat / 2))):
        start = n * beat / 2
        idx = int(start * sr)
        count = min(int(.2 * sr), len(tt) - idx)
        u = np.arange(count) / sr
        hat = rng.normal(0,1,count) * np.exp(-u*75) * .025
        audio[idx:idx+count] += hat
        if n % 2 == 0:
            count = min(int(.4*sr),len(tt)-idx)
            u = np.arange(count) / sr
            kick = np.sin(2*np.pi*(47*u + 12*(1-np.exp(-u*24)))) * np.exp(-u*13) * .22
            audio[idx:idx+count] += kick
        if n % 8 in (0,4):
            count = min(int(.8*sr),len(tt)-idx)
            u=np.arange(count)/sr
            notes = (220,277.18,329.63) if n%16<8 else (196,246.94,293.66)
            chord=sum(np.sin(2*np.pi*f*u) for f in notes)/3
            audio[idx:idx+count] += chord*np.minimum(u*35,1)*np.exp(-u*5)*.09
    fade = np.minimum(tt / .05, 1) * np.minimum((DURATION - tt) / .6, 1)
    audio = np.clip(audio * fade, -.9, .9)
    stereo = np.column_stack((audio, audio))
    with wave.open(str(path), "wb") as f:
        f.setnchannels(2); f.setsampwidth(2); f.setframerate(sr)
        f.writeframes((stereo*32767).astype("<i2").tobytes())


def captions(c, path):
    cues = [
        ("00:00.000", "00:03.400", " ".join(c["hook"])),
        ("00:03.400", "00:06.700", " ".join(c["bridge"]) + " " + c["flow"] + "."),
        ("00:06.700", "00:10.800", " ".join(c["solution"]) + " " + "; ".join(c["rows"]) + "."),
        ("00:10.800", "00:15.000", "Less busywork. More business. Software and practical AI for Southern California businesses. Let’s talk: coastlinedigital.net."),
    ]
    path.write_text("WEBVTT\n\nNOTE\nOriginal instrumental rhythm. All copy is also on screen.\nFictional demo: " + c["company"] + ". No client results claimed.\n\n" + "\n\n".join(f"{a} --> {b}\n{value}" for a,b,value in cues) + "\n")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", choices=CONCEPTS)
    parser.add_argument("--posters-only", action="store_true")
    args=parser.parse_args()
    concepts = {args.only: CONCEPTS[args.only]} if args.only else CONCEPTS
    for folder in (ROOT/"assets/ads", ROOT/"media/ads"):
        folder.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="coastline-ads-") as tmp:
        audio = Path(tmp)/"original-rhythm.wav"
        if not args.posters_only:
            if not shutil.which("ffmpeg"):
                raise SystemExit("FFmpeg with libx264 and AAC is required.")
            soundtrack(audio)
        for slug, c in concepts.items():
            photo_path=ROOT/f"assets/images/examples/{slug}.webp"
            if not photo_path.exists():
                raise SystemExit(f"Missing supplied photo: {photo_path}")
            photo=Image.open(photo_path).convert("RGB")
            for kind, height in (("story",1920),("feed",1350)):
                poster(c,photo,height).save(ROOT/f"assets/ads/{slug}-{kind}.png",optimize=True)
            captions(c,ROOT/f"media/ads/{slug}.vtt")
            print(f"{slug}: posters and captions ready",flush=True)
            if args.posters_only:
                continue
            out=ROOT/f"media/ads/{slug}.mp4"
            cmd=["ffmpeg","-hide_banner","-loglevel","error","-y","-f","rawvideo","-vcodec","rawvideo","-pix_fmt","rgb24","-s",f"{W}x{H}","-r",str(FPS),"-i","-","-i",str(audio),"-map","0:v:0","-map","1:a:0","-c:v","libx264","-preset","fast","-crf","21","-pix_fmt","yuv420p","-c:a","aac","-b:a","128k","-ar","48000","-movflags","+faststart","-t",str(DURATION),str(out)]
            process=subprocess.Popen(cmd,stdin=subprocess.PIPE)
            try:
                for frame in range(FPS*DURATION):
                    process.stdin.write(render_frame(c,photo,frame/FPS).tobytes())
                    if frame % 150 == 0:
                        print(f"{slug}: frame {frame}/{FPS*DURATION}",flush=True)
            finally:
                process.stdin.close()
            if process.wait():
                raise SystemExit(f"FFmpeg failed for {slug}")
            print(f"{slug}: video ready ({out.stat().st_size:,} bytes)",flush=True)


if __name__ == "__main__":
    main()
