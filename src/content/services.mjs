/**
 * Service content. Each entry renders a card on the home and services pages,
 * a menu item, and a full page at `href`.
 *
 * Keep claims verifiable: describe what we do and how, not outcomes we have
 * not measured. Name specific technologies only when they are approved.
 */
export const services = [
  {
    id: "custom-software",
    slug: "custom-software-development",
    href: "/services/custom-software-development/",
    name: "Custom Software Engineering",
    icon: "code",
    menuText: "Web applications, SaaS platforms, backend systems, and APIs.",
    summary:
      "Web applications, SaaS platforms, and backend systems engineered for reliability and long-term maintainability.",
    tags: ["Full-stack web apps", "SaaS platforms", "Backend and APIs", "Mobile apps"],
    seo: {
      title: "Custom Software Development Consulting | Coastline Digital",
      description:
        "Custom software development for US companies: full-stack web applications, SaaS platforms, backend systems, and APIs, built to be maintained for years.",
    },
    serviceType: "Custom software development",
    hero: {
      title: "Custom software, engineered to last.",
      lede: "We design and build web applications, SaaS platforms, and backend systems around how your business actually operates, with code your team can understand, extend, and own.",
    },
    offerings: [
      { icon: "monitor", title: "Full-stack web applications", text: "Customer-facing products, portals, and internal applications with responsive interfaces and dependable backends." },
      { icon: "layers", title: "SaaS product development", text: "MVPs and core platform features, including accounts, roles and permissions, multi-tenant data models, and billing integrations." },
      { icon: "server", title: "Backend systems and APIs", text: "Services and APIs with clear contracts, predictable performance, and straightforward integration for internal and partner use." },
      { icon: "blocks", title: "Web and mobile applications", text: "Focused mobile and cross-platform experiences built on the same APIs and business logic as your web product." },
      { icon: "compass", title: "Product and technical discovery", text: "Requirements, architecture options, and a phased delivery plan before you commit to a major build." },
      { icon: "check-circle", title: "Code health and handoff", text: "Automated tests, documentation, and a deliberate handoff so your team can confidently run what we build." },
    ],
    situations: [
      "You need to take a validated idea to a production-ready MVP.",
      "Your core platform needs new capabilities faster than your team can deliver them.",
      "A critical process runs on spreadsheets and email and deserves real software.",
      "An existing application has become hard to change and needs a sound foundation.",
    ],
    approach: [
      { title: "Discovery and scope", text: "Users, workflows, constraints, and success criteria, distilled into a focused first release." },
      { title: "Architecture", text: "Technology choices that fit your product, your team’s skills, and your hosting environment, with decisions documented." },
      { title: "Iterative delivery", text: "Working software every iteration, demonstrated to you, with code review and automated tests as standard." },
      { title: "Release and handoff", text: "Deployment, monitoring, documentation, and knowledge transfer to the people who will own the system." },
    ],
    deliverables: [
      "Source code in repositories you control",
      "Architecture overview and decision records",
      "Automated tests and a CI pipeline",
      "Deployment and operations documentation",
      "A prioritized backlog for what comes next",
    ],
    engagements: ["project", "dedicated"],
    faqs: [
      { q: "Who owns the code?", a: "Ownership and IP terms are set in the contract. We prefer to work in repositories you control, so the code, its history, and its documentation stay with you." },
      { q: "Can you work with our existing codebase?", a: "Yes. We start with a codebase review covering structure, test coverage, and deployment, then agree on conventions with your team before making significant changes." },
      { q: "Which technologies do you use?", a: "We choose technologies that fit your product, your team’s skills, and your hosting environment, and we document why. If you have an established stack, we work within it." },
    ],
    cta: { title: "Have a product or platform to build?", text: "Tell us what you are building, where it stands today, and what needs to happen next." },
  },
  {
    id: "ai-ml",
    slug: "ai-machine-learning",
    href: "/services/ai-machine-learning/",
    name: "AI and Machine Learning",
    icon: "spark",
    menuText: "Generative AI, RAG, AI agents, and predictive models.",
    summary:
      "Generative AI applications, retrieval-augmented generation, AI agents, and predictive models, scoped to a real business problem and tested before launch.",
    tags: ["Generative AI", "RAG", "AI agents", "Predictive models", "Evaluation"],
    seo: {
      title: "AI Development Consulting: Generative AI, RAG, and Agents | Coastline Digital",
      description:
        "AI development consulting for US companies: generative AI, retrieval-augmented generation (RAG), AI agents, document pipelines, and predictive models.",
    },
    serviceType: "AI and machine learning engineering",
    hero: {
      title: "Practical AI, built for production.",
      lede: "We build generative AI applications, retrieval systems, agents, and machine learning models around a specific business problem, then test them against real examples before they reach your users.",
    },
    offerings: [
      { icon: "search", title: "Retrieval-augmented generation", text: "Assistants that answer from your documents and systems, cite their sources, and respect existing access permissions." },
      { icon: "workflow", title: "AI agents and automation", text: "Agents that use your tools and APIs to complete multistep tasks, with human approval where judgment or risk requires it." },
      { icon: "doc", title: "Document and data extraction", text: "Pipelines that turn contracts, forms, email, and records into structured data your team can search, review, and use." },
      { icon: "gauge", title: "Predictive models", text: "Forecasting, classification, and scoring models built on your data and designed around the decisions they support." },
      { icon: "target", title: "Evaluation and monitoring", text: "Evaluation sets drawn from your workflow, quality and safety checks, and production monitoring so performance is measured, not assumed." },
      { icon: "bolt", title: "AI features in your product", text: "AI capabilities added to existing applications through well-defined APIs, with cost, latency, and fallback behavior designed in." },
    ],
    situations: [
      "You have a promising AI prototype that is not reliable enough to ship.",
      "Teams spend hours searching documents or re-keying information between systems.",
      "You want AI features in your product that are accurate, observable, and affordable to run.",
      "Leadership wants a candid view of where AI will and will not help the business.",
    ],
    approach: [
      { title: "Define the task", text: "The decision or workflow, the data available, and what a useful result looks like, agreed with the people who do the work." },
      { title: "Build an evaluation set", text: "Real examples, edge cases, and known failure modes, assembled before any tuning so progress can be measured." },
      { title: "Iterate against evidence", text: "Prompts, retrieval, models, and guardrails measured against the evaluation set in every iteration." },
      { title: "Deploy with oversight", text: "Monitoring, feedback capture, human review where it matters, and a clear way for users to flag mistakes." },
    ],
    deliverables: [
      "A working AI system integrated with your environment",
      "Evaluation datasets and results you can rerun",
      "Prompts, retrieval, and model configuration under version control",
      "Monitoring, feedback, and escalation workflows",
      "Documentation of known limits, risks, and operating costs",
    ],
    engagements: ["project", "dedicated"],
    faqs: [
      { q: "What AI work do you take on?", a: "Applications built on large language models, including assistants, retrieval-augmented generation, and agents, along with document and data pipelines and predictive models. Each is tested against real examples from your work." },
      { q: "How do you know the AI is working well enough?", a: "We define success criteria with your team, build an evaluation set from your workflow, and measure each version against it. We review results with you before launch and monitor them afterward." },
      { q: "Can the AI run on our own infrastructure?", a: "That depends on the model and your environment. We review the options with you and follow your data handling and hosting requirements." },
      { q: "Which models do you use?", a: "We select models based on measured accuracy on your evaluation set, data handling requirements, latency, and cost, and we design systems so the model can be changed later." },
    ],
    cta: { title: "Have an AI use case to validate?", text: "Tell us the task you want AI to help with and the data you have today." },
  },
  {
    id: "cloud-data",
    slug: "cloud-data-engineering",
    href: "/services/cloud-data-engineering/",
    name: "Cloud and Data Engineering",
    icon: "cloud",
    menuText: "Cloud architecture, infrastructure, data pipelines, and integrations.",
    summary:
      "Cloud architecture, infrastructure, delivery pipelines, data platforms, and integrations that keep systems connected and dependable.",
    tags: ["Cloud architecture", "Infrastructure as code", "CI/CD", "Data pipelines", "Integrations"],
    seo: {
      title: "Cloud and Data Engineering Consulting | Coastline Digital",
      description:
        "Cloud architecture, infrastructure as code, CI/CD, data pipelines, and system integrations for US companies that need dependable, well-documented platforms.",
    },
    serviceType: "Cloud architecture and data engineering",
    hero: {
      title: "Cloud and data foundations you can rely on.",
      lede: "We design cloud infrastructure, delivery pipelines, and data platforms that keep your applications dependable and your information connected, documented so your team can operate them.",
    },
    offerings: [
      { icon: "cloud", title: "Cloud architecture", text: "Architectures sized to your workload, security requirements, and budget, with separate environments for development, staging, and production." },
      { icon: "code", title: "Infrastructure as code", text: "Reproducible infrastructure defined in version control and reviewed like application code." },
      { icon: "branch", title: "CI/CD and release automation", text: "Build, test, and deployment pipelines that make releases routine, observable, and reversible." },
      { icon: "database", title: "Data pipelines and warehousing", text: "Reliable ingestion and transformation from operational systems and SaaS tools into the stores your analytics and AI depend on." },
      { icon: "workflow", title: "Integrations and APIs", text: "Connections between CRM, ERP, internal databases, and third-party services, with error handling and alerting built in." },
      { icon: "eye", title: "Observability and cost visibility", text: "Logging, metrics, alerting, and cost reporting so issues and overspending surface early." },
    ],
    situations: [
      "Deployments are manual, slow, or risky.",
      "Data needed for reporting or AI is scattered across disconnected systems.",
      "You are moving workloads to the cloud or consolidating environments.",
      "Integrations fail silently and problems surface only when a customer notices.",
    ],
    approach: [
      { title: "Assess", text: "Current architecture, environments, data flows, access, and operational pain points." },
      { title: "Design", text: "A target architecture and a migration path that keeps the business running throughout." },
      { title: "Implement", text: "Infrastructure, pipelines, and integrations delivered incrementally, each with a rollback plan." },
      { title: "Operate and transfer", text: "Runbooks, dashboards, alerts, and walkthroughs so your team can run the platform with confidence." },
    ],
    deliverables: [
      "Architecture diagrams and decision records",
      "Infrastructure as code and pipeline definitions",
      "Data pipeline code with schema documentation",
      "Monitoring dashboards and alert rules",
      "Runbooks for routine operations and incidents",
    ],
    engagements: ["project", "dedicated"],
    faqs: [
      { q: "Which cloud providers do you work with?", a: "We work within the cloud provider and accounts you already use, or help you choose one based on your requirements. We confirm relevant platform experience for your project during scoping." },
      { q: "Can you work inside our accounts and security policies?", a: "Yes. We work within your accounts, access policies, and change-management process, with access limited to what the work requires." },
      { q: "Can data engineering support our AI plans?", a: "Yes. Most AI systems depend on clean, accessible data, so data engineering and AI work can be scoped together." },
    ],
    cta: { title: "Need a more dependable platform?", text: "Tell us about your current environment and what is slowing your team down." },
  },
  {
    id: "enterprise",
    slug: "enterprise-applications",
    href: "/services/enterprise-applications/",
    name: "Enterprise Modernization",
    longName: "Enterprise Applications and Modernization",
    icon: "modernize",
    menuText: "Legacy modernization, internal tools, automation, and integration.",
    summary:
      "Modernize legacy applications, connect enterprise systems, and automate operations without disrupting the business.",
    tags: ["Legacy modernization", "Internal tools", "Workflow automation", "System integration"],
    seo: {
      title: "Enterprise Application Development and Modernization | Coastline Digital",
      description:
        "Enterprise application development and legacy modernization: internal tools, workflow automation, system integration, and incremental re-platforming.",
    },
    serviceType: "Enterprise application development and modernization",
    hero: {
      title: "Modernize the systems your business runs on.",
      lede: "We build internal applications, automate operational workflows, and modernize legacy systems incrementally, so your teams keep working while the software improves underneath them.",
    },
    offerings: [
      { icon: "modernize", title: "Legacy application modernization", text: "Incremental migration from aging applications to maintainable architecture, one capability at a time, with the existing system running alongside." },
      { icon: "monitor", title: "Internal tools", text: "Dashboards, admin panels, and review and approval queues that give operations teams a clearer way to work." },
      { icon: "workflow", title: "Workflow automation", text: "Automate repetitive steps and routine handoffs while keeping people involved where their judgment matters." },
      { icon: "layers", title: "Enterprise system integration", text: "Integrations between ERP, CRM, finance, and line-of-business systems that reduce manual entry and reconciliation." },
      { icon: "spark", title: "Practical AI in operations", text: "Document processing, classification, and assistants where they remove real work, with review steps built in." },
      { icon: "doc", title: "Documentation and knowledge transfer", text: "Undocumented business rules captured in code, tests, and documentation instead of a single person’s memory." },
    ],
    situations: [
      "A critical application is hard to change, hard to staff, or nearing end of support.",
      "Teams re-key data between systems or reconcile spreadsheets by hand.",
      "Operations depend on manual approvals tracked in email.",
      "A full rewrite feels too risky, but standing still is costly too.",
    ],
    approach: [
      { title: "Map the current state", text: "Users, workflows, data, integrations, and the business rules embedded in the existing system." },
      { title: "Prioritize", text: "Start with the capabilities that offer the clearest value and the lowest migration risk." },
      { title: "Modernize incrementally", text: "Replace or wrap components behind stable interfaces, running old and new in parallel where needed." },
      { title: "Retire safely", text: "Validate parity, migrate data, and decommission old components on an agreed plan." },
    ],
    deliverables: [
      "Current-state map of systems, data, and business rules",
      "A phased modernization roadmap with risks identified",
      "Working software delivered in production increments",
      "Integration and parity tests",
      "Documentation and a structured handoff to your team",
    ],
    engagements: ["project", "dedicated"],
    faqs: [
      { q: "What kinds of internal tools do you build?", a: "Tools your team uses every day, such as dashboards, approval flows, intake forms, and admin panels, connected to the systems you already run." },
      { q: "Can you connect to our existing software?", a: "In most cases. We integrate through the APIs, databases, or exports your systems support, and we confirm access before we commit to a plan." },
      { q: "Do we have to replace our current software?", a: "No. Much of our work sits alongside what you already use and removes manual steps between systems. When replacement makes sense, we do it incrementally." },
      { q: "How do you reduce risk in a modernization project?", a: "We move one capability at a time behind stable interfaces, test new components against the existing system’s behavior, and keep a rollback path until each step is proven in production." },
    ],
    cta: { title: "Planning a modernization?", text: "Tell us which system or workflow is holding your team back." },
  },
  {
    id: "teams",
    slug: "dedicated-engineering-teams",
    href: "/services/dedicated-engineering-teams/",
    name: "Dedicated Engineering Teams",
    icon: "team",
    menuText: "Experienced engineers who join your roadmap and tools.",
    summary:
      "Experienced engineers who join your roadmap, tools, and delivery rhythm, with Coastline Digital accountable for quality and continuity.",
    tags: ["Team extension", "Cross-functional pods", "Technical leadership"],
    seo: {
      title: "Dedicated Software Development Teams | Coastline Digital",
      description:
        "Dedicated software development teams for US companies: experienced engineers working inside your roadmap, tools, and process, accountable for quality.",
    },
    serviceType: "Dedicated software development teams",
    hero: {
      title: "Experienced engineers, dedicated to your roadmap.",
      lede: "Add engineering capacity without a long hiring cycle. Our engineers join your planning, your tools, and your delivery rhythm, and Coastline Digital stays accountable for quality and continuity.",
    },
    offerings: [
      { icon: "team", title: "Team extension", text: "Engineers who join your existing team and work in your repositories, ceremonies, and review process." },
      { icon: "blocks", title: "Cross-functional pods", text: "A small team covering the skills a workstream needs, such as backend, frontend, data, or AI, led by a senior engineer." },
      { icon: "compass", title: "Technical leadership", text: "Senior engineers who can own architecture decisions, mentor developers, and keep delivery on track." },
      { icon: "spark", title: "Specialist capacity", text: "AI, cloud, or data engineering expertise added for a specific initiative and released when it is complete." },
    ],
    situations: [
      "Your roadmap has outgrown your team’s capacity.",
      "You need specialized skills for a defined period.",
      "You want a stable team over time rather than rotating freelancers.",
      "You run a consulting firm and need dependable delivery capacity. See <a href=\"/partnerships/\">engineering partnerships</a>.",
    ],
    approach: [
      { title: "Define needs", text: "Skills, seniority, working-hour overlap, and how the team will be managed day to day." },
      { title: "Match and introduce", text: "We propose engineers for the role, and you can meet them before work begins." },
      { title: "Onboard", text: "Access, environments, coding standards, and working agreements set up in the first days." },
      { title: "Deliver and review", text: "Regular check-ins on delivery, quality, and fit, with adjustments as your needs change." },
    ],
    deliverables: [
      "Named engineers with consistent assignment",
      "Work in your tools, repositories, and processes",
      "Agreed working-hour overlap with your team",
      "Regular delivery and quality reviews",
      "Continuity planning for handovers and time off",
    ],
    engagements: ["dedicated", "partnership"],
    faqs: [
      { q: "Where are your engineers located?", a: "Coastline Digital is a US-based company that works with an international team of engineering professionals. We tell you where each engineer is located and agree on working-hour overlap with your team before work starts." },
      { q: "How quickly can a team start?", a: "It depends on the skills and seniority you need. After an initial conversation, we will give you a realistic estimate rather than a generic promise." },
      { q: "Can the team size change over time?", a: "Yes. Team composition can be adjusted as your roadmap changes, within the notice terms of the agreement." },
    ],
    cta: { title: "Need more engineering capacity?", text: "Tell us about your roadmap, your team, and the skills you are missing." },
  },
];

export const serviceById = Object.fromEntries(services.map((s) => [s.id, s]));
