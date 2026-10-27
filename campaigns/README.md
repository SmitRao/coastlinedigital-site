# Coastline Digital — Southern California campaign kit

Four original, short vertical ad concepts for Southern California business owners, with matching story and feed posters. These are editable campaign drafts, not launched campaigns. All four businesses and workflows are fictional demonstrations; none is a client endorsement, completed client project, or measured result.

## Deliverables

| Concept | Video and captions | Story poster | Feed poster |
| --- | --- | --- | --- |
| Real estate | [MP4](../media/ads/real-estate.mp4) · [VTT](../media/ads/real-estate.vtt) | [PNG](../assets/ads/real-estate-story.png) | [PNG](../assets/ads/real-estate-feed.png) |
| Restaurants | [MP4](../media/ads/restaurant.mp4) · [VTT](../media/ads/restaurant.vtt) | [PNG](../assets/ads/restaurant-story.png) | [PNG](../assets/ads/restaurant-feed.png) |
| Shops and retail | [MP4](../media/ads/retail.mp4) · [VTT](../media/ads/retail.vtt) | [PNG](../assets/ads/retail-story.png) | [PNG](../assets/ads/retail-feed.png) |
| Healthcare administration | [MP4](../media/ads/healthcare.mp4) · [VTT](../media/ads/healthcare.vtt) | [PNG](../assets/ads/healthcare-story.png) | [PNG](../assets/ads/healthcare-feed.png) |

Exports: MP4, H.264, `yuv420p`, 1080 × 1920, 9:16, 30 fps, 15 seconds, AAC stereo 48 kHz, with fast-start metadata. Story graphics are 1080 × 1920 PNG; feed graphics are 1080 × 1350 PNG (4:5). Video text is burned in and is understandable without sound. VTT files provide a separate readable transcript of the on-screen message. An original, lightly percussive 112-BPM instrumental is synthesized by the render source; it contains no stock track, song sample, voice, or third-party recording.

The pace uses large type, three quick scene changes, moving notification cards, progressive task ticks, and a 4.2-second closing call to action. There are no flashing or strobe effects. The design targets the visual language of short-form social video; it makes no promise of virality or advertising performance.

## Suggested campaign setup

- Audience brief: business owners across Southern California, in all industries. The four versions provide concrete examples for real estate, restaurants, retail, and healthcare administration.
- Brand: Coastline Digital. These ads promote software services, not property listings, restaurant offers, merchandise, or medical treatment.
- On-art CTA: **Let’s talk**. Suggested ad-platform CTA: **Learn more**.
- Destination: `https://coastlinedigital.net/examples/` (the examples page links to contact).
- Optional per-concept destination: `https://coastlinedigital.net/examples/?utm_source=instagram&utm_medium=paid_social&utm_campaign=socal_workflows&utm_content=real-estate` — replace the final slug per concept and the source for Facebook.
- Every export visibly says **FICTIONAL DEMO** with the invented company name and **Illustrative concept. No client results claimed.** Keep those labels when adapting the creative.
- Match the 9:16 files to full-height placements and the 4:5 posters to feed placements. Preview the actual ad in Ads Manager to check its crop, UI overlays, CTA, and caption placement. These exports do not constitute platform approval.

Official placement references: [Meta Instagram Reels video guide](https://www.facebook.com/business/ads-guide/update/video/instagram-reels), [Meta Instagram Feed image guide](https://www.facebook.com/business/ads-guide/update/image/instagram-feed). Meta returned a login/block screen when these pages were checked on October 27, 2026, so this kit documents its actual export specifications rather than asserting current platform limits.

## Copy to accompany each concept

### Real estate — Seabright Realty Studio

**Hook:** Your next lead is buried in a DM.

**Primary text:** Southern California business owners: when inquiries arrive everywhere, follow-up can get messy. Imagine one workspace for messages, next steps, and drafts your team reviews. Coastline Digital builds custom software and practical AI around the way you work. Seabright Realty Studio is a fictional demo, not a client story.

**Headline:** Bring your follow-ups together

**Short social caption:** DMs. Website forms. A follow-up you meant to send. Sound familiar? Let’s build a clearer workflow. Fictional demo by Coastline Digital. #SouthernCaliforniaBusiness #WorkflowAutomation #CoastlineDigital

### Restaurants — Juniper Table

**Hook:** Dinner rush. Not spreadsheet rush.

**Primary text:** Bookings change. Prep lists move. Your team needs the same picture. Coastline Digital builds software that connects the work behind the service, shaped around your actual process. Juniper Table is a fictional restaurant concept, not a client or performance claim.

**Headline:** A clearer view of the next shift

**Short social caption:** One service. Too many spreadsheets? Your team’s workflow deserves a better setup. Fictional restaurant demo. Built for the possibilities of Southern California businesses. #RestaurantOperations #SoCalBusiness #CoastlineDigital

### Shops and retail — Tide & Thread

**Hook:** Three versions of “in stock”. One shop.

**Primary text:** The shelf, your online shop, and a spreadsheet should tell the same story. Coastline Digital builds integrations and internal tools around your business. Explore a fictional retail workspace for connecting stock, orders, and everyday tasks. Tide & Thread is an invented example, not a client endorsement.

**Headline:** Connect your shop’s moving parts

**Short social caption:** “Is this actually in stock?” Let’s connect the systems behind the answer. Fictional retail demo by Coastline Digital. #RetailOperations #SmallBusinessSoCal #CoastlineDigital

### Healthcare administration — Harborlight Care Studio

**Hook:** Less inbox ping-pong. More time for people.

**Primary text:** Administrative work can bounce between forms, inboxes, and teams. Coastline Digital designs software around those handoffs, with staff review built into the workflow. Harborlight Care Studio is a fictional administrative demo. No patient information, clinical decision-making, or compliance certification is represented.

**Headline:** A clearer path for admin work

**Short social caption:** Fewer “who has this?” moments starts with a clearer process. Explore a fictional front-desk workflow with staff in control. #HealthcareOperations #SouthernCaliforniaBusiness #CoastlineDigital

## Edit and regenerate

Source: [`scripts/ads/render.py`](../scripts/ads/render.py). It keeps the hooks, UI labels, industry names, scene timing, colors, layout, synthetic audio, captions, and output settings together. The script reads the four existing example photos and the current header logo; it does not call a network service.

Dependencies: Python 3.10 or later, Pillow, NumPy, and FFmpeg built with `libx264` and AAC. For a local virtual environment:

```sh
python3 -m venv /tmp/coastline-ads-env
/tmp/coastline-ads-env/bin/pip install Pillow numpy
# Install FFmpeg through your operating system's package manager.
/tmp/coastline-ads-env/bin/python scripts/ads/render.py
```

Render a single concept with `--only real-estate` (or `restaurant`, `retail`, `healthcare`). Use `--posters-only` to regenerate PNGs and captions without encoding videos. Outputs overwrite this campaign's corresponding files only. Rendering creates its audio in a temporary directory and removes that temporary file afterward.

The bundled Manrope font comes from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/manrope); its SIL Open Font License is included at [`scripts/ads/fonts/OFL.txt`](../scripts/ads/fonts/OFL.txt). Source photos are AI-generated original fictional interiors; see [`assets/images/examples/prompts.json`](../assets/images/examples/prompts.json) for provenance. Brand artwork was supplied in the repository. All workflow interfaces, layout graphics, typography animation, and synthesized soundtrack were created for this kit.
