import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../site-analytics.js', import.meta.url), 'utf8');
function harness(initial, storageBlocked = false) {
  const listeners = {};
  let saved = initial;
  let script;
  const noop = () => {};
  const document = {
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
    location:{href:'https://www.lokahiconnect.org/services.html?private=omit',origin:'https://www.lokahiconnect.org',pathname:'/services.html'},
    dispatchEvent:noop
  };
  vm.runInNewContext(source,{window,document,URL,CustomEvent:class{},Date});
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
