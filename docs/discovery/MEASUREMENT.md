# Organic discovery measurement

Owner: Stephanie Steinshouer. Method prepared November 4, 2026.

## Keep measures separate

1. Google Search Console: impressions and clicks for the canonical website; record the actual returned dates, search type, property, and data freshness. Separate brand/nonbrand queries only with an explicitly reviewed classification; do not assume the connector's domain-substring label recognizes “Lokahi Connect.” Use the generative-AI report in Search Console when accessible; ordinary search results do not establish AI-answer citations.
2. Bing Webmaster: record its own dates and totals separately. An empty response is unavailable data, not proof of zero traffic.
3. GA4: use consented organic/referral sessions and `service_inquiry_click` events. A contact-route click is not a submitted inquiry. The general GA4 source, ad measurement, and visitor choices remain separate. Consent makes these counts incomplete.
4. Services Inquiries: exclude Synthetic test; keep optional self-reported referral source as supplied. Blank means Unknown. Enrolled requires confirmed arrangements; First session completed requires a delivered session. Deduplicate in the authorized private workflow, not by exporting names/emails. Report table coverage; do not treat it as a census of email contacts or every client.
5. Conversion: define the period/cohort and denominator. Report N/A when the denominator is zero or unavailable. A before/after change is not evidence that the website edits caused the change.

No new tracking code, form fields, automatic enrollment, or recurring task is introduced by this work. Use existing consent controls. Never send learner names, contact details, diagnoses, evaluation content, inquiry messages, or record IDs to analytics or advertising services.

## Fixed search sample

Run these exact strings in the same search surface and with the same declared location/session conditions. Record date, surface, query, canonical-domain presence, returned source URL, and any stale or inaccurate claim. Do not call tool ordering a Google position. Preserve the branded control separately.

- online reading and spelling support for adults with dyslexia
- online dyslexia reading tutor Maui Hawaii
- Bainbridge Island online dyslexia educational therapy
- help with reading comprehension and expressing ideas in writing online
- Lokahi Connect online literacy support (branded control)

For AI-answer checks, use fresh conversations without Lokahi context and explicit web search. Keep model/product, location, date, prompt, named organizations, cited URLs, and factual accuracy. A search-result sample and an AI recommendation are different observations; no AI recommendation rate is established by the initial search-tool sample.

## After authorized publication

- Verify the actual public pages, canonical tags, sitemap, links, and deployment SHA.
- In the correct Search Console property, inspect the homepage, Services, About, Dyslexia, and three new URLs. Record index/crawl/canonical results. Request indexing where warranted; submission does not prove indexing.
- Check Settings → Search generative AI, including inherited parent controls. Record the observed effective choice. Crawler access alone does not prove this setting.
- Compare the same available date range after enough new data exists; retain an unchanged query set and note seasonality, paid activity, small samples, and provider/cache changes.

Sources: [Google AI-search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [Search generative AI control](https://support.google.com/webmasters/answer/16908024), [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots). Eligibility does not guarantee inclusion or recommendation. Existing robots/sitemap foundations are retained; no special AI-only file or additional tracking is required by this implementation.
