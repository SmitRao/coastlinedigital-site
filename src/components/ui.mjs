import { html, cx } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import { systemDiagram } from "./diagrams.mjs";

export function button({ label, href, variant = "primary", track, size, arrow = true, className }) {
  return html`<a class="${cx("btn", `btn--${variant}`, size && `btn--${size}`, className)}" href="${href}"${
    track ? ` data-track="${track}"` : ""
  }>${label}${arrow ? icon("arrow-right") : ""}</a>`;
}

export function sectionHead({ eyebrow, title, lede, id, align = "start", level = 2, className }) {
  const tag = `h${level}`;
  return html`<div class="${cx("section-head", align === "center" && "section-head--center", className)}" data-reveal>
    ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ""}
    <${tag} class="section-title"${id ? ` id="${id}"` : ""}>${title}</${tag}>
    ${lede ? html`<p class="lede">${lede}</p>` : ""}
  </div>`;
}

export function pageHero({ eyebrow, title, lede, crumbs, actions = [], aside, className }) {
  return html`<section class="${cx("page-hero", className)}" aria-labelledby="page-title">
  <div class="page-hero__bg" aria-hidden="true"></div>
  <div class="container">
    ${crumbs ?? ""}
    <div class="${cx("page-hero__grid", aside && "page-hero__grid--aside")}">
      <div class="page-hero__copy">
        ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ""}
        <h1 id="page-title">${title}</h1>
        ${lede ? html`<p class="page-hero__lede">${lede}</p>` : ""}
        ${actions.length ? html`<div class="actions">${actions.map(button)}</div>` : ""}
      </div>
      ${aside ? html`<div class="page-hero__aside">${aside}</div>` : ""}
    </div>
  </div>
</section>`;
}

export function checklist(items, className) {
  return html`<ul class="${cx("checklist", className)}" role="list">${items.map(
    (item) => html`<li>${icon("check")}<span>${item}</span></li>`,
  )}</ul>`;
}

export function serviceCard(service, { index, headingLevel = 3 } = {}) {
  const tag = `h${headingLevel}`;
  return html`<article class="service-card" data-reveal>
    <div class="service-card__top">
      <span class="icon-tile">${icon(service.icon)}</span>
      ${index !== undefined ? html`<span class="service-card__index" aria-hidden="true">0${index + 1}</span>` : ""}
    </div>
    <${tag} class="service-card__title"><a href="${service.href}" class="card-link">${service.name}</a></${tag}>
    <p class="service-card__text">${service.summary}</p>
    <ul class="tag-list" role="list" aria-label="Capabilities">${service.tags.map((t) => html`<li>${t}</li>`)}</ul>
    <span class="service-card__more" aria-hidden="true">Learn more ${icon("arrow-right")}</span>
  </article>`;
}

export function audienceCards(audiences) {
  return html`<div class="audience-grid">${audiences.map(
    (a) => html`<article class="${cx("audience-card", a.featured && "audience-card--featured")}" data-reveal>
      <span class="icon-tile">${icon(a.icon)}</span>
      ${a.featured ? html`<p class="audience-card__flag">Partnership program</p>` : ""}
      <h3 class="audience-card__title">${a.title}</h3>
      <p>${a.text}</p>
      ${checklist(a.points, "checklist--compact")}
      <a class="link-arrow" href="${a.href}"${a.featured ? ' data-track="cta_partner_audience"' : ""}>${a.linkLabel} ${icon("arrow-right")}</a>
    </article>`,
  )}</div>`;
}

/** Tabs enhance progressively: without JavaScript every panel is shown. */
export function capabilityTabs(capabilities, { id = "capabilities" } = {}) {
  return html`<div class="cap" data-tabs>
    <div class="cap__tabs" role="tablist" aria-label="Engineering capabilities" hidden data-tablist>
      ${capabilities.map(
        (c, i) => html`<button class="cap__tab" type="button" role="tab" id="${id}-tab-${c.id}" aria-controls="${id}-panel-${c.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${c.label}</button>`,
      )}
    </div>
    <div class="cap__panels">
      ${capabilities.map(
        (c) => html`<section class="cap__panel" id="${id}-panel-${c.id}" role="tabpanel" aria-labelledby="${id}-tab-${c.id}" data-panel>
        <div class="cap__intro">
          <h3 class="cap__title">${c.title}</h3>
          <p>${c.summary}</p>
          ${c.note ? html`<p class="cap__note">${c.note}</p>` : ""}
        </div>
        <ul class="cap__list" role="list">${c.items.map((item) => html`<li>${icon("check")}<span>${item}</span></li>`)}</ul>
        ${c.tools?.length ? html`<ul class="tag-list" role="list" aria-label="Tools">${c.tools.map((t) => html`<li>${t}</li>`)}</ul>` : ""}
      </section>`,
      )}
    </div>
  </div>`;
}

export function processTrack(steps, { detailed = false } = {}) {
  return html`<ol class="${cx("process", detailed && "process--detailed")}" role="list" data-reveal>
    ${steps.map(
      (s, i) => html`<li class="process__step">
      <div class="process__marker"><span class="process__num">0${i + 1}</span><span class="process__icon">${icon(s.icon)}</span></div>
      <h3 class="process__title">${s.name}</h3>
      <p class="process__summary">${s.summary}</p>
      ${detailed ? html`${checklist(s.activities, "checklist--compact")}<p class="process__output"><span>Outcome</span>${s.output}</p>` : ""}
    </li>`,
    )}
  </ol>`;
}

export function engagementCards(models, { selector = true, headingLevel = 3 } = {}) {
  const tag = `h${headingLevel}`;
  return html`<div class="engagement" data-engagement>
    ${selector ? html`<fieldset class="fit-picker" hidden data-fit-picker>
      <legend>Which describes you best?</legend>
      <div class="fit-picker__options">
        ${models.map(
          (m) => html`<label class="fit-picker__option"><input type="radio" name="fit" value="${m.id}"><span>${m.fit}</span></label>`,
        )}
      </div>
      <p class="fit-picker__result" aria-live="polite" data-fit-result></p>
    </fieldset>` : ""}
    <div class="engagement__grid">
      ${models.map(
        (m) => html`<article class="engagement-card${m.id === "partnership" ? " engagement-card--partner" : ""}" id="model-${m.id}" data-model="${m.id}" data-reveal>
        <span class="icon-tile">${icon(m.icon)}</span>
        <${tag} class="engagement-card__title">${m.name}</${tag}>
        <p class="engagement-card__tagline">${m.tagline}</p>
        <dl class="engagement-card__facts">
          <div><dt>Best for</dt><dd>${m.bestFor}</dd></div>
          <div><dt>Structure</dt><dd>${m.structure}</dd></div>
        </dl>
        ${checklist(m.points, "checklist--compact")}
        <a class="link-arrow" href="${m.href}">${m.cta} ${icon("arrow-right")}</a>
      </article>`,
      )}
    </div>
  </div>`;
}

export function reasonsGrid(reasons) {
  return html`<ul class="reasons" role="list">${reasons.map(
    (r) => html`<li class="reason" data-reveal>
      <span class="reason__icon">${icon(r.icon)}</span>
      <div><h3 class="reason__title">${r.title}</h3><p>${r.text}</p></div>
    </li>`,
  )}</ul>`;
}

export function solutionBadge(solution) {
  return solution.type === "case-study"
    ? html`<span class="badge badge--verified">Client case study</span>`
    : html`<span class="badge badge--concept">Illustrative concept</span>`;
}

export function solutionCard(solution) {
  return html`<article class="solution-card" data-reveal>
    <div class="solution-card__meta">${solutionBadge(solution)}<span class="solution-card__category">${solution.category}</span></div>
    <h3 class="solution-card__title"><a class="card-link" href="/solutions/#${solution.id}">${solution.title}</a></h3>
    <p>${solution.summary}</p>
    ${systemDiagram(solution.diagram, { id: `card-${solution.id}`, title: solution.title, thumbnail: true })}
    <span class="service-card__more" aria-hidden="true">View concept ${icon("arrow-right")}</span>
  </article>`;
}

export function solutionDetail(solution, { serviceById }) {
  const related = solution.services.map((id) => serviceById[id]).filter(Boolean);
  return html`<article class="solution" id="${solution.id}" aria-labelledby="${solution.id}-title">
    <header class="solution__head" data-reveal>
      <div class="solution-card__meta">${solutionBadge(solution)}<span class="solution-card__category">${solution.category}</span></div>
      <h2 class="solution__title" id="${solution.id}-title">${solution.title}</h2>
      <p class="lede">${solution.summary}</p>
    </header>
    ${systemDiagram(solution.diagram, { id: solution.id, title: solution.title })}
    <div class="solution__body">
      <div class="solution__col" data-reveal>
        <h3>The business problem</h3><p>${solution.problem}</p>
        <h3>How we would approach it</h3><p>${solution.approach}</p>
      </div>
      <div class="solution__col" data-reveal>
        <h3>Key components</h3>${checklist(solution.components, "checklist--compact")}
        <h3>${solution.type === "case-study" ? "Measured outcomes" : "What we would measure"}</h3>
        ${checklist(solution.type === "case-study" ? solution.outcomes : solution.measures, "checklist--compact")}
        ${solution.type === "concept" ? html`<p class="fineprint">Baselines and targets are agreed during discovery. This concept does not describe a past engagement or reported result.</p>` : ""}
        <p class="solution__related">Related: ${related.map((s, i) => html`${i ? ", " : ""}<a href="${s.href}">${s.name}</a>`)}</p>
      </div>
    </div>
  </article>`;
}

export function faqList(items, { headingLevel = 3 } = {}) {
  const tag = `h${headingLevel}`;
  return html`<div class="faq">${items.map(
    (item) => html`<details class="faq__item">
      <summary><${tag} class="faq__q">${item.q}</${tag}>${icon("chevron-down")}</summary>
      <div class="faq__a"><p>${item.a}</p></div>
    </details>`,
  )}</div>`;
}

export function ctaBand({ eyebrow, title, text, primary, secondary, id }) {
  return html`<section class="cta-band"${id ? ` id="${id}"` : ""} aria-labelledby="${id ?? "cta"}-title">
  <div class="cta-band__bg" aria-hidden="true"></div>
  <div class="container cta-band__inner" data-reveal>
    ${eyebrow ? html`<p class="eyebrow eyebrow--on-dark">${eyebrow}</p>` : ""}
    <h2 class="cta-band__title" id="${id ?? "cta"}-title">${title}</h2>
    ${text ? html`<p class="cta-band__text">${text}</p>` : ""}
    <div class="actions actions--center">
      ${button({ ...primary, variant: "light" })}
      ${secondary ? button({ ...secondary, variant: "outline-light" }) : ""}
    </div>
  </div>
</section>`;
}
