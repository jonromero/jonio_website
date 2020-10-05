Title: Why I've built a custom blog with Pelican and Tailwind
Category: Startups 
Date: 2020-10-04 10:48
Image: jonv.PNG

There are so many website creators out there that let you build your website and blog in minutes. Why on earth someone will be building its own using Pelican and not **AT LEAST** NextJS?

## Hm

I never had a person website but a had a blog. First on tumblr, then Jon.IO using Mailchimp, then on Medium and then on Substack. I loved all of them by the way.

I thought that Substack will be the blog/mailing list I will be using for a very long time (and substack is epic) but I wanted a little bit more control.

## Control = Conversions

For me, everything has to be calculated. How many users came to the website, from where, which pages are the best, which articles are shared the most etc.

** Having my own website got me more than 2000 subscribers in two weeks with 5 articles **. Maybe it was a fluke. But I've been doing this for sometime and I know how to talk with my audience and what my audience likes (hint: mostly Startups, trading and bad puns).

In addition to that, I am building a Startup Course on my own platform (because I want to include some features than are fun and aren't available anywhere else) and I want everything to be under the same theme and under my control.

## Sure, sure. Why not NextJS

NextJs and Tailwind let's you build website super fast. Like, come on. It is ridiculous how epic this combination is. 

The only thing that I don't like is using bleeding edge software for "boring things" like the infrastructure of my blog.

Pelican is extremely easy to hack around, it will be working as it is for the next decade and if not, I can reconstruct it. You can see that
it Jon.IO doesn't look like the standard Pelican installation but it uses most of the nifty plugins.

## Tailwind

No idea why but my (first) new version was not using tailwind and that was stupid. What you see here was built in less than a day and it is exactly how I want it to be - web and mobile.

## Continuous deployment 

Obviously. Commiting to the master branch on Github, triggers a Github hook and the new article (which is written in Markdown) is posted.
The RSS feed is updated and SendFox sends automatically an email to the mailing list (depending on the category).

Full integration

## Enough with the stupid flexing. Is it opensource?

Obviously. Go and fork here,  [sign up to the mailing list](pages/weekly-tips) and ping me if you have any questions.


Coming Next: Building the best platform (on the planet) for courses using Google Cloud, Flask and TensorFlow 


