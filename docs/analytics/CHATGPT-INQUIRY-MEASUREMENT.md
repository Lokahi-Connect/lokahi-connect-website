# ChatGPT inquiry measurement — November 4, 2026

Owner: Stephanie Steinshouer. Source of truth: this repository for website code;
Ads Manager for campaign configuration and assessments; Airtable for actual inquiries.

## Verified before this change

- The live Services landing URL, including its existing ChatGPT UTMs, returned HTTP
  200 with the OAI-AdsBot user-agent. Its service content was present in the response;
  no authentication or challenge was observed. This does not prove access from every
  verified crawler IP or guarantee search indexing/ad approval.
- Live robots.txt allowed all paths. The sitemap included Services and public pages.
- The Services page had an H1, main landmark, skip link, image alternative text,
  canonical URL, service schema, service scope, prices, and an inquiry route.
  At a 390px viewport it had no horizontal overflow; the menu opened, and Escape
  closed it. These bounded checks are not a complete WCAG audit.
- The public Airtable inquiry form had labeled fields, required adult name/email/
  contact consent, and optional general inquiry fields. It accepts submissions
  without requiring the visitor to sign in. Its published return destination is
  https://www.lokahiconnect.org/inquiry-received.html . The owner editor showed
  no unpublished changes. No form settings or notification automation changed.
- The website had Google Analytics submission-return measurement, but no OpenAI
  Pixel. The existing GA test harness was missing URLSearchParams after an earlier
  source update; corrected here and completion safeguards added.
- Ads Manager has the existing website source “My first pixel” and standard
  “Lead Created” and “Page Viewed” settings. Both use 30-day click and 1-day view
  attribution settings. Neither was attached to the active Remote Services campaign
  at inspection. That campaign uses reach/impressions, impression billing, and a
  USD 500 lifetime budget. No objective, budget, targeting, bid, or status change is
  included in this website release.
- Latest EQS: unavailable because of low volume, not zero and not 10/10. Score date
  2026-11-02; assessment window 2026-10-27 00:00 UTC through 2026-11-03 00:00 UTC
  (end exclusive); computed 2026-11-04 07:20:54 UTC. No warning codes or identifier
  coverage returned. The latest-15-minute event sample was empty; this is not a
  historical conversion total and does not establish absence of all events.

## Visitor-facing wording

At Stephanie’s request, the Services and inquiry-confirmation pages keep vendor names and internal processing details on the linked Privacy & Analytics page. The consultation card focuses on contacting Stephanie. A compact, expandable ad-measurement choice appears after the main inquiry content, with the same opt-in and decline controls. This copy and placement change does not change the tracking code, event fields, default-off state, or previously saved choices.

## Implemented boundaries

- `site-ad-measurement.js` loads only on Services, the confirmation page, and the
  privacy choice page. Only Services and confirmation emit events.
- The SDK does not load until the visitor separately allows ad measurement.
  Existing Google consent never grants OpenAI measurement consent.
- `page_viewed` is an upper-funnel diagnostic. `lead_created` is the inquiry goal;
  do not attach Page Viewed as an inquiry outcome or count form-link clicks as leads.
- On an ordinary same-tab form opening after consent, save a random event ID and
  timestamp in session storage. A lead requires the published confirmation path,
  an Airtable-origin referrer, that recent valid marker, and active consent. Consume
  the marker once before queueing the event. Expired, absent, invalid, direct,
  reloaded, or denied flows do not emit a lead. The 30-minute marker is a browser
  journey safeguard, not the campaign's attribution window.
- Preserve the SDK-managed click reference across return navigation. Do not append
  fake/reserved click identifiers to ad destinations, send them to Airtable, or
  reset SDK consent to false during an already-consented return-page initialization.
- Send a standard `customer_action` event with a random event ID and opt_out=true.
  No names, emails, phone numbers, inquiry text, diagnoses, record IDs, enrollment
  status, or fabricated conversion values are supplied to OpenAI.
- Revocation stops future events, clears pending state and known first-party
  measurement cookies, and propagates between open tabs. Storage failures fail
  closed for submission tracking. No server secrets, CAPI, or matching-data upload
  is introduced. Pixel code is absent from all form-bearing pages and portals.
- The browser-return event remains an estimate of submitted inquiries, not a
  signed server receipt. Privacy tools, referrer restrictions, navigation differences,
  early exits, or blocking can undercount. Airtable records remain authoritative.
- Services now explicitly identifies free 30-minute consultation and tutoring
  inquiries, with Stephanie confirming appointments. The steps list has an explicit
  list role for assistive technology. Robots rules explicitly allow OAI-AdsBot and
  OAI-SearchBot while preserving the existing allow-all policy.

## Validation

Run from the repository root:

```sh
node scripts/validate-site.mjs
node scripts/test-inquiry-analytics.mjs
node scripts/test-ad-measurement.mjs
node --check site-ad-measurement.js
```

The tests use local synthetic fixtures and never send conversion events. They
cover consent separation, revocation/re-grant, storage failure, exact routes,
same-tab starts, referrer checks, marker expiry, repeat protection, and payload
minimization. No synthetic lead has been submitted to Ads Manager to raise EQS.

## Completion checklist

- [x] Existing service, mobile navigation, form configuration, and crawl rules reviewed.
- [x] Consent-based pixel code and privacy disclosures implemented.
- [x] Local behavior tests passed; no private form data in event payloads.
- [x] Attached only Lead Created to the existing Remote Services campaign on
  November 4, 2026 after Stephanie approved the change following the pricing review.
  Fresh campaign and event-setting reads confirmed the association. Active status,
  impressions/reach, impression billing, USD 500 lifetime budget, US targeting, and
  the goal's 30-day click / 1-day view windows were preserved. Page Viewed remains
  unattached as a conversion goal. This configures inquiry reporting; it does not
  change delivery to conversion optimization or prove that an inquiry occurred.
- [ ] Verify receipt of a genuine, consented submission event and reconcile it with
  Airtable. A successful code deployment alone does not prove SDK event acceptance
  or attribution. Use recent-event diagnostics for receipt; use reporting for attribution.
- [ ] Review the next published EQS after sufficient genuine volume accumulates.

EQS is computed by OpenAI; it cannot be set or guaranteed at 10/10. Its seven-day
assessment with receipt maturity is not real-time. Never fabricate events, bypass
consent, or collect extra learner information to increase a score. Browser+server
measurement may be considered later with a secure, consented integration and shared
event IDs; it is not part of this release. Reach delivery plus lead reporting is
different from optimizing bids for conversions.

References:
- https://help.openai.com/en/articles/20001243-advertiser-guidance-for-allowing-openai-web-crawlers
- https://help.openai.com/en/articles/20001409-conversion-measurement
- https://help.openai.com/en/articles/20001214-measure-results
- https://developers.openai.com/ads/measurement-pixel

