// Convert pug to html
const { src, dest } = require('gulp')
const pug = require('gulp-pug')
const pugLinter = require('gulp-pug-linter')
const plumber = require('gulp-plumber')
const htmlValidator = require('gulp-w3c-html-validator')

const pugSource = [
    'src/pages/**/*.pug',
    '!src/pages/common/**/*.pug',
    '!src/pages/includes/**/*.pug',
  ]

const pug2html = () => {
  return src(pugSource)
    .pipe(plumber())
    .pipe(pugLinter({reporter: 'default'}))
    .pipe(pug())
    .pipe(htmlValidator())
    .pipe(htmlValidator.reporter())
    .pipe(dest('build/'))
}

module.exports = pug2html