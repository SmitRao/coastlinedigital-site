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
    educationRequirements:
      "Bachelor’s or Master’s degree in Computer Science, Data Science, Engineering, Mathematics, or a related field, or equivalent practical experience.",
    seoSummary: "Fully remote, worldwide contract role building production AI and ML systems. Senior engineers only.",
    headline: "Fully remote. Worldwide. Contract. Senior AI/ML engineers only.",
    note: { strong: "Senior AI/ML engineers only.", text: "We are considering senior-level candidates for this role." },
    applyText:
      "This is a fully remote, worldwide contract role for <strong>senior AI/ML engineers only.</strong> Please email your proposal to <strong>one</strong> of the contacts below.",
  },
  {
    slug: "senior-full-stack-engineer",
    title: "Senior Full Stack Engineer",
    team: "Engineering · Platform and AI infrastructure",
    teaser: "Build and operate our agent platform, AI infrastructure, and developer tooling.",
    tags: [
      { icon: "globe", label: "Fully remote · Worldwide" },
      { icon: "briefcase", label: "Contract" },
      { icon: "spark", label: "Senior level" },
    ],
    datePosted: "2026-11-05",
    lede: "Build and operate the agent platform, AI infrastructure, and developer tooling that help our teams ship faster.",
    summary:
      "The Senior Full Stack Engineer contract role is a fully remote position focused on building and operating our agent platform, the AI infrastructure agents depend on, and the developer tooling our builders use every day.",
    responsibilities: [
      "Develop and operate our Agent Platform for deploying, running, evaluating, governing, and improving agents and agentic workflows.",
      "Establish and operate the AI Infrastructure that agents depend on: LLM and MCP gateways with guardrails, fallback, usage and cost controls, and model rollout policies.",
      "Build and operate agents and workflows that carry engineering work from issue to production and business work from trigger to outcome, with humans governing the boundaries.",
      "Own our Developer Infrastructure (Source Control and CI) and build the developer tools that improve builder flow and reduce friction across the company.",
      "Partner with teams across Engineering, Product, Sales, and G&A to understand where AI could accelerate their work or improve the quality of outcomes.",
      "Drive adoption of agents and agentic tooling across the company, and own the best practices and enablement materials that help builders succeed using the paved roads.",
      "Build measurement and feedback loops (usage, reliability, and cost) to quantify the productivity the platform unlocks and guide the roadmap.",
      "Participate in on-call to support internal users.",
    ],
    qualificationsTitle: "What you’ll bring",
    qualifications: [
      "Strong, production-level proficiency in both Python and .NET (C#), the most important skills for this role. Experience with Go, TypeScript/JavaScript, or Java is a plus.",
      "Strong software engineering fundamentals and experience shipping and operating production-quality internal platforms or developer tooling.",
      "Experience leveraging modern agentic coding tools such as Codex and Claude Code.",
      "Experience building workflow automation or internal tools (CLI tools, services, GitHub automation, cloud automation, or similar).",
      "Strong judgment about when to standardize versus when to enable flexibility, and how to remove friction without compromising reliability.",
      "Comfort working cross-functionally, including partnering with non-traditional developers and translating needs into usable solutions.",
      "Ability to use data and qualitative feedback together to prioritize and measure impact.",
      "Clear written communication, including documentation that enables self-service.",
    ],
    niceToHaves: [
      "Experience building internal agents and operating an agent platform.",
      "Experience building and operating Temporal applications.",
    ],
    facts: [
      ["Position", "Senior Full Stack Engineer"],
      ["Engagement", "Contract"],
      ["Workplace", "Fully remote"],
      ["Location", "Worldwide"],
      ["Experience level", "Senior"],
    ],
    contacts: [
      { name: "Evan", email: "evan@coastlinedigital.net" },
      { name: "Derek", email: "derek@coastlinedigital.net" },
      { name: "Jack", email: "jack@coastlinedigital.net" },
    ],
    subject: "Senior Full Stack Engineer — Contract proposal",
    employmentType: "CONTRACTOR",
    experienceRequirements: "Senior software engineering experience with Python and .NET (C#), building and operating internal platforms or developer tooling.",
    seoSummary: "Remote, worldwide contract role building our agent platform, AI infrastructure, and developer tooling.",
    headline: "Fully remote. Worldwide. Contract. Senior level.",
    applyText:
      "This is a fully remote, worldwide contract role. Please email your proposal to <strong>one</strong> of the contacts below.",
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
    "Open roles at Coastline Digital. Build production software and AI systems for US companies with an international engineering team. Remote roles worldwide.",
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
  const qualificationsTitle = role.qualificationsTitle ?? "Qualifications";
  const mailto = (email) => `mailto:${email}?subject=${encodeURIComponent(role.subject)}`;
  const descriptionHtml = `<h2>Company description</h2><p>${companyDescription}</p><h2>Role description</h2><p>${role.summary}</p><p>${role.headline}</p><h3>What you’ll do</h3><ul>${role.responsibilities
    .map((x) => `<li>${x}</li>`)
    .join("")}</ul><h2>${qualificationsTitle}</h2><ul>${role.qualifications.map((x) => `<li>${x}</li>`).join("")}</ul>${
    role.niceToHaves ? `<h2>Nice to have</h2><ul>${role.niceToHaves.map((x) => `<li>${x}</li>`).join("")}</ul>` : ""
  }<h2>Send your proposal</h2><p>Please send your proposal to one of ${role.contacts
    .map((c) => c.email)
    .join(", ")
    .replace(/, ([^,]*)$/, ", or $1")}.</p>`;

  return {
    path,
    title: `${role.title}, Remote${role.employmentType === "CONTRACTOR" ? " Contract" : ""} | Coastline Digital Careers`,
    description: `Join Coastline Digital as a ${role.title}. ${role.seoSummary}`,
    priority: 0.6,
    pageClass: "page-role",
    jsonld: [
      {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: role.title,
        description: descriptionHtml,
        datePosted: role.datePosted,
        ...(role.employmentType ? { employmentType: role.employmentType } : {}),
        jobLocationType: "TELECOMMUTE",
        url: `${site.url}${path}`,
        hiringOrganization: {
          "@type": "Organization",
          name: site.name,
          sameAs: `${site.url}/`,
          logo: `${site.url}${site.logo}`,
        },
        experienceRequirements: role.experienceRequirements,
        ...(role.educationRequirements ? { educationRequirements: role.educationRequirements } : {}),
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
          <h2 id="qualifications-title">${qualificationsTitle}</h2>
          <ul>${role.qualifications.map((x) => html`<li>${x}</li>`)}</ul>
        </section>
        ${role.niceToHaves ? html`<section aria-labelledby="nice-title">
          <h2 id="nice-title">Nice to have</h2>
          <ul>${role.niceToHaves.map((x) => html`<li>${x}</li>`)}</ul>
        </section>` : ""}
      </div>
      <aside class="job__summary panel" aria-labelledby="summary-title">
        <h2 class="panel__title" id="summary-title">The role at a glance</h2>
        <dl class="facts">${role.facts.map(([k, v]) => html`<div><dt>${k}</dt><dd>${v}</dd></div>`)}</dl>
        ${role.note ? html`<p class="job__note"><strong>${role.note.strong}</strong> ${role.note.text}</p>` : ""}
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
          <p class="lede">${role.applyText}</p>
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
