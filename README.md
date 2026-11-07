# Lokahi Connect Website

Static public website for Lokahi Connect.

## Local verification

Run the non-network site checks from the repository root:

```sh
node scripts/validate-site.mjs
python3 scripts/crawl-site.py .
```

The crawler starts at the homepage and follows HTML links. On every deployment it checks the staged pages against the sitemap, robots rules, canonical URLs, and the route to the donation form.

For a local preview, serve the repository root with any static HTTP server. The checks intentionally do not call external services or submit data.
