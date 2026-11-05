import { html } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import { services } from "../content/services.mjs";
import { capabilities, engagementModels } from "../content/company.mjs";
import { solutions } from "../content/solutions.mjs";
import { breadcrumbs } from "../components/layout.mjs";
import {
  button,
  capabilityTabs,
  checklist,
  ctaBand,
  engagementCards,
  faqList,
  pageHero,
  sectionHead,
  serviceCard,
  solutionCard,
} from "../components/ui.mjs";
import { serviceSchema } from "../lib/schema.mjs";

/* ----------------------------------------------------------------------------
   /services/ overview
   ------------------------------------------------------------------------- */
const overviewCrumbs = breadcrumbs([
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
]);

const overview = {
  path: "/services/",
  title: "Software Engineering and AI Consulting Services | Coastline Digital",
  description:
    "Custom software engineering, AI and machine learning, cloud and data engineering, enterprise modernization, and dedicated engineering teams.",
  priority: 0.9,
  jsonld: [overviewCrumbs.data],
  body: html`
${pageHero({
  crumbs: overviewCrumbs.markup,
  eyebrow: "Services",
  title: "Engineering services for software that matters to the business.",
  lede: "Five practices, one engineering standard. Engage us for a defined project, a dedicated team, or as a delivery partner for your own clients.",
  actions: [
    { label: "Discuss Your Project", href: "/contact/", variant: "primary", track: "cta_services_contact" },
    { label: "Engagement models", href: "#engagement-models", variant: "secondary", arrow: false },
  ],
})}
<section class="section section--flush-top" aria-labelledby="services-list-title">
  <div class="container">
    <h2 class="sr-only" id="services-list-title">Our services</h2>
    <div class="service-grid">${services.map((s, i) => serviceCard(s, { index: i }))}</div>
  </div>
</section>
<section class="section section--muted" aria-labelledby="capabilities-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Capabilities", id: "capabilities-title", title: "The engineering disciplines behind every service." })}
    ${capabilityTabs(capabilities)}
  </div>
</section>
<section class="section" id="engagement-models" aria-labelledby="engagement-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Engagement models", id: "engagement-title", title: "Choose how we work together." })}
    ${engagementCards(engagementModels)}
  </div>
</section>
${ctaBand({
  title: "Not sure which service fits?",
  text: "Describe the problem. We will recommend an approach, even if it is smaller than you expected.",
  primary: { label: "Discuss Your Project", href: "/contact/", track: "cta_services_band" },
  secondary: { label: "Become a Delivery Partner", href: "/partnerships/#partner-inquiry" },
})}`,
};

/* ----------------------------------------------------------------------------
   Individual service pages
   ------------------------------------------------------------------------- */
function heroAside(service) {
  return html`<div class="hero-card" data-reveal>
    <p class="hero-card__label">Capabilities</p>
    <ul class="hero-card__list" role="list">${service.offerings.map((o) => html`<li>${icon(o.icon)}<span>${o.title}</span></li>`)}</ul>
  </div>`;
}

function servicePage(service) {
  const crumbs = breadcrumbs([
    { label: "Home", href: "/" },
    { label: "Services", href: "/services/" },
    { label: service.longName ?? service.name, href: service.href },
  ]);
  const related = solutions.filter((s) => s.services.includes(service.id)).slice(0, 2);
  const models = engagementModels.filter((m) => service.engagements.includes(m.id));
  const others = services.filter((s) => s.id !== service.id);

  return {
    path: service.href,
    title: service.seo.title,
    description: service.seo.description,
    priority: 0.9,
    jsonld: [serviceSchema(service), crumbs.data],
    body: html`
${pageHero({
  crumbs: crumbs.markup,
  eyebrow: service.longName ?? service.name,
  title: service.hero.title,
  lede: service.hero.lede,
  actions: [
    { label: "Discuss Your Project", href: `/contact/?service=${service.id}`, variant: "primary", track: `cta_service_${service.id}` },
    { label: "How we work", href: "/how-we-work/", variant: "secondary", arrow: false },
  ],
  aside: heroAside(service),
})}

<section class="section" aria-labelledby="offer-title">
  <div class="container">
    ${sectionHead({ eyebrow: "What we deliver", id: "offer-title", title: "Focused capabilities, delivered by experienced engineers." })}
    <ul class="feature-grid" role="list">${service.offerings.map(
      (o) => html`<li class="feature" data-reveal><span class="icon-tile">${icon(o.icon)}</span><h3 class="feature__title">${o.title}</h3><p>${o.text}</p></li>`,
    )}</ul>
  </div>
</section>

<section class="section section--muted" aria-labelledby="fit-title">
  <div class="container two-col">
    <div>
      ${sectionHead({ eyebrow: "When teams bring us in", id: "fit-title", title: "Common starting points." })}
      ${checklist(service.situations, "checklist--large")}
    </div>
    <div class="panel" data-reveal>
      <h3 class="panel__title">What you can expect</h3>
      ${checklist(service.deliverables)}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="approach-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Our approach", id: "approach-title", title: "From first conversation to production." })}
    <ol class="steps" role="list">${service.approach.map(
      (step, i) => html`<li class="steps__item" data-reveal><span class="steps__num">0${i + 1}</span><h3 class="steps__title">${step.title}</h3><p>${step.text}</p></li>`,
    )}</ol>
  </div>
</section>

${related.length ? html`<section class="section section--muted" aria-labelledby="related-title">
  <div class="container">
    <div class="split-head">
      ${sectionHead({ eyebrow: "Solution concepts", id: "related-title", title: "What this can look like.", lede: "Illustrative examples, not client engagements." })}
      <div class="split-head__aside" data-reveal>${button({ label: "All concepts", href: "/solutions/", variant: "secondary" })}</div>
    </div>
    <div class="solution-grid solution-grid--two">${related.map(solutionCard)}</div>
  </div>
</section>` : ""}

<section class="section" aria-labelledby="models-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Ways to engage", id: "models-title", title: "Engagement options for this service." })}
    ${engagementCards(models, { selector: false })}
  </div>
</section>

<section class="section section--muted" aria-labelledby="faq-title">
  <div class="container two-col two-col--faq">
    ${sectionHead({ eyebrow: "Questions", id: "faq-title", title: "Common questions.", lede: 'More answers on our <a href="/faq/">FAQ page</a>.' })}
    ${faqList(service.faqs)}
  </div>
</section>

<section class="section section--tight" aria-labelledby="other-title">
  <div class="container">
    <h2 class="kicker-title" id="other-title">Other services</h2>
    <ul class="related-links" role="list">${others.map(
      (s) => html`<li><a href="${s.href}"><span class="icon-tile icon-tile--sm">${icon(s.icon)}</span><span>${s.name}</span>${icon("arrow-right")}</a></li>`,
    )}</ul>
  </div>
</section>

${ctaBand({
  title: service.cta.title,
  text: service.cta.text,
  primary: { label: "Discuss Your Project", href: `/contact/?service=${service.id}`, track: `cta_service_band_${service.id}` },
  secondary: { label: "Become a Delivery Partner", href: "/partnerships/#partner-inquiry" },
})}`,
  };
}

export default [overview, ...services.map(servicePage)];
