/**
 * Solution concepts and case studies.
 *
 * Every entry has a `type`:
 *  - "concept": an illustrative example of work we can build. It must not
 *    name a client, quote anyone, or report outcomes. The page labels it.
 *  - "case-study": a verified client engagement, approved for publication.
 *    Add `client`, `outcomes` (measured, approved), and optional `quote`.
 *
 * Diagram nodes sit on a grid: `c` is the column (0-3) and `r` the row (0-2).
 * Kinds: user, source, service, ai, data, review, legacy.
 */
const n = (id, c, r, label, sub, kind = "service") => ({ id, c, r, label, sub, kind });

export const solutions = [
  {
    id: "knowledge-assistant",
    type: "concept",
    title: "Knowledge assistant with retrieval",
    category: "Generative AI",
    services: ["ai-ml", "custom-software"],
    summary: "An internal assistant that answers questions from approved documents, cites its sources, and hands off to a person when it is unsure.",
    problem: "Support and operations teams search wikis, PDFs, past tickets, and policy documents to answer routine questions. Answers vary depending on who is asked, and new staff take longer to become effective.",
    approach: "Index approved sources with permission metadata, retrieve relevant passages for each question, and generate an answer with citations. Low-confidence answers route to a subject-matter expert, and every answer can be rated.",
    components: ["Document ingestion and chunking", "Permission-aware retrieval", "Answers with source citations", "Evaluation set from historical questions", "Feedback capture and escalation"],
    measures: ["Accuracy on an agreed evaluation set", "Citation correctness", "Escalation rate", "Time to resolve routine questions"],
    diagram: {
      rows: 3,
      nodes: [
        n("user", 0, 0, "Employee", "Web or chat", "user"),
        n("api", 1, 0, "Assistant API", "Auth · routing"),
        n("llm", 2, 0, "Language model", "Grounded answer", "ai"),
        n("eval", 3, 0, "Evaluation", "Tests · feedback", "review"),
        n("review", 0, 1, "Expert handoff", "Low confidence", "review"),
        n("retr", 1, 1, "Retrieval", "Permission-aware", "ai"),
        n("index", 1, 2, "Search index", "Chunks · embeddings", "data"),
        n("ingest", 2, 2, "Ingestion", "Parse · chunk", "service"),
        n("src", 3, 2, "Sources", "Docs · tickets", "source"),
      ],
      edges: [["user", "api"], ["api", "llm"], ["llm", "eval"], ["api", "retr"], ["retr", "index"], ["src", "ingest"], ["ingest", "index"], ["api", "review"]],
    },
  },
  {
    id: "document-pipeline",
    type: "concept",
    title: "Document intake and extraction pipeline",
    category: "AI for operations",
    services: ["ai-ml", "enterprise"],
    summary: "A pipeline that reads incoming documents, extracts structured fields, validates them, and sends only exceptions to a person.",
    problem: "Invoices, applications, or contracts arrive as PDFs and email attachments. Staff re-key fields into business systems and chase missing information by email.",
    approach: "Classify each document, extract fields and tables, and validate results against business rules and reference data. Clean records post to the system of record; exceptions go to a review queue with the source document alongside.",
    components: ["Intake from email, upload, and API", "Classification and field extraction", "Rule-based validation", "Review queue for exceptions", "ERP or CRM integration", "Audit trail for every decision"],
    measures: ["Field-level extraction accuracy", "Share of documents needing no correction", "Exception turnaround time", "Errors found after posting"],
    diagram: {
      rows: 3,
      nodes: [
        n("inbox", 0, 0, "Intake", "Email · upload · API", "source"),
        n("classify", 1, 0, "Classification", "Document type", "ai"),
        n("extract", 2, 0, "Extraction", "Fields · tables", "ai"),
        n("validate", 3, 0, "Validation", "Business rules", "service"),
        n("review", 2, 1, "Review queue", "Exceptions only", "review"),
        n("audit", 1, 2, "Audit trail", "Every decision", "data"),
        n("erp", 3, 2, "System of record", "ERP · CRM", "data"),
      ],
      edges: [["inbox", "classify"], ["classify", "extract"], ["extract", "validate"], ["validate", "review"], ["validate", "erp"], ["review", "erp"], ["review", "audit"]],
    },
  },
  {
    id: "legacy-modernization",
    type: "concept",
    title: "Incremental legacy modernization",
    category: "Enterprise modernization",
    services: ["enterprise", "cloud-data"],
    summary: "Replace a business-critical legacy application one capability at a time, without a risky all-at-once rewrite.",
    problem: "A core application built years ago is slow to change, hard to staff, and tightly coupled to its database. A full rewrite would take too long and put operations at risk.",
    approach: "Place a routing layer in front of the legacy system, then move capabilities one at a time into new services with their own tests and data. Old and new run in parallel until parity tests show each step is safe to complete.",
    components: ["Routing layer with a stable interface", "Capability-by-capability extraction", "Data synchronization during transition", "Parity tests against legacy behavior", "Decommissioning plan"],
    measures: ["Share of traffic served by new components", "Lead time for changes", "Incidents during cutover", "Legacy components retired"],
    diagram: {
      rows: 3,
      nodes: [
        n("users", 0, 1, "Users and clients", "Unchanged experience", "user"),
        n("facade", 1, 1, "Routing layer", "Stable interface", "service"),
        n("legacy", 2, 0, "Legacy application", "Shrinking scope", "legacy"),
        n("legacydb", 3, 0, "Legacy database", "Read during transition", "legacy"),
        n("parity", 3, 1, "Parity tests", "Old vs. new", "review"),
        n("newsvc", 2, 2, "New services", "Tested · documented", "ai"),
        n("newdb", 3, 2, "New data store", "Owned per service", "data"),
      ],
      edges: [["users", "facade"], ["facade", "legacy"], ["facade", "newsvc"], ["legacy", "legacydb"], ["newsvc", "newdb"], ["legacy", "parity"], ["newsvc", "parity"]],
    },
  },
  {
    id: "saas-platform",
    type: "concept",
    title: "Multi-tenant SaaS platform foundation",
    category: "Custom software",
    services: ["custom-software", "cloud-data"],
    summary: "A production platform foundation with tenant isolation, roles, billing integration, and delivery automation.",
    problem: "A startup has validated demand with a prototype and now needs a platform that can securely serve many customer accounts and support a growing product team.",
    approach: "Build tenant-aware data access, role-based permissions, subscription billing integration, an admin console, audit logging, and CI/CD, so the product team can focus on features rather than foundations.",
    components: ["Accounts, roles, and tenant isolation", "Billing provider integration", "Core domain services and API", "Admin console for support and operations", "CI/CD with automated tests", "Logging, metrics, and alerting"],
    measures: ["Deployment frequency", "Time to onboard a new customer account", "Error rates and latency against agreed targets"],
    diagram: {
      rows: 3,
      nodes: [
        n("web", 0, 0, "Web app", "Customers", "user"),
        n("mobile", 0, 2, "Mobile app", "Customers", "user"),
        n("api", 1, 1, "Platform API", "Versioned", "service"),
        n("auth", 2, 0, "Identity and tenancy", "Roles · isolation", "service"),
        n("core", 2, 1, "Core services", "Domain logic", "ai"),
        n("obs", 2, 2, "Observability", "Logs · alerts", "review"),
        n("billing", 3, 0, "Billing provider", "Subscriptions", "source"),
        n("db", 3, 1, "Tenant-scoped data", "Isolated access", "data"),
        n("admin", 3, 2, "Admin console", "Support · ops", "user"),
      ],
      edges: [["web", "api"], ["mobile", "api"], ["api", "auth"], ["api", "core"], ["core", "db"], ["core", "billing"], ["core", "obs"], ["admin", "core"]],
    },
  },
  {
    id: "data-platform",
    type: "concept",
    title: "Operations data platform",
    category: "Cloud and data engineering",
    services: ["cloud-data"],
    summary: "Automated pipelines from business systems into a governed warehouse, with shared metric definitions everyone can trust.",
    problem: "Revenue, operations, and support data live in separate SaaS tools. Reports are assembled by hand each week, and numbers rarely match between teams.",
    approach: "Ingest data automatically from source systems into a cloud warehouse, transform it with tested models, define shared metrics once, and expose governed datasets for dashboards and future AI use cases.",
    components: ["Source system connectors", "Raw and modeled data layers", "Data quality and freshness tests", "Shared metric definitions", "Dashboards and access controls"],
    measures: ["Report preparation time", "Data freshness", "Quality issues caught before reaching dashboards", "Agreement on metric definitions"],
    diagram: {
      rows: 3,
      nodes: [
        n("crm", 0, 0, "CRM", "Pipeline · accounts", "source"),
        n("billing", 0, 1, "Billing", "Invoices · plans", "source"),
        n("support", 0, 2, "Support desk", "Tickets", "source"),
        n("ingest", 1, 1, "Ingestion", "Incremental loads", "service"),
        n("tests", 2, 0, "Quality checks", "Tests · freshness", "review"),
        n("wh", 2, 1, "Cloud warehouse", "Raw → modeled", "data"),
        n("dash", 3, 0, "Dashboards", "Teams · leadership", "user"),
        n("metrics", 3, 1, "Shared metrics", "Defined once", "service"),
        n("ai", 3, 2, "AI and ML", "Future use cases", "ai"),
      ],
      edges: [["crm", "ingest"], ["billing", "ingest"], ["support", "ingest"], ["ingest", "wh"], ["wh", "tests"], ["wh", "metrics"], ["metrics", "dash"], ["wh", "ai"]],
    },
  },
  {
    id: "triage-agent",
    type: "concept",
    title: "AI agent for request triage",
    category: "AI agents",
    services: ["ai-ml", "enterprise"],
    summary: "An agent that categorizes, enriches, and routes incoming requests, with human approval for higher-risk actions.",
    problem: "A shared inbox receives requests that must be categorized, matched to an account, prioritized, and routed to the right team. Manual triage takes hours each day and quality varies.",
    approach: "An agent reads each request, looks up account context through scoped, read-only APIs, and proposes a category, priority, and draft response. Policy rules decide which actions run automatically and which wait for a person to approve.",
    components: ["Inbox and ticketing integration", "Scoped tool access through APIs", "Policy and approval rules", "Draft responses for review", "Complete action log", "Evaluation against historical requests"],
    measures: ["Routing accuracy", "Time from receipt to assignment", "Approval override rate", "Agent action error rate"],
    diagram: {
      rows: 3,
      nodes: [
        n("kb", 1, 0, "Knowledge base", "Read-only", "data"),
        n("crm", 2, 0, "Account lookup", "Scoped API", "service"),
        n("auto", 3, 0, "Auto-route", "Low-risk actions", "service"),
        n("inbox", 0, 1, "Shared inbox", "Incoming requests", "source"),
        n("agent", 1, 1, "Agent", "Plan · act · log", "ai"),
        n("policy", 2, 1, "Policy check", "Risk thresholds", "review"),
        n("ticket", 3, 1, "Ticketing system", "Assigned queue", "data"),
        n("log", 1, 2, "Action log", "Audit · evaluation", "data"),
        n("human", 3, 2, "Human approval", "Higher-risk actions", "review"),
      ],
      edges: [["inbox", "agent"], ["agent", "kb"], ["agent", "crm"], ["agent", "policy"], ["policy", "auto"], ["policy", "human"], ["auto", "ticket"], ["human", "ticket"], ["agent", "log"]],
    },
  },
];

export const featuredSolutionIds = ["knowledge-assistant", "legacy-modernization", "saas-platform"];
