'use strict'

const vscode = require('vscode')
const settings = require('../settings')
// Show library version picker
module.exports = async library => {
  // Build array of library versions
  let items = []
  for (let asset of library.assets) {
    // QuickPickItem for the library version
    let item = {
      label: asset.version,
      files: asset.files,
      version: asset.version,
      libraryName: library.name
    }

    // Add description if this is the current/latest/stable version
    if (asset.version === library.version) {
      item.description = 'current version'
    }
    items.push(item)
  }

  // Show QuickPick of library versions
  let asset = await vscode.window.showQuickPick(items, {
    placeHolder: `${library.name} (${items.length} versions)`
  })
  const http = vscode.workspace.getConfiguration('http')
  const got = require('got')
  let res = await got('unpkg.com' + '/' + asset.libraryName
    + '@' + asset.version + '/?meta', {
    json: true,
    timeout: settings.httpRequestTimeout,
    rejectUnauthorized: http.get('proxyStrictSSL')
  })
  // No version was chosen
  if (typeof (asset) === 'undefined') {
    return false
  }
  let getFiles = (obj, acc) => {
    if (!Array.isArray(obj) || !obj.length) {
      return acc;
    }
    acc = acc.concat(obj
        .filter(e => e.type == "file" && e.contentType == "application/javascript")
        .flatMap(e => e.path.startsWith('/') ? e.path.substring(1) : e.path));
    return acc.concat(obj
        .filter(el => el.type == "directory")
        .flatMap(el => getFiles(el.files, [])));
  }
  delete asset.files
  asset.files = getFiles(res.body.files, [])
  return asset
}
