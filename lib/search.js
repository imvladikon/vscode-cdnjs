'use strict'

const vscode = require('vscode')
const Cache = require('vscode-cache')

// const statusMessage = require('./statusMessage')

const settings = require('../settings')

// Perform search on unpkg.com and return JSON results
module.exports = async term => {
  term = term.trim()

  // Ignore empty searches
  if (!term.length) {
    const message = `unpkg: No search term provided`
    vscode.window.showInformationMessage(message)
    console.debug(message)
    return false
  }

  // Cache settings
  let searchCache = new Cache(settings.context, 'search')
  let cacheTime = vscode.workspace.getConfiguration('unpkg').get('cacheTime')

  // Get the http configuration settings
  const http = vscode.workspace.getConfiguration('http')

  const got = require('got')

  // Start progress
  return vscode.window.withProgress({
    title: `unpkg: Searching for ${term}`,
    location: vscode.ProgressLocation.Notification,
    cancellable: true
  }, async (progress, token) => {
    token.onCancellationRequested(() => {
      console.debug('unpkg: Search was cancelled by user')
      return Promise.resolve()
    })

    // Check the cache
    if (searchCache.has(term)) {
      return searchCache.get(term)
    }

    // Search for libraries
    let res = await got(`${settings.searchUrl}text=${term}`, {
      json: true,
      timeout: settings.httpRequestTimeout,
      rejectUnauthorized: http.get('proxyStrictSSL')
    })

    // Reject error if bad request
    if (res.statusCode !== 200) {
      const message = `unpkg: An error occurred while searching`
      vscode.window.showErrorMessage(message)
      console.error(new Error(message))
      return false
    }
    res.body.results = res.body.objects;
    delete res.body.objects;
    // Display error message if no results were found
    if (!res.body.results || res.body.results.length === 0) {
      const message = `unpkg: Search for "${term}" yielded no results`
      vscode.window.showInformationMessage(message)
      return false
    }
    res.body.results.forEach(element => {
      Object.keys(element.package).forEach(function (key) {
        element[key] = element.package[key];
      });
      delete element.package;
    });
    res.body.results.sort((el1, el2) => el2.searchScore - el1.searchScore);
    // Cache search results
    searchCache.put(term, res.body.results, cacheTime)

    return res.body.results
  })
}
