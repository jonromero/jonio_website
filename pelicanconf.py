#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Jon V <h2>BigData. Startups. Trading.</h2>'
SITENAME = u'Jon.IO'
SITEURL = u'http://jon.io'
TIMEZONE = u'America/Los_Angeles'

DEFAULT_LANG = u'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

# Social widget
SOCIAL = (('Twitter', 'http://twitter.com/jonromero'),
          ('LinkedIn', 'http://www.linkedin.com/in/johnvlachoyiannis'),
          ('Github', 'http://github.com/jonromero/'),
          ('Bitbucket', 'http://bitbucket.org/jonromero/'),)

# Blogroll
LINKS =  ()

DEFAULT_PAGINATION = False
THEME = "pelican-svbtle-master"
DEFAULT_DATE = "fs"
GOOGLE_ANALYTICS = "YES"
TWITTER_USERNAME = "jonromero"
# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

PLUGINS = ['sitemap']

