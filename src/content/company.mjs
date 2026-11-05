/**
 * Shared content blocks used across the home, how-we-work, about, and
 * partnership pages. Edit copy here rather than in page files.
 */

export const engagementModels = [
  {
    id: "dedicated",
    name: "Dedicated Engineering Team",
    tagline: "Flexible, long-term technical capacity.",
    icon: "team",
    fit: "We need ongoing engineering capacity",
    bestFor: "Product companies with an ongoing roadmap that need more capacity or specific skills.",
    points: [
      "Engineers embedded in your tools and rituals",
      "You set priorities; we handle staffing and continuity",
      "Scale up or down as the roadmap changes",
    ],
    structure: "Ongoing engagement, adjusted over time",
    href: "/services/dedicated-engineering-teams/",
    cta: "Explore dedicated teams",
  },
  {
    id: "project",
    name: "Project-Based Delivery",
    tagline: "Defined deliverables, milestones, and timelines.",
    icon: "flag",
    fit: "We have a defined project or product to deliver",
    bestFor: "Companies with a defined product, feature set, integration, or modernization goal.",
    points: [
      "Scope, milestones, and acceptance criteria agreed up front",
      "We own delivery against the agreed scope",
      "Regular demos and milestone reviews",
    ],
    structure: "Scoped phases with milestone reviews",
    href: "/contact/?type=project",
    cta: "Discuss a project",
  },
  {
    id: "partnership",
    name: "Engineering Delivery Partnership",
    tagline: "Subcontracting and white-label support for consulting and technology firms.",
    icon: "handshake",
    fit: "We are a consultancy or agency delivering for clients",
    bestFor: "Agencies, consultancies, and technology firms delivering software for their own clients.",
    points: [
      "White-label or co-branded delivery",
      "You own the client relationship; we own the engineering scope you assign",
      "Per-project collaboration or ongoing capacity",
    ],
    structure: "Per project or ongoing, under your brand or ours",
    href: "/partnerships/",
    cta: "Explore partnerships",
  },
];

export const process = [
  {
    id: "discover",
    name: "Discover",
    summary: "Understand business needs and technical requirements.",
    icon: "search",
    activities: [
      "Stakeholder and user conversations",
      "Review of current workflows, systems, and data",
      "Constraints, risks, and success criteria",
    ],
    output: "Shared scope, priorities, and success criteria",
  },
  {
    id: "architect",
    name: "Architect",
    summary: "Design a scalable, practical solution.",
    icon: "compass",
    activities: [
      "Architecture options with trade-offs explained",
      "Technology choices that fit your team and environment",
      "Delivery plan, milestones, and risk register",
    ],
    output: "Architecture and milestone plan",
  },
  {
    id: "build",
    name: "Build",
    summary: "Deliver through clear engineering milestones.",
    icon: "code",
    activities: [
      "Short iterations with working software demonstrated",
      "Code review on every change",
      "Automated tests and continuous integration",
    ],
    output: "Working software at each milestone",
  },
  {
    id: "validate",
    name: "Validate",
    summary: "Test quality, reliability, and performance.",
    icon: "check-circle",
    activities: [
      "Automated, exploratory, and acceptance testing",
      "Performance and security checks",
      "Evaluation sets for AI components",
    ],
    output: "Release readiness review",
  },
  {
    id: "launch",
    name: "Launch and Improve",
    summary: "Deploy and support ongoing improvements.",
    icon: "rocket",
    activities: [
      "Staged rollout with monitoring",
      "Documentation and handoff",
      "Prioritized improvement backlog",
    ],
    output: "Production release and next-step roadmap",
  },
];

/**
 * Engineering capabilities, grouped for decision-makers.
 * `tools` is intentionally empty: list a named technology only after it has
 * been verified as an organizational capability. Non-empty arrays render.
 */
export const capabilities = [
  {
    id: "frontend",
    label: "Frontend",
    title: "Frontend engineering",
    summary: "Interfaces people can use quickly and confidently, on any screen.",
    items: [
      "Responsive web applications",
      "Component architecture and design systems",
      "Accessibility-minded interfaces",
      "Data-heavy dashboards and admin tools",
      "Performance and Core Web Vitals",
      "Mobile and cross-platform experiences",
    ],
    tools: [],
  },
  {
    id: "backend",
    label: "Backend",
    title: "Backend engineering",
    summary: "Services and APIs with clear contracts and predictable behavior.",
    items: [
      "Service and API design",
      "Domain modeling and relational data design",
      "Authentication, authorization, and multi-tenancy",
      "Background jobs and workflow orchestration",
      "Third-party and partner integrations",
      "Performance and reliability engineering",
    ],
    tools: [],
  },
  {
    id: "cloud",
    label: "Cloud",
    title: "Cloud engineering",
    summary: "Infrastructure that is reproducible, observable, and sized to the workload.",
    items: [
      "Cloud architecture and environment design",
      "Containerized and serverless deployment",
      "Infrastructure as code",
      "Networking, secrets, and access management",
      "Scalability and cost management",
      "Migration planning and execution",
    ],
    tools: [],
  },
  {
    id: "ai",
    label: "AI/ML",
    title: "AI and machine learning",
    summary: "Applied AI with measurable quality, from prototype to production.",
    items: [
      "LLM application development",
      "Retrieval-augmented generation and search",
      "AI agents and tool use",
      "Document understanding and extraction",
      "Classification and forecasting models",
      "Evaluation, guardrails, and monitoring",
    ],
    tools: [],
  },
  {
    id: "data",
    label: "Data",
    title: "Data engineering",
    summary: "Data that is connected, trustworthy, and ready for analytics and AI.",
    items: [
      "Batch and streaming data pipelines",
      "Data modeling and warehousing",
      "Data quality checks and contracts",
      "Reporting and analytics enablement",
      "SaaS and enterprise system integration",
      "Data preparation for AI and ML",
    ],
    tools: [],
  },
  {
    id: "devops",
    label: "DevOps",
    title: "DevOps and delivery",
    summary: "Releases that are routine, automated, and reversible.",
    items: [
      "CI/CD pipelines",
      "Automated testing strategy",
      "Environment and release management",
      "Logs, metrics, traces, and alerting",
      "Incident response runbooks",
      "Developer tooling and workflows",
    ],
    tools: [],
  },
  {
    id: "security",
    label: "Security",
    title: "Security engineering",
    summary: "Secure practices built into everyday engineering work.",
    items: [
      "Security-focused architecture review",
      "Least-privilege access and secrets management",
      "Dependency and vulnerability management",
      "Audit logging",
      "Encryption in transit and at rest",
      "Security-focused code review",
    ],
    note: "Compliance and regulatory requirements are agreed per engagement, and we work within your security policies.",
    tools: [],
  },
];

export const audiences = [
  {
    id: "startups",
    icon: "rocket",
    title: "Startups and SaaS companies",
    text: "Build MVPs, develop core platforms, modernize existing products, and scale engineering capacity as the business grows.",
    points: ["MVP and platform builds", "AI features in your product", "Senior engineering capacity"],
    href: "/services/custom-software-development/",
    linkLabel: "Custom software engineering",
  },
  {
    id: "businesses",
    icon: "briefcase",
    title: "Growing and established businesses",
    text: "Automate operations, connect enterprise systems, modernize applications, and implement practical AI solutions.",
    points: ["Legacy modernization", "System integration and automation", "Practical AI in operations"],
    href: "/services/enterprise-applications/",
    linkLabel: "Enterprise modernization",
  },
  {
    id: "partners",
    icon: "handshake",
    title: "Software consulting and technology partners",
    text: "Dedicated engineering capacity, technical delivery, project collaboration, and white-label engineering support for firms that deliver software to their own clients.",
    points: ["White-label development", "Technical subcontracting", "Dedicated delivery capacity"],
    href: "/partnerships/",
    linkLabel: "Become a delivery partner",
    featured: true,
  },
];

export const reasons = [
  { icon: "team", title: "Experienced technical delivery", text: "Work is staffed with experienced engineers, and senior engineers stay involved in architecture decisions and code review throughout." },
  { icon: "chat", title: "Direct collaboration", text: "You work directly with the engineers building your software, not through layers of account management." },
  { icon: "target", title: "Software aligned with business needs", text: "We start from the workflow, customer, or revenue problem and scope the technical work to solve it." },
  { icon: "spark", title: "Practical AI implementation", text: "We recommend AI where it helps, test it against your real examples, and tell you when a simpler approach will work better." },
  { icon: "layers", title: "Flexible engagement options", text: "Dedicated teams, defined projects, or delivery partnerships, adjusted as your needs change." },
  { icon: "wrench", title: "Long-term maintainability", text: "Readable code, automated tests, documentation, and decision records, so your team is never dependent on us to make a change." },
  { icon: "eye", title: "Transparent engineering workflows", text: "Shared repositories, visible backlogs, regular demos, and plain-language status updates. You always know what is done, what is next, and what is at risk." },
];

export const principles = [
  { title: "Understand before building", text: "We learn how the work actually happens and what success means to the business before writing significant code." },
  { title: "Small, reviewable increments", text: "Frequent, demonstrable progress keeps risk low and gives you real control over direction." },
  { title: "Maintainability is a feature", text: "Clear structure, tests, and documentation matter as much as the first release, because most software lives for years." },
  { title: "Practical over fashionable", text: "We choose established, well-supported approaches unless a newer one clearly serves your goals." },
  { title: "Candid communication", text: "We raise risks early, explain trade-offs in plain language, and say so when something is not working." },
];
