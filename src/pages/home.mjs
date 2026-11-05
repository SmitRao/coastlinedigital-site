import { html } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import { site } from "../site.mjs";
import { services } from "../content/services.mjs";
import { audiences, capabilities, engagementModels, process, reasons } from "../content/company.mjs";
import { solutions, featuredSolutionIds } from "../content/solutions.mjs";
import { heroArchitecture } from "../components/diagrams.mjs";
import {
  audienceCards,
  button,
  capabilityTabs,
  ctaBand,
  engagementCards,
  processTrack,
  reasonsGrid,
  sectionHead,
  serviceCard,
  solutionCard,
} from "../components/ui.mjs";
import { organizationId } from "../components/layout.mjs";
import { organizationSchema } from "../lib/schema.mjs";

const featured = featuredSolutionIds.map((id) => solutions.find((s) => s.id === id));

const body = html`
<section class="hero" aria-labelledby="hero-title">
  <div class="hero__bg" aria-hidden="true"><div class="hero__grid"></div><div class="hero__glow"></div></div>
  <div class="container hero__inner">
    <div class="hero__copy">
      <p class="hero__eyebrow"><span class="hero__eyebrow-dot" aria-hidden="true"></span>Software engineering and AI consulting</p>
      <h1 class="hero__title" id="hero-title">Engineering better software. <span class="hero__title-accent">Building what’s next.</span></h1>
      <p class="hero__lede">We help companies design, build, and scale software products, AI solutions, and enterprise systems with experienced engineering teams.</p>
      <div class="actions">
        ${button({ label: "Discuss Your Project", href: "/contact/", variant: "light", size: "lg", track: "cta_hero_contact" })}
        ${button({ label: "Explore Our Expertise", href: "#expertise", variant: "outline-light", size: "lg", arrow: false, track: "cta_hero_expertise" })}
      </div>
      <ul class="hero__pillars" role="list">
        <li>${icon("check")}Senior engineering expertise</li>
        <li>${icon("check")}Practical AI</li>
        <li>${icon("check")}Software built for business</li>
      </ul>
    </div>
    ${heroArchitecture()}
  </div>
</section>

<section class="section" id="expertise" aria-labelledby="expertise-title">
  <div class="container">
    <div class="split-head">
      ${sectionHead({ eyebrow: "Core expertise", id: "expertise-title", title: "Five ways we help teams ship better software.", lede: "From a first production release to a modernized enterprise platform, we bring the engineering depth the work requires and stay accountable for the result." })}
      <div class="split-head__aside" data-reveal>${button({ label: "View all services", href: "/services/", variant: "secondary" })}</div>
    </div>
    <div class="service-grid">${services.map((s, i) => serviceCard(s, { index: i }))}</div>
  </div>
</section>

<section class="section section--muted" id="who-we-help" aria-labelledby="audiences-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Who we help", id: "audiences-title", title: "Built for companies that depend on their software.", lede: "We work with product companies, established businesses, and the consulting firms that deliver software to their own clients." })}
    ${audienceCards(audiences)}
  </div>
</section>

<section class="section" id="capabilities" aria-labelledby="capabilities-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Engineering capabilities", id: "capabilities-title", title: "Depth across the stack, organized around outcomes.", lede: "The disciplines behind our services. Each engagement draws on the combination your product and environment need." })}
    ${capabilityTabs(capabilities)}
  </div>
</section>

<section class="section section--dark" id="how-we-work" aria-labelledby="process-title">
  <div class="section__bg" aria-hidden="true"></div>
  <div class="container">
    <div class="split-head">
      ${sectionHead({ eyebrow: "How we work", id: "process-title", title: "A delivery process built for accountability.", lede: "Clear milestones, working software you can see, and plain-language communication at every stage. You always know what is done, what is next, and what is at risk." })}
      <div class="split-head__aside" data-reveal>${button({ label: "Our delivery approach", href: "/how-we-work/", variant: "outline-light" })}</div>
    </div>
    ${processTrack(process)}
    <ul class="principles-inline" role="list" data-reveal>
      <li>${icon("chat")}<span><strong>Communication.</strong> Regular demos and written status updates.</span></li>
      <li>${icon("eye")}<span><strong>Transparency.</strong> Shared repositories and backlogs.</span></li>
      <li>${icon("check-circle")}<span><strong>Code quality.</strong> Review, tests, and CI on every change.</span></li>
      <li>${icon("target")}<span><strong>Accountability.</strong> Named owners for every milestone.</span></li>
    </ul>
  </div>
</section>

<section class="section" id="engagement-models" aria-labelledby="engagement-title">
  <div class="container">
    ${sectionHead({ eyebrow: "Engagement models", id: "engagement-title", title: "Choose how we work together.", lede: "Three ways to engage, each with clear ownership and a structure that fits how you plan and buy engineering work." })}
    ${engagementCards(engagementModels)}
  </div>
</section>

<section class="section section--muted" id="solutions" aria-labelledby="solutions-title">
  <div class="container">
    <div class="split-head">
      ${sectionHead({ eyebrow: "What we can build", id: "solutions-title", title: "Solution concepts, with the architecture shown.", lede: "Illustrative examples of systems we design and build, so you can see how we think about real problems. They are not client engagements or reported results." })}
      <div class="split-head__aside" data-reveal>${button({ label: "Explore all concepts", href: "/solutions/", variant: "secondary" })}</div>
    </div>
    <div class="solution-grid">${featured.map(solutionCard)}</div>
  </div>
</section>

<section class="section" id="why" aria-labelledby="why-title">
  <div class="container why">
    <div class="why__intro">
      ${sectionHead({ eyebrow: "Why Coastline Digital", id: "why-title", title: "An engineering partner, not a vendor.", lede: "What working with us looks like in practice, explained rather than claimed." })}
      <div class="why__note" data-reveal>
        <p>Coastline Digital is based in ${site.locality}, ${site.region}, and works with an international team of experienced engineering professionals. You know who is on your project and where they work.</p>
        <a class="link-arrow" href="/about/">About Coastline Digital ${icon("arrow-right")}</a>
      </div>
    </div>
    ${reasonsGrid(reasons)}
  </div>
</section>

${ctaBand({
  id: "contact",
  eyebrow: "Start a conversation",
  title: "Let’s build something that moves your business forward.",
  text: "Tell us about your project, your team, or your client work. We will reply by email to arrange a conversation.",
  primary: { label: "Discuss Your Project", href: "/contact/", track: "cta_final_contact" },
  secondary: { label: "Become a Delivery Partner", href: "/partnerships/#partner-inquiry", track: "cta_final_partner" },
})}
`;

export default {
  path: "/",
  title: "Coastline Digital | Software Engineering and AI Consulting",
  description:
    "Software engineering and AI consulting in San Diego, CA. We design, build, and scale custom software, AI solutions, and enterprise systems.",
  headerTheme: "dark",
  pageClass: "page-home",
  priority: 1.0,
  body,
  jsonld: [
    organizationSchema(),
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: `${site.url}/`,
      publisher: { "@id": organizationId },
    },
  ],
};
