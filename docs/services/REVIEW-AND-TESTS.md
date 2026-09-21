# MAX-R final contact-integration source review — issue #29

Verdict: **Source integration passes; not a live-release or inbox-delivery approval.** No new product-code or public-claim defect identified in the hosted-form revision. Automation testing is being performed separately by MAX-30; rendered page/accessibility review remains unresolved. This review supersedes the earlier email-preparation implementation findings where noted below.

Reviewed 2026-09-21 in `/workspace/scratch/817c779e5c73/website`, branch `max/services-issue-29`. No browser used; no product files modified. Scope: final Services contact panel, CSS, privacy notice, local validation, and stale-document references.

## Current implementation

- `services.html:145-152`: one labeled hosted inquiry link to the exact published URL supplied by MAX-00: `https://airtable.com/appEDbkXoKtlrJPSR/pagRy0ILKrkFzxKR2/form`. It is a native same-tab anchor; no JavaScript is required to follow it.
- No local inquiry `<form>`, duplicated collection fields, inline submission handler, or reference to retired `services-contact.js` remains. There is no competing local submission flow.
- `services.html:142,151`: direct email to stephanie@lokahiconnect.org remains available, including a clear fallback when the hosted form does not load or confirm submission.
- `services.html:147-150`: describes required adult name/email/contact permission, optional phone/interest/question, Airtable hosting, no account requirement, no automatic enrollment or marketing subscription, and exclusion of sensitive learner records.
- `privacy.html:82-90`: now describes Airtable receiving/storing responses, automatic source/time, internal follow-up fields, optional information, direct-email handling, and the difference between submission confirmation and email inbox receipt. Old local-only/no-storage description is removed. Public site and privacy text are mutually consistent.
- Removed form-control CSS is no longer needed; the inquiry panel is styled consistently. Earlier analytics-consent padding defect remains fixed by selectors restricted to `main > section`.
- Existing claims alignment assessment remains applicable: bounded service terms and prices, relational inquiry, no fabricated outcomes, no formal NILD-program claim, and no pressure-based conversion language.

## Remaining gates and documentation update

1. **Operational verification, owned by MAX-30 / MAX-00:** substantiate the no-account requirement and actual public field/consent settings against the hosted form; record automation enablement, a labeled public synthetic submission, successful notification execution, and separately verified receipt at stephanie@lokahiconnect.org. This reviewer did not independently open the form or access the inbox. Do not interpret the native link or local validator as proof of hosted operation or email delivery.
2. **Rendered review, owned by MAX-00 / release reviewer:** desktop/mobile rendering and keyboard/focus checks remain outstanding. No browser pass is claimed here.
3. **Reconcile current operational docs before handoff, owned by MAX-00:** at review time, `docs/services/SOURCE-ALIGNMENT-2026-09-21.md:77` still named email-preparation and retired JavaScript; `docs/services/OPERATING-GUIDE.md:42-44` described replacing that form as future work; `docs/services/CONTACT-SYSTEM.md` retained historical no-public-form status; `docs/services/REVIEW-AND-TESTS.md` contained the earlier review. Update current statements and label retained historical evidence clearly. Root advised these updates are underway; this is a documentation synchronization item, not a newly discovered backend failure.

## Subsequent operational update from MAX-00

After source review, MAX-00 reported that MAX-30 verified a public synthetic submission, automation ON, and successful send action in run `wfxvtmmP2DfE2gd6o` at 20:12:42–44 UTC. **Inbox receipt remains unverified.** This is reported operational evidence from MAX-30, not independent browser/inbox verification by this reviewer. MAX-00 also reported updating OPERATING-GUIDE and the SOURCE-ALIGNMENT inquiry map; the earlier document observations above describe their pre-update state. A superseded label for the historical review and final operational evidence are being persisted by MAX-00.

## Checks completed

- `node scripts/validate-site.mjs`: PASS for 14 pages, including actual form URL, direct email, privacy anchor, no local double form, and retired script exclusion.
- `git diff --check`: PASS.
- Targeted source search: no retired form/script reference in live Services HTML/CSS or privacy notice; remaining matches were historical/operational documents described above.
- Earlier mocked-DOM contact-script tests are **obsolete for the current implementation** and must not be presented as verification of the hosted Airtable form.

Earlier findings superseded: missing hosted link is resolved in source; no-JavaScript source/time mismatch is removed with the former local form. Actual notification delivery and rendered verification require their own evidence. Human publication approval remains separate from this technical source review.


---
## Historical initial review — superseded by the final review above

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
