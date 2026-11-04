import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../site-analytics.js', import.meta.url), 'utf8');
function harness(initial, storageBlocked = false, options = {}) {
  const listeners = {};
  let saved = initial;
  let script;
  const noop = () => {};
  const document = {
    referrer: options.referrer || '',
    currentScript: {src:'https://www.lokahiconnect.org/site-analytics.js'},
    readyState:'complete',
    querySelector: () => script,
    querySelectorAll: () => [],
    getElementById: () => null,
    createElement: () => ({setAttribute:noop,querySelector:() => ({addEventListener:noop})}),
    head:{appendChild: node => {script = node;}},
    body:{appendChild:noop},
    addEventListener: (type, callback) => {listeners[type] = callback;}
  };
  const window = {
    localStorage: {
      getItem:() => {if(storageBlocked) throw Error('storage unavailable'); return saved;},
      setItem:(_key,value) => {if(storageBlocked) throw Error('storage unavailable'); saved=value;}
    },
    sessionStorage: {
      getItem:() => options.startedAt || null,
      setItem:(_key,value) => { options.startedAt = value; },
      removeItem:() => { options.startedAt = null; }
    },
    location:{href:'https://www.lokahiconnect.org/services.html?private=omit',origin:'https://www.lokahiconnect.org',pathname:options.pathname || '/services.html',search:''},
    dispatchEvent:noop
  };
  vm.runInNewContext(source,{window,document,URL,URLSearchParams,CustomEvent:class{},Date});
  return {
    window,
    click:href=>listeners.click({target:{closest:()=>({href})}}),
    events:()=>window.dataLayer.filter(args=>args[0]==='event'),
    script:()=>script
  };
}
const form='https://airtable.com/appEDbkXoKtlrJPSR/pagRy0ILKrkFzxKR2/form';
const h=harness('denied');
h.click(form); assert.equal(h.events().length,0); assert.equal(h.script(),undefined);
h.window.LokahiAnalytics.setConsent('granted');
h.click(form); assert.equal(h.events().length,1);
assert.equal(h.events()[0][1],'service_inquiry_click');
assert.equal(h.events()[0][2].contact_method,'airtable_form');
assert.equal(h.events()[0][2].page_location,'https://www.lokahiconnect.org/services.html');
h.click('mailto:stephanie@lokahiconnect.org?subject=Remote%20services%20inquiry&body=PRIVATE');
assert.equal(h.events()[1][2].contact_method,'email');
assert.ok(!JSON.stringify(h.events()).includes('PRIVATE'));
h.click('mailto:stephanie@lokahiconnect.org?subject=Qualification%20documentation');
h.click('https://airtable.com/another/form');
h.click('https://www.instagram.com/lokahiconnect/');
assert.equal(h.events().length,2);
h.window.LokahiAnalytics.setConsent('denied'); h.click(form); assert.equal(h.events().length,2);
h.window.LokahiAnalytics.setConsent('granted'); h.click(form); assert.equal(h.events().length,3);
const consentUpdates=h.window.dataLayer.filter(args=>args[0]==='consent'&&args[1]==='update');
assert.equal(consentUpdates.at(-1)[2].analytics_storage,'granted');
const blocked=harness(null,true); blocked.click(form); assert.equal(blocked.events().length,0);
blocked.window.LokahiAnalytics.setConsent('granted'); blocked.click(form); assert.equal(blocked.events().length,1);
blocked.window.LokahiAnalytics.setConsent('denied'); blocked.click(form); assert.equal(blocked.events().length,1);
console.log('Inquiry analytics: consent, revocation/re-grant, unavailable storage, exact destinations and data minimization passed.');

const returned = {pathname:'/inquiry-received.html',referrer:'https://airtable.com/',startedAt:String(Date.now()-1000)};
const completion = harness('granted',false,returned);
assert.equal(completion.events()[0][1],'service_inquiry_submitted');
completion.window.LokahiAnalytics.setConsent('granted');
assert.equal(completion.events().length,1);
for (const referrer of ['', 'https://www.lokahiconnect.org/services.html', 'https://airtable.com.evil.example/']) {
  const direct = harness('granted',false,{pathname:'/inquiry-received.html',referrer,startedAt:String(Date.now()-1000)});
  assert.equal(direct.events().length,0);
}
console.log('Inquiry completion: Airtable return required; direct visits and reload/re-grant do not create submissions.');

