import { html } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import { site } from "../site.mjs";
import { breadcrumbs, organizationId } from "../components/layout.mjs";
import { partnershipModel } from "../components/diagrams.mjs";
import { partnerForm } from "../components/forms.mjs";
import { checklist, faqList, pageHero, sectionHead } from "../components/ui.mjs";

const crumbs = breadcrumbs([
  { label: "Home", href: "/" },
  { label: "Engineering Partnerships", href: "/partnerships/" },
]);

const services = [
  { icon: "layers", title: "White-label development", text: "We deliver under your brand and within your process. Your client works with your team; we stay behind the scenes." },
  { icon: "team", title: "Dedicated engineering capacity", text: "Engineers assigned to your firm for ongoing work, so you can say yes to more projects without hiring ahead of demand." },
  { icon: "briefcase", title: "Technical subcontracting", text: "We take ownership of a defined part of a project, such as a backend, an integration, or a data pipeline, against your specification." },
  { icon: "handshake", title: "Project-based collaboration", text: "Joint delivery on a single engagement, with responsibilities, milestones, and communication paths agreed up front." },
  { icon: "server", title: "Backend and full-stack delivery", text: "APIs, services, databases, and web applications built to your client’s standards and handed over cleanly." },
  { icon: "spark", title: "AI and cloud engineering support", text: "Generative AI, RAG, agents, cloud infrastructure, and data engineering skills when a client project needs them." },
];

const principles = [
  { icon: "chat", title: "Clear communication", text: "A named lead, agreed status cadence, and written updates your delivery team can forward or adapt for clients." },
  { icon: "target", title: "Defined ownership", text: "Responsibilities documented before work begins: who owns scope, client contact, code review, releases, and support." },
  { icon: "check-circle", title: "Reliable engineering practices", text: "Code review, automated tests, CI, and documentation as standard, aligned with your conventions or your client’s." },
  { icon: "refresh", title: "Flexible collaboration", text: "Join a single project, provide ongoing capacity, or scale up for a busy quarter. Arrangements adapt as your pipeline changes." },
  { icon: "lock", title: "Confidentiality and IP protection", text: "Confidentiality, IP assignment, and non-solicitation of your clients are covered in the contract, subject to the terms we agree." },
  { icon: "globe", title: "Transparent international delivery", text: "We tell you who is working on the project, where they are located, and how their hours overlap with yours and your client’s." },
];

const steps = [
  { title: "Introductory call", text: "Your firm, your clients, the work you deliver, and where a partner would help most." },
  { title: "Fit and terms", text: "Capabilities, working model, confidentiality, and commercial terms agreed in writing." },
  { title: "First engagement", text: "A defined first project or capacity arrangement with clear ownership on both sides." },
  { title: "Review and grow", text: "A joint retrospective, then adjustments to scope, staffing, and process for future work." },
];

const audiences = ["Software agency founders", "Consulting firm owners", "Delivery directors", "CTOs and engineering managers"];

const faqs = [
  { q: "Can you work under our brand?", a: "Yes. In a white-label arrangement, our engineers work within your processes and communication channels, and your firm remains the client’s point of contact." },
  { q: "Will you contact our clients directly?", a: "Only in the ways you agree to. Client communication rules and non-solicitation terms are defined in the partnership agreement." },
  { q: "Where are your engineers located?", a: "Coastline Digital is based in the United States and works with an international team of engineering professionals. We tell you where each engineer is located so you can make accurate commitments to your clients." },
  { q: "Who owns the code and IP?", a: "IP ownership and assignment are set in the contract and can be structured to match what your own client agreement requires." },
  { q: "What size of engagement do you take on?", a: "Engagement size is agreed per partnership, from a defined piece of a single project to ongoing capacity. Tell us what you have in mind and we will be candid about fit." },
];

export default {
  path: "/partnerships/",
  title: "Software Development Subcontracting and White-Label Engineering | Coastline Digital",
  description:
    "Engineering delivery partner for US agencies and consulting firms: white-label development, software subcontracting, and dedicated engineering capacity.",
  priority: 0.9,
  pageClass: "page-partnerships",
  jsonld: [
    crumbs.data,
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${site.url}/partnerships/#service`,
      name: "Engineering delivery partnerships",
      serviceType: "Software development subcontracting and white-label engineering",
      description:
        "White-label development, technical subcontracting, and dedicated engineering capacity for software agencies and consulting firms.",
      url: `${site.url}/partnerships/`,
      provider: { "@id": organizationId },
      areaServed: { "@type": "Country", name: "United States" },
      audience: { "@type": "BusinessAudience", audienceType: "Software consulting firms and agencies" },
    },
  ],
  body: html`
${(() => {
  const aside = html`<div class="hero-card" data-reveal>
    <p class="hero-card__label">Built for</p>
    <ul class="hero-card__list" role="list">${audiences.map((a) => html`<li>${icon("check")}<span>${a}</span></li>`)}</ul>
    <p class="hero-card__foot">Delivering custom software, AI, cloud, or data projects to US clients.</p>
  </div>`;
  return pageHero({
    crumbs: crumbs.markup,
    eyebrow: "Engineering partnerships",
    title: "Your engineering delivery partner.",
    lede: "Extend your delivery capabilities with experienced engineers supporting custom software, AI, cloud, and data projects.",
    actions: [
      { label: "Explore a Partnership", href: "#partner-inquiry", variant: "primary", track: "cta_partner_hero" },
      { label: "How it works", href: "#partner-model", variant: "secondary", arrow: false },
    ],
    aside,
    className: "page-hero--partner",
  });
})()}

<section class="section" aria-labelledby="partner-services-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Partnership services", id: "partner-services-title", title: "Engineering capacity that fits your delivery model.", lede: "Say yes to more client work, cover skills you do not have in-house, and keep quality consistent across projects." })}
    <ul class="feature-grid" role="list">${services.map(
      (s) => html`<li class="feature" data-reveal><span class="icon-tile">${icon(s.icon)}</span><h3 class="feature__title">${s.title}</h3><p>${s.text}</p></li>`,
    )}</ul>
  </div>
</section>

<section class="section section--muted" id="partner-model" aria-labelledby="model-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Who owns what", id: "model-title", title: "Clear responsibilities from day one.", lede: "Every partnership starts with documented ownership, so your firm stays in control of the client relationship and we stay accountable for the engineering." })}
    ${partnershipModel()}
  </div>
</section>

<section class="section" aria-labelledby="principles-title">
  <div class="container">
    ${sectionHead({ eyebrow: "How we operate", id: "principles-title", title: "What you can rely on as a partner." })}
    <ul class="reasons reasons--three" role="list">${principles.map(
      (p) => html`<li class="reason" data-reveal><span class="reason__icon">${icon(p.icon)}</span><div><h3 class="reason__title">${p.title}</h3><p>${p.text}</p></div></li>`,
    )}</ul>
  </div>
</section>

<section class="section section--dark" aria-labelledby="partner-steps-title">
  <div class="section__bg" aria-hidden="true"></div>
  <div class="container">
    ${sectionHead({ eyebrow: "Getting started", id: "partner-steps-title", title: "From first call to first project." })}
    <ol class="steps steps--dark" role="list">${steps.map(
      (s, i) => html`<li class="steps__item" data-reveal><span class="steps__num">0${i + 1}</span><h3 class="steps__title">${s.title}</h3><p>${s.text}</p></li>`,
    )}</ol>
  </div>
</section>

<section class="section" aria-labelledby="partner-faq-title">
  <div class="container two-col two-col--faq">
    ${sectionHead({ eyebrow: "Partner questions", id: "partner-faq-title", title: "Questions agencies ask us." })}
    ${faqList(faqs)}
  </div>
</section>

<section class="section section--muted form-section" id="partner-inquiry" aria-labelledby="partner-form-title">
  <div class="container form-layout">
    <div class="form-layout__intro" data-reveal>
      <p class="eyebrow">Partner inquiry</p>
      <h2 class="section-title" id="partner-form-title">Explore a partnership.</h2>
      <p class="lede">Tell us about your firm and the work you deliver. We will reply by email to arrange an introductory call.</p>
      ${checklist(["No obligation to proceed", "Ask about an NDA before sharing client details", "Share as much or as little as you are able to"], "checklist--compact")}
      <p class="form-layout__alt">Prefer email? <a href="mailto:${site.email}?subject=Partnership%20inquiry">${site.email}</a></p>
    </div>
    <div class="form-card">${partnerForm()}</div>
  </div>
</section>`,
};
