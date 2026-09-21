# Services contact system — issue #29

Owner: Stephanie Steinshouer. Prepared by MAX-30, 2026-09-21.

## Current result

Created a new bounded **Services Inquiries** table in the existing **Lokahi WORD Project** Airtable base and a validated notification automation draft. Existing records, forms and automations were not changed. No paid upgrade was introduced.

**Not live:** public form creation and automation activation still require an authenticated Airtable session. No public form URL exists for this new table yet. No inquiry notification has been sent or delivery-tested. Do not present the website as accepting submissions until the activation checks below pass.

- Base: `appEDbkXoKtlrJPSR`
- Table: `tblHgC1cFWgYRumXn`
- Automation: `wflYDYCTBHarmAS1g`
- Exact automation URL returned by Airtable: https://airtable.com/appEDbkXoKtlrJPSR/wflYDYCTBHarmAS1g
- Verification: `get_automation` returned `configurationStatus: valid`, `deploymentStatus: undeployed`, `deployedVersion: null`.
- Synthetic record: `recgMMsKnE8cHrTTJ`, created `2026-09-21T19:51:05.000Z`. Its name, message, notes and status explicitly identify it as a synthetic setup check, not a family. No real student data. Its consent checkbox is test data. Its status excludes it from the notification trigger. Formula source and automatic created-time fields returned correctly. This validates storage only, not the public form or email delivery.

## Implemented table and required form settings

| Field | ID | Type | Public form setting |
|---|---|---|---|
| Adult name | `fldRTBy3HBubNPiES` | Single-line text | Required; label “Your name (adult contacting us)” |
| Email | `fldXDW9s8GL8tpcoo` | Email | Required; label “Your email” |
| Phone (optional) | `fldXOuXY15yIzLDOC` | Phone | Optional |
| Support interest | `fldzE4kSzz87WJlIJ` | Single select | Optional |
| General message | `fldhZUU90RHkoigLv` | Long text | Optional; request one or two general sentences, no sensitive records |
| Contact consent | `fldslU1tcu3tSMEFi` | Checkbox | Required, unchecked by default; consent label below |
| Submitted at | `fldQm4TP5w0h861gJ` | Created time | Automatic; exclude from form; underlying value is UTC |
| Source | `fldkgIhtxjKWCfPfq` | Formula | Automatic: “Lokahi Connect Services inquiry form”; exclude from form |
| Follow-up status | `fld7EwsoNt4cogzhF` | Single select | Internal only; exclude from form and **leave blank on submission** |
| Follow-up notes | `fldf0yhKiZ8CwkP8E` | Long text | Internal only; exclude from form |

Support-interest choices: Reading, spelling and writing; Executive functioning and learning routines; Understanding available support; Not sure yet.

Status choices: New; Replied; Conversation scheduled; Closed; Synthetic test.

Consent label: “I am an adult and agree that Lokahi Connect may contact me about this inquiry.”

Form title: “Let’s talk about support”. Submit button: “Send my inquiry”. No automatic marketing opt-in. Do not collect child names, diagnoses, birthdays, school names, IEP/504 records, evaluations, health information or attachments.

Form introduction/privacy text:

> Tell us a little about the support you are seeking. You do not need a diagnosis or a detailed explanation to start a conversation. Please use your own adult contact information and keep your message general. Do not include a child’s name, assessment reports, diagnoses or other private records. Airtable hosts this form and stores your response for Lokahi Connect. Your inquiry will be emailed to Stephanie at stephanie@lokahiconnect.org for personal follow-up. Submitting this form does not enroll you in services or marketing emails.

Use the email-notification sentence only after activation and successful delivery verification. Link the website privacy page and Airtable privacy information alongside the form. Do not claim confidentiality, health-record compliance, retention periods or access restrictions that have not been verified. Limit the form to create-only submissions; do not publish a grid/table of responses.

Success text (only after successful submission):

> Thank you. Your inquiry has been submitted. Stephanie will follow up by email to discuss your questions and possible next steps. This is a request for a conversation, not confirmed enrollment. If you need to add anything, email stephanie@lokahiconnect.org. Please keep sensitive records out of email until an appropriate intake method is arranged.

No promised response deadline is configured.

## Implemented notification draft

Trigger: a record first matches all three conditions: Contact consent checked; Email not empty; Follow-up status empty.

1. Set Follow-up status to **New**, which prevents ordinary later edits from re-triggering the notification.
2. Send one email to **stephanie@lokahiconnect.org**, with the inquirer’s email as Reply-To and sender name “Lokahi Connect Services”.

Subject: `New Lokahi Connect services inquiry — [Adult name]`.

The email uses Airtable’s record-rendering function to include adult name, email, optional phone, support interest, general message, consent, submitted time and source. It includes the internal record link and these follow-up instructions:

1. Review the general goals and contact consent. Treat this as an inquiry, not enrollment or a diagnostic assessment.
2. Reply personally; thank them and ask one useful question about the support they are seeking.
3. Confirm fit, current availability, session options and fees before offering a next step. Agree on time zone and meeting details.
4. Request evaluations or sensitive information only through the later approved intake process, never this form.
5. Update status to Replied, Conversation scheduled or Closed. Keep notes brief; do not copy educational or health records here.

The email also explains that no marketing enrollment is created and TEST names indicate delivery checks. No automatic reply to the inquirer is configured.

Operational limitation: if email sending fails after the New status is set, the record remains New and will not automatically retry. Stephanie should check the table and automation failure history, resolve the specific delivery problem, and re-run the failed action once or follow up manually; avoid repeated blind resubmission. New means pending follow-up, **not verified email delivery**. Airtable plan quotas and recipient restrictions must be checked during activation; do not upgrade without authorization.

## Activation and end-to-end acceptance

- [ ] Sign in to Airtable with the account that owns the existing Lokahi WORD Project base. Use supported secure browser authentication; do not provide passwords in chat.
- [ ] In Forms, create a new standalone create-record form using Services Inquiries. Configure only the public fields above; leave the two internal fields and computed fields out. Ensure status is blank for every new submission.
- [ ] Apply required adult name/email/unchecked consent fields, optional fields, privacy text, success text and a create-only public form link that does not reveal responses or require a family to access the base. Verify actual access/settings in the UI.
- [ ] Review the notification draft at the exact automation URL above and turn it on in Airtable. The connector explicitly saves OFF drafts and requires human review/activation; it has no activation tool.
- [ ] Copy the actual public form URL returned by Airtable into the website configuration. Do not use the existing resource-feedback URL or invent a URL from table IDs.
- [ ] From the public form, submit a fresh labeled synthetic inquiry with adult name “TEST — Services end-to-end check”, email stephanie@lokahiconnect.org, general message “Synthetic issue #29 delivery test; no family/student data”, and test consent checked. Test required validation and a keyboard-only/mobile flow too.
- [ ] Verify the public success message, stored record, New status, successful automation run and **receipt in stephanie@lokahiconnect.org**. Check field values, source/time, Reply-To, record link and follow-up instructions in the received email. Keep test clearly labeled Synthetic test after verification. Never count it as an inquiry.
- [ ] Confirm visible failure/retry/email fallback and review that no child data or third-party analytics receives form content. Publish website form link only after all evidence is recorded.

## Discovery evidence and precise blocker

The installed Airtable connector supports table/field creation, form-schema reading, form submission and automation draft creation. Its `create_page` supports only visualization, dashboard and recordDetail. A complete metadata scan found no form-creation or automation-activation tool.

The only existing standalone form returned by `list_pages_for_base` was “Log a Resource Interaction” (`pagaCJaWoG7oQDaQT`, Resource Interactions table). This is not an inquiry form and was not repurposed. Existing deployed automations were unrelated task reminders and student alignment; neither was modified.

Browser inspection found both Airtable and Tutorbird signed out. No authentication request was issued while website work remained. The repository's existing Tutorbird integration is a login widget for current families; no existing inquiry endpoint was identified. The connected Gmail account is ssteinshouer@gmail.com, so it cannot by itself prove receipt in Stephanie's separate work inbox.

The requested work recipient is unambiguous: the user explicitly supplied stephanie@lokahiconnect.org. Resolve-recipients skill was read and applied. No email was sent, no credentials were retrieved and no access controls were bypassed.
