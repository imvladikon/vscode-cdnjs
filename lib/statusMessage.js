'use strict'

const vscode = require('vscode')
const settings = require('../settings')

// Set consistent status bar message using timeout with either promise or time in milliseconds
module.exports = (text, promise) => {
  if (promise) {
    vscode.window.setStatusBarMessage('unpkg: ' + text, promise)
  } else {
    vscode.window.setStatusBarMessage('unpkg: ' + text, settings.statusBarMessageTimeout)
  }
}
