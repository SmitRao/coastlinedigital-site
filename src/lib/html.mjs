/**
 * Minimal HTML templating for the static build.
 *
 * `html` joins template literal parts and flattens arrays. Interpolated
 * strings are treated as trusted markup because every value comes from the
 * content files in this repository. Use `esc` for anything that ends up in an
 * attribute or could contain reserved characters.
 */

function render(value) {
  if (value === null || value === undefined || value === false) return "";
  if (Array.isArray(value)) return value.map(render).join("");
  return String(value);
}

export function html(strings, ...values) {
  let out = "";
  strings.forEach((part, i) => {
    out += part;
    if (i < values.length) out += render(values[i]);
  });
  return out;
}

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c]);

/** Strip markup from a trusted string, e.g. for meta descriptions or JSON-LD. */
export const plain = (value) =>
  String(value ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Join class names, skipping falsy values. */
export const cx = (...names) => names.filter(Boolean).join(" ");

/** Serialize JSON-LD safely for embedding in a script element. */
export const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
