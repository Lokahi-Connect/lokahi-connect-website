import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const baseCommit = '3c75ba4a9132ec6803bd26016f193d5120c3d07e';
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const pages = [
  'index.html',
  'our-approach.html',
  'programs-and-impact.html',
  'dyslexia.html',
  'get-involved.html',
  'nondiscrimination-policy.html',
  'tutorbird/index.html'
];

const errors = [];
const contents = new Map();

function check(condition, message) {
  if (!condition) errors.push(message);
}

function occurrences(text, pattern) {
  return [...text.matchAll(pattern)].length;
}

function mailtoTargets(text) {
  return new Set([...text.matchAll(/href=["'](mailto:[^"']+)["']/gi)].map((match) => match[1]));
}

function sameSet(left, right) {
  return left.size === right.size && [...left].every((item) => right.has(item));
}

for (const page of pages) {
  const absolutePath = path.join(repoRoot, page);
  const html = fs.readFileSync(absolutePath, 'utf8');
  contents.set(page, html);

  check(occurrences(html, /<h1\b/gi) === 1, `${page}: expected exactly one h1`);
  check(occurrences(html, /<main\b/gi) === 1, `${page}: expected exactly one main`);
  check(occurrences(html, /class=["'][^"']*\bskip-link\b[^"']*["']/gi) === 1, `${page}: expected exactly one skip link`);

  const nav = html.match(/<nav\b[\s\S]*?<\/nav>/i)?.[0] ?? '';
  const footer = html.match(/<footer\b[\s\S]*?<\/footer>/i)?.[0] ?? '';
  check(/<nav\b[^>]*aria-label=["']Primary navigation["']/i.test(nav), `${page}: primary nav needs an accessible name`);
  check(/<button\b[^>]*class=["'][^"']*\bnav-toggle\b[^"']*["'][^>]*aria-expanded=["']false["'][^>]*aria-controls=["']primary-navigation["']/i.test(nav), `${page}: mobile menu toggle wiring is missing`);
  check(/<ul\b[^>]*class=["'][^"']*\bnav-links\b[^"']*["'][^>]*id=["']primary-navigation["']/i.test(nav), `${page}: primary navigation id is missing`);
  check(/<a\b[^>]*href=["']\/tutorbird\/["'][^>]*>Parent Portal<\/a>/i.test(nav), `${page}: header Parent Portal must retain /tutorbird/`);
  check(/<a\b[^>]*href=["']\/tutorbird\/["'][^>]*>Tutorbird<\/a>/i.test(footer), `${page}: footer Tutorbird label/path must remain`);
  check(occurrences(html, /aria-current=["']page["']/gi) === 1, `${page}: expected exactly one current-page marker`);
  check(/<script\b[^>]*src=["'](?:\.\.\/)?site-navigation\.js\?v=20260820-1["']/i.test(html), `${page}: versioned shared navigation script is missing`);
  check(/<link\b[^>]*href=["'](?:\.\.\/)?_shared\.css\?v=20260820-2["']/i.test(html), `${page}: versioned shared stylesheet is missing`);

  const baseHtml = execFileSync('git', ['show', `${baseCommit}:${page}`], { cwd: repoRoot, encoding: 'utf8' });
  check(sameSet(mailtoTargets(html), mailtoTargets(baseHtml)), `${page}: mailto target set changed`);

  for (const match of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const href = match[1];
    if (/^(?:https?:|mailto:|tel:|#)/i.test(href)) continue;
    let target = href.split(/[?#]/, 1)[0];
    if (!target) continue;
    if (target.startsWith('/')) {
      target = target.slice(1);
    } else {
      target = path.posix.normalize(path.posix.join(path.posix.dirname(page), target));
    }
    if (target.endsWith('/')) target += 'index.html';
    check(fs.existsSync(path.join(repoRoot, target)), `${page}: local link target does not exist: ${href}`);
  }
}

const allHtml = [...contents.values()].join('\n');
const forbiddenPhrases = [
  /Word Origins\s*(?:&amp;|&)\s*Roots Discovery/i,
  /consistent sequence/i,
  /stable conceptual order/i,
  /conceptual order stays stable/i,
  />\s*The Sequence\s*</i,
  /word sums(?:,|\s)+and word matrices developed by Bowers/i,
  /Four Questions(?:,|\s)+and word sums developed by Bowers/i
];
for (const pattern of forbiddenPhrases) {
  check(!pattern.test(allHtml), `forbidden wording remains: ${pattern}`);
}

const home = contents.get('index.html');
check(home.includes('Research-informed literacy · Bainbridge Island, WA · Hawaiʻi'), 'homepage Hawaiʻi tag is missing or changed');

const programs = contents.get('programs-and-impact.html');
check(programs.includes('Lokahi Connect’s work is rooted in Bainbridge Island, Washington, and Hawaiʻi, with additional access through remote services and online tools. Program formats and availability vary; contact us for current information.'), 'programs location statement is missing or changed');
for (const label of ['Bainbridge Island, Washington', 'Hawaiʻi', 'Remote and online access']) {
  check(programs.includes(label), `programs location label is missing: ${label}`);
}

const navScript = fs.readFileSync(path.join(repoRoot, 'site-navigation.js'), 'utf8');
for (const behavior of ['Escape', 'data-nav-ready', 'data-nav-open', 'aria-expanded', 'toggle.focus()', "closest('a')"]) {
  check(navScript.includes(behavior), `site-navigation.js: expected behavior is missing: ${behavior}`);
}

const portal = contents.get('tutorbird/index.html');
for (const portalControl of ['app.tutorbird.com/Website/', "frame.title = 'Tutorbird parent portal login'", "frame.setAttribute('aria-label', 'Tutorbird parent portal login')", "frame.setAttribute('aria-describedby', 'portal-accessibility-help')", 'id="portal-accessibility-help"', 'MutationObserver', 'if (!recognizePortalFrame() && loading)']) {
  check(portal.includes(portalControl), `tutorbird/index.html: portal control is missing: ${portalControl}`);
}

if (errors.length) {
  console.error(`Site validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Site validation passed for ${pages.length} pages.`);
console.log('Verified structure, navigation, local links, mailto targets, governance wording, Hawaiʻi copy, and Parent Portal controls.');
