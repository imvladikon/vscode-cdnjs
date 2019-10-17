# unpkg.com extension for Visual Studio Code

Search for and embed libraries from [unpkg.com](https://unpkg.com) into your HTML using Visual Studio Code commands.

![Searching cdnjs.com for jquery](images/search-example.gif)

This extension uses the unpkg.com API to search for libraries that are hosted on unpkg.com. You choose whatever version of the library you wish and then insert library urls directly into your HTML, copy them to your clipboard or open them in your browser.

---
## Features
- Search for any published version of any library hosted on unpkg.com
- Embed those library's file urls directly into your documents
- Insert those library file contents into the current document or a new document
- Insert urls, `<script>` and  `<link>` tags into your HTML for JS and CSS files
- Copy urls, `<script>` and `<link>` tags to your system clipboard
- Open any file url in your browser
- Choose from a list of your most recently used libraries

---
## Recent Libraries
- Keeps track of your most recently used libraries for you to quickly choose from

![Recent Libraries list](images/recent-libraries-example.gif)

---
## Built-in, automatic, persistent caching
- Caches your unpkg.com search results and library data
- Cache is persistent between Visual Studio Code sessions
- User configurable expiration time (default: 6 hours)
- Cache can be cleared at any time using a command

---
## Visual Studio Code Commands

### `unpkg: Search for libraries`

- Perform a search for libraries on unpkg.com

### `unpkg: Recent libraries`

- View a list of your most recently used libraries for you to quickly access

### `unpkg: Clear cache`

- Empty/clear/flush the cache

## Settings
---

### `unpkg.quoteStyle`

- Quote style for HTML tags. Possible values are `single` or `double`
- Default: `single`

### `unpkg.protcol`

- Protocol for urls in HTML tags. Possible values are `https://`, `http://` or `//`
- Default: `https://`

### `unpkg.maxRecentLibraries`

- The maxmium number of Recent Libraries to save
- Default: `10`

### `unpkg.cacheTime`

- The length of time (in seconds) to cache library and search results
- Default: `21600` (6 hours)

---

This extension will obey VSCode's `http.proxyStrictSSL` setting when making SSL-enabled API calls to unpkg.com.

---

*Disclaimer: This extension is not affiliated with unpkg.com in any way. It simply utilizes the publically available unpkg.com API order to search for and fetch libraries from unpkg.com. All unpkg.com imagery is property of it's respective owners.*
