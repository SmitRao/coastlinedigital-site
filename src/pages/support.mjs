import { html, plain } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import { site } from "../site.mjs";
import { faqGroups } from "../content/faq.mjs";
import { breadcrumbs } from "../components/layout.mjs";
import { ctaBand, faqList, pageHero } from "../components/ui.mjs";

/* ----------------------------------------------------------------------------
   FAQ
   ------------------------------------------------------------------------- */
const faqCrumbs = breadcrumbs([
  { label: "Home", href: "/" },
  { label: "FAQ", href: "/faq/" },
]);

const faq = {
  path: "/faq/",
  title: "FAQ: Software Engineering, AI, and Partnerships | Coastline Digital",
  description:
    "Answers about our software engineering and AI services, engagement models, team location, AI evaluation, delivery partnerships, and getting started.",
  priority: 0.7,
  jsonld: [
    faqCrumbs.data,
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqGroups.flatMap((g) =>
        g.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: plain(item.a) },
        })),
      ),
    },
  ],
  body: html`
${pageHero({
  crumbs: faqCrumbs.markup,
  eyebrow: "FAQ",
  title: "Questions, answered.",
  lede: "What we build, how we work with your team, and what to expect from an engagement or partnership.",
})}
<section class="section section--flush-top" aria-label="Frequently asked questions">
  <div class="container faq-layout">
    <nav class="faq-layout__nav" aria-label="FAQ topics">
      <ul role="list">${faqGroups.map((g) => html`<li><a href="#${g.id}">${g.title}</a></li>`)}</ul>
    </nav>
    <div class="faq-layout__groups">
      ${faqGroups.map(
        (g) => html`<section class="faq-group" id="${g.id}" aria-labelledby="${g.id}-title">
        <h2 class="faq-group__title" id="${g.id}-title">${g.title}</h2>
        ${faqList(g.items)}
      </section>`,
      )}
    </div>
  </div>
</section>
${ctaBand({
  title: "Have a question we did not answer?",
  text: `Email <a href="mailto:${site.email}">${site.email}</a> or send us a short note about your project.`,
  primary: { label: "Discuss Your Project", href: "/contact/", track: "cta_faq_band" },
  secondary: { label: "Become a Delivery Partner", href: "/partnerships/#partner-inquiry" },
})}`,
};

/* ----------------------------------------------------------------------------
   Privacy policy
   ------------------------------------------------------------------------- */
const privacyCrumbs = breadcrumbs([
  { label: "Home", href: "/" },
  { label: "Privacy Policy", href: "/privacy/" },
]);

const privacy = {
  path: "/privacy/",
  title: "Privacy Policy | Coastline Digital",
  description: "How Coastline Digital collects, uses, and protects information submitted through this website.",
  priority: 0.3,
  changefreq: "yearly",
  jsonld: [privacyCrumbs.data],
  body: html`
${pageHero({ crumbs: privacyCrumbs.markup, eyebrow: "Legal", title: "Privacy policy", lede: "Last updated: November 2026" })}
<section class="section section--flush-top">
  <div class="container">
    <div class="prose prose--doc">
      <h2>Who we are</h2>
      <p>${site.name} is a software engineering and AI consulting company based in ${site.locality}, ${site.region}. We provide custom software engineering, AI and machine learning, cloud and data engineering, enterprise modernization, dedicated engineering teams, and engineering delivery partnerships.</p>
      <p>Contact: <a href="mailto:${site.email}">${site.email}</a></p>

      <h2>Information we collect</h2>
      <p>When you use our project inquiry or partnership inquiry forms, we collect the information you choose to provide, which may include:</p>
      <ul>
        <li>Your name and work email address</li>
        <li>Your company or firm name, your role, and your company website</li>
        <li>The type of inquiry, services or capabilities of interest, and partnership model</li>
        <li>Your project description or message</li>
        <li>Optional timeline and budget range</li>
      </ul>
      <p>If you email us directly, we receive the information included in your email. Job applicants who email a proposal share the information included in that email.</p>
      <p>We do not currently use analytics, advertising, or tracking cookies on this website. If we add analytics in the future, we will update this policy and ask for your consent where required before any analytics load.</p>

      <h2>How we use your information</h2>
      <p>We use the information you provide to:</p>
      <ul>
        <li>Respond to your inquiry</li>
        <li>Discuss your project, partnership, or application</li>
        <li>Provide the services you request</li>
      </ul>
      <p>We do not sell your information to third parties.</p>

      <h2>Form submission</h2>
      <p>Our forms are processed by FormSubmit, a third-party form handling service. When you submit a form, your information is transmitted to FormSubmit, which may ask you to complete a verification step, and is then forwarded to us by email. FormSubmit has its own privacy policy governing how it handles data.</p>

      <h2>Website fonts and third-party requests</h2>
      <p>The typefaces on this website are hosted on our own domain, so loading a page does not send requests to font providers. Apart from form submission, described above, pages do not load content from third parties.</p>

      <h2>Data retention</h2>
      <p>We retain your contact information for as long as necessary to respond to your inquiry and provide services. If you would like us to delete your information, contact us at <a href="mailto:${site.email}">${site.email}</a>.</p>

      <h2>Your rights</h2>
      <p>You may:</p>
      <ul>
        <li>Request access to the information we have about you</li>
        <li>Request correction of inaccurate information</li>
        <li>Request deletion of your information</li>
      </ul>
      <p>To exercise these rights, contact us at <a href="mailto:${site.email}">${site.email}</a>.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this privacy policy from time to time. Changes will be posted on this page with a new “last updated” date.</p>

      <h2>Contact</h2>
      <p>If you have questions about this privacy policy, contact us at <a href="mailto:${site.email}">${site.email}</a>.</p>
    </div>
  </div>
</section>`,
};

/* ----------------------------------------------------------------------------
   404
   ------------------------------------------------------------------------- */
const notFound = {
  path: "/404.html",
  output: "404.html",
  title: "Page not found | Coastline Digital",
  description: "The page you requested could not be found.",
  noindex: true,
  sitemap: false,
  body: html`
<section class="section not-found" aria-labelledby="page-title">
  <div class="page-hero__bg" aria-hidden="true"></div>
  <div class="container">
    <p class="eyebrow">Error 404</p>
    <h1 id="page-title">We could not find that page.</h1>
    <p class="lede">It may have moved during our recent site update. These links should help.</p>
    <ul class="related-links related-links--grid" role="list">
      <li><a href="/">${icon("arrow-right")}<span>Home</span></a></li>
      <li><a href="/services/">${icon("arrow-right")}<span>Services</span></a></li>
      <li><a href="/solutions/">${icon("arrow-right")}<span>Solution concepts</span></a></li>
      <li><a href="/partnerships/">${icon("arrow-right")}<span>Engineering partnerships</span></a></li>
      <li><a href="/contact/">${icon("arrow-right")}<span>Contact</span></a></li>
      <li><a href="/careers/">${icon("arrow-right")}<span>Careers</span></a></li>
    </ul>
  </div>
</section>`,
};

export default [faq, privacy, notFound];
