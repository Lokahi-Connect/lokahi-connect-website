# Crawler and Google SEO review

Review date: November 4, 2026, Hawaiʻi time (November 5 UTC).
Repository baseline: `d033270ec0a4d743dd0f2cc681315e9a274989b9`.

## Verified

- Live robots.txt permits general crawlers, OAI-SearchBot, and OAI-AdsBot and advertises the HTTPS sitemap.
- The sitemap contains 17 canonical public URLs. The inquiry confirmation page is deliberately excluded and retains `noindex,follow`.
- Public pages have unique titles and descriptions, one main heading, self-referencing HTTPS canonical links, and crawlable HTML content. Existing Organization, Person, and Service JSON-LD parses successfully.
- Google Search Console reports the Services page is indexed. Its recorded crawl was September 28, 2026, by Googlebot smartphone: crawl allowed, fetch successful, indexing allowed, and Google-selected canonical matches the inspected URL.
- A fresh Google live URL test on November 4 reports the Services page is available to Google and can be indexed.
- Search Console's sitemap data reports zero errors and warnings, last submitted October 31 and downloaded November 2. The connector's historical submitted count was 28; this is not the current sitemap URL count or an indexed-page count.
- Google reports 11 HTTPS pages and no non-HTTPS pages. The overall page-indexing report is still processing; Core Web Vitals has insufficient field data.

## Search visibility baseline

Search Console query window: October 6–November 2, 2026, finalized data. Returned daily data covers October 30–November 2: **19 property-level impressions, 0 clicks**. This small sample cannot establish how the revised website will perform. Page-level impressions must not be summed as property-level impressions because multiple pages can appear in the same search result. Reported queries represent only a subset of impressions.

## Changes

- Updated Home, Our Approach, Programs, and Dyslexia search descriptions and matching social descriptions to reflect the published, welcoming copy.
- Made Our Approach and Programs titles more descriptive without adding unsupported claims.
- Corrected five sitemap modification dates for pages whose substantive copy changed on November 4. Footer-only changes do not reset policy or portal dates.
- Extended the existing site validator to catch missing or duplicate search titles/descriptions, sitemap duplication or unexpected URLs, accidental indexing of the confirmation page, and removal of general crawler access or sitemap discovery.

## Release checklist

- [x] Existing site validation passes (including new SEO checks); sitemap XML parses with 17 URLs. Image existence checked against the unchanged GitHub tree inventory because this local review checkout omits binary assets.
- [ ] Deploy the reviewed source and verify live metadata and sitemap.
- [x] Google accepted the Services page indexing request and added it to the priority crawl queue.
- [ ] Request homepage indexing and resubmit the updated sitemap after deployment; record final outcomes in the release report.

## References

- [Google: build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google: search snippets](https://developers.google.com/search/docs/appearance/snippet)
- [Google: canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

These checks establish technical readiness, not guaranteed rankings or immediate recrawling. Review search visibility after Google has processed the changes.
