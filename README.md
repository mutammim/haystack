# Haystack

![Screenshot of haystack-browser.](https://www.mutammim.com/haystack.png)

Haystack is an app for storing links to content such as articles and videos. While many apps like this exist, I'm hoping to make one that works right for me.

It consists of two parts:

- **haystack-web:** NextJS-based web app that runs in the background on `localhost`. (I use iTerm's "Bury Session" feature to hide it away.) The web app connects using Prisma to a SQLite database. The database stores all the links, along with basic metadata, like title, description, and date of publishing.
- **haystack-browser:** Browser extension that, with a few clicks, adds the current page to the database, through `haystack-web`. It automatically extracts page metadata to save me typing.
