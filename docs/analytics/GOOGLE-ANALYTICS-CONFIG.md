# Google Analytics Configuration Record

- Organization: Lokahi Connect
- Website: `https://www.lokahiconnect.org/`
- Measurement ID: `G-727LCMWN8K`
- Source: supplied directly by Stephanie Steinshouer on 2026-08-21
- Record status: `EMBEDDED — ACTIVATION REQUIRES VISITOR CONSENT`

The Google Measurement ID is public configuration information, not an account
credential or API secret. Google account credentials, API secrets, recovery
codes, and administrative access information must not be stored in this
repository.

## Supplied Google tag

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-727LCMWN8K"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-727LCMWN8K');
</script>
```

## Privacy-controlled implementation

The public site uses the supplied identifier through `site-analytics.js`. The
Google tag is blocked until a visitor affirmatively allows analytics. The
implementation keeps advertising storage, advertising user data, advertising
personalization, cross-device Google Signals, and ad-personalization signals
disabled. The public disclosure and choice control are in `privacy.html`.

The Google Analytics property owner should separately confirm the shortest
practical data-retention setting and keep advertising integrations disabled
unless Stephanie explicitly authorizes a later change.


## Service inquiry measurement - October 31, 2026

`site-analytics.js?v=20261031-2` emits `service_inquiry_click` only with active visitor consent and only for the exact public Services Airtable form or the explicit remote-services email link. Parameters are bounded `contact_method` values and a page URL with query string and fragment removed. It does not read form inputs, link text, email bodies, inquiry records, or enrollment data.

A click is not a lead submission, enrollment, or first session. Airtable is the source of truth for those later milestones. Do not label this click event `generate_lead` or count generic enhanced-measurement outbound clicks a second time.

Consent revocation suppresses these events; re-grant updates the loaded Google tag's consent correctly. The choice also works for the current page when browser storage is unavailable. Run `node scripts/test-inquiry-analytics.mjs` to check these boundaries.

### Account and live-receipt verification

Verified in the authenticated Google Analytics interface on October 31, 2026:

- Account: Lokahi Connect, account ID `405616166`.
- Property: Fundraising, property ID `551030199`.
- Web stream: Nonprofit website, stream ID `15478241565`, URL `https://lokahiconnect.org`, measurement ID `G-727LCMWN8K`.
- Data collection was active in the past 48 hours. Enhanced measurement was already enabled, including outbound clicks; no enhanced-measurement toggles were changed.
- Created and verified the event-scoped custom dimension **Contact method**, mapped to `contact_method`. Its description distinguishes a link click from a submitted inquiry, enrollment, or first session.
- Realtime showed exactly one `service_inquiry_click` for the test, with `contact_method = airtable_form`, by 17:35 UTC (07:35 Hawaiʻi time). A generic `click` was also recorded for that same interaction; do not sum the two as separate inquiries.
- The test opened the public Airtable inquiry form without submitting it. No inquiry or enrollment record was created. The email route was covered by the source tests, not by a live email action.
- Test entry URL used `utm_source=internal&utm_medium=qa&utm_campaign=inquiry_tracking_check_20261031`. Realtime's **First user source** remained `(direct)` for the existing browser, so do not assume the campaign marker makes every test event automatically filterable. Treat the October 31 test click and accompanying QA page views as testing, not demand evidence.
- Analytics consent was allowed for the check and set to **No thanks** afterward.

The email-preferences prompt was resolved by Stephanie before this verification. No email-subscription choices, marketing links, retention settings, or key-event classifications were changed by the agent. Account-level Google Signals and advertising integrations were not independently audited in this check. The custom dimension is saved; availability in processed reports remains subject to Google processing. Realtime receipt establishes collection, not a completed inquiry or customer acquisition.
