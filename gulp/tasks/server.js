const {watch, series,  src} = require('gulp')
const settings = require('../settings')

const images = require('./images')
// const svgSprite = require('./svgSprite')
const styles = require('./styles')
const template2html = require('./template2html')
const scripts = require('./scripts')
const concatHTML = require("./concatHTML")
const fonts = require("./fonts")
// const copyDependencies = require('./copyDependencies')

const server = require('browser-sync').create()

function readyReload(cb) {
  server.reload()
  cb()
}

const runServ = (cb) => {
  server.init({
    server: settings.paths.html,
    notify: false,
    cors  : true,
    https: true,
    open: false,
    reloadOnRestart: true,
    scrollThrottle: 300, // only send scroll events every 300 milliseconds
    host: "192.170.150.230", // Override host detection if you know the correct IP to use
  })
  
  watch('src/pages/**/*', series(
    settings.engine === 'html' ? concatHTML : template2html,
    readyReload
  ))
  watch('src/styles/**/*', series(styles, cb => src(settings.paths.css).pipe(server.stream()).on('end', cb)))
  watch(settings.paths.scripts, series(scripts, readyReload))
  watch(settings.paths.images, series(images.minify, readyReload))
  watch(settings.paths.fontsSrc, series(fonts, readyReload))
  // watch('src/img/sprite/*.svg', series(svgSprite, readyReload))
  
  // watch('package.json', series(copyDependencies, readyReload))
  
  return cb()
}

module.exports = runServ