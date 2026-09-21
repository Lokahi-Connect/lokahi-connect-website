import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const source = fs.readFileSync(fileURLToPath(new URL('../services-contact.js', import.meta.url)), 'utf8');
function fixture({ valid = true, clipboard = 'ok' } = {}) {
  const listeners = {};
  const elements = Object.fromEntries(Object.entries({ adult_name: '  TEST — Adult & inquiry  ', email: '  test@example.org  ', interest: 'Not sure yet', message: 'What about reading? A+B & C\nTwo lines.' }).map(([name, value]) => [name, { value }]));
  const form = { elements, reportValidity: () => valid, addEventListener: (name, fn) => { listeners[name] = fn; } };
  const status = { textContent: '' };
  const copyButton = { hidden: true, addEventListener: (_name, fn) => { listeners.copy = fn; } };
  const copyPanel = { hidden: true };
  const copyArea = { value: '', focus() { this.focused = true; }, select() { this.selected = true; } };
  const ids = { 'remote-inquiry-form': form, 'remote-inquiry-status': status, 'copy-remote-inquiry': copyButton, 'remote-copy-message': copyArea, 'remote-copy-panel': copyPanel };
  let copied;
  const navigator = clipboard === 'missing' ? {} : { clipboard: { writeText: async text => { if (clipboard === 'denied') throw new Error('Permission denied'); copied = text; } } };
  const window = { location: { href: '' } };
  vm.runInNewContext(source, { document: { getElementById: id => ids[id] }, navigator, window, Date, encodeURIComponent });
  return { listeners, window, status, copyArea, copyPanel, copied: () => copied };
}
const event = { preventDefault() {} };
for (const action of ['submit', 'copy']) {
  const blocked = fixture({ valid: false });
  blocked.listeners[action](event);
  assert.equal(blocked.window.location.href, '');
  assert.equal(blocked.copied(), undefined);
}
const inquiry = fixture();
inquiry.listeners.submit(event);
const uri = new URL(inquiry.window.location.href);
assert.equal(uri.protocol, 'mailto:');
assert.equal(uri.pathname, 'stephanie@lokahiconnect.org');
assert.match(uri.searchParams.get('body'), /Adult contact name: TEST — Adult & inquiry\n/);
assert.match(uri.searchParams.get('body'), /Reply email: test@example.org\n/);
assert.match(uri.searchParams.get('body'), /What about reading\? A\+B & C\nTwo lines\./);
assert.match(uri.searchParams.get('body'), /No marketing subscription requested/);
assert.match(uri.searchParams.get('body'), /Follow-up for Stephanie:/);
assert.match(inquiry.status.textContent, /has not been sent/);
const copied = fixture();
copied.listeners.copy();
await new Promise(resolve => setImmediate(resolve));
assert.match(copied.copied(), /^To: stephanie@lokahiconnect.org/);
assert.match(copied.status.textContent, /Nothing has been sent yet/);
for (const clipboard of ['missing', 'denied']) {
  const fallback = fixture({ clipboard });
  fallback.listeners.copy();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(fallback.copyPanel.hidden, false);
  assert.equal(fallback.copyArea.focused, true);
  assert.equal(fallback.copyArea.selected, true);
  assert.match(fallback.copyArea.value, /^To: stephanie@lokahiconnect.org/);
  assert.match(fallback.status.textContent, /Nothing has been sent yet/);
}
const html = fs.readFileSync(fileURLToPath(new URL('../services.html', import.meta.url)), 'utf8');
assert.match(html, /name="contact_consent"[^>]*required/);
assert.match(html, /id="reply-email"[^>]*type="email"[^>]*required/);
assert.match(html, /id="general-message"[^>]*maxlength="600"/);
assert.doesNotMatch(source, /\bfetch\s*\(|XMLHttpRequest|localStorage|sessionStorage/);
console.log('Services contact checks passed: invalid-form gate, URI-safe message, exact recipient, consent/follow-up content, truthful status, and clipboard-denial recovery.');
console.log('These isolated JavaScript/source checks do not verify a browser email client, Airtable public form, or email delivery.');
