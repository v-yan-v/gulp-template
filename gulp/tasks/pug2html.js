// Convert pug to html
const gulp = require('gulp')
const pug = require('gulp-pug')

const pug2html = () => {
  return gulp.src([
    'src/pages/**/*.pug',
    '!src/pages/common/**/*.pug',
    '!src/pages/includes/**/*.pug',
  ])
    .pipe(pug())
    .pipe(gulp.dest('build/'))
}

module.exports = pug2html