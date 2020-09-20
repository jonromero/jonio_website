#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Jon V <h2>BigData. Startups. Trading.</h2>'
SITENAME = u'Jon.IO'
SITEURL = u'http://jon.io'
TIMEZONE = u'America/Los_Angeles'

PATH = 'content/'

DEFAULT_LANG = 'en'
DEFAULT_DATE = "fs"
GOOGLE_ANALYTICS = True

THEME = 'mytheme'
CSS = 'theme/css'
IMAGES = 'theme/images'
JS = 'theme/js'

STATIC_PATHS = ['images']

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = 'feeds/all.atom.xml'
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

LINKS = (('Newsletter', 'http://getpelican.com/'),
         ('YouTube', 'http://python.org/'),
         ('Projects', 'http://jinja.pocoo.org/'),
         ('My Story', '#'),
         ('Start here', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

PLUGINS = ['sitemap']
