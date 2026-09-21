# Services inquiry operating guide

Owner: Stephanie Steinshouer. Request: website issue #29. Updated September 21, 2026.

## Current mode

The Services page uses explicit email preparation. The visitor must send the email themselves. It is a useful fallback, not the requested automated submission system. The Airtable Services Inquiries table and notification automation draft exist; the automation is OFF and there is no public form URL yet. See [CONTACT-SYSTEM.md](CONTACT-SYSTEM.md) for verified IDs and the exact activation checklist.

Do not deploy this as the completed issue #29 solution. Keep the PR in draft until the hosted form, email acceptance tests, browser review, and required human release decision are complete.

## When an inquiry arrives

- [ ] Confirm the adult’s request and contact consent. Read their general goal; avoid drawing conclusions about a learner from a brief inquiry.
- [ ] Reply personally. Explain the relevant service and current availability. Confirm time zone before suggesting a meeting.
- [ ] Confirm fees and scope before services begin: $75/30 minutes, $120/50 minutes; optional comprehensive profile and written plan $425 when appropriate. Verify current approved pricing if this guide is later reused.
- [ ] Ask only one or two useful next questions. Arrange sensitive-document exchange separately through the approved intake process.
- [ ] Record Replied, Conversation scheduled, or Closed. Keep notes limited to contact progress; no evaluations, diagnoses, learner records, or message copies in GitHub.

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

## Switch to the hosted form after acceptance

1. Complete the account-side checklist in CONTACT-SYSTEM.md, including fresh synthetic submission, successful automation run and work-inbox receipt.
2. Replace the email-preparation form in `services.html#inquiry` with a clear link to the actual public Airtable form. Label it “Open service inquiry form” and say that Airtable hosts it. Retain the direct email alternative. Do not embed a public record grid or create a URL from internal IDs.
3. Update `privacy.html#service-inquiries`: disclose which adult contact fields Airtable receives/stores, their purpose, the notification recipient, and a link to Airtable’s privacy policy. No learner records or promised security certifications. Match the actual form settings.
4. Remove the unused `services-contact.js` reference when replacing the fallback UI; retain the explicit email-preparation path only if useful and still accurately described. Align the source tests with the delivered flow.
5. Run the repository checks; verify the final form link, mobile/keyboard experience, success and error recovery, and no inquiry contents in analytics. Record observed results and remaining limits in REVIEW-AND-TESTS.md.
6. Obtain Stephanie’s release decision for the exact reviewed revision before merging the website PR. Do not enable public claims about automatic delivery until receipt is verified.

## Maintenance and quality

Verify fees and availability when they change, keeping Programs, Services and relevant donation cost-equivalents consistent. Check new inquiry handling during normal email work. Review the page after a real service change; do not create a new recurring administrative system solely for this page.

Optional family feedback: “Was anything unclear about the service or what would happen next?” Record de-identified themes only. Submission counts and subjective feedback are service-design information, not proof of instructional effectiveness.
