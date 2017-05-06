const cwd = __dirname + '/cwd'
const rimraf = require('rimraf')
rimraf.sync(cwd)
require('mkdirp').sync(cwd)
process.on('exit', _ => rimraf.sync(cwd))
const path = require('path')
const file = process.argv[2] || path.resolve(__dirname, '../npm.tar')

const tar = require('../..')
const start = process.hrtime()
tar.x({
  file: file,
  sync: true,
  cwd: cwd
})

const end = process.hrtime(start)
const ms = Math.round(end[0]*1e6 + end[1]/1e3)/1e3
const s = Math.round(end[0]*10 + end[1]/1e8)/10
const ss = s <= 1 ? '' : ' (' + s + 's)'
console.error('%d%s', ms, ss)
