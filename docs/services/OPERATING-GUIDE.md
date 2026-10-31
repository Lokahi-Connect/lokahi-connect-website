# Services inquiry operating guide

Owner: Stephanie Steinshouer. Request: website issue #29. Updated October 31, 2026.

## Current mode

The Services page links to the published Airtable form at https://airtable.com/appEDbkXoKtlrJPSR/pagRy0ILKrkFzxKR2/form. Adults can submit without an Airtable account. The direct email link remains a backup. The former local email-preparation form and handler have been removed.

See [CONTACT-SYSTEM.md](CONTACT-SYSTEM.md) for the current automation status and actual test evidence. A submitted record and a successfully sent notification are distinct from confirmed inbox receipt. The Services page and form are live. An October 9 synthetic test recorded successful automation delivery and verified work-inbox receipt; keep historical test evidence separate from client inquiries.

## When an inquiry arrives

- [ ] Confirm the adult’s request and contact consent. Read their general goal; avoid drawing conclusions about a learner from a brief inquiry.
- [ ] Reply personally. Explain the relevant service and current availability. Confirm time zone before suggesting a meeting.
- [ ] Confirm fees and scope before services begin: $75/30 minutes, $120/50 minutes; optional comprehensive profile and written plan $425 when appropriate. Verify current approved pricing if this guide is later reused.
- [ ] Ask only one or two useful next questions. Arrange sensitive-document exchange separately through the approved intake process.
- [ ] Record Replied, Conversation scheduled, Enrolled, or Closed. Use Enrolled only after service arrangements are confirmed; record First session completed when a student session has actually taken place. Keep notes limited to contact progress; no evaluations, diagnoses, learner records, or message copies in GitHub.

There is no automatic marketing enrollment or promised response deadline. Check pending inquiries and automation failures when handling work email; a record marked New does not prove its notification was delivered.

## Reusable personal reply

Subject: Your Lokahi Connect inquiry

Hi [adult name],

Thank you for reaching out and sharing [their stated goal, in their own terms]. I’d be glad to talk about whether Lokahi Connect’s remote support fits what you’re looking for.

What would you most like support to make easier right now?

Once I understand a little more, I can explain the relevant session options, current availability, and next steps. Please let me know your time zone. There is no need to send evaluations or other private learner records by ordinary email.

Warmly,
Stephanie Steinshouer
Educational Therapist · Founder & Executive Director
Lokahi Connect · 501(c)(3) nonprofit
stephanie@lokahiconnect.org

## Before a future contact-flow change

- Verify the exact hosted form URL still shows only the approved adult-contact fields; never replace it with a public response grid or an inferred URL.
- Check required fields, initially unchecked consent, confirmation and failure recovery, and a synthetic notification sent to stephanie@lokahiconnect.org.
- Confirm inbox receipt, including source/time, reply details and follow-up checklist. Keep synthetic records labeled; do not count them as inquiries.
- Verify the website’s final mobile, desktop and keyboard experience and record any limits in REVIEW-AND-TESTS.md.
- Verify the current task covers publication before releasing a revised contact flow.

## Maintenance and quality

Verify fees and availability when they change, keeping Programs, Services and relevant donation cost-equivalents consistent. Check new inquiry handling during normal email work. Review the page after a real service change; do not create a new recurring administrative system solely for this page.

Optional family feedback: “Was anything unclear about the service or what would happen next?” Record de-identified themes only. Submission counts and subjective feedback are service-design information, not proof of instructional effectiveness.


## Acquisition measurement (October 31, 2026)

The optional public question **How did you hear about us?** records a family's own source category. Leave unanswered sources unknown; do not infer a source from a diagnosis or an unrelated profile. The existing Source formula identifies the form, not the referral channel. Internal follow-up fields and First session completed are not public form questions.

Review three separate measures:

1. **Contact-route clicks:** GA4 `service_inquiry_click` events from visitors who allowed analytics, separated by `contact_method` (`airtable_form` or `email`). These are clicks, not submissions or unique families. Generic outbound `click` events may overlap; never add the two counts together.
2. **Submitted inquiries:** deduplicated real Services Inquiries records. Exclude Follow-up status = Synthetic test and any explicitly labeled test records. Keep blank referral categories as Unknown.
3. **Enrollment and participation:** Enrolled means arrangements are confirmed; First session completed supplies the delivered-session milestone. An inquiry or scheduled conversation alone is not enrollment. Record these manually from the actual service workflow.

Keep names, email addresses, messages, learner details and record IDs out of Google Analytics and public reports. Summarize sources only in aggregate. Do not backfill historical attribution or enrollments by guessing. No change was made to existing inquiry records.

A one-time review reminder is scheduled for November 14, 2026. Search Console was still processing its new property data on October 31; the sitemap submission had succeeded with 14 discovered pages. Compare available dates and acknowledge small samples; changes in traffic do not prove causation.
