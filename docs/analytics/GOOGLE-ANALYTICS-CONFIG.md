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
