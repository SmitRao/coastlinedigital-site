import { html } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import { solutions } from "../content/solutions.mjs";
import { serviceById } from "../content/services.mjs";
import { breadcrumbs } from "../components/layout.mjs";
import { ctaBand, pageHero, solutionDetail } from "../components/ui.mjs";

const crumbs = breadcrumbs([
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions/" },
]);

const caseStudies = solutions.filter((s) => s.type === "case-study");
const concepts = solutions.filter((s) => s.type === "concept");

export default {
  path: "/solutions/",
  title: "Solution Concepts: AI, Modernization, and Platform Architecture | Coastline Digital",
  description:
    "Illustrative solution concepts with architecture diagrams: RAG assistants, document pipelines, AI agents, legacy modernization, SaaS and data platforms.",
  priority: 0.8,
  jsonld: [crumbs.data],
  body: html`
${pageHero({
  crumbs: crumbs.markup,
  eyebrow: "Solutions",
  title: "What we can build, with the architecture shown.",
  lede: "These solution concepts show how we approach common business problems with software and AI. Each one is an illustrative example, clearly labeled. None describes a specific client, and none reports results.",
  actions: [{ label: "Discuss a similar project", href: "/contact/", variant: "primary", track: "cta_solutions_hero" }],
})}

<section class="section section--flush-top" aria-labelledby="concepts-title">
  <div class="container">
    <div class="notice" data-reveal>
      ${icon("flag")}
      <p><strong>About these examples.</strong> Concepts describe the kind of system we design and build, how we would approach it, and what we would measure. We publish client work only with the client’s permission, and verified case studies will be labeled as such.</p>
    </div>
    <h2 class="sr-only" id="concepts-title">Solution concepts</h2>
    <nav class="toc" aria-label="Solution concepts">
      <ul role="list">${concepts.map((s) => html`<li><a href="#${s.id}">${s.title}</a></li>`)}</ul>
    </nav>
    ${caseStudies.map((s) => solutionDetail(s, { serviceById }))}
    ${concepts.map((s) => solutionDetail(s, { serviceById }))}
  </div>
</section>

${ctaBand({
  title: "Have a problem that looks like one of these?",
  text: "We can walk through how a concept would apply to your systems, data, and constraints.",
  primary: { label: "Discuss Your Project", href: "/contact/", track: "cta_solutions_band" },
  secondary: { label: "Become a Delivery Partner", href: "/partnerships/#partner-inquiry" },
})}`,
};
