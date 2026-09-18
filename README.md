# Coastline Digital

Static marketing site for Coastline Digital, a SoCal marketing studio focused on local sites, Google Business polish, simple email and after-hours paths, and finished listing tour video.

**Live domain:** https://coastlinedigital.net (when DNS is configured)

## Structure

```
/
├── index.html          # Homepage (one-pager with all sections)
├── styles.css          # Main stylesheet
├── main.js             # JavaScript (nav toggle, animations, form handling)
├── img/
│   └── og-share-1200x630.png  # Social share card (1200×630)
├── privacy/
│   └── index.html      # Privacy policy page
├── robots.txt          # Search engine directives
├── sitemap.xml         # XML sitemap with trailing-slash URLs
├── render.yaml         # Render Static Site configuration
├── tools/
│   └── make-og-image.py  # Regenerates the share card (dev-only)
└── README.md           # This file
```

## Tech Stack

- Static HTML, CSS, and vanilla JavaScript
- Google Fonts: Playfair Display (display) + DM Sans (body)
- FormSubmit for contact form handling
- No build step required

## Deploying to Render

### Option 1: Blueprint (recommended)

1. Push this repo to GitHub
2. Go to Render Dashboard > Blueprints
3. Connect your GitHub account and select this repo
4. Render will auto-detect the `render.yaml` and deploy

### Option 2: Manual Static Site

1. Go to Render Dashboard > New > Static Site
2. Connect your GitHub repo
3. Configure:
   - **Name:** coastline-digital
   - **Build Command:** (leave empty)
   - **Publish Directory:** `.` (root)
4. Click Create Static Site

### Trailing Slash Handling

Canonical routes use a trailing slash (`/faq/`, `/privacy/`, `/services/.../`). `render.yaml` 301s the matching bare paths to those slash URLs so search engines consolidate signals. The sitemap `<loc>` values already use trailing slashes.

## DNS Configuration for coastlinedigital.net

After deploying to Render:

1. Go to your Render static site > Settings > Custom Domains
2. Add `coastlinedigital.net` and `www.coastlinedigital.net`
3. Render will provide DNS records to add

At your domain registrar (e.g., Namecheap, Cloudflare, Google Domains):

**For root domain (coastlinedigital.net):**
- Add an `A` record pointing to Render's IP (provided in dashboard)
- Or use `ALIAS`/`ANAME` if your registrar supports it

**For www subdomain:**
- Add a `CNAME` record: `www` -> `[your-site].onrender.com`

**SSL:** Render automatically provisions and renews SSL certificates via Let's Encrypt once DNS is verified.

## Development

No build step needed. Open `index.html` in a browser or use any local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if npx available)
npx serve .

# PHP
php -S localhost:8000
```

## Contact Form

The contact form uses FormSubmit (formsubmit.co) to handle submissions. Form data is sent to the configured email address. On successful submission, users are redirected to `/?sent=1` which displays a success message.

**Note:** The first form submission will require email verification through FormSubmit. After verification, submissions will be delivered normally.

## Social share image

`og:image` and `twitter:image` on every page that already had Open Graph tags point at `https://coastlinedigital.net/img/og-share-1200x630.png`. The card uses the existing navy/sand palette, the favicon wave mark, and on-site copy only (brand name, hero/footer tagline, nav labels, domain). No personal name or phone.

Regenerate after a brand change:

```bash
pip install pillow
python3 tools/make-og-image.py
```

## Google Search Console

Do not invent a `google-site-verification` meta string. Add it only after Smit provides the verify token from Search Console.

## Analytics Placeholders

GA4 and Meta Pixel code blocks are included in `index.html` as commented-out placeholders. To enable:

1. Get your GA4 Measurement ID (G-XXXXXXXXXX)
2. Uncomment the GA4 script block and replace the placeholder ID
3. For Meta Pixel, uncomment and add your Pixel ID

## Brand Colors

| Name   | Hex       | Usage                    |
|--------|-----------|--------------------------|
| Navy   | `#0F2744` | Primary, headings        |
| Sand   | `#D4C4A8` | Accent, highlights       |
| Cream  | `#F7F3EC` | Background               |
| Slate  | `#1C2430` | Body text                |

## License

Private. All rights reserved by Coastline Digital.
