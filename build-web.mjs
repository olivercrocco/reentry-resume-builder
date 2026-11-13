// Builds the web version of the resume builder for sites with a strict
// Content-Security-Policy (script-src 'self'): the two inline scripts in
// resume-builder.html move into core.js and ui.js. The single file stays the
// source of truth and is copied alongside, so visitors can download it to use offline.
//
// Usage: node build-web.mjs [outDir]   (default: web)
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.argv[2] || "web";
const src = readFileSync("resume-builder.html", "utf8");

function take(id) {
  const re = new RegExp(`<script id="${id}">([\\s\\S]*?)<\\/script>`);
  const m = src.match(re);
  if (!m) throw new Error(`script #${id} not found`);
  return m;
}
const core = take("core");
const ui = take("ui");

let html = src
  .replace(core[0], '<script src="core.js"></script>')
  .replace(ui[0], '<script src="ui.js"></script>')
  .replace(
    /<footer class="no-print">([\s\S]*?)<\/footer>/,
    '<footer class="no-print">$1<br><a href="resume-builder.html" download>Download this tool</a> to use it without the internet, for example from a USB drive. ' +
      '<a href="https://github.com/olivercrocco/reentry-resume-builder">Source on GitHub</a>.</footer>'
  )
  .replace(
    "<title>Resume Builder</title>",
    '<title>Resume Builder</title>\n<meta name="description" content="A free resume builder for formerly incarcerated individuals. Works in the browser, saves nothing, and makes a Word file that hiring software can read.">'
  );

if (html.includes("<script>") || /<script id=/.test(html)) throw new Error("inline script left in web build");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "index.html"), html);
writeFileSync(join(outDir, "core.js"), core[1].trim() + "\n");
writeFileSync(join(outDir, "ui.js"), ui[1].trim() + "\n");
copyFileSync("resume-builder.html", join(outDir, "resume-builder.html"));
console.log(`Built ${outDir}/: index.html, core.js, ui.js, resume-builder.html`);
