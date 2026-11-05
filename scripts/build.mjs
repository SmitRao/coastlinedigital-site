#!/usr/bin/env node
/**
 * Static site build. No dependencies.
 *
 *   node scripts/build.mjs          Render pages, CSS, JS, sitemap, llms.txt
 *   node scripts/build.mjs --check  Exit 1 if committed output is out of date
 *
 * Output is written to the repository root, which Render publishes as-is, so
 * deployment needs no build step. Commit the generated files.
 */
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const CHECK = process.argv.includes("--check");
// Bump when site content changes meaningfully; used for sitemap <lastmod>.
const SITE_UPDATED = "2026-11-05";

const outputs = new Map(); // relative path -> contents

const hash = (text) => createHash("sha256").update(text).digest("hex").slice(0, 10);

async function buildCss() {
  const order = ["tokens.css", "base.css", "layout.css", "components.css", "sections.css", "pages.css"];
  const parts = await Promise.all(order.map((f) => readFile(join(SRC, "styles", f), "utf8")));
  const banner = "/* Coastline Digital. Generated from src/styles by scripts/build.mjs. Do not edit directly. */\n";
  const css =
    banner +
    parts
      .join("\n")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\n\s*\n+/g, "\n")
      .trim() +
    "\n";
  outputs.set("styles.css", css);
  return hash(css);
}

async function buildJs() {
  const js = await readFile(join(SRC, "scripts", "main.js"), "utf8");
  const out = "/* Coastline Digital. Generated from src/scripts/main.js. Do not edit directly. */\n" + js;
  outputs.set("main.js", out);
  return hash(out);
}

async function loadPages() {
  const dir = join(SRC, "pages");
  const files = (await readdir(dir)).filter((f) => f.endsWith(".mjs")).sort();
  const pages = [];
  for (const file of files) {
    const mod = await import(pathToFileURL(join(dir, file)).href);
    pages.push(...[].concat(mod.default));
  }
  const seen = new Set();
  for (const p of pages) {
    if (seen.has(p.path)) throw new Error(`Duplicate page path: ${p.path}`);
    seen.add(p.path);
  }
  return pages;
}

function outputPath(page) {
  if (page.output) return page.output;
  return page.path === "/" ? "index.html" : `${page.path.replace(/^\//, "")}index.html`;
}

function sitemap(pages, site) {
  const urls = pages
    .filter((p) => p.sitemap !== false && !p.noindex)
    .sort((a, b) => (b.priority ?? 0.5) - (a.priority ?? 0.5) || a.path.localeCompare(b.path))
    .map(
      (p) => `  <url>
    <loc>${site.url}${p.path}</loc>
    <lastmod>${p.lastmod ?? SITE_UPDATED}</lastmod>
    <changefreq>${p.changefreq ?? "monthly"}</changefreq>
    <priority>${(p.priority ?? 0.5).toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function llmsTxt(site) {
  const { services } = await import(pathToFileURL(join(SRC, "content", "services.mjs")).href);
  const { engagementModels, process } = await import(pathToFileURL(join(SRC, "content", "company.mjs")).href);
  const { solutions } = await import(pathToFileURL(join(SRC, "content", "solutions.mjs")).href);
  return `# ${site.name}
> ${site.description}

${site.positioning}

## Services
${services.map((s) => `- ${s.longName ?? s.name}: ${s.summary} ${site.url}${s.href}`).join("\n")}

## Engagement models
${engagementModels.map((m) => `- ${m.name}: ${m.tagline} ${m.bestFor}`).join("\n")}
- Engineering partnerships for agencies and consulting firms: ${site.url}/partnerships/

## How we work
${process.map((p) => `- ${p.name}: ${p.summary}`).join("\n")}

## Company information
- Brand name: ${site.name}
- Category: software engineering and AI consulting company
- Location: ${site.locality}, ${site.region}
- Team: an international team of experienced engineering professionals
- Email: ${site.email}

## Solution concepts
- ${site.url}/solutions/ presents illustrative solution concepts (${solutions
    .filter((s) => s.type === "concept")
    .map((s) => s.title.toLowerCase())
    .join("; ")}).
- These concepts are not client engagements, endorsements, or reported results.

## Pages
- Home: ${site.url}/
- Services: ${site.url}/services/
- Solutions: ${site.url}/solutions/
- Engineering partnerships: ${site.url}/partnerships/
- How we work: ${site.url}/how-we-work/
- About: ${site.url}/about/
- Contact: ${site.url}/contact/
- Careers: ${site.url}/careers/
- FAQ: ${site.url}/faq/
- Privacy: ${site.url}/privacy/
`;
}

async function main() {
  const { assetVersions, page: renderPage } = await import(pathToFileURL(join(SRC, "components", "layout.mjs")).href);
  const { site } = await import(pathToFileURL(join(SRC, "site.mjs")).href);

  assetVersions["styles.css"] = await buildCss();
  assetVersions["main.js"] = await buildJs();

  const pages = await loadPages();
  for (const p of pages) outputs.set(outputPath(p), renderPage(p));
  outputs.set("sitemap.xml", sitemap(pages, site));
  const llms = await llmsTxt(site);
  outputs.set("llms.txt", llms);
  outputs.set("ai.txt", llms);

  const stale = [];
  for (const [rel, contents] of outputs) {
    const file = join(ROOT, rel);
    let current = null;
    try {
      current = await readFile(file, "utf8");
    } catch {}
    if (current === contents) continue;
    if (CHECK) {
      stale.push(rel);
      continue;
    }
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, contents);
  }

  if (CHECK) {
    if (stale.length) {
      console.error(`Generated files are out of date. Run npm run build.\n  ${stale.join("\n  ")}`);
      process.exit(1);
    }
    console.log(`Build output is up to date (${outputs.size} files).`);
  } else {
    console.log(`Built ${pages.length} pages and ${outputs.size - pages.length} supporting files.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
