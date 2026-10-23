# Coastline Digital

Static marketing site for Coastline Digital, a forward-deployed AI and software firm focused on enterprise applications. The site presents custom internal tools, workflow automation, integrations, AI and machine learning, and websites and apps. Coastline Digital is based in San Diego and works with teams across Southern California and remotely.

**Domain:** https://coastlinedigital.net

**Contact:** hello@coastlinedigital.net

## Structure

```text
/
├── index.html          # Homepage, service overview, workflow examples, contact
├── tokens.css          # Shared colour, typography, spacing, and layout tokens
├── styles.css          # Responsive layouts, components, and CSS animation
├── main.js             # Navigation, illustrative workflows, contact form states
├── motion.js           # Reveals, animation pause control, scroll progress
├── faq/index.html
├── careers/
│   ├── index.html       # Senior AI/ML Engineer job posting
│   └── careers.css      # Careers page layout and responsive styling
├── services/
│   ├── enterprise-applications/index.html
│   ├── ai-machine-learning/index.html
│   └── websites-apps/index.html
├── privacy/index.html
├── assets/
│   ├── brand/          # Existing logo and mark assets
│   └── images/
│       └── coastline-hero.webp
├── robots.txt
├── sitemap.xml
├── og-image.png        # 1200 × 630 Open Graph / Twitter image
├── favicon.svg, favicon-32.png, apple-touch-icon.png
├── llms.txt, ai.txt     # Machine-readable company and service descriptions
├── render.yaml         # Render Static Site configuration
└── README.md
```

## Technology and visual design

The site uses static HTML, CSS, and vanilla JavaScript, with no framework or build step. Manrope is loaded from Google Fonts, with system sans-serif fallbacks. FormSubmit handles contact submissions.

`tokens.css` loads before `styles.css` on every page. It supplies shared type and layout values and retains legacy token aliases. `styles.css` defines the current component styles, responsive breakpoints, and animation. Service, FAQ, and privacy pages share the `.page`, `.panel`, `.checklist`, `.steps`, `.prose`, `.qa-list`, and `.page-cta` patterns.

| Colour | Value | Purpose |
|---|---|---|
| Ocean | `#123d3a` | Deep coastal green and primary accents |
| Cream | `#f9faf7` | Main page background |
| Sage | `#6c8171` | Supporting colour and softer accents |
| Gold | Existing logo artwork | Brand detail and warm highlights |

The homepage combines a responsive coastal hero image, CSS and SVG service illustrations, an interactive workflow example, and clear contact calls to action. The service illustrations are built directly in the page and do not require an external graphics library.

## Hero image and brand assets

`assets/images/coastline-hero.webp` is an AI-generated illustration created with the built-in imagegen tool and optimized as WebP for the site. Generation prompt summary:

> Cinematic aerial Southern California coast, deep teal water, white surf, golden sandstone, warm sunlight, no people or text.

The image provides coastal atmosphere and is not presented as a photograph of a specific location or project.

- `assets/brand/coastline-lockup-dark.svg` is the supplied logo for light backgrounds. `coastline-lockup-dark-header.svg` uses a cropped viewBox so the header can size the artwork without its original padding.
- `assets/brand/coastline-mark-1024.png` is the organization logo in the homepage JSON-LD. `apple-touch-icon.png` uses the same mark at 180 pixels.
- Every page links to the absolute URL of `og-image.png` for Open Graph and Twitter previews, with `summary_large_image` cards.

## Interactive workflow examples

The homepage explorer offers operations, documents, and customer-experience scenarios. Selecting a tab changes the example; “Run example” moves its three steps through loading and completed states with status text and spinners. These are local, illustrative interactions. They do not call an AI model, connect to business systems, process user documents, or send data to a backend.

Tabs support arrow keys, Home, and End, with a single active tab stop and associated tab panels. Running an example announces progress through a status region. Switching scenarios clears pending timers and resets the example.

## Motion and accessibility

- `data-reveal` elements use IntersectionObserver for a small entrance transition. Content starts visible and only becomes eligible for a reveal after observation is available.
- `data-scroll-progress` updates the thin progress rail below the navigation.
- CSS provides the orbit animations, subtle Ken Burns movement on the hero image, hover transitions, and loading spinners.
- The hero includes a labelled pause/resume button for decorative animations. Pausing also makes reveal content visible; functional submission and example indicators remain available.
- `prefers-reduced-motion: reduce` removes CSS animation and transitions, makes reveals visible, and disables smooth scrolling. The pause control reflects the device preference.
- Pages include skip links and visible focus styles. The mobile menu reports its expanded state, closes on Escape or outside clicks, and returns focus to its toggle when dismissed with Escape.

## Contact form

The form retains a native `POST` to `https://formsubmit.co/hello@coastlinedigital.net`; JavaScript adds feedback without replacing the submission with an AJAX request. It collects a name, email address, optional company, and message. A honeypot and FormSubmit CAPTCHA remain enabled.

On submission, the button shows a spinner, the form reports a busy state, and a status message explains the next verification step. Duplicate submissions are temporarily blocked. A timeout restores the button if navigation has not completed, and returning through the browser's back/forward cache clears the pending state.

The configured return URL is `https://coastlinedigital.net/?sent=1#contact`. On return, the page displays its confirmation message and removes the `sent` parameter from the address bar.

**Hosted verification:** FormSubmit requires activation through the recipient's email for a new form. Verify activation, CAPTCHA, delivery to `hello@coastlinedigital.net`, and the return URL from the deployed domain before relying on production inquiries. Local interaction checks do not verify email delivery.

## Careers

`/careers/index.html` publishes the Senior AI/ML Engineer contract role, with its page-specific styling in `/careers/careers.css`. The position is fully remote and open worldwide; only senior AI/ML engineers are considered. The page includes the company description, responsibilities, qualifications, and application instructions, and is linked from the navigation, footer, and sitemap.

Applicants send a proposal to one of `evan@coastlinedigital.net`, `derek@coastlinedigital.net`, or `jack@coastlinedigital.net` using the page's email links. These `mailto:` links open the applicant's email client; there is no application form or submission backend.

## Development

Serve the repository root so absolute asset URLs and subpage links work:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. No package installation or build command is required. Review the homepage and supporting pages at desktop and mobile sizes, test the menu and workflow tabs with a keyboard, and check the reduced-motion preference. The form's hosted verification steps are separate from local UI checks.

## Cache busting

The current shared CSS and JavaScript asset version is **`20261022.4`**. Every HTML page loads `tokens.css`, `styles.css`, `main.js`, and `motion.js` with that `?v=` suffix.

`render.yaml` serves CSS and JavaScript with `Cache-Control: public, max-age=31536000, immutable`. Whenever a shared stylesheet or script changes, bump the version in every HTML file. Use a date-based value with an incrementing suffix for multiple updates on one day, so returning visitors receive the new assets.

## Deploying to Render

Deployment remains a Render Static Site using the existing `render.yaml`. It publishes the repository root with an empty build command.

### Blueprint

1. Push the repository to GitHub.
2. In Render, create a Blueprint and select this repository.
3. Use the checked-in `render.yaml` configuration.

### Manual Static Site

1. In Render, create a Static Site connected to this repository.
2. Set the name to `coastline-digital`.
3. Leave the build command empty and set the publish directory to `.`.
4. Deploy the site.

### Domain and routes

Add `coastlinedigital.net` and `www.coastlinedigital.net` under the site's custom domains, then apply the DNS records shown in Render's dashboard. Confirm domain verification and HTTPS after the records are in place.

`render.yaml` retains the `/privacy` rewrite and redirects the older `/services/local-websites/` and `/services/google-business/` routes to `/services/websites-apps/`. The retired `/services/listing-tour-video/` route redirects to `/`. Keep these redirect paths free of new page directories so old links continue to reach their intended destinations.

## License

Private. All rights reserved by Coastline Digital.
