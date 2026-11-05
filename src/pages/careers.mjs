import { html } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import { site } from "../site.mjs";
import { breadcrumbs } from "../components/layout.mjs";
import { button, pageHero, sectionHead } from "../components/ui.mjs";

/**
 * Open roles. Applications go by email to the contacts listed on each role;
 * there is no application form or backend.
 */
const companyDescription =
  "Coastline Digital is a US-based software engineering and AI consulting company in San Diego, working with an international team of experienced engineering professionals. We help companies design, build, and scale custom software, AI and machine learning systems, cloud and data platforms, and enterprise applications built to perform reliably in daily production use. Our engineers work directly with client stakeholders to understand real workflows, and we deliver in short, iterative cycles so clients see working results early.";

const roles = [
  {
    slug: "senior-ai-ml-engineer",
    title: "Senior AI/ML Engineer",
    team: "Engineering · AI and machine learning",
    teaser: "Design, build, and deploy AI and machine learning systems for real enterprise workflows.",
    tags: [
      { icon: "globe", label: "Fully remote · Worldwide" },
      { icon: "briefcase", label: "Contract" },
      { icon: "spark", label: "Senior level only" },
    ],
    datePosted: "2026-10-23",
    lede: "Build AI that holds up in the real world. Work close to the problem and take it all the way to production.",
    summary:
      "The Senior AI/ML Engineer contract role is a remote position focused on designing, building, and deploying robust machine learning and AI solutions for enterprise clients.",
    responsibilities: [
      "Collaborate with product and client teams to understand business processes and translate requirements into technical designs.",
      "Develop end-to-end ML systems, from data collection and preprocessing to model training, evaluation, and production deployment.",
      "Architect and implement neural network and traditional ML models, and optimize algorithms for performance and scalability.",
      "Integrate models into existing applications and workflows.",
      "Set best practices for model monitoring, experimentation, and reproducibility.",
      "Conduct code and model reviews, and contribute to technical documentation and client-facing explanations of AI solutions.",
    ],
    qualifications: [
      "Strong foundation in Computer Science and Algorithms, with experience designing scalable, maintainable software systems.",
      "Deep expertise in Neural Networks and Pattern Recognition, including hands-on work with modern deep learning frameworks.",
      "Solid background in Statistics and applied data analysis, including experimental design, model evaluation, and performance metrics.",
      "Proficiency in one or more programming languages commonly used in AI/ML (such as Python), and familiarity with ML libraries and frameworks (such as PyTorch, TensorFlow, or similar).",
      "Experience building and deploying production-grade AI/ML systems, including data pipelines, APIs, and integration with cloud or on-prem infrastructure.",
      "Ability to work independently in a remote contract setting, manage priorities across multiple projects, and communicate complex technical concepts clearly to technical and non-technical stakeholders.",
      "Bachelor’s or Master’s degree in Computer Science, Data Science, Engineering, Mathematics, or a related field, or equivalent practical experience.",
      "Previous experience in enterprise software, workflow automation, or AI solutions for business processes is highly beneficial.",
    ],
    facts: [
      ["Position", "Senior AI/ML Engineer"],
      ["Engagement", "Contract"],
      ["Workplace", "Fully remote"],
      ["Location", "Worldwide"],
      ["Experience level", "Senior only"],
    ],
    contacts: [
      { name: "Evan", email: "evan@coastlinedigital.net" },
      { name: "Derek", email: "derek@coastlinedigital.net" },
      { name: "Jack", email: "jack@coastlinedigital.net" },
    ],
    subject: "Senior AI/ML Engineer — Contract proposal",
    employmentType: "CONTRACTOR",
    experienceRequirements: "Senior AI/ML engineers only.",
  },
];

const careersCrumbs = breadcrumbs([
  { label: "Home", href: "/" },
  { label: "Careers", href: "/careers/" },
]);

const listing = {
  path: "/careers/",
  title: "Careers and Open Roles | Coastline Digital",
  description:
    "Open roles at Coastline Digital. Build production software and AI systems for US companies with an international engineering team. Remote contract roles.",
  priority: 0.7,
  jsonld: [careersCrumbs.data],
  body: html`
${pageHero({
  crumbs: careersCrumbs.markup,
  eyebrow: "Careers",
  title: "Build software and AI that holds up in production.",
  lede: "Coastline Digital is a US-based company working with an international team of experienced engineers. We look for people who like working close to the problem and taking it all the way to production.",
})}
<section class="section section--flush-top" aria-labelledby="roles-title">
  <div class="container">
    <div class="split-head">
      ${sectionHead({ eyebrow: "Open roles", id: "roles-title", title: `${roles.length} open ${roles.length === 1 ? "role" : "roles"}` })}
    </div>
    <ul class="roles" role="list">${roles.map(
      (r) => html`<li class="role-card" data-reveal>
        <div class="role-card__main">
          <p class="role-card__team">${r.team}</p>
          <h3 class="role-card__title"><a class="card-link" href="/careers/${r.slug}/">${r.title}</a></h3>
          <p>${r.teaser}</p>
        </div>
        <ul class="role-card__tags" role="list">${r.tags.map((t) => html`<li>${icon(t.icon)}${t.label}</li>`)}</ul>
        <span class="role-card__cta" aria-hidden="true">View role ${icon("arrow-right")}</span>
      </li>`,
    )}</ul>
    <p class="fineprint fineprint--spaced">We do not accept applications through the project inquiry form. Follow the instructions on each role.</p>
  </div>
</section>`,
};

function rolePage(role) {
  const path = `/careers/${role.slug}/`;
  const crumbs = breadcrumbs([
    { label: "Home", href: "/" },
    { label: "Careers", href: "/careers/" },
    { label: role.title, href: path },
  ]);
  const mailto = (email) => `mailto:${email}?subject=${encodeURIComponent(role.subject)}`;
  const descriptionHtml = `<h2>Company description</h2><p>${companyDescription}</p><h2>Role description</h2><p>${role.summary}</p><p>Fully remote. Worldwide. Contract. Senior AI/ML engineers only.</p><h3>What you’ll do</h3><ul>${role.responsibilities
    .map((x) => `<li>${x}</li>`)
    .join("")}</ul><h2>Qualifications</h2><ul>${role.qualifications.map((x) => `<li>${x}</li>`).join("")}</ul><h2>Send your proposal</h2><p>Please send your proposal to one of ${role.contacts
    .map((c) => c.email)
    .join(", ")
    .replace(/, ([^,]*)$/, ", or $1")}.</p>`;

  return {
    path,
    title: `${role.title}, Remote Contract | Coastline Digital Careers`,
    description: `Join Coastline Digital as a ${role.title}. Fully remote, worldwide contract role building production AI and ML systems. Senior engineers only.`,
    priority: 0.6,
    pageClass: "page-role",
    jsonld: [
      {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: role.title,
        description: descriptionHtml,
        datePosted: role.datePosted,
        employmentType: role.employmentType,
        jobLocationType: "TELECOMMUTE",
        url: `${site.url}${path}`,
        hiringOrganization: {
          "@type": "Organization",
          name: site.name,
          sameAs: `${site.url}/`,
          logo: `${site.url}${site.logo}`,
        },
        experienceRequirements: role.experienceRequirements,
        educationRequirements: role.qualifications[6],
        qualifications: role.qualifications.join("\n"),
        applicationContact: role.contacts.map((c) => ({ "@type": "ContactPoint", email: c.email })),
      },
      crumbs.data,
    ],
    body: html`
<article aria-labelledby="page-title">
  ${pageHero({
    crumbs: crumbs.markup,
    eyebrow: "Careers at Coastline Digital",
    title: role.title,
    lede: role.lede,
    actions: [{ label: "Send a proposal", href: "#apply", variant: "primary" }],
    aside: html`<ul class="role-card__tags role-card__tags--hero" role="list" aria-label="Role details">${role.tags.map(
      (t) => html`<li>${icon(t.icon)}${t.label}</li>`,
    )}</ul>`,
  })}
  <div class="section section--flush-top">
    <div class="container job">
      <div class="job__content prose">
        <section aria-labelledby="company-title">
          <h2 id="company-title">The company</h2>
          <p>${companyDescription}</p>
        </section>
        <section aria-labelledby="role-title">
          <h2 id="role-title">The role</h2>
          <p>${role.summary}</p>
          <h3>What you’ll do</h3>
          <ul>${role.responsibilities.map((x) => html`<li>${x}</li>`)}</ul>
        </section>
        <section aria-labelledby="qualifications-title">
          <h2 id="qualifications-title">Qualifications</h2>
          <ul>${role.qualifications.map((x) => html`<li>${x}</li>`)}</ul>
        </section>
      </div>
      <aside class="job__summary panel" aria-labelledby="summary-title">
        <h2 class="panel__title" id="summary-title">The role at a glance</h2>
        <dl class="facts">${role.facts.map(([k, v]) => html`<div><dt>${k}</dt><dd>${v}</dd></div>`)}</dl>
        <p class="job__note"><strong>Senior AI/ML engineers only.</strong> We are considering senior-level candidates for this role.</p>
        ${button({ label: "Send your proposal", href: "#apply", variant: "primary", className: "btn--block" })}
      </aside>
    </div>
  </div>
  <section class="section section--muted" id="apply" aria-labelledby="apply-title">
    <div class="container">
      <div class="apply">
        <div>
          <p class="eyebrow">Take the next step</p>
          <h2 class="section-title" id="apply-title">Bring your experience. Send your proposal.</h2>
          <p class="lede">This is a fully remote, worldwide contract role for <strong>senior AI/ML engineers only.</strong> Please email your proposal to <strong>one</strong> of the contacts below.</p>
        </div>
        <ul class="contacts" role="list">${role.contacts.map(
          (c) => html`<li><a class="contact-card" href="${mailto(c.email)}"><span class="contact-card__avatar" aria-hidden="true">${c.name[0]}</span><span class="contact-card__id"><strong>${c.name}</strong><span>${c.email}</span></span>${icon("mail")}</a></li>`,
        )}</ul>
        <p class="fineprint">Selecting an email address opens your email app.</p>
      </div>
      <p class="job__back"><a class="link-arrow link-arrow--back" href="/careers/">${icon("arrow-right")} Back to all open roles</a></p>
    </div>
  </section>
</article>`,
  };
}

export default [listing, ...roles.map(rolePage)];
