# MAX-R independent review — website issue #29

Verdict: **Not ready for approval as a completed/live issue #29 release.** Public copy and the explicit email-preparation fallback pass source review, with no remaining high-impact claim or privacy defect identified. The requested hosted inquiry and notification system remains incomplete, and rendered/keyboard verification remains outstanding. This review does not authorize publication.

Reviewed 2026-09-21, working tree `max/services-issue-29` in `/workspace/scratch/817c779e5c73/website`. No product files changed by this reviewer. Root's concurrent CSS/navigation revisions were re-read. Full Lokahi WORD Project skill and canonical review-standard reference were read. GitHub provenance is documented by the source-alignment review; this reviewer also compared current Programs service/price text directly.

## Required findings / remaining gates

1. **P1 — Requested public sign-up and automated email delivery are not operational.** `docs/services/CONTACT-SYSTEM.md:9,15,76-83` explicitly records no public form URL, undeployed automation, and no inbox delivery test. `services.html:142-157` and `services-contact.js:40-45` currently prepare an email in the visitor's own app; they do not accept a server submission. This is an honest fallback, but cannot satisfy or be reported as completion of the requested automatic contact system. **Owner:** MAX-00, with account authentication/activation by Stephanie where required. **Done:** actual create-only form link, required-field/consent checks, enabled automation, labeled synthetic public submission, and verified receipt at stephanie@lokahiconnect.org including follow-up instructions. Keep issue/PR incomplete until evidence exists.

2. **P2 — Rendered accessibility and responsive behavior remain unverified.** Browser preview was policy-blocked; no browser or alternate browser surface was attempted in this review. Source checks cannot establish layout, focus visibility, keyboard behavior, no-JavaScript mailto compatibility, or mobile external-email launching. The nine-link nav uses the updated shared 1100px breakpoint consistently in CSS and JavaScript; this is a reasonable preventive change, not visual verification. **Owner:** MAX-00 / release reviewer. **Done:** permitted rendered desktop/mobile and keyboard review, including expanded menu, consent panel, required form fields, copy fallback, and hosted submission if activated. Do not report a browser pass.

## Defect identified and resolved during review

- **P2 — Services section styling enlarged the fixed analytics-consent panel.** Original `services.css:16,67` selected `.services-page section`, which also matched the dynamically appended `<section class="analytics-consent">` from `site-analytics.js`. Its higher specificity replaced the shared panel's 1.2rem/1rem vertical padding with 4rem/3rem. Root changed both selectors to `.services-page main > section`. Re-read confirmed the fix; no open revision remains for this defect.

## Recommended clarification

- **P3 — No-JavaScript data-description mismatch.** `privacy.html:85` describes source page and preparation time in the message, but those are added by `services-contact.js:24-25`; native `mailto:` form submission with JavaScript disabled contains only named form controls and no internal follow-up checklist. `services.html:157` offers this native path. The direct email alternative remains useful. Small correction: qualify the privacy sentence with “When JavaScript is available, the prepared message also includes the source page and preparation time.” This is documentation accuracy, not evidence of a data leak.

## Strengths worth preserving

- Warm relationship-centered language, concrete participation supports, optional first detail, clear fees, and inquiry-versus-enrollment distinction. No fear, false urgency, fabricated testimonials, or promised learner outcomes.
- Services and optional $425 profile match current Programs text. “All ages,” fit-based ADHD coaching, and conditional financial access are supported there. No NILD-program claim or diagnostic-evaluation representation.
- Language relationships, meaningful sentences, evidence, reflection, and multiple response modes remain visible. Phonology is included without sound-first entry or fixed primacy.
- Adult-only initial contact scope, required contact consent, explicit sensitive-record exclusion, and no marketing enrollment. No form values are intentionally sent to analytics by the reviewed contact script.
- Email recipient and generated text are safely URI-encoded. Status text consistently says nothing has been sent by the website. Clipboard-denial fallback reveals a labeled textarea, focuses it, and selects its contents.
- Research distinguishes provider-reported scale/satisfaction from instructional efficacy and marketing causation. Its emotional-experience recommendations are identified as hypotheses.

## Verification performed

- `node scripts/validate-site.mjs`: PASS, 14 pages, including the latest shared asset/navigation updates.
- `node --check services-contact.js`: PASS.
- `git diff --check`: PASS.
- Local Node VM with mocked DOM: PASS for encoded recipient/body containing punctuation and Unicode, honest status text, invalid-form suppression, missing clipboard API fallback, and rejected clipboard permission fallback. This is source-level control-flow verification, not native browser validity or real delivery evidence.
- Read new page, stylesheet, contact script, source map, provider research and contact-system runbook; inspected changed integration diff, shared navigation/styles and analytics script.

Release state: **draft implementation and truthful fallback reviewed; hosted contact flow, browser verification and human release approval still pending.**


## MAX-00 resolution and final local checks

- Scoped Services section spacing to main content, protecting the fixed analytics consent panel.
- Matched mobile menu breakpoints at 1100px across shared CSS and navigation JavaScript; refreshed cache versions on all pages.
- Qualified the privacy disclosure: source/preparation time are added only when JavaScript is available.
- `node scripts/validate-site.mjs`: PASS, 14 pages.
- `node scripts/test-services-contact.mjs`: PASS, invalid-form suppression, exact recipient, URI-safe content, consent/follow-up text, truthful states and denied/unavailable clipboard recovery.
- `git diff --check`: PASS.
- Browser preview of local files was rejected by browser URL policy; no bypass or alternative browser surface was attempted. No desktop/mobile screenshot or rendered accessibility pass is claimed.
- Public form URL does not yet exist. Airtable draft automation is valid but OFF. Work-inbox receipt and end-to-end public form test are unverified.
- Status: IMPLEMENTATION_DRAFT — ACCOUNT_ACTIVATION_AND_RENDERED_REVIEW_REQUIRED. Website issue remains open.
