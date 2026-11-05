import { html } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import { site } from "../site.mjs";
import { services } from "../content/services.mjs";
import { engagementModels, principles, process } from "../content/company.mjs";
import { breadcrumbs } from "../components/layout.mjs";
import { projectForm } from "../components/forms.mjs";
import { organizationSchema } from "../lib/schema.mjs";
import {
  checklist,
  ctaBand,
  engagementCards,
  pageHero,
  processTrack,
  sectionHead,
} from "../components/ui.mjs";

/* ----------------------------------------------------------------------------
   About
   ------------------------------------------------------------------------- */
const aboutCrumbs = breadcrumbs([
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
]);

const about = {
  path: "/about/",
  title: "About Coastline Digital | US-Based Software Engineering Company",
  description:
    "Coastline Digital is a US-based software engineering and AI consulting company in San Diego, working with an international team of experienced engineers.",
  priority: 0.7,
  jsonld: [aboutCrumbs.data, { ...organizationSchema(), "@context": "https://schema.org" }],
  body: html`
${pageHero({
  crumbs: aboutCrumbs.markup,
  eyebrow: "About us",
  title: "A software engineering company built around the work.",
  lede: `${site.name} is a US-based software engineering and AI consulting company. We help companies design, build, and modernize the software their business depends on.`,
})}

<section class="section section--flush-top" aria-labelledby="background-title">
  <div class="container two-col two-col--wide">
    <div data-reveal>
      <p class="eyebrow">Company background</p>
      <h2 class="section-title" id="background-title">Engineering partner to product teams, businesses, and consultancies.</h2>
    </div>
    <div class="prose" data-reveal>
      <p>Coastline Digital is based in ${site.locality}, California, and works with US companies on custom software, AI and machine learning, cloud and data engineering, and enterprise modernization.</p>
      <p>We serve startups and SaaS companies building their core products, growing and established businesses modernizing how they operate, and software consulting firms that need a dependable engineering delivery partner for their own clients.</p>
      <p>Our engagements take three forms: dedicated engineering teams, project-based delivery, and engineering delivery partnerships. Each is structured around clear ownership, visible progress, and software that your team can maintain long after the first release.</p>
    </div>
  </div>
</section>

<section class="section section--muted" aria-labelledby="philosophy-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Engineering philosophy", id: "philosophy-title", title: "Principles that guide how we build." })}
    <ol class="principles" role="list">${principles.map(
      (p, i) => html`<li class="principle" data-reveal><span class="principle__num">0${i + 1}</span><h3 class="principle__title">${p.title}</h3><p>${p.text}</p></li>`,
    )}</ol>
  </div>
</section>

<section class="section" aria-labelledby="collab-title">
  <div class="container two-col">
    <div>
      ${sectionHead({ eyebrow: "Collaboration approach", id: "collab-title", title: "We work with your team, not around it.", lede: "The best results come from close collaboration with the people who know the business. We join your planning, share our work early, and make decisions visible." })}
    </div>
    <div class="panel" data-reveal>
      <h3 class="panel__title">What collaboration looks like</h3>
      ${checklist([
        "Direct access to the engineers doing the work",
        "Shared repositories, backlogs, and documentation",
        "Regular demos of working software",
        "Written status updates covering progress, decisions, and risks",
        "Work in your tools and processes wherever practical",
      ])}
    </div>
  </div>
</section>

<section class="section section--dark" aria-labelledby="distributed-title">
  <div class="section__bg" aria-hidden="true"></div>
  <div class="container two-col">
    <div>
      ${sectionHead({ eyebrow: "Distributed team model", id: "distributed-title", title: "US-based company. International engineering team." })}
    </div>
    <div class="prose prose--on-dark" data-reveal>
      <p>Coastline Digital is a US company, and we work with an international team of experienced engineering professionals. That lets us match the right skills to each engagement rather than limiting ourselves to a single location.</p>
      <p>Distributed delivery only works when it is transparent. For every engagement, we tell you who is working on your project, where they are located, and how their working hours overlap with your team. Communication cadence, documentation, and access are agreed at kickoff.</p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="services-title">
  <div class="container">
    ${sectionHead({ eyebrow: "What we do", id: "services-title", title: "Services" })}
    <ul class="related-links related-links--grid" role="list">${services.map(
      (s) => html`<li><a href="${s.href}"><span class="icon-tile icon-tile--sm">${icon(s.icon)}</span><span>${s.longName ?? s.name}</span>${icon("arrow-right")}</a></li>`,
    )}<li><a href="/partnerships/"><span class="icon-tile icon-tile--sm">${icon("handshake")}</span><span>Engineering partnerships</span>${icon("arrow-right")}</a></li></ul>
    <p class="fineprint fineprint--spaced">Interested in joining the team? See <a href="/careers/">open roles</a>.</p>
  </div>
</section>

${ctaBand({
  title: "Let’s talk about what you are building.",
  primary: { label: "Discuss Your Project", href: "/contact/", track: "cta_about_band" },
  secondary: { label: "Become a Delivery Partner", href: "/partnerships/#partner-inquiry" },
})}`,
};

/* ----------------------------------------------------------------------------
   How we work
   ------------------------------------------------------------------------- */
const howCrumbs = breadcrumbs([
  { label: "Home", href: "/" },
  { label: "How We Work", href: "/how-we-work/" },
]);

const qa = [
  { icon: "code", title: "Code review on every change", text: "No change reaches the main branch without review by another engineer." },
  { icon: "check-circle", title: "Automated testing", text: "Unit, integration, and end-to-end tests appropriate to the risk of each component, run in CI." },
  { icon: "branch", title: "Continuous integration", text: "Every change is built and tested automatically, with staging environments for acceptance." },
  { icon: "gauge", title: "Performance and reliability checks", text: "Load, latency, and failure-mode testing for the paths that matter most." },
  { icon: "shield", title: "Security practices", text: "Least-privilege access, secrets management, dependency scanning, and security-focused review." },
  { icon: "target", title: "AI evaluation", text: "Evaluation sets, regression checks, and monitoring for every AI component before and after launch." },
];

const comms = [
  { title: "Kickoff", text: "Goals, roles, working hours, tools, communication channels, and escalation paths agreed in writing." },
  { title: "Every iteration", text: "Planning, a demo of working software, and a short written update covering progress, decisions, and risks." },
  { title: "Every milestone", text: "A review against acceptance criteria, an updated plan, and any changes to scope discussed openly." },
  { title: "Always", text: "A shared backlog and repository, so progress is visible without waiting for a meeting." },
];

const howWeWork = {
  path: "/how-we-work/",
  title: "How We Work: Software Delivery Process | Coastline Digital",
  description:
    "Our software delivery process: discover, architect, build, validate, and launch, with transparent communication, code review, and automated testing.",
  priority: 0.8,
  jsonld: [howCrumbs.data],
  body: html`
${pageHero({
  crumbs: howCrumbs.markup,
  eyebrow: "How we work",
  title: "Predictable delivery, visible progress, maintainable code.",
  lede: "A delivery process designed so you always know what is done, what is next, and what is at risk, whether we are building a product, modernizing a system, or extending your team.",
  actions: [{ label: "Discuss Your Project", href: "/contact/", variant: "primary", track: "cta_how_hero" }],
})}

<section class="section section--flush-top" aria-labelledby="process-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Delivery process", id: "process-title", title: "Five phases, each with a clear outcome." })}
    ${processTrack(process, { detailed: true })}
  </div>
</section>

<section class="section section--muted" aria-labelledby="comms-title">
  <div class="container two-col">
    <div>
      ${sectionHead({ eyebrow: "Communication", id: "comms-title", title: "A steady rhythm of updates and decisions.", lede: "Cadence is agreed at kickoff to fit your team. These are the defaults we start from." })}
    </div>
    <ol class="timeline" role="list">${comms.map(
      (c) => html`<li class="timeline__item" data-reveal><h3 class="timeline__title">${c.title}</h3><p>${c.text}</p></li>`,
    )}</ol>
  </div>
</section>

<section class="section" aria-labelledby="qa-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Quality assurance", id: "qa-title", title: "Quality built into everyday engineering.", lede: "Testing and review are part of how we build, not a phase at the end." })}
    <ul class="reasons reasons--three" role="list">${qa.map(
      (q) => html`<li class="reason" data-reveal><span class="reason__icon">${icon(q.icon)}</span><div><h3 class="reason__title">${q.title}</h3><p>${q.text}</p></div></li>`,
    )}</ul>
  </div>
</section>

<section class="section section--muted" id="engagement-models" aria-labelledby="engagement-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Engagement options", id: "engagement-title", title: "Choose how we work together." })}
    ${engagementCards(engagementModels)}
  </div>
</section>

${ctaBand({
  title: "Let’s build something that moves your business forward.",
  primary: { label: "Discuss Your Project", href: "/contact/", track: "cta_how_band" },
  secondary: { label: "Become a Delivery Partner", href: "/partnerships/#partner-inquiry" },
})}`,
};

/* ----------------------------------------------------------------------------
   Contact
   ------------------------------------------------------------------------- */
const contactCrumbs = breadcrumbs([
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact/" },
]);

const contact = {
  path: "/contact/",
  title: "Contact Coastline Digital | Discuss Your Software or AI Project",
  description:
    "Contact Coastline Digital about a software development project, AI implementation, dedicated engineering team, or consulting partnership.",
  priority: 0.9,
  pageClass: "page-contact",
  jsonld: [contactCrumbs.data],
  body: html`
<section class="section contact" aria-labelledby="page-title">
  <div class="page-hero__bg" aria-hidden="true"></div>
  <div class="container">
    ${contactCrumbs.markup}
    <div class="form-layout form-layout--contact">
      <div class="form-layout__intro">
        <p class="eyebrow">Contact</p>
        <h1 id="page-title">Discuss your project.</h1>
        <p class="lede">Tell us what you are building, modernizing, or trying to improve. A few details help us prepare a useful first conversation.</p>
        <h2 class="kicker-title">What happens next</h2>
        <ol class="mini-steps" role="list">
          <li><span>1</span><p>We review your inquiry and reply by email.</p></li>
          <li><span>2</span><p>We arrange a conversation to understand your goals, systems, and constraints.</p></li>
          <li><span>3</span><p>We recommend an approach, a team, and an engagement model.</p></li>
        </ol>
      </div>
      <div class="form-card">${projectForm()}</div>
        <div class="contact-alt form-layout__aside">
          <div class="contact-alt__item">
            ${icon("handshake")}
            <div><h2 class="contact-alt__title">Agency or consulting firm?</h2><p>Use the dedicated partner form to tell us about your firm and client work.</p><a class="link-arrow" href="/partnerships/#partner-inquiry" data-track="cta_contact_partner">Partnership inquiry ${icon("arrow-right")}</a></div>
          </div>
          <div class="contact-alt__item">
            ${icon("mail")}
            <div><h2 class="contact-alt__title">Prefer email?</h2><p><a href="mailto:${site.email}">${site.email}</a></p></div>
          </div>
          <div class="contact-alt__item">
            ${icon("briefcase")}
            <div><h2 class="contact-alt__title">Looking for a role?</h2><p>See <a href="/careers/">open positions</a>. Please do not use this form for applications.</p></div>
          </div>
        </div>
    </div>
  </div>
</section>`,
};

export default [about, howWeWork, contact];
