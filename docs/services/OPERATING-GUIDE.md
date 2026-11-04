# Services inquiry operating guide

Owner: Stephanie Steinshouer. Request: website issue #29, approved service-pricing clarification, and the November 4 free-consultation update. Updated November 4, 2026.

## Current mode

The Services page links to the published Airtable form at https://airtable.com/appEDbkXoKtlrJPSR/pagRy0ILKrkFzxKR2/form. Adults can submit without an Airtable account. The direct email link remains a backup. The former local email-preparation form and handler have been removed.

The Home and Services pages offer a **free 30-minute online consultation** with Stephanie to discuss Lokahi Connect’s approach, the adult’s questions and goals, and whether online support is a fit. This initial conversation has no charge or obligation to enroll. Student instruction and the optional profile remain separate paid services. Requests use the existing Services Inquiries form and table; do not collect a second set of answers on the website.

Stephanie personally confirms availability and appointment times by email. A form submission does not reserve a time, create a booking, send a calendar invitation, or enroll the adult in marketing. The form collects adult contact details and permission to reply, with optional general context. Keep learner names, school information, diagnoses, and private reports out of this first inquiry.

See [CONTACT-SYSTEM.md](CONTACT-SYSTEM.md) for the current automation status and actual test evidence. A submitted record and a successfully sent notification are distinct from confirmed inbox receipt. The Services page and form are live. An October 9 synthetic test recorded successful automation delivery and verified work-inbox receipt; keep historical test evidence separate from client inquiries.

## When an inquiry arrives

- [ ] Confirm the adult’s request and contact consent. Read their general goal; avoid drawing conclusions about a learner from a brief inquiry.
- [ ] Reply personally. For an initial conversation, offer the free 30-minute online consultation to discuss our approach and fit. Confirm time zone and availability before suggesting a meeting; record an appointment only after Stephanie confirms it.
- [ ] Confirm fees and scope before services begin: $75/30 minutes, $120/50 minutes; optional comprehensive profile and written plan $425 when appropriate. Verify current approved pricing if this guide is later reused.
- [ ] Ask only one or two useful next questions. Arrange sensitive-document exchange separately through the approved intake process.
- [ ] Record Replied, Conversation scheduled, Enrolled, or Closed. Use Enrolled only after service arrangements are confirmed; record First session completed when a student session has actually taken place. Keep notes limited to contact progress; no evaluations, diagnoses, learner records, or message copies in GitHub.

There is no automatic marketing enrollment or promised response deadline. Check pending inquiries and automation failures when handling work email; a record marked New does not prove its notification was delivered.

## Before agreeing to paid services

Session prices remain $75/30 minutes and $120/50 minutes. The optional profile and
written plan remains $425. Stephanie approved retaining these prices after the
November 4 comparison of published online specialist rates; this is a market
comparison, not evidence of a universal industry standard.

- [ ] Confirm live session length, frequency, and fee.
- [ ] Explain preparation, session materials, progress review, and family updates
  included in the individual arrangement. Do not promise unlimited consultation.
- [ ] Agree separately on dedicated parent/school meetings or work beyond scope,
  including any fee, before that work begins.
- [ ] If the optional $425 profile is appropriate, complete the scope note below
  with the family before purchase. Current repository records do not establish a
  standard assessment duration, test battery, or included feedback-meeting length.

Reusable scope note (complete privately; do not store learner details in GitHub):

```text
Optional learning profile and written service plan: $425
Purpose and learning priorities: [agreed priorities]
Assessment or learning activities: [agreed activities]
Meetings and time: [number and duration]
Written deliverables: [profile and service-plan contents]
Feedback meeting: [included/not included; duration if included]
Delivery timing: [agreed date or timeframe]
Additional work: [scope and any fee agreed separately before starting]
This is educational planning, not a diagnostic evaluation.
```

## Reusable personal reply

Subject: Your Lokahi Connect inquiry

Hi [adult name],

Thank you for reaching out and sharing [their stated goal, in their own terms]. I’d be glad to meet for a free 30-minute online consultation to discuss Lokahi Connect’s approach, your questions, and whether our remote support fits what you’re looking for. There is no obligation to enroll.

What would you most like support to make easier right now?

Please let me know your time zone and a few times that could work for you. I’ll reply to confirm a mutually available time. During our conversation, we can discuss the relevant session options and next steps. There is no need to send evaluations or other private learner records by ordinary email.

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

