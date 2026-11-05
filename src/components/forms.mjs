import { html, esc } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import { site } from "../site.mjs";

/**
 * Inquiry forms post natively to the provider in site.forms.endpoint
 * (FormSubmit). Native submission keeps the provider's CAPTCHA step, works
 * without JavaScript, and needs no server of our own. main.js adds
 * client-side validation, status messages, and the email subject line.
 */

export const inquiryTypes = [
  { value: "Software development project", label: "Software development project", key: "project" },
  { value: "AI implementation", label: "AI implementation", key: "ai" },
  { value: "Dedicated engineering team", label: "Dedicated engineering team", key: "team" },
  { value: "Consulting partnership", label: "Consulting partnership", key: "partnership" },
  { value: "Other", label: "Other", key: "other" },
];

// `key` matches the service ids used in /contact/?service=<id> links.
const serviceOptions = [
  { label: "Not sure yet" },
  { label: "Custom software engineering", key: "custom-software" },
  { label: "AI and machine learning", key: "ai-ml" },
  { label: "Cloud and data engineering", key: "cloud-data" },
  { label: "Enterprise modernization", key: "enterprise" },
  { label: "Dedicated engineering team", key: "teams" },
];
const timelines = ["As soon as possible", "Within 1–3 months", "In 3–6 months", "6 months or later", "Just exploring"];
const budgets = ["Under $25,000", "$25,000–$75,000", "$75,000–$150,000", "$150,000–$300,000", "Over $300,000", "Not sure yet"];

function field({ id, name, label, type = "text", required = false, autocomplete, placeholder, maxlength, hint, minlength }) {
  const describedBy = [hint && `${id}-hint`, `${id}-error`].filter(Boolean).join(" ");
  return html`<div class="field" data-field>
    <label class="field__label" for="${id}">${label}${required ? "" : html` <span class="field__optional">Optional</span>`}</label>
    ${hint ? html`<p class="field__hint" id="${id}-hint">${hint}</p>` : ""}
    <input class="field__input" id="${id}" name="${name}" type="${type}"${required ? " required" : ""}${
      autocomplete ? ` autocomplete="${autocomplete}"` : ""
    }${placeholder ? ` placeholder="${esc(placeholder)}"` : ""}${maxlength ? ` maxlength="${maxlength}"` : ""}${
      minlength ? ` minlength="${minlength}"` : ""
    } aria-describedby="${describedBy}">
    <p class="field__error" id="${id}-error" data-error hidden></p>
  </div>`;
}

function select({ id, name, label, options, required = false, placeholder = "Select an option" }) {
  return html`<div class="field" data-field>
    <label class="field__label" for="${id}">${label}${required ? "" : html` <span class="field__optional">Optional</span>`}</label>
    <div class="field__select">
      <select class="field__input" id="${id}" name="${name}"${required ? " required" : ""} aria-describedby="${id}-error">
        <option value="">${placeholder}</option>
        ${options.map((o) =>
          typeof o === "string"
            ? html`<option>${esc(o)}</option>`
            : html`<option${o.key ? ` data-key="${o.key}"` : ""}>${esc(o.label)}</option>`,
        )}
      </select>${icon("chevron-down")}
    </div>
    <p class="field__error" id="${id}-error" data-error hidden></p>
  </div>`;
}

function textarea({ id, name, label, required = true, placeholder, hint, minlength = 20, maxlength = 4000 }) {
  return html`<div class="field field--full" data-field>
    <label class="field__label" for="${id}">${label}${required ? "" : html` <span class="field__optional">Optional</span>`}</label>
    ${hint ? html`<p class="field__hint" id="${id}-hint">${hint}</p>` : ""}
    <textarea class="field__input field__textarea" id="${id}" name="${name}" rows="5"${required ? " required" : ""} minlength="${minlength}" maxlength="${maxlength}"${
      placeholder ? ` placeholder="${esc(placeholder)}"` : ""
    } aria-describedby="${hint ? `${id}-hint ` : ""}${id}-error"></textarea>
    <p class="field__error" id="${id}-error" data-error hidden></p>
  </div>`;
}

function choiceGroup({ id, name, legend, options, type = "radio", required = false, columns = 2 }) {
  return html`<fieldset class="field field--full choice" data-field data-choice${required ? " data-required" : ""} aria-describedby="${id}-error">
    <legend class="field__label">${legend}${required ? "" : html` <span class="field__optional">Optional</span>`}</legend>
    <div class="choice__grid choice__grid--${columns}">
      ${options.map(
        (o, i) => html`<label class="choice__option"><input type="${type}" name="${name}" value="${esc(o.value ?? o)}"${
          o.key ? ` data-key="${o.key}"` : ""
        }${required && type === "radio" && i === 0 ? " required" : ""}><span class="choice__box" aria-hidden="true">${icon("check")}</span><span>${o.label ?? o}</span></label>`,
      )}
    </div>
    <p class="field__error" id="${id}-error" data-error hidden></p>
  </fieldset>`;
}

function hiddenFields({ subject, next, formName }) {
  return html`<input type="hidden" name="_subject" value="${esc(subject)}" data-subject>
  <input type="hidden" name="_next" value="${esc(next)}">
  <input type="hidden" name="_captcha" value="${site.forms.captcha ? "true" : "false"}">
  <input type="hidden" name="_template" value="table">
  <input type="hidden" name="form" value="${esc(formName)}">
  <div class="hp" aria-hidden="true"><label for="${formName}-company-url">Leave this field empty</label><input type="text" id="${formName}-company-url" name="_honey" tabindex="-1" autocomplete="off"></div>`;
}

function formFooter({ submitLabel, track }) {
  return html`<div class="form__footer">
    <button class="btn btn--primary btn--lg form__submit" type="submit" data-track="${track}"><span class="spinner" aria-hidden="true"></span><span data-submit-label>${submitLabel}</span>${icon("arrow-right")}</button>
    <p class="form__legal">By submitting, you agree to our <a href="/privacy/">privacy policy</a>. After you submit, a short verification step confirms you are not a bot.</p>
  </div>
  <p class="form__status" role="status" aria-live="polite" data-form-status hidden></p>`;
}

function errorSummary() {
  return html`<div class="form__summary" role="alert" tabindex="-1" data-error-summary hidden>
    <p class="form__summary-title">Please correct the following:</p>
    <ul role="list"></ul>
  </div>`;
}

function successPanel({ id, title, text }) {
  return html`<div class="form-success" id="${id}" tabindex="-1" data-form-success hidden>
    <span class="form-success__icon">${icon("check")}</span>
    <h2 class="form-success__title">${title}</h2>
    <p>${text}</p>
  </div>`;
}

export function projectForm() {
  return html`${successPanel({
    id: "contact-success",
    title: "Thank you. Your inquiry has been sent.",
    text: `We review every inquiry and will reply by email. If anything is time-sensitive, write to <a href="mailto:${site.email}">${site.email}</a>.`,
  })}
  <form class="form" id="contact-form" action="${site.forms.endpoint}" method="POST" novalidate data-form="project" data-subject-prefix="New inquiry">
    ${hiddenFields({ subject: "New inquiry: Coastline Digital website", next: `${site.url}/contact/?sent=1`, formName: "project-inquiry" })}
    ${errorSummary()}
    <div class="form__grid">
      ${field({ id: "name", name: "name", label: "Full name", required: true, autocomplete: "name", maxlength: 120 })}
      ${field({ id: "email", name: "email", label: "Work email", type: "email", required: true, autocomplete: "email", maxlength: 254, placeholder: "you@company.com" })}
      ${field({ id: "company", name: "company", label: "Company name", required: true, autocomplete: "organization", maxlength: 160 })}
      ${select({ id: "service", name: "service_interest", label: "Service interest", options: serviceOptions })}
      ${choiceGroup({ id: "inquiry-type", name: "inquiry_type", legend: "What can we help with?", options: inquiryTypes, required: true, columns: 2 })}
      ${textarea({ id: "message", name: "message", label: "Short project description", hint: "What are you building or improving, and where does it stand today?" })}
      ${select({ id: "timeline", name: "timeline", label: "Timeline", options: timelines })}
      ${select({ id: "budget", name: "budget", label: "Budget range", options: budgets })}
    </div>
    ${formFooter({ submitLabel: "Send inquiry", track: "form_submit_project" })}
  </form>`;
}

export const partnershipTypes = [
  "White-label development",
  "Dedicated engineering capacity",
  "Technical subcontracting",
  "Project-based collaboration",
  "Not sure yet",
];
const partnerSkills = [
  "Backend and full-stack",
  "Frontend and mobile",
  "AI and machine learning",
  "Cloud and DevOps",
  "Data engineering",
];

export function partnerForm() {
  return html`${successPanel({
    id: "partner-success",
    title: "Thank you. Your partnership inquiry has been sent.",
    text: `We will review your firm’s needs and reply by email to arrange an introductory call. You can also reach us at <a href="mailto:${site.email}">${site.email}</a>.`,
  })}
  <form class="form" id="partner-form" action="${site.forms.endpoint}" method="POST" novalidate data-form="partnership" data-subject-prefix="Partnership inquiry">
    ${hiddenFields({ subject: "Partnership inquiry: Coastline Digital website", next: `${site.url}/partnerships/?sent=1`, formName: "partnership-inquiry" })}
    <input type="hidden" name="inquiry_type" value="Consulting partnership">
    ${errorSummary()}
    <div class="form__grid">
      ${field({ id: "p-name", name: "name", label: "Full name", required: true, autocomplete: "name", maxlength: 120 })}
      ${field({ id: "p-email", name: "email", label: "Work email", type: "email", required: true, autocomplete: "email", maxlength: 254, placeholder: "you@yourfirm.com" })}
      ${field({ id: "p-company", name: "company", label: "Firm name", required: true, autocomplete: "organization", maxlength: 160 })}
      ${field({ id: "p-role", name: "role", label: "Your role", autocomplete: "organization-title", maxlength: 120, placeholder: "e.g. Founder, Delivery Director" })}
      ${choiceGroup({ id: "p-type", name: "partnership_type", legend: "Partnership model", options: partnershipTypes, required: true, columns: 2 })}
      ${choiceGroup({ id: "p-skills", name: "capabilities_needed", legend: "Capabilities you need", options: partnerSkills, type: "checkbox", columns: 2 })}
      ${textarea({ id: "p-message", name: "message", label: "About your firm and the work", hint: "The kinds of projects you deliver, typical client size, and what you need from a delivery partner." })}
      ${field({ id: "p-website", name: "website", label: "Firm website", type: "url", autocomplete: "url", maxlength: 200, placeholder: "https://" })}
      ${select({ id: "p-timeline", name: "timeline", label: "Timing", options: ["Active opportunity now", "Upcoming work in 1–3 months", "Building a partner bench"] })}
    </div>
    ${formFooter({ submitLabel: "Explore a Partnership", track: "form_submit_partnership" })}
  </form>`;
}
