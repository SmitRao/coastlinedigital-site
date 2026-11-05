#!/usr/bin/env node
/**
 * Site checks. No dependencies.
 *   node scripts/check.mjs
 * Verifies that generated output is current, then checks every page for
 * SEO basics, heading structure, image alt text, structured data, and
 * internal links and anchors. Exits 1 on any failure.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://coastlinedigital.net";
const errors = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);

try {
  execFileSync(process.execPath, [join(ROOT, "scripts/build.mjs"), "--check"], { stdio: "pipe" });
} catch (err) {
  errors.push(String(err.stderr || err.message).trim());
}

const SKIP = new Set(["node_modules", ".git", "src", "scripts", "media", "assets", "campaigns"]);
function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (SKIP.has(name)) return [];
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name.endsWith(".html") ? [full] : [];
  });
}

const redirects = [...readFileSync(join(ROOT, "render.yaml"), "utf8").matchAll(/type: redirect\s+source: (\S+)/g)].map((m) => m[1]);
const files = htmlFiles(ROOT);
const pages = new Map();
for (const file of files) {
  const html = readFileSync(file, "utf8");
  const rel = relative(ROOT, file);
  const urlPath = "/" + rel.replace(/index\.html$/, "");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  pages.set(urlPath, { file: rel, html, ids });
}

const titles = new Map();
const descriptions = new Map();
for (const [path, { file, html }] of pages) {
  const noindex = html.includes('name="robots" content="noindex"');
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title) fail(file, "missing <title>");
  if (!desc) fail(file, "missing meta description");
  if (title && title.length > 95) fail(file, `title is ${title.length} characters`);
  if (desc && (desc.length < 70 || desc.length > 160) && !noindex) fail(file, `description is ${desc.length} characters`);
  if (!noindex) {
    if (titles.has(title)) fail(file, `duplicate title with ${titles.get(title)}`);
    if (descriptions.has(desc)) fail(file, `duplicate description with ${descriptions.get(desc)}`);
    titles.set(title, file);
    descriptions.set(desc, file);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (canonical !== SITE + path) fail(file, `canonical ${canonical} does not match ${SITE + path}`);
  }
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length !== 1) fail(file, `${h1s.length} <h1> elements`);
  if (!/<html lang="en">/.test(html)) fail(file, "missing lang attribute");
  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt="/.test(img)) fail(file, `image without alt: ${img.slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(img) || !/\sheight="\d+"/.test(img)) fail(file, `image without dimensions: ${img.slice(0, 80)}`);
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      fail(file, "invalid JSON-LD");
    }
  }
  if (/href="#"/.test(html)) fail(file, 'placeholder link href="#"');

  // Internal links and anchors.
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    let ref = m[1].replace(/&amp;/g, "&");
    if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
    const [pathAndQuery, hash] = ref.split("#");
    const target = pathAndQuery.split("?")[0] || path;
    if (redirects.some((r) => target === r || target === r + "/" || (r.endsWith("/*") && target.startsWith(r.slice(0, -1))))) continue;
    const page = pages.get(target);
    if (!page) {
      const asset = join(ROOT, target);
      if (!existsSync(asset)) fail(file, `broken link ${ref}`);
      continue;
    }
    if (hash && !page.ids.has(hash)) fail(file, `missing anchor ${ref}`);
  }
}

// Sitemap entries must resolve to indexable pages.
const sitemap = readFileSync(join(ROOT, "sitemap.xml"), "utf8");
for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const path = m[1].replace(SITE, "");
  if (!pages.has(path)) fail("sitemap.xml", `no page for ${m[1]}`);
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log(`✓ ${pages.size} pages checked: output current, metadata, headings, images, JSON-LD, links, and sitemap.`);
