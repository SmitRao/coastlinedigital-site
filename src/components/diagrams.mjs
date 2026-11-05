import { html, esc } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";

/* --------------------------------------------------------------------------
   Hero: illustrative layered architecture with animated data flow.
   Motion uses SMIL so it needs no inline styles; main.js pauses it when the
   visitor prefers reduced motion or presses the pause control.
   -------------------------------------------------------------------------- */
const HERO_LAYERS = [
  { label: "Experience", nodes: ["Web app", "Mobile", "Partner API"] },
  { label: "Services", nodes: ["Identity", "API gateway", "Workflows"] },
  { label: "Intelligence", nodes: ["Retrieval", "AI agents", "Evaluations"] },
  { label: "Data + cloud", nodes: ["Event stream", "Warehouse", "Object store"] },
];

export function heroArchitecture() {
  const colX = [176, 318, 460];
  const rowY = [62, 160, 258, 356];
  const w = 120;
  const h = 40;

  const nodes = HERO_LAYERS.flatMap((layer, r) =>
    layer.nodes.map(
      (label, c) => html`<g class="hx-node hx-node--l${r}" data-col="${c}">
        <rect x="${colX[c] - w / 2}" y="${rowY[r] - h / 2}" width="${w}" height="${h}" rx="9"/>
        <circle class="hx-dot" cx="${colX[c] - w / 2 + 15}" cy="${rowY[r]}" r="3"/>
        <text x="${colX[c] - w / 2 + 26}" y="${rowY[r] + 4}">${label}</text>
      </g>`,
    ),
  );

  const labels = HERO_LAYERS.map(
    (layer, r) => html`<text class="hx-layer" x="16" y="${rowY[r] + 4}">${layer.label.toUpperCase()}</text>`,
  );

  // Connectors between layers: straight drops plus a fan-in to the gateway.
  const paths = [];
  for (let r = 0; r < rowY.length - 1; r++) {
    const y1 = rowY[r] + h / 2;
    const y2 = rowY[r + 1] - h / 2;
    colX.forEach((x) => paths.push(`M${x} ${y1}V${y2}`));
  }
  const gx = colX[1];
  paths.push(`M${colX[0]} ${rowY[0] + h / 2}C${colX[0]} ${rowY[0] + 50} ${gx} ${rowY[1] - 50} ${gx} ${rowY[1] - h / 2}`);
  paths.push(`M${colX[2]} ${rowY[0] + h / 2}C${colX[2]} ${rowY[0] + 50} ${gx} ${rowY[1] - 50} ${gx} ${rowY[1] - h / 2}`);
  paths.push(`M${gx} ${rowY[1] + h / 2}C${gx} ${rowY[1] + 50} ${colX[0]} ${rowY[2] - 50} ${colX[0]} ${rowY[2] - h / 2}`);
  paths.push(`M${gx} ${rowY[1] + h / 2}C${gx} ${rowY[1] + 50} ${colX[2]} ${rowY[2] - 50} ${colX[2]} ${rowY[2] - h / 2}`);
  paths.push(`M${colX[0]} ${rowY[2] + h / 2}C${colX[0]} ${rowY[2] + 50} ${gx} ${rowY[3] - 50} ${gx} ${rowY[3] - h / 2}`);

  // Pulses travel the longest routes, top to bottom.
  const routes = [
    `M${colX[0]} ${rowY[0]}V${rowY[3]}`,
    `M${colX[2]} ${rowY[0] + h / 2}C${colX[2]} ${rowY[0] + 50} ${gx} ${rowY[1] - 50} ${gx} ${rowY[1]}V${rowY[3]}`,
    `M${gx} ${rowY[0]}V${rowY[1]}C${gx} ${rowY[1] + 50} ${colX[0]} ${rowY[2] - 50} ${colX[0]} ${rowY[2]}C${colX[0]} ${rowY[2] + 50} ${gx} ${rowY[3] - 50} ${gx} ${rowY[3]}`,
    `M${colX[2]} ${rowY[1]}V${rowY[3]}`,
  ];
  const pulses = routes.map(
    (d, i) => html`<circle class="hx-pulse" r="3.2"><animateMotion dur="${5.5 + i * 0.9}s" begin="-${(i * 1.7).toFixed(1)}s" repeatCount="indefinite" path="${d}" keyPoints="0;1" keyTimes="0;1" calcMode="linear"/></circle>`,
  );

  return html`<figure class="hero-visual" data-hero-visual>
  <div class="hero-visual__bar">
    <span class="hero-visual__title"><span class="hero-visual__live" aria-hidden="true"></span>System architecture</span>
    <button class="hero-visual__pause" type="button" data-motion-toggle aria-pressed="false">${icon("pause", { className: "icon icon--pause" })}${icon("play", { className: "icon icon--play" })}<span class="sr-only">Pause animations</span></button>
  </div>
  <svg class="hero-visual__svg" viewBox="0 0 540 400" role="img" aria-labelledby="hx-title hx-desc">
    <title id="hx-title">Illustrative layered software architecture</title>
    <desc id="hx-desc">Four connected layers: experience (web, mobile, partner API), services (identity, API gateway, workflows), intelligence (retrieval, AI agents, evaluations), and data and cloud (event stream, warehouse, object store).</desc>
    <defs>
      <linearGradient id="hx-fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="currentColor" stop-opacity=".55"/>
        <stop offset="1" stop-color="currentColor" stop-opacity=".18"/>
      </linearGradient>
    </defs>
    <g class="hx-bands">${rowY.map((y) => `<rect x="8" y="${y - 34}" width="524" height="68" rx="12"/>`)}</g>
    ${labels}
    <g class="hx-links">${paths.map((d) => `<path d="${d}"/>`)}</g>
    <g class="hx-flow">${paths.map((d) => `<path d="${d}"/>`)}</g>
    ${nodes}
    <g class="hx-pulses">${pulses}</g>
  </svg>
  <figcaption class="hero-visual__caption">Illustrative architecture. Not a client system.</figcaption>
</figure>`;
}

/* --------------------------------------------------------------------------
   System diagrams for solution concepts and case studies.
   -------------------------------------------------------------------------- */
const D = { w: 136, h: 52, gx: 36, gy: 36, pad: 12 };
const nodeX = (c) => D.pad + c * (D.w + D.gx);
const nodeY = (r) => D.pad + r * (D.h + D.gy);

function edgePath(a, b) {
  const ax = nodeX(a.c);
  const ay = nodeY(a.r);
  const bx = nodeX(b.c);
  const by = nodeY(b.r);
  if (a.c === b.c) {
    // Vertical: bottom to top (or top to bottom).
    const down = b.r > a.r;
    const x = ax + D.w / 2;
    const y1 = down ? ay + D.h : ay;
    const y2 = down ? by - 4 : by + D.h + 4;
    const m = (y1 + y2) / 2;
    return `M${x} ${y1}C${x} ${m} ${x} ${m} ${x} ${y2}`;
  }
  const right = b.c > a.c;
  const x1 = right ? ax + D.w : ax;
  const x2 = right ? bx - 4 : bx + D.w + 4;
  const y1 = ay + D.h / 2;
  const y2 = by + D.h / 2;
  const m = (x1 + x2) / 2;
  return `M${x1} ${y1}C${m} ${y1} ${m} ${y2} ${x2} ${y2}`;
}

/** Decorative thumbnail: node blocks without text, for cards. */
function systemThumbnail(diagram, edges) {
  const width = D.pad * 2 + 4 * D.w + 3 * D.gx;
  const height = D.pad * 2 + diagram.rows * D.h + (diagram.rows - 1) * D.gy;
  return html`<div class="diagram diagram--thumb" aria-hidden="true">
    <svg class="diagram__svg" viewBox="0 0 ${width} ${height}" focusable="false">
      <g class="dg-edges">${edges.map((d) => `<path d="${d}"/>`)}</g>
      <g class="dg-flow">${edges.map((d) => `<path d="${d}"/>`)}</g>
      ${diagram.nodes.map((node) => {
        const x = nodeX(node.c);
        const y = nodeY(node.r);
        return html`<g class="dg-node dg-node--${node.kind}">
          <rect x="${x}" y="${y}" width="${D.w}" height="${D.h}" rx="12"/>
          <rect class="dg-bar" x="${x + 18}" y="${y + 17}" width="${D.w * 0.55}" height="7" rx="3.5"/>
          <rect class="dg-bar dg-bar--sub" x="${x + 18}" y="${y + 30}" width="${D.w * 0.35}" height="5" rx="2.5"/>
        </g>`;
      })}
    </svg>
  </div>`;
}

export function systemDiagram(diagram, { id, title, thumbnail = false }) {
  const byId = Object.fromEntries(diagram.nodes.map((node) => [node.id, node]));
  const width = D.pad * 2 + 4 * D.w + 3 * D.gx;
  const height = D.pad * 2 + diagram.rows * D.h + (diagram.rows - 1) * D.gy;
  const marker = `arrow-${id}`;
  const edges = diagram.edges.map(([from, to]) => {
    if (!byId[from] || !byId[to]) throw new Error(`Diagram ${id}: unknown edge ${from} → ${to}`);
    return edgePath(byId[from], byId[to]);
  });
  if (thumbnail) return systemThumbnail(diagram, edges);
  const summary = diagram.nodes.map((node) => node.label).join(", ");

  return html`<div class="diagram" data-reveal>
  <div class="diagram__scroll">
    <svg class="diagram__svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(`${title}: illustrative architecture with ${summary}.`)}">
      <defs><marker id="${marker}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="dg-arrow" d="M1 1 7 4 1 7"/></marker></defs>
      <g class="dg-edges">${edges.map((d) => `<path d="${d}" marker-end="url(#${marker})"/>`)}</g>
      <g class="dg-flow">${edges.map((d) => `<path d="${d}"/>`)}</g>
      ${diagram.nodes.map((node) => {
        const x = nodeX(node.c);
        const y = nodeY(node.r);
        return html`<g class="dg-node dg-node--${node.kind}">
          <rect x="${x}" y="${y}" width="${D.w}" height="${D.h}" rx="10"/>
          <text class="dg-label" x="${x + D.w / 2}" y="${y + 23}">${esc(node.label)}</text>
          ${node.sub ? html`<text class="dg-sub" x="${x + D.w / 2}" y="${y + 39}">${esc(node.sub)}</text>` : ""}
        </g>`;
      })}
    </svg>
  </div>
  <ul class="diagram__legend" role="list" aria-hidden="true">
    <li><span class="swatch swatch--user"></span>People and apps</li>
    <li><span class="swatch swatch--service"></span>Services</li>
    <li><span class="swatch swatch--ai"></span>AI and core logic</li>
    <li><span class="swatch swatch--data"></span>Data</li>
    <li><span class="swatch swatch--review"></span>Quality and oversight</li>
  </ul>
</div>`;
}

/* --------------------------------------------------------------------------
   Partnership responsibility model (HTML for responsive layout).
   -------------------------------------------------------------------------- */
export function partnershipModel() {
  const col = (title, label, items, accent) => html`<div class="pm-col${accent ? " pm-col--accent" : ""}">
    <p class="pm-col__label">${label}</p>
    <h3 class="pm-col__title">${title}</h3>
    <ul class="pm-col__list" role="list">${items.map((item) => html`<li>${icon("check")}<span>${item}</span></li>`)}</ul>
  </div>`;
  return html`<div class="pm" data-reveal>
    ${col("Your client", "End customer", ["Business goals and acceptance", "Feedback on delivered work", "Relationship with your firm"])}
    <div class="pm-link" aria-hidden="true"><span></span>${icon("arrow-right")}</div>
    ${col("Your firm", "Client relationship", ["Account and commercial ownership", "Product direction and priorities", "Client communication, under your brand"])}
    <div class="pm-link pm-link--both" aria-hidden="true"><span></span>${icon("refresh")}</div>
    ${col("Coastline Digital", "Engineering delivery", ["Engineering scope you assign", "Code quality, testing, and documentation", "Status reporting to your delivery lead"], true)}
  </div>`;
}
