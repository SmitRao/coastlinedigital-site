# Coastline Digital

Static marketing site for Coastline Digital, a SoCal marketing studio focused on local sites, Google Business polish, simple email and after-hours paths, and finished listing tour video.

**Live domain:** https://coastlinedigital.net (when DNS is configured)

## Structure

```
/
├── index.html          # Homepage (one-pager with all sections)
├── tokens.css          # Design tokens (colour, type, space, motion)
├── styles.css          # Design system and page components
├── main.js             # Navigation, anchor scrolling, contact form
├── motion.js           # Motion primitives (reveals, text effect, pointer)
├── faq/
│   └── index.html      # FAQ page
├── services/
│   ├── local-websites/
│   ├── google-business/
│   └── listing-tour-video/
├── privacy/
│   └── index.html      # Privacy policy page
├── robots.txt          # Search engine directives
├── sitemap.xml         # XML sitemap with trailing-slash URLs
├── llms.txt, ai.txt    # LLM/AEO discoverability
├── render.yaml         # Render Static Site configuration
└── README.md           # This file
```

## Tech Stack

- Static HTML, CSS, and vanilla JavaScript
- Google Fonts: Playfair Display (display) + DM Sans (body)
- FormSubmit for contact form handling
- No build step, no framework, no third-party runtime dependencies

## Design system

`tokens.css` is the single source of truth for colour, the fluid type scale,
the 4px space scale, radii, elevation, motion durations/easings and layout
widths. Component CSS should only reference tokens, never raw values. The
variable names used before the token layer existed (`--color-navy`,
`--space-md`, `--shadow-sm`, `--transition-base`, …) are kept at the bottom of
the file as aliases onto the new scale.

`styles.css` builds on those tokens: base and primitives, then motion
classes, then chrome (nav, footer), then the homepage sections, then the
inner-page shell (`.page`, `.panel`, `.checklist`, `.steps`, `.prose`,
`.qa-list`, `.page-cta`) that every subpage shares.

One gotcha worth knowing: headings default to the dark ink colour, so any
section on a dark background needs `section--inverse` or its title will
disappear into the background.

## Motion primitives

`motion.js` implements the site's motion with no dependencies. Each primitive
is opt-in through a data attribute:

| Primitive | Attribute | Behaviour |
|---|---|---|
| In view | `data-reveal` | IntersectionObserver reveal with a per-sibling stagger |
| Text effect | `data-text-effect` | Splits a heading into words and floats them up |
| Shimmer | `.shimmer` | CSS highlight sweep for small accent text |
| Spotlight | `data-spotlight` | Pointer-tracked highlight on buttons and cards |
| Magnetic | `data-magnetic` | Element leans up to 6px toward the pointer |
| Scroll progress | `data-scroll-progress` | Rail on the bottom edge of the header |

Rules these primitives follow, and that new ones should too:

- `prefers-reduced-motion: reduce` disables everything. CSS neutralises the
  animations and reveal offsets, and `motion.js` refuses to attach listeners
  and settles any applied state if the preference changes mid-session.
- Spotlight and magnetic also require `(hover: hover) and (pointer: fine)`, so
  touch devices never attach those listeners.
- Reveal targets are hidden only under the `.has-js` class, which a tiny inline
  script in each `<head>` adds. If a script fails or is blocked, the page stays
  fully readable rather than invisible.
- `data-text-effect` sets `aria-label` to the original string so assistive tech
  reads one phrase rather than a list of words.

## Cache busting

`render.yaml` serves `*.css` and `*.js` with
`Cache-Control: public, max-age=31536000, immutable`. Filenames are not
fingerprinted, so asset links carry a `?v=YYYYMMDD` query string. **Bump that
value in every HTML file whenever you edit a CSS or JS file**, otherwise
returning visitors keep the old asset. Alternatively, lower the `max-age` in
`render.yaml` and drop the query strings.

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

Render static sites handle trailing slashes automatically. The `/privacy` path will serve `/privacy/index.html`. If you need explicit redirects from non-trailing to trailing slash URLs:

1. Go to your site settings in Render Dashboard
2. Navigate to Redirects/Rewrites
3. Add redirect rules as needed (e.g., `/privacy` -> `/privacy/`)

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

## Analytics Placeholders

GA4 and Meta Pixel code blocks are included in `index.html` as commented-out placeholders. To enable:

1. Get your GA4 Measurement ID (G-XXXXXXXXXX)
2. Uncomment the GA4 script block and replace the placeholder ID
3. For Meta Pixel, uncomment and add your Pixel ID

## Brand Colors

Defined as primitives in `tokens.css` and consumed through the semantic
aliases (`--surface-page`, `--text-strong`, `--accent`, …).

| Name   | Hex       | Usage                    |
|--------|-----------|--------------------------|
| Navy   | `#0F2744` | Primary, headings        |
| Sand   | `#D4C4A8` | Accent, highlights       |
| Cream  | `#F7F3EC` | Background               |
| Slate  | `#1C2430` | Body text                |

## License

Private. All rights reserved by Coastline Digital.
