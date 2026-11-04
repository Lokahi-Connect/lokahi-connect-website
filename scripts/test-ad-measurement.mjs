import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../site-ad-measurement.js', import.meta.url), 'utf8');
const choiceKey = 'lokahi_ad_measurement_consent_v1';
const pendingKey = 'lokahi_ad_inquiry_v1';
const form = 'https://airtable.com/appEDbkXoKtlrJPSR/pagRy0ILKrkFzxKR2/form';
const uuid = '12345678-1234-4234-8234-123456789abc';
const now = Date.now();

function harness({choice, path='/services.html', referrer='', session=new Map(), blocked=false, local}={}) {
  local = local || new Map(choice ? [[choiceKey, choice]] : []);
  const listeners = {}, windowListeners = {}, scripts = [], cookies = [], status = {};
  const buttons = ['granted','denied'].map(value => ({
    getAttribute: key => key === 'data-ad-choice' ? value : null,
    setAttribute: () => {},
    addEventListener: (_, fn) => { buttonsByChoice[value] = fn; }
  }));
  const buttonsByChoice = {};
  const storage = map => ({
    getItem:key => { if (blocked) throw Error('blocked'); return map.get(key) ?? null; },
    setItem:(key,value) => { if (blocked) throw Error('blocked'); map.set(key,value); },
    removeItem:key => { if (blocked) throw Error('blocked'); map.delete(key); }
  });
  const document = {
    referrer,
    createElement: () => ({setAttribute:()=>{}}),
    head:{appendChild:script => scripts.push(script)},
    querySelectorAll: selector => selector === '[data-ad-choice]' ? buttons : [status],
    addEventListener:(type,fn)=>{listeners[type]=fn;},
    set cookie(value) { cookies.push(value); }
  };
  const window = {
    localStorage: storage(local), sessionStorage: storage(session),
    location:{pathname:path,href:'https://www.lokahiconnect.org'+path+'?private=NEVER_SEND'},
    crypto:{randomUUID:()=>uuid},
    addEventListener:(type,fn)=>{windowListeners[type]=fn;}
  };
  vm.runInNewContext(source,{window,document,URL,Date:{now:()=>now}});
  return {
    window,scripts,session,local,cookies,status,
    choose:value=>buttonsByChoice[value](),
    click:(href=form,extra={})=>listeners.click({button:0,target:{closest:()=>({href})},...extra}),
    revokeElsewhere:()=>{local.set(choiceKey,'denied');windowListeners.storage({key:choiceKey});},
    calls:()=>[...(window.oaiq?.q || [])],
    events:()=>[...(window.oaiq?.q || [])].filter(a=>a[0]==='measure')
  };
}

// No opt-in, no remote script and no lead marker. Analytics consent is irrelevant.
for (const choice of [undefined,'denied']) {
  const h=harness({choice});h.click();
  assert.equal(h.scripts.length,0);assert.equal(h.events().length,0);assert.equal(h.session.size,0);
}
const isolated=harness({local:new Map([['lokahi_analytics_consent_v1','granted']])});
assert.equal(isolated.scripts.length,0);

const h=harness();h.choose('granted');
assert.equal(h.scripts.length,1);
assert.deepEqual(Array.from(h.calls()[0]),['consent',true]);
assert.equal(h.calls()[1][0],'init');assert.equal(h.calls()[1][1].pixelId,'F5tCpcgaWsXqAFzEhnanKx');
assert.ok(!h.calls().some(a=>a[0]==='consent' && a[1]===false));
assert.equal(h.events()[0][1],'page_viewed');
assert.equal(h.events()[0][3].opt_out,true);
h.choose('granted');assert.equal(h.events().length,1);assert.equal(h.scripts.length,1);
h.click('mailto:stephanie@lokahiconnect.org');h.click('https://airtable.com/other/form');
h.click(form,{ctrlKey:true});h.click(form,{defaultPrevented:true});
assert.equal(h.session.size,0);
h.click();assert.equal(h.events().length,1);assert.ok(h.session.has(pendingKey));
assert.deepEqual(JSON.parse(h.session.get(pendingKey)),{eventId:'inquiry_'+uuid,startedAt:now});

const success=harness({choice:'granted',path:'/inquiry-received.html',referrer:'https://airtable.com/',session:h.session});
assert.deepEqual(success.events().map(e=>e[1]),['page_viewed','lead_created']);
const lead=success.events()[1];
assert.equal(lead[2].type,'customer_action');assert.equal(lead[3].event_id,'inquiry_'+uuid);assert.equal(lead[3].opt_out,true);
assert.equal(success.session.size,0);
success.choose('granted');assert.equal(success.events().length,2);
const reload=harness({choice:'granted',path:'/inquiry-received.html',referrer:'https://airtable.com/',session:success.session});
assert.deepEqual(reload.events().map(e=>e[1]),['page_viewed']);

for(const [referrer,age,eventId] of [
  ['',0,'inquiry_'+uuid], ['https://evil.example/',0,'inquiry_'+uuid],
  ['https://airtable.com.evil.example/',0,'inquiry_'+uuid],
  ['https://airtable.com/',31*60*1000,'inquiry_'+uuid],
  ['https://airtable.com/',-1000,'inquiry_'+uuid], ['https://airtable.com/',0,'invalid']
]) {
  const session=new Map([[pendingKey,JSON.stringify({eventId,startedAt:now-age})]]);
  const invalid=harness({choice:'granted',path:'/inquiry-received.html',referrer,session});
  assert.ok(!invalid.events().some(e=>e[1]==='lead_created'));
  assert.equal(session.size,0);
}
const revoked=harness({choice:'granted'});revoked.click();revoked.choose('denied');revoked.click();
assert.equal(revoked.session.size,0);assert.equal(revoked.events().length,1);
assert.deepEqual(Array.from(revoked.calls().at(-1)),['consent',false]);
assert.equal(revoked.cookies.length,4);
revoked.choose('granted');assert.equal(revoked.events().length,1);
const crossTab=harness({choice:'granted'});crossTab.click();crossTab.revokeElsewhere();crossTab.click();
assert.equal(crossTab.session.size,0);assert.equal(crossTab.events().length,1);
const blocked=harness({blocked:true});blocked.choose('granted');blocked.click();
assert.equal(blocked.session.size,0);assert.equal(blocked.events().length,1);
const privacy=harness({choice:'granted',path:'/privacy.html'});
assert.equal(privacy.scripts.length,0);assert.equal(privacy.events().length,0);
privacy.choose('denied');assert.equal(privacy.cookies.length,4);
assert.ok(!JSON.stringify(success.calls()).includes('NEVER_SEND'));
assert.ok(!/email_sha256|phone_number_sha256|form\.elements|fetch\(/.test(source));
console.log('PASS: opt-in, consent ordering/revocation, isolated analytics choice, exact routes, submission return, expiry, deduplication, blocked storage, no form data or private URL payloads. Synthetic tests only; no network events sent.');
