import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = [
  'index.html', 'about.html', 'our-approach.html', 'programs-and-impact.html',
  'dyslexia.html', 'resources.html', 'family-community-toolkit.html', 'community-feedback.html', 'get-involved.html',
  'nondiscrimination-policy.html', 'tutorbird/index.html'
];

const urls = new Set();
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  for (const match of html.matchAll(/<a\b[^>]*href=["'](https?:\/\/[^"']+)["']/gi)) {
    urls.add(match[1].replaceAll('&amp;', '&'));
  }
}

const browserReviewedDomains = new Set([
  'dyslexiaida.org',
  'hi.dyslexiaida.org',
  'airtable.com'
]);

async function checkUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);
  const domain = new URL(url).hostname;
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LokahiConnectLinkReview/1.0)',
        Range: 'bytes=0-2047'
      },
      signal: controller.signal
    });
    if (response.ok || response.status === 206) return { status: 'PASS', code: response.status, url, finalUrl: response.url };
    if (browserReviewedDomains.has(domain) && [401, 403, 429].includes(response.status)) {
      return { status: 'MANUAL', code: response.status, url, finalUrl: response.url };
    }
    return { status: 'FAIL', code: response.status, url, finalUrl: response.url };
  } catch (error) {
    return { status: 'FAIL', code: error.name === 'AbortError' ? 'TIMEOUT' : 'ERROR', url, error: error.message };
  } finally {
    clearTimeout(timer);
  }
}

const queue = [...urls];
const results = [];
const workers = Array.from({ length: 6 }, async () => {
  while (queue.length) results.push(await checkUrl(queue.shift()));
});
await Promise.all(workers);
results.sort((a, b) => a.url.localeCompare(b.url));

for (const result of results) {
  const redirect = result.finalUrl && result.finalUrl !== result.url ? ` -> ${result.finalUrl}` : '';
  console.log(`${result.status} ${result.code} ${result.url}${redirect}`);
}

const failures = results.filter((result) => result.status === 'FAIL');
const manual = results.filter((result) => result.status === 'MANUAL');
console.log(`\nChecked ${results.length} unique external links: ${results.length - failures.length - manual.length} automated passes, ${manual.length} browser-reviewed anti-bot responses, ${failures.length} failures.`);
if (failures.length) process.exit(1);
