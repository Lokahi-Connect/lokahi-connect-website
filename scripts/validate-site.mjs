import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const pages = [
  'index.html',
  'about.html',
  'our-approach.html',
  'programs-and-impact.html',
  'dyslexia.html',
  'resources.html',
  'family-community-toolkit.html',
  'community-feedback.html',
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

function localTarget(page, href) {
  const [rawPath, hash = ''] = href.split('#', 2);
  let target = rawPath.split('?', 1)[0];
  if (!target) target = page;
  else if (target.startsWith('/')) target = target.slice(1);
  else target = path.posix.normalize(path.posix.join(path.posix.dirname(page), target));
  if (target.endsWith('/')) target += 'index.html';
  return { target, hash };
}

for (const page of pages) {
  const absolutePath = path.join(repoRoot, page);
  check(fs.existsSync(absolutePath), `${page}: page is missing`);
  if (!fs.existsSync(absolutePath)) continue;
  const html = fs.readFileSync(absolutePath, 'utf8');
  contents.set(page, html);

  check(occurrences(html, /<h1\b/gi) === 1, `${page}: expected exactly one h1`);
  check(occurrences(html, /<main\b/gi) === 1, `${page}: expected exactly one main`);
  check(occurrences(html, /class=["'][^"']*\bskip-link\b[^"']*["']/gi) === 1, `${page}: expected exactly one skip link`);
  check(occurrences(html, /aria-current=["'](?:page|location)["']/gi) === 1, `${page}: expected exactly one current-page or current-location marker`);
  if (page === 'family-community-toolkit.html') {
    check(/href=["']resources\.html["'][^>]*aria-current=["']location["']/i.test(html), `${page}: Resources must be identified as the current section location`);
  } else {
    check(occurrences(html, /aria-current=["']page["']/gi) === 1, `${page}: expected exactly one current-page marker`);
  }
  check(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']https:\/\/www\.lokahiconnect\.org\//i.test(html), `${page}: canonical URL is missing`);
  check(/<meta\b[^>]*property=["']og:title["']/i.test(html), `${page}: Open Graph title is missing`);
  check(/<meta\b[^>]*property=["']og:description["']/i.test(html), `${page}: Open Graph description is missing`);
  check(/<meta\b[^>]*name=["']twitter:card["']/i.test(html), `${page}: Twitter card metadata is missing`);

  const nav = html.match(/<nav\b[^>]*aria-label=["']Primary navigation["'][\s\S]*?<\/nav>/i)?.[0] ?? '';
  const footer = html.match(/<footer\b[\s\S]*?<\/footer>/i)?.[0] ?? '';
  check(/class=["'][^"']*\bnav-toggle\b/i.test(nav) && /aria-controls=["']primary-navigation["']/i.test(nav), `${page}: mobile navigation control is missing`);
  for (const label of ['Home', 'About', 'Our Approach', 'Programs', 'Dyslexia', 'Resources', 'Parent Portal', 'Get Involved']) {
    check(nav.includes(`>${label}</a>`), `${page}: primary navigation is missing ${label}`);
  }
  check(/>Community Feedback<\/a>/i.test(footer), `${page}: footer Community Feedback link is missing`);
  check(!/english-orthography\.netlify\.app|>\s*Presentation\s*<\/a>/i.test(html), `${page}: removed presentation link remains`);
  check(/<script\b[^>]*src=["'](?:\.\.\/)?site-navigation\.js\?v=20260820-1["']/i.test(html), `${page}: shared navigation script is missing`);
  check(/<link\b[^>]*href=["'](?:\.\.\/)?_shared\.css\?v=20260820-5["']/i.test(html), `${page}: current shared stylesheet is missing`);
  check(/<link\b[^>]*rel=["']icon["'][^>]*href=["']\/favicon\.svg["'][^>]*type=["']image\/svg\+xml["']/i.test(html), `${page}: SVG favicon link is missing`);
  check(/<meta\b[^>]*name=["']theme-color["'][^>]*content=["']#0D5A8A["']/i.test(html), `${page}: browser theme color is missing`);
  check(html.includes(page === 'index.html' ? 'class="hero-visual"' : 'class="page-visual-shell"'), `${page}: page visual is missing`);

  for (const imageTag of html.matchAll(/<img\b[^>]*>/gi)) {
    check(/\balt=["'][^"']+["']/i.test(imageTag[0]), `${page}: image needs meaningful alternative text`);
  }
  for (const assetMatch of html.matchAll(/<(?:img|source)\b[^>]*(?:src|srcset)=["']([^"']+)["']/gi)) {
    const asset = assetMatch[1].trim().split(/\s+/, 1)[0];
    if (/^(?:https?:|data:)/i.test(asset)) continue;
    const { target } = localTarget(page, asset);
    check(fs.existsSync(path.join(repoRoot, target)), `${page}: local image asset does not exist: ${asset}`);
  }
  for (const match of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const href = match[1];
    if (/^(?:https?:|mailto:|tel:|javascript:)/i.test(href)) continue;
    const { target, hash } = localTarget(page, href);
    const targetPath = path.join(repoRoot, target);
    check(fs.existsSync(targetPath), `${page}: local link target does not exist: ${href}`);
    if (hash && fs.existsSync(targetPath) && target.endsWith('.html')) {
      const targetHtml = target === page ? html : fs.readFileSync(targetPath, 'utf8');
      check(new RegExp(`\\bid=["']${hash.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i').test(targetHtml), `${page}: local anchor does not exist: ${href}`);
    }
  }
}

const allHtml = [...contents.values()].join('\n');
for (const pattern of [
  /Word Origins\s*(?:&amp;|&)\s*Roots Discovery/i,
  /consistent sequence/i,
  /stable conceptual order/i,
  /conceptual order stays stable/i,
  />\s*The Sequence\s*</i,
  /wordworkskingston\.com/i,
  /\$2\.2T/i,
  /In 2022, 33%/i
]) check(!pattern.test(allHtml), `forbidden or superseded wording remains: ${pattern}`);

const home = contents.get('index.html') ?? '';
for (const text of ['Start with what brought you here', 'Maui, Hawaiʻi · Online', '31%', '28%', 'Launch Student Lab']) {
  check(home.includes(text), `homepage required content is missing: ${text}`);
}
check(home.includes('https://lokahi-connect.github.io/lokahi-word-project-student-lab/'), 'homepage Student Lab destination is incorrect');

const programs = contents.get('programs-and-impact.html') ?? '';
for (const text of ['id="current-availability"', 'id="student-learning"', 'id="educator-learning"', 'id="digital-resources"', 'id="events"', 'id="service-inquiry"', 'id="email-updates"', 'id="service-inquiry-form"', 'id="updates-request-form"', 'Bainbridge Island, Washington', 'Maui, Hawaiʻi', 'Remote and online access', 'No public events are currently listed', 'this website does not save or send your answers']) {
  check(programs.includes(text), `programs required content is missing: ${text}`);
}
check(!/<span class="score-val">[123]<\/span>/.test(programs), 'program evidence cards must not look like numerical scores');
check(!/<form\b[^>]*\baction=/i.test(programs), 'program inquiry forms must not submit to an undisclosed endpoint');
check(/programs-connect\.js\?v=20260820-2/.test(programs), 'program inquiry and update-request script is missing');
for (const text of ['learners of all ages', '30 minutes for $75', '50 minutes for $120', 'comprehensive profile and written service plan is $425', 'name="first_name"', 'name="last_name"', 'Subscriber records retain only']) {
  check(programs.includes(text), `program availability, pricing, or subscriber control is missing: ${text}`);
}

const about = contents.get('about.html') ?? '';
for (const text of ['id="leadership"', 'id="our-story"', 'Founder and Executive Director', 'CERI and NILD certifications', 'serves on the Board of Directors for the Washington State Branch of the International Dyslexia Association', 'https://www.wabida.org/about-us', 'assets/stephanie-steinshouer-headshot.jpg', 'Portrait of Stephanie Steinshouer']) {
  check(about.includes(text), `about page leadership or history content is missing: ${text}`);
}

const dyslexia = contents.get('dyslexia.html') ?? '';
for (const text of ['id="family-next-steps"', 'Continue with trusted sources and further research', 'https://doi.org/10.31234/osf.io/aktzw', 'At Lokahi Connect, we use these four question areas']) {
  check(dyslexia.includes(text), `dyslexia required content is missing: ${text}`);
}
check(dyslexia.includes('programs-and-impact.html#service-inquiry'), 'dyslexia page early support action is missing');

const approach = contents.get('our-approach.html') ?? '';
check(approach.includes('programs-and-impact.html#current-availability'), 'approach page early opportunity action is missing');

const resources = contents.get('resources.html') ?? '';
for (const text of ['id="family-community-toolkit"', 'family-community-toolkit.html', 'id="screening-evaluation"', 'id="washington"', 'id="hawaii"', 'id="maui"', 'id="swi-research"', 'last reviewed August 21, 2026']) {
  check(resources.includes(text), `resources required content is missing: ${text}`);
}
check(resources.includes('programs-and-impact.html#service-inquiry'), 'resources page early support action is missing');

const toolkit = contents.get('family-community-toolkit.html') ?? '';
for (const text of [
  'id="start-here"',
  'id="notice"',
  'id="prepare"',
  'id="understand"',
  'id="support-now"',
  'id="local-help"',
  'id="teen-adult"',
  'id="learn-together"',
  'id="community-voice"',
  'School Conversation Kit',
  'Screening does not diagnose dyslexia',
  'Guidance verified August 21, 2026',
  'child, adolescent, or adult',
  'does not provide crisis response',
  'Family &amp; Community Toolkit'
]) {
  check(toolkit.includes(text), `family toolkit required content is missing: ${text}`);
}
for (const href of [
  'resources.html#screening-evaluation',
  'community-feedback.html',
  'programs-and-impact.html#service-inquiry',
  'get-involved.html',
  'https://sites.ed.gov/idea/regs/b/d',
  'https://ospi.k12.wa.us/student-success/special-education/family-engagement-and-guidance/making-referral-special-education',
  'https://hawaiipublicschools.org/school-services/does-my-child-have-a-disability-child-find/',
  'https://www.ed.gov/higher-education/students-disabilities-preparing-postsecondary-education',
  'https://988lifeline.org/get-help/'
]) {
  check(toolkit.includes(`href="${href}"`), `family toolkit required destination is missing: ${href}`);
}
check(!/<form\b/i.test(toolkit), 'family toolkit must not collect learner or family information');
check(!/guaranteed results|diagnostic quiz|symptom score/i.test(toolkit), 'family toolkit contains prohibited diagnostic or outcome language');

const questionnaire = contents.get('community-feedback.html') ?? '';
for (const text of ['community-feedback-form', 'overlooked', 'contact_permission', 'quote_permission', 'does not save these responses', 'not for emergencies']) {
  check(questionnaire.includes(text), `questionnaire required control or boundary is missing: ${text}`);
}
check(/community-feedback\.js\?v=20260820-2/.test(questionnaire), 'questionnaire script is missing');

const policy = contents.get('nondiscrimination-policy.html') ?? '';
check(/id=["']reporting["']/.test(policy), 'policy reporting anchor is missing');
check(/<button\b[^>]*class=["']ra-launch["'][^>]*disabled/i.test(policy), 'policy narration control must start disabled pending audio verification');

const portal = contents.get('tutorbird/index.html') ?? '';
for (const text of ['https://www.tutorbird.com/privacy-policy/', "frame.title = 'Tutorbird parent portal login'", "frame.setAttribute('aria-label', 'Tutorbird parent portal login')", 'portal-accessibility-help', 'MutationObserver']) {
  check(portal.includes(text), `Parent Portal control is missing: ${text}`);
}

for (const file of ['robots.txt', 'sitemap.xml', 'docs/reviews/EXTERNAL-LINK-REVIEW-2026-08-20.md', 'docs/reviews/EXTERNAL-LINK-REVIEW-2026-08-21.md']) {
  check(fs.existsSync(path.join(repoRoot, file)), `required publication artifact is missing: ${file}`);
}
const sitemap = fs.readFileSync(path.join(repoRoot, 'sitemap.xml'), 'utf8');
for (const page of pages) {
  const url = page === 'index.html' ? 'https://www.lokahiconnect.org/' : `https://www.lokahiconnect.org/${page.replace('index.html', '')}`;
  check(sitemap.includes(`<loc>${url}</loc>`), `sitemap is missing ${url}`);
}

const navScript = fs.readFileSync(path.join(repoRoot, 'site-navigation.js'), 'utf8');
for (const behavior of ['Escape', 'data-nav-ready', 'data-nav-open', 'aria-expanded', 'toggle.focus()', "closest('a')"]) {
  check(navScript.includes(behavior), `site-navigation.js: expected behavior is missing: ${behavior}`);
}
const feedbackScript = fs.readFileSync(path.join(repoRoot, 'community-feedback.js'), 'utf8');
for (const behavior of ['validateGroups', 'validateContact', 'buildCommunityFeedbackEmail', 'navigator.clipboard', 'mailto:info@lokahiconnect.org']) {
  check(feedbackScript.includes(behavior), `community-feedback.js: expected behavior is missing: ${behavior}`);
}
const programsConnectScript = fs.readFileSync(path.join(repoRoot, 'programs-connect.js'), 'utf8');
for (const behavior of ['buildServiceInquiryEmail', 'buildEmailUpdatesRequest', 'navigator.clipboard', 'mailto:', '.js-inquiry-interest', 'First name:', 'Last name:', 'Signup source: Website email request']) {
  check(programsConnectScript.includes(behavior), `programs-connect.js: expected privacy-conscious behavior is missing: ${behavior}`);
}

if (errors.length) {
  console.error(`Site validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Site validation passed for ${pages.length} pages.`);
console.log('Verified structure, navigation, metadata, local links and anchors, claim corrections, source boundaries, questionnaire controls, sitemap, and Parent Portal controls.');
