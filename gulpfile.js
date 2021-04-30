
const { series, dest, src } = require('gulp')

// const html = require('./gulp/tasks/concatHTML')
const pug2html = require('./gulp/tasks/pug2html')

function setMode(isProduction = false) {
  return cb => {
    process.env.NODE_ENV = isProduction ? 'production' : 'development'
    // не забыть вызвать функцию-callback, которая сообщит gulp, что задача выполнена.
    cb()
  }
}

/**
 * описываем "публичные" задачи
 * для этого прописываем их в экспорте присвоив им именованную функцию
 * module.exports.taskName = task
 * module.exports.taskName = series(task1, task2, ...)
 * */

// module.exports.doHtml = html
module.exports.doPug = pug2html
