#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Jon V <h2>Building systems for Super Intelligence</h2>'
SITENAME = u'Jon.IO'
SITEURL = u''
TIMEZONE = u'America/Los_Angeles'

PATH = 'content/'

DEFAULT_LANG = 'en'
DEFAULT_DATE = "fs"

THEME = 'mytheme'
CSS = 'theme/css'
IMAGES = 'theme/images'
JS = 'theme/js'

STATIC_PATHS = ['images', 'raw']

EXTRA_PATH_METADATA = {
    'raw/metaverse2021.html': {
        'path': 'metaverse2021.html'
    },
    'raw/metaverse2022.html': {
        'path': 'metaverse2022.html'
    },
    'raw/metaverse2022-hackathon.html': {
        'path': 'metaverse2022-hackathon.html'
    },
    'raw/metaverse2023.html': {
        'path': 'vaim.html'
    },
    'raw/metaverse2025.html': {
        'path': 'vaim2025.html'
    },
    'raw/404.html': {
        'path': '404.html'
    },
    'raw/youtube.html': {
        'path': 'youtube.html'
    },
    'raw/vctears.html': {
        'path': 'vctears.html'
    },
    'raw/links.html': {
        'path': 'links.html'
    }
}

ARTICLE_EXCLUDES = ['raw']

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = 'feeds/all.atom.xml'
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

RELATED_POSTS_MAX = 4

DEFAULT_PAGINATION = 10

DIRECT_TEMPLATES = ['advisory', 'index', 'archives', 'premium', 'store']

PAGINATED_TEMPLATES = {
    'index': None,
    'tag': None,
    'category': None,
    'author': None,
    'archives': None
}

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

ARTICLE_URL = '{slug}'
PAGE_URL = 'pages/{slug}'
CATEGORY_URL = 'category/{slug}'

PLUGINS = ['sitemap', 'related_posts']

SITEMAP = {"format": "xml"}
