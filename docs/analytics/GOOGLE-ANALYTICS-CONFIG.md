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

Account-level enhanced-measurement settings and live event receipt were not verified: Google Analytics requires an email-preferences choice. No email subscriptions, marketing connections, or retention settings were changed. After the account prompt is resolved, inspect the correct property/stream (G-727LCMWN8K), confirm outbound measurement, and verify the bounded event in Realtime or DebugView using a clearly identified test visit. Do not treat an account report delay as a failed form.
