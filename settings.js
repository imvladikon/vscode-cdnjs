'use strict'

const vscode = require('vscode')

let settings = {}

settings.baseUrl = 'http://registry.npmjs.com'
settings.searchUrl = settings.baseUrl + '/-/v1/search?'
settings.embedUrl = 'unpkg.com'
settings.httpRequestTimeout = 5000
settings.statusBarMessageTimeout = 5000
settings.config = vscode.workspace.getConfiguration('unpkg')
settings.quoteStyles = {
  'single': "'",
  'double': '"'
}
settings.protocols = ['https://', 'http://', '//']

settings.searchPlaceholders = [
  'jquery',
  'bootstrap',
  'angular',
  'react',
  'leaflet',
  'backbone',
  'd3',
  'ember',
  'slick',
  'knockout',
  'lodash',
  'vue'
]

module.exports = settings
