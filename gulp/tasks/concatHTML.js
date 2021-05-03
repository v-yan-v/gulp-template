const {src, dest} = require('gulp')

const include = require('gulp-include')
const htmlValidator = require('gulp-w3c-html-validator')
const settings = require('../settings')

const htmlSource = settings.paths.templates.concat([
    'some/additional/files/*.html',
  ])

const concatHTML = () => {
  return src(htmlSource)
    .pipe(include())
    .on('error', console.log)
    .pipe(htmlValidator())
    .pipe(htmlValidator.reporter())
    .pipe(dest('build'))
}

module.exports = concatHTML