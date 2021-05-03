
const { parallel, series, } = require('gulp')

const settings = require('./gulp/settings')

const concatHTML = require('./gulp/tasks/concatHTML.js')
const template2html = require('./gulp/tasks/template2html')
const styles = require("./gulp/tasks/styles");
const scripts = require("./gulp/tasks/scripts")
const images = require("./gulp/tasks/images")
const runServ = require("./gulp/tasks/server")
const del = require("del")
const fonts = require("./gulp/tasks/fonts")

function setMode(isProduction = false) {
  return cb => {
    process.env.NODE_ENV = isProduction ? 'production' : 'development'
    // не забыть вызвать функцию-callback, которая сообщит gulp, что задача выполнена.
    cb()
  }
}

const doHTML = settings.engine === 'html' ? concatHTML : template2html

const dev = parallel(doHTML, styles, images.minify, scripts, fonts)

const clean = (cb) => {
  // удаляем результирующую папку
  return del(settings.output + '/**/*', {force: true}).then(() => {cb()})
}

/**
 * описываем "публичные" задачи
 * для этого прописываем их в экспорте присвоив им именованную функцию
 * module.exports.taskName = task
 * module.exports.taskName = series(task1, task2, ...)
 * */

// separate tasks
module.exports.doHtml = doHTML
module.exports.doCSS = styles
module.exports.doJS = scripts
module.exports.doImg = images.minify
module.exports.cleanImg = images.cleanImg
module.exports.doFonts = fonts

// complex tasks
// module.exports.default = runServ
module.exports.start = series(setMode(), clean, dev, runServ)
module.exports.dev = dev
module.exports.build = series(setMode(true), clean, dev)
