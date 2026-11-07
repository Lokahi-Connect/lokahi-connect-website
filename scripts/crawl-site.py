"""Follow ordinary HTML links in the staged website, starting at its homepage."""
import argparse
import sys
from collections import deque
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urldefrag, urljoin, urlsplit
from urllib.robotparser import RobotFileParser
from xml.etree import ElementTree

ORIGIN = 'https://www.lokahiconnect.org'
HOME = ORIGIN + '/'
GIVING = ORIGIN + '/give.html'
CAMPAIGN = 'https://givebutter.com/ARzvHK'


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = set()
        self.canonicals = []
        self.directives = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        rel = (attrs.get('rel') or '').lower().split()
        href = attrs.get('href')
        if tag == 'a' and href and 'nofollow' not in rel:
            self.links.add(href)
        if tag == 'link' and href and 'canonical' in rel:
            self.canonicals.append(href)
        if tag == 'meta' and attrs.get('name', '').lower() in ('robots', 'googlebot'):
            self.directives.update(attrs.get('content', '').lower().replace(',', ' ').split())


def crawl(root):
    robots = RobotFileParser()
    robots.parse((root / 'robots.txt').read_text().splitlines())
    errors = []
    if HOME + 'sitemap.xml' not in (robots.site_maps() or []):
        errors.append('robots.txt must advertise the canonical sitemap')
    sitemap = ElementTree.parse(root / 'sitemap.xml')
    listed = {node.text for node in sitemap.findall('{*}url/{*}loc')}
    if GIVING not in listed:
        errors.append('The donation page is missing from the sitemap')

    queue = deque([HOME])
    seen = {HOME}
    indexed = set()
    donor_routes = 0
    while queue:
        url = queue.popleft()
        route = urlsplit(url).path
        if not robots.can_fetch('Googlebot', url):
            if url in listed:
                errors.append(f'{route} is blocked by robots.txt')
            continue
        filename = root / route.lstrip('/')
        if route.endswith('/'):
            filename /= 'index.html'
        if not filename.is_file():
            errors.append(f'{route} is linked but missing from the publication')
            continue
        page = Page()
        page.feed(filename.read_text(encoding='utf-8'))
        if {'none','noindex'} & page.directives:
            if url in listed:
                errors.append(f'{route} is in the sitemap and marked noindex')
        else:
            indexed.add(url)
            if page.canonicals != [url]:
                errors.append(f'{route} must have one self-referencing canonical URL')
        destinations = set()
        if not {'none','nofollow'} & page.directives:
            for href in page.links:
                absolute = urldefrag(urljoin(url, href)).url
                parsed = urlsplit(absolute)
                destinations.add(absolute)
                if (parsed.scheme, parsed.netloc) != ('https', 'www.lokahiconnect.org'):
                    continue
                if not parsed.path.endswith(('/', '.html')):
                    continue
                path = parsed.path
                if path.endswith('/index.html'):
                    path = path[:-len('index.html')]
                target = ORIGIN + path
                if target not in seen:
                    seen.add(target)
                    queue.append(target)
        if url == GIVING:
            if CAMPAIGN not in destinations:
                errors.append('Give must link directly to the campaign in its HTML')
        elif url in listed:
            if GIVING in destinations:
                donor_routes += 1
            else:
                errors.append(f'{route} has no direct, crawlable donation link')

    for missing in sorted(listed - indexed):
        errors.append(f'Sitemap page unreachable or unindexable from home: {missing}')
    for extra in sorted(indexed - listed):
        errors.append(f'Discoverable canonical page missing from sitemap: {extra}')
    if errors:
        raise SystemExit('\n'.join(errors))
    print(f'Crawled {len(indexed)} indexable pages from /. All {donor_routes} other pages link to Give.')
    print('Verified the sitemap, crawl permissions, canonicals, and the link to Givebutter.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory', nargs='?', default='.', type=Path, help='root of the staged website')
    try:
        crawl(parser.parse_args().directory)
    except (OSError, ElementTree.ParseError) as exc:
        sys.exit(f'Cannot crawl this publication: {exc}')
