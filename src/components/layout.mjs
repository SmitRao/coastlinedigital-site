import { html, esc, jsonLd } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import { site, nav, footerNav } from "../site.mjs";
import { services } from "../content/services.mjs";

/** Asset fingerprints are filled in by scripts/build.mjs before rendering. */
export const assetVersions = {};
const v = (file) => `${file}?v=${assetVersions[file] ?? "dev"}`;

export const organizationId = `${site.url}/#organization`;

function head({ title, description, path, ogImage, noindex, jsonld = [] }) {
  const canonical = `${site.url}${path}`;
  const image = `${site.url}${ogImage ?? site.ogImage}`;
  return html`<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
<meta name="theme-color" content="#071a2b">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Coastline Digital: software engineering and AI consulting">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${image}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
<link rel="preload" href="/assets/fonts/instrument-sans-latin-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-latin-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/${v("styles.css")}">
<script src="/${v("main.js")}" defer></script>
${jsonld.map(jsonLd)}
</head>`;
}

function logo({ variant, decorative = false }) {
  const src =
    variant === "light" ? "/assets/brand/coastline-logo-light.webp" : "/assets/brand/coastline-logo.webp";
  const alt = decorative ? "" : "Coastline Digital";
  return `<img class="brand__logo brand__logo--${variant}" src="${src}" width="436" height="110" alt="${alt}">`;
}

function isCurrent(path, href) {
  return href === "/" ? path === "/" : path.startsWith(href);
}

function servicesMenu() {
  return html`<div class="mega" id="menu-services" hidden>
  <div class="mega__grid">
    <ul class="mega__list" role="list">
      ${services.map(
        (s) => html`<li><a class="mega__link" href="${s.href}">
        <span class="mega__icon">${icon(s.icon)}</span>
        <span><span class="mega__title">${s.name}</span><span class="mega__text">${s.menuText}</span></span>
      </a></li>`,
      )}
    </ul>
    <div class="mega__aside">
      <p class="mega__eyebrow">For consulting firms</p>
      <p class="mega__aside-title">Need a delivery partner?</p>
      <p class="mega__aside-text">White-label development, technical subcontracting, and dedicated capacity for agencies and consultancies.</p>
      <a class="link-arrow" href="/partnerships/">Engineering partnerships ${icon("arrow-right")}</a>
      <a class="link-arrow mega__all" href="/services/">All services ${icon("arrow-right")}</a>
    </div>
  </div>
</div>`;
}

function header({ path, theme }) {
  const items = nav.map((item) => {
    const current = isCurrent(path, item.href) ? ' aria-current="page"' : "";
    if (item.menu === "services") {
      return html`<li class="primary-nav__item primary-nav__item--menu" data-menu>
  <a class="primary-nav__link" href="${item.href}"${current}>${item.label}</a><button class="primary-nav__toggle" type="button" aria-expanded="false" aria-controls="menu-services"><span class="sr-only">Show service links</span>${icon("chevron-down")}</button>
  ${servicesMenu()}
</li>`;
    }
    return html`<li class="primary-nav__item"><a class="primary-nav__link" href="${item.href}"${current}>${item.label}</a></li>`;
  });

  return html`<header class="site-header${theme === "dark" ? " site-header--dark" : ""}" data-header>
  <div class="container site-header__inner">
    <a class="brand" href="/" aria-label="Coastline Digital home">${logo({ variant: "dark" })}${logo({ variant: "light", decorative: true })}</a>
    <nav class="primary-nav" aria-label="Main">
      <ul class="primary-nav__list" role="list">${items}</ul>
    </nav>
    <div class="site-header__actions">
      <a class="btn btn--primary btn--sm site-header__cta" href="/contact/" data-track="cta_header_contact">Discuss Your Project</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" data-nav-toggle>
        <span class="sr-only">Menu</span>${icon("menu", { className: "icon nav-toggle__open" })}${icon("close", { className: "icon nav-toggle__close" })}
      </button>
    </div>
  </div>
  <div class="mobile-nav" id="mobile-nav" hidden>
    <nav class="container mobile-nav__inner" aria-label="Mobile">
      <p class="mobile-nav__heading">Services</p>
      <ul class="mobile-nav__list" role="list">
        ${services.map((s) => html`<li><a href="${s.href}">${s.name}</a></li>`)}
        <li><a href="/services/">All services</a></li>
      </ul>
      <p class="mobile-nav__heading">Company</p>
      <ul class="mobile-nav__list" role="list">
        ${nav.filter((n) => !n.menu).map((n) => html`<li><a href="${n.href}">${n.label}</a></li>`)}
        <li><a href="/faq/">FAQ</a></li>
      </ul>
      <div class="mobile-nav__actions">
        <a class="btn btn--primary" href="/contact/">Discuss Your Project</a>
        <a class="btn btn--secondary" href="/partnerships/#partner-inquiry">Become a Delivery Partner</a>
      </div>
    </nav>
  </div>
</header>`;
}

function footer() {
  return html`<footer class="site-footer">
  <div class="container">
    <div class="site-footer__top">
      <div class="site-footer__brand">
        <a class="brand" href="/" aria-label="Coastline Digital home">${logo({ variant: "light" })}</a>
        <p class="site-footer__positioning">${site.positioning}</p>
        <p class="site-footer__meta">${icon("pin")}<span>Based in ${site.locality}, ${site.region}. Working with an international engineering team.</span></p>
        <p class="site-footer__meta">${icon("mail")}<a href="mailto:${site.email}">${site.email}</a></p>
      </div>
      ${footerNav.map(
        (col) => html`<div class="site-footer__col">
        <h2 class="site-footer__title">${col.title}</h2>
        <ul role="list">${col.links.map((l) => html`<li><a href="${l.href}">${l.label}</a></li>`)}</ul>
      </div>`,
      )}
    </div>
    <div class="site-footer__bottom">
      <p>© <span data-year>2026</span> ${site.name}. All rights reserved.</p>
      <ul role="list">
        <li><a href="/privacy/">Privacy policy</a></li>
        <li><button class="link-button" type="button" data-motion-toggle aria-pressed="false">Pause animations</button></li>
      </ul>
    </div>
  </div>
</footer>`;
}

/** Client-side configuration read by main.js. Contains no secrets. */
function clientConfig() {
  const config = { analytics: site.analytics };
  return `<script type="application/json" id="cd-config">${JSON.stringify(config)}</script>`;
}

export function page({
  path,
  title,
  description,
  body,
  headerTheme = "light",
  jsonld = [],
  ogImage,
  noindex = false,
  pageClass = "",
}) {
  return `<!doctype html>
<!-- Generated by scripts/build.mjs from src/. Edit the source files, then run npm run build. -->
<html lang="en">
${head({ title, description, path, ogImage, noindex, jsonld })}
<body class="${pageClass}">
<a class="skip-link" href="#main">Skip to content</a>
${header({ path, theme: headerTheme })}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
${clientConfig()}
</body>
</html>
`;
}

/** Breadcrumb trail plus matching BreadcrumbList structured data. */
export function breadcrumbs(trail) {
  const markup = html`<nav class="breadcrumb" aria-label="Breadcrumb"><ol role="list">
    ${trail.map((item, i) =>
      i === trail.length - 1
        ? html`<li><span aria-current="page">${item.label}</span></li>`
        : html`<li><a href="${item.href}">${item.label}</a>${icon("chevron-right")}</li>`,
    )}
  </ol></nav>`;
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${site.url}${item.href}`,
    })),
  };
  return { markup, data };
}
