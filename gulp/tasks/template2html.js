const settings = require('../settings')

const { src, dest } = require('gulp')
const engine = require('gulp-' + settings.engine)
const pugLinter = require('gulp-pug-linter')
const plumber = require('gulp-plumber')
const htmlValidator = require('gulp-w3c-html-validator')

const sources = settings.paths.templates.concat([
    'some/additional/path/*.' + settings.engineExt,
  ])

const template2html = () => {
  return src(sources)
    .pipe(plumber())
    .pipe(pugLinter({reporter: 'default'}))
    .pipe(engine())
    .pipe(htmlValidator())
    .pipe(htmlValidator.reporter())
    .pipe(dest(settings.paths.html))
}

module.exports = template2html