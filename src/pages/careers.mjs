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
  "Coastline Digital is a software engineering and AI consulting company based in San Diego, CA, working with an international team of experienced engineering professionals. We help companies design, build, and scale custom software, AI and machine learning systems, cloud and data platforms, and enterprise applications built to perform reliably in daily production use. Our engineers work directly with client stakeholders to understand real workflows, and we deliver in short, iterative cycles so clients see working results early.";

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
    updated: "2026-11-17",
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
      { name: "Henry", email: "henry@coastlinedigital.net" },
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
    updated: "2026-11-17",
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
      { name: "Henry", email: "henry@coastlinedigital.net" },
    ],
    subject: "Senior Full Stack Engineer — Contract proposal",
    employmentType: "CONTRACTOR",
    experienceRequirements: "Senior software engineering experience with Python and .NET (C#), building and operating internal platforms or developer tooling.",
    seoSummary: "Remote, worldwide contract role building our agent platform, AI infrastructure, and developer tooling.",
    headline: "Fully remote. Worldwide. Contract. Senior level.",
    applyText:
      "This is a fully remote, worldwide contract role. Please email your proposal to <strong>one</strong> of the contacts below.",
  },
  {
    slug: "fractional-sales-lead",
    title: "Fractional Sales Lead / Business Development Director (US Market)",
    seoTitle: "Fractional Sales Lead, Business Development (US Market)",
    shortTitle: "Fractional Sales Lead",
    team: "Sales · Business development",
    teaser: "Win long-term software consulting clients and help build a repeatable US sales process.",
    tags: [
      { icon: "pin", label: "Remote · United States" },
      { icon: "briefcase", label: "Part-time / Fractional / Contract" },
      { icon: "target", label: "Commission, then retainer" },
    ],
    datePosted: "2026-11-11",
    updated: "2026-11-18",
    lede: "We’re looking for a closer, not just a lead generator.",
    summary: [
      "We’re looking for an experienced, results-driven Sales Lead who can help us expand our presence in the US market, establish long-term client relationships, and secure high-value software consulting contracts.",
      "We’re seeking a highly motivated Fractional Sales Lead / Business Development Director with a proven track record of selling software development services, IT consulting, or outsourced engineering solutions to US businesses.",
      "This is a hands-on business development position, not just a sales advisory role.",
      "You’ll be responsible for identifying potential customers, developing relationships with decision-makers, managing the sales pipeline, and closing consulting agreements.",
      "Our ideal candidate understands how to sell complex technical services and can confidently engage with CTOs, CEOs, founders, VPs of Engineering, and enterprise technology leaders.",
      "We’re particularly interested in candidates who have existing relationships within the US technology ecosystem and experience securing substantial, long-term B2B contracts.",
    ],
    responsibilitiesTitle: "Key responsibilities",
    responsibilities: [
      "Identify and prospect US companies that need software engineering, AI, cloud, or data engineering services.",
      "Build relationships with startup founders, CTOs, engineering leaders, and business decision-makers.",
      "Generate qualified leads through LinkedIn, personalized email outreach, referrals, networking, and strategic partnerships.",
      "Develop partnerships with established US software consulting companies, technology agencies, and IT service providers.",
      "Conduct discovery calls, understand client requirements, and identify potential consulting opportunities.",
      "Work with our engineering leadership to prepare technical proposals, project estimates, and statements of work.",
      "Lead commercial discussions, negotiate contracts, and close new business.",
      "Build and maintain a well-organized sales pipeline with regular reporting.",
      "Identify opportunities for recurring revenue, dedicated engineering engagements, and long-term client partnerships.",
      "Represent Coastline Digital professionally in client meetings and industry networking opportunities.",
    ],
    qualificationsTitle: "Required qualifications",
    qualifications: [
      "5+ years of experience in B2B sales, business development, or account management.",
      "Demonstrated success selling software development services, IT consulting, engineering outsourcing, or technology professional services.",
      "Proven experience independently generating leads and closing B2B contracts.",
      "Strong understanding of the US technology services market and enterprise buying processes.",
      "Experience communicating with technical executives and business decision-makers.",
      "Ability to manage the full sales cycle from prospecting to contract execution.",
      "Excellent written and verbal English communication skills.",
      "Strong negotiation, relationship-building, and consultative selling abilities.",
      "Comfortable working independently in a remote, flexible environment.",
      "Based in the United States and legally authorized to perform the work.",
    ],
    niceToHavesTitle: "Preferred qualifications",
    niceToHaves: [
      "Existing professional network of US startup founders, CTOs, technology executives, or consulting agency owners.",
      "Experience selling dedicated engineering teams, staff augmentation, or project-based software delivery.",
      "Background working with distributed or international engineering teams.",
      "Experience selling AI implementation, cloud consulting, enterprise modernization, or data engineering services.",
      "Previous experience as a fractional VP of Sales, Business Development Director, Account Executive, or independent IT services sales consultant.",
      "Experience developing strategic relationships with venture-backed startups, venture capital portfolios, and technology consulting firms.",
      "Familiarity with LinkedIn Sales Navigator, HubSpot, Salesforce, or similar CRM tools.",
    ],
    extraSections: [
      {
        id: "success",
        title: "What success looks like",
        groups: [
          {
            title: "First 30 days",
            items: [
              "Understand Coastline Digital’s services and technical capabilities.",
              "Develop a targeted US client acquisition strategy.",
              "Build a qualified prospect list and begin personalized outreach.",
              "Establish initial conversations with potential customers and partners.",
            ],
          },
          {
            title: "First 60 days",
            items: [
              "Generate qualified sales meetings with relevant decision-makers.",
              "Develop an active pipeline of consulting opportunities.",
              "Begin submitting proposals and advancing potential contracts.",
            ],
          },
          {
            title: "First 90 days",
            items: [
              "Build a measurable, high-quality sales pipeline.",
              "Advance opportunities toward signed contracts.",
              "Establish potential long-term client and strategic partnership relationships.",
            ],
          },
        ],
        outro: "We value meaningful opportunities and actual contract revenue over vanity metrics such as email volume or unqualified meetings.",
      },
      {
        id: "compensation",
        title: "Compensation and engagement",
        intro: "We offer:",
        items: [
          "Performance-based commission on eligible new business.",
          "Commission-only to start. We expect the first 3 months to be commission-only while you build your pipeline.",
          "A monthly retainer, added on top of commission as soon as your first client or project is signed. The retainer amount is agreed at that point, based on experience, availability, and responsibilities.",
          "Flexible, remote, part-time working arrangement.",
          "Opportunity to expand the role as the company grows.",
          "Direct collaboration with our technical leadership team.",
          "Potential for a long-term partnership based on performance.",
        ],
        outro: "Commission structure, payment terms, and performance expectations will be discussed during the interview process.",
      },
      {
        id: "who",
        title: "Who we’re looking for",
        paragraphs: [
          "We’re looking for a closer, not just a lead generator.",
          "The ideal candidate can independently identify opportunities, establish trust with technical decision-makers, understand customer needs, and convert those opportunities into profitable consulting engagements.",
          "You should be comfortable working with a growing consulting company and helping establish a repeatable US sales process.",
          "We value initiative, transparency, professional communication, and measurable results.",
        ],
      },
    ],
    facts: [
      ["Position", "Fractional Sales Lead / Business Development Director"],
      ["Engagement", "Part-time / Fractional / Contract"],
      ["Workplace", "100% remote"],
      ["Location", "United States"],
      ["Compensation", "Commission, plus a monthly retainer once your first client signs"],
    ],
    note: { strong: "Based in the United States", text: "and legally authorized to perform the work." },
    contacts: [
      { name: "Evan", email: "evan@coastlinedigital.net" },
      { name: "Henry", email: "henry@coastlinedigital.net" },
    ],
    subject: "Fractional Sales Lead — Application",
    employmentType: ["PART_TIME", "CONTRACTOR"],
    applicantCountry: "United States",
    experienceRequirements: "5+ years of experience in B2B sales, business development, or account management.",
    seoSummary: "Remote, fractional software consulting sales role. Commission, plus a retainer once your first client signs.",
    headline: "100% remote, United States. Part-time / Fractional / Contract. Commission-only to start, with a monthly retainer added once your first client or project is signed.",
    ctaLabel: "Apply by email",
    applyTitle: "Interested? Send your application.",
    applyText:
      "Please send your resume or LinkedIn profile along with brief answers to the following questions.",
    applyQuestions: [
      "What types of software development or IT consulting services have you sold?",
      "What is the approximate value of the largest consulting contract you personally helped close?",
      "How do you typically generate leads and approach US technology decision-makers?",
      "Do you have experience selling services delivered by international engineering teams?",
      "Are you comfortable with a fractional arrangement that starts commission-only, with a monthly retainer added once you bring in your first client?",
    ],
    applyOutro: "Join Coastline Digital and help us build long-term partnerships with US technology companies.",
  },
  {
    slug: "virtual-assistant",
    title: "Virtual Assistant – Business Operations & Finance",
    shortTitle: "Virtual Assistant",
    seoTitle: "Virtual Assistant, Business Operations & Finance, Remote US",
    team: "Operations · Business operations & finance",
    teaser: "Support business operations, client communications, and financial administration.",
    tags: [
      { icon: "pin", label: "Remote · United States" },
      { icon: "briefcase", label: "Operations & finance" },
    ],
    datePosted: "2026-11-19",
    updated: "2026-11-20",
    lede: "Keep our business operations, client communications, and financial administration organized and on track.",
    summary:
      "We are looking for a reliable, proactive, and well-organized Virtual Assistant based in the United States to support our business operations, client communications, and financial administration.",
    responsibilitiesTitle: "Key responsibilities",
    responsibilities: [
      "Manage business operations and administrative tasks.",
      "Communicate with clients and handle follow-ups.",
      "Track income, expenses, invoices, and payments.",
      "Coordinate schedules, projects, and business activities.",
    ],
    qualificationsTitle: "Requirements",
    qualifications: [
      "Must be based in the United States.",
      "Excellent written and verbal English communication.",
      "Experience in virtual assistance or business operations.",
      "Strong organizational skills and attention to detail.",
    ],
    facts: [
      ["Position", "Virtual Assistant – Business Operations & Finance"],
      ["Workplace", "Fully remote"],
      ["Location", "United States"],
    ],
    note: { strong: "US-based candidates only.", text: "You must be based in the United States." },
    contacts: [{ name: "Dohn", email: "dohn.galzote@coastlinedigital.net" }],
    subject: "Virtual Assistant — Application",
    applicantCountry: "United States",
    experienceRequirements: "Experience in virtual assistance or business operations.",
    seoSummary: "Fully remote role supporting operations, client communications, and finance. US-based candidates only.",
    headline: "Work arrangement: fully remote. US-based candidates only.",
    ctaLabel: "Apply by email",
    applyTitle: "Interested? Send your application.",
    applyText:
      "This is a fully remote role open to US-based candidates only. Please email your resume to Dohn at the address below.",
  },
  {
    slug: "data-entry-specialist",
    title: "Data Entry Specialist",
    seoTitle: "Data Entry Specialist, Remote Argentina, Contract",
    team: "Operations · Data entry",
    teaser: "Enter, update, and verify business data accurately in spreadsheets and business systems.",
    tags: [
      { icon: "pin", label: "Remote · Argentina" },
      { icon: "briefcase", label: "Contract" },
      { icon: "doc", label: "$10–$15 USD per hour" },
    ],
    datePosted: "2026-11-24",
    lede: "Keep our records accurate and up to date by entering, checking, and organizing business data.",
    summary:
      "The Data Entry Specialist is a fully remote contract role, open to candidates based in Argentina. You will enter, update, and verify information across spreadsheets, databases, and business systems with a high level of accuracy.",
    responsibilitiesTitle: "Responsibilities",
    responsibilities: [
      "Enter and update data in spreadsheets, databases, and business systems accurately and on time.",
      "Review source documents and records for missing or inconsistent information, and flag issues.",
      "Verify and cross-check data to keep records accurate and complete.",
      "Clean up and organize existing data, including removing duplicates and standardizing formats.",
      "Handle confidential information with care.",
      "Follow documented procedures and communicate progress and questions clearly with the team.",
    ],
    qualificationsTitle: "Requirements",
    qualifications: [
      "Must be based in Argentina.",
      "Good written English communication.",
      "Fast, accurate typing and strong attention to detail.",
      "Working knowledge of Microsoft Excel or Google Sheets.",
      "Previous data entry or administrative experience preferred.",
      "Reliable computer and internet connection.",
      "Ability to work independently and meet deadlines.",
    ],
    extraSections: [
      {
        id: "compensation",
        title: "Compensation",
        paragraphs: [
          "The rate for this role is $10.00 to $15.00 USD per hour. The actual rate within that range depends on skills, experience, and qualifications.",
        ],
      },
      {
        id: "resumen",
        lang: "es",
        title: "Resumen en español",
        paragraphs: [
          "Buscamos un/a Especialista en Carga de Datos (Data Entry) para trabajar de forma 100&nbsp;% remota desde Argentina, bajo modalidad de contrato. Tarifa: USD 10 a 15 por hora, según experiencia.",
          "Tareas: carga, actualización y verificación de datos en planillas de cálculo, bases de datos y sistemas de gestión. Requisitos: residir en Argentina, buen nivel de inglés escrito, precisión y atención al detalle, y manejo de Excel o Google Sheets.",
          "Para postularte, enviá tu CV a evan@coastlinedigital.net.",
        ],
      },
    ],
    facts: [
      ["Position", "Data Entry Specialist"],
      ["Engagement", "Contract"],
      ["Workplace", "Fully remote"],
      ["Location", "Argentina"],
      ["Compensation", "$10.00–$15.00 USD per hour"],
    ],
    note: { strong: "Candidates must be based in Argentina.", text: "This is a remote contract role." },
    contacts: [{ name: "Evan", email: "evan@coastlinedigital.net" }],
    subject: "Data Entry Specialist — Application",
    employmentType: "CONTRACTOR",
    applicantCountry: "Argentina",
    salary: { min: 10, max: 15, unit: "HOUR" },
    experienceRequirements: "Previous data entry or administrative experience preferred.",
    seoSummary: "Remote contract data entry role for candidates in Argentina. $10–$15 USD per hour.",
    headline: "Fully remote, Argentina. Contract. $10.00–$15.00 USD per hour.",
    ctaLabel: "Apply by email",
    applyTitle: "Interested? Send your application.",
    applyText:
      "This is a remote contract role open to candidates based in Argentina. Please email your resume to Evan at the address below.",
  },
  {
    slug: "ai-data-annotation-ai-training-contractors",
    title: "Remote AI Data Annotation & AI Training Contractors",
    seoTitle: "Remote AI Data Annotation & Training Contractors",
    shortTitle: "AI Data Annotation & AI Training Contractor",
    team: "AI · Data annotation and training",
    teaser: "Develop practical AI-training and data-annotation skills through flexible, project-based remote work.",
    tags: [
      { icon: "globe", label: "Remote · 17 countries" },
      { icon: "briefcase", label: "Independent contractor" },
      { icon: "spark", label: "Flexible, project-based" },
    ],
    datePosted: "2026-11-24",
    lede: "Build practical skills in AI training, data annotation, and data-quality evaluation with training and ongoing project guidance.",
    companyDescription:
      "We are a software development company with experienced AI trainers and data annotators. We are expanding our remote contractor network and helping motivated individuals develop practical skills in AI training, data annotation, and data-quality evaluation. We provide general training, practice materials, and ongoing project guidance. Contractors must create their own accounts, complete their own identity verification and assessments.",
    summary: "No prior AI experience is required; training and guidance are provided.",
    responsibilities: [
      "Register on supported AI-training platforms using your own accurate information.",
      "Complete identity verification.",
      "Communicate with our engineering team when you need general training or clarification.",
    ],
    qualificationsTitle: "Requirements",
    qualifications: [
      "A laptop with at least 16 GB RAM and 300 GB of available storage.",
      "A reliable internet connection.",
      "Strong attention to detail and the ability to follow written instructions.",
      "Good English reading and writing skills; additional language skills are welcome.",
      "A valid payment method supported by the relevant platform, such as PayPal.",
      "Eligibility to work as an independent contractor in your jurisdiction.",
      "Willingness to complete all verification, assessments, and tasks personally.",
    ],
    extraSections: [
      {
        id: "provide",
        title: "What we provide",
        items: [
          "Introductory training and practice resources.",
          "Guidance on common annotation and AI-evaluation concepts.",
          "Perform data annotation, content evaluation, AI-response review, and related tasks personally.",
          "Project coordination and contractor support.",
          "Transparent compensation terms before you accept a project.",
        ],
        outro: "We will never ask you to share your passwords, identity documents, verification codes, or financial-account credentials. We will not access your personal platform accounts.",
      },
      {
        id: "compensation",
        title: "Compensation",
        paragraphs: [
          "Compensation is project- and performance-based. You will receive 10%–30% of the net earnings generated by tasks you personally complete, with the exact rate and any applicable fees disclosed before you begin.",
          "Task availability and earnings are not guaranteed. Your income will depend on platform acceptance, available projects, task volume, quality scores, and completion speed. We do not promise a fixed monthly income.",
        ],
      },
      {
        id: "why",
        title: "Why join us?",
        items: [
          "Work remotely with a flexible schedule.",
          "Learn in-demand AI-training and data-annotation skills.",
          "Receive structured guidance without paying an upfront recruitment fee.",
          "Choose available projects that fit your schedule.",
          "Work with clear expectations and transparent payment terms.",
        ],
      },
    ],
    facts: [
      ["Position", "AI Data Annotation & AI Training Contractor"],
      ["Engagement", "Independent contractor"],
      ["Workplace", "Fully remote"],
      ["Schedule", "Flexible, project-based"],
      ["Experience", "No prior AI experience required"],
      ["Compensation", "10%–30% of net earnings from tasks you personally complete"],
    ],
    note: { strong: "Remote contractor opportunity.", text: "Open to eligible candidates in the 17 listed countries." },
    contacts: [{ name: "Evan", email: "evan@coastlinedigital.net" }],
    subject: "AI Data Annotation & AI Training Contractor — Application",
    employmentType: "CONTRACTOR",
    applicantCountry: [
      "United States",
      "Canada",
      "United Kingdom",
      "Ireland",
      "Australia",
      "New Zealand",
      "Argentina",
      "Brazil",
      "Poland",
      "Romania",
      "Ukraine",
      "Netherlands",
      "Germany",
      "Denmark",
      "Norway",
      "Sweden",
      "Philippines",
    ],
    experienceRequirements: "No prior AI experience required; training and guidance provided.",
    seoSummary: "Flexible remote projects with training provided in 17 eligible countries.",
    headline: "Remote independent contractor role. Flexible, project-based schedule. No prior AI experience required; training and guidance provided.",
    ctaLabel: "Apply by email",
    applyTitle: "Interested? Send your application.",
    applyText: "Please email the following information to Evan at the address below.",
    applyQuestions: [
      "Your name and country of residence.",
      "A short summary of your relevant skills or experience.",
      "Your languages and weekly availability.",
    ],
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
    "Open roles at Coastline Digital in engineering, business development, and operations. Remote contract and fractional positions.",
  priority: 0.7,
  lastmod: roles.map((r) => r.updated ?? r.datePosted).sort().at(-1),
  changefreq: "weekly",
  jsonld: [careersCrumbs.data],
  body: html`
${pageHero({
  crumbs: careersCrumbs.markup,
  eyebrow: "Careers",
  title: "Do your best work with a team that cares about quality.",
  lede: "Coastline Digital is based in San Diego, CA, and works with an international team of experienced professionals. We look for people who take ownership, communicate clearly, and see their work through.",
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

const asList = (value) => [].concat(value ?? []);
const ul = (items) => `<ul>${items.map((x) => `<li>${x}</li>`).join("")}</ul>`;
const paras = (items) => items.map((x) => `<p>${x}</p>`).join("");

/** Role sections in reading order, shared by the page and its JobPosting data. */
function roleSections(role) {
  const sections = [
    { id: "role", title: "The role", paragraphs: asList(role.summary), subTitle: role.responsibilitiesTitle ?? "What you’ll do", subItems: role.responsibilities },
    { id: "qualifications", title: role.qualificationsTitle ?? "Qualifications", items: role.qualifications },
  ];
  if (role.niceToHaves) sections.push({ id: "nice", title: role.niceToHavesTitle ?? "Nice to have", items: role.niceToHaves });
  return sections.concat(role.extraSections ?? []);
}

function sectionHtml(sec, level = 2) {
  const h = `h${level}`;
  const sub = `h${level + 1}`;
  return [
    sec.paragraphs ? paras(sec.paragraphs) : "",
    sec.intro ? `<p>${sec.intro}</p>` : "",
    sec.items ? ul(sec.items) : "",
    sec.subItems ? `<${sub}>${sec.subTitle}</${sub}>${ul(sec.subItems)}` : "",
    sec.groups ? sec.groups.map((g) => `<${sub}>${g.title}</${sub}>${ul(g.items)}`).join("") : "",
    sec.outro ? `<p>${sec.outro}</p>` : "",
  ].join("").replace(/^/, `<${h}>${sec.title}</${h}>`);
}

function listOr(emails) {
  if (emails.length === 1) return emails[0];
  return emails.join(", ").replace(/, ([^,]*)$/, ", or $1");
}

/** ISO 3166-1 codes for applicant countries, used in titles and the job feed. */
const COUNTRY_CODES = {
  "United States": "US",
  Canada: "CA",
  "United Kingdom": "GB",
  Ireland: "IE",
  Australia: "AU",
  "New Zealand": "NZ",
  Argentina: "AR",
  Brazil: "BR",
  Poland: "PL",
  Romania: "RO",
  Ukraine: "UA",
  Netherlands: "NL",
  Germany: "DE",
  Denmark: "DK",
  Norway: "NO",
  Sweden: "SE",
  Philippines: "PH",
};
const countryCode = (name) => {
  if (!COUNTRY_CODES[name]) throw new Error(`Add ${name} to COUNTRY_CODES in careers.mjs`);
  return COUNTRY_CODES[name];
};
const applicantCountries = (role) => asList(role.applicantCountry);

/** Full job description as HTML, shared by the JobPosting data and the job feed. */
function jobDescription(role) {
  return (
    `<h2>Company description</h2><p>${role.companyDescription ?? companyDescription}</p>` +
    `<p>${role.headline}</p>` +
    roleSections(role).map((sec) => sectionHtml(sec)).join("") +
    `<h2>How to apply</h2><p>${role.applyText.replace(/<[^>]+>/g, "")}</p>` +
    (role.applyQuestions ? `<ol>${role.applyQuestions.map((q) => `<li>${q}</li>`).join("")}</ol>` : "") +
    `<p>Contact: ${listOr(role.contacts.map((c) => c.email))}.</p>`
  );
}

function rolePage(role) {
  const path = `/careers/${role.slug}/`;
  const crumbs = breadcrumbs([
    { label: "Home", href: "/" },
    { label: "Careers", href: "/careers/" },
    { label: role.title, href: path },
  ]);
  const sections = roleSections(role);
  const ctaLabel = role.ctaLabel ?? "Send a proposal";
  const mailto = (email) => `mailto:${email}?subject=${encodeURIComponent(role.subject)}`;
  const contract = asList(role.employmentType).includes("CONTRACTOR");
  const countries = applicantCountries(role);
  const location = countries.length === 1 ? `Remote, ${countryCode(countries[0])}` : "Remote";

  return {
    path,
    title: `${role.seoTitle ?? `${role.title}, ${location}${contract ? " Contract" : ""}`} | Coastline Digital Careers`,
    description: `Join Coastline Digital as a ${role.shortTitle ?? role.title}. ${role.seoSummary}`,
    priority: 0.6,
    lastmod: role.updated ?? role.datePosted,
    changefreq: "weekly",
    pageClass: "page-role",
    jsonld: [
      {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: role.title,
        description: jobDescription(role),
        identifier: { "@type": "PropertyValue", name: site.name, value: role.slug },
        datePosted: role.datePosted,
        ...(role.employmentType ? { employmentType: role.employmentType } : {}),
        jobLocationType: "TELECOMMUTE",
        ...(countries.length ? { applicantLocationRequirements: countries.map((name) => ({ "@type": "Country", name })) } : {}),
        ...(role.salary
          ? {
              baseSalary: {
                "@type": "MonetaryAmount",
                currency: "USD",
                value: { "@type": "QuantitativeValue", minValue: role.salary.min, maxValue: role.salary.max, unitText: role.salary.unit },
              },
            }
          : {}),
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
        directApply: false,
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
    actions: [{ label: ctaLabel, href: "#apply", variant: "primary" }],
    aside: html`<ul class="role-card__tags role-card__tags--hero" role="list" aria-label="Role details">${role.tags.map(
      (t) => html`<li>${icon(t.icon)}${t.label}</li>`,
    )}</ul>`,
  })}
  <div class="section section--flush-top">
    <div class="container job">
      <div class="job__content prose">
        <section aria-labelledby="company-title">
          <h2 id="company-title">The company</h2>
          <p>${role.companyDescription ?? companyDescription}</p>
        </section>
        ${sections.map(
          (sec) => html`<section aria-labelledby="${sec.id}-title"${sec.lang ? ` lang="${sec.lang}"` : ""}>
          ${sectionHtml(sec).replace(/^<h2>/, `<h2 id="${sec.id}-title">`)}
        </section>`,
        )}
      </div>
      <aside class="job__summary panel" aria-labelledby="summary-title">
        <h2 class="panel__title" id="summary-title">The role at a glance</h2>
        <dl class="facts">${role.facts.map(([k, v]) => html`<div><dt>${k}</dt><dd>${v}</dd></div>`)}</dl>
        ${role.note ? html`<p class="job__note"><strong>${role.note.strong}</strong> ${role.note.text}</p>` : ""}
        ${button({ label: ctaLabel, href: "#apply", variant: "primary", className: "btn--block" })}
      </aside>
    </div>
  </div>
  <section class="section section--muted" id="apply" aria-labelledby="apply-title">
    <div class="container">
      <div class="apply">
        <div>
          <p class="eyebrow">Take the next step</p>
          <h2 class="section-title" id="apply-title">${role.applyTitle ?? "Bring your experience. Send your proposal."}</h2>
          <p class="lede">${role.applyText}</p>
          ${role.applyQuestions ? html`<ol class="apply__questions">${role.applyQuestions.map((q) => html`<li>${q}</li>`)}</ol>` : ""}
        </div>
        <ul class="contacts" role="list">${role.contacts.map(
          (c) => html`<li><a class="contact-card" href="${mailto(c.email)}"><span class="contact-card__avatar" aria-hidden="true">${c.name[0]}</span><span class="contact-card__id"><strong>${c.name}</strong><span>${c.email}</span></span>${icon("mail")}</a></li>`,
        )}</ul>
        <p class="fineprint">Selecting an email address opens your email app.</p>
        ${role.applyOutro ? html`<p class="apply__outro">${role.applyOutro}</p>` : ""}
      </div>
      <p class="job__back"><a class="link-arrow link-arrow--back" href="/careers/">${icon("arrow-right")} Back to all open roles</a></p>
    </div>
  </section>
</article>`,
  };
}

export default [listing, ...roles.map(rolePage)];

const cdata = (value) => `<![CDATA[${String(value).replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
const JOB_TYPES = { FULL_TIME: "fulltime", PART_TIME: "parttime", CONTRACTOR: "contract", TEMPORARY: "temporary", INTERN: "internship" };
const UNITS = { HOUR: "hour", DAY: "day", WEEK: "week", MONTH: "month", YEAR: "year" };

/**
 * XML job feed at /jobs.xml in the widely used Indeed-style format, for job
 * aggregators that ingest feeds (for example Jooble, Talent.com, Careerjet).
 */
export function jobFeed() {
  const rfc822 = (date) => new Date(`${date}T12:00:00Z`).toUTCString();
  const latest = roles.map((r) => r.updated ?? r.datePosted).sort().at(-1);
  const field = (name, value) => (value ? `    <${name}>${cdata(value)}</${name}>\n` : "");
  const jobs = roles
    .map((role) => {
      const types = asList(role.employmentType).map((t) => JOB_TYPES[t]).filter(Boolean);
      const countries = applicantCountries(role);
      const salary = role.salary ? `$${role.salary.min}–$${role.salary.max} USD per ${UNITS[role.salary.unit]}` : "";
      return (
        "  <job>\n" +
        field("title", role.title) +
        field("date", rfc822(role.datePosted)) +
        field("referencenumber", role.slug) +
        field("url", `${site.url}/careers/${role.slug}/`) +
        field("company", site.name) +
        field("sourcename", site.name) +
        field("country", countries.map(countryCode).join(", ")) +
        field("remotetype", countries.length ? `Fully remote (${countries.join(", ")} only)` : "Fully remote (worldwide)") +
        field("jobtype", types.join(", ")) +
        field("salary", salary) +
        field("experience", role.experienceRequirements) +
        field("education", role.educationRequirements) +
        field("category", role.team.split(" · ")[0]) +
        field("email", role.contacts.map((c) => c.email).join(", ")) +
        field("description", jobDescription(role)) +
        "  </job>"
      );
    })
    .join("\n");
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n<source>\n` +
    `  <publisher>${site.name}</publisher>\n  <publisherurl>${site.url}/careers/</publisherurl>\n` +
    `  <lastBuildDate>${rfc822(latest)}</lastBuildDate>\n${jobs}\n</source>\n`
  );
}

