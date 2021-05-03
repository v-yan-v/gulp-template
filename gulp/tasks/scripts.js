const {src, dest} = require('gulp')
const settings = require('../settings')
const plumber = require('gulp-plumber')
const sourcemaps = require("gulp-sourcemaps")
const include = require('gulp-include')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const terser = require('gulp-terser')

// const CircularDependencyPlugin = require('circular-dependency-plugin')
// const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin")

const sources = [].concat(
  ['some/vendor/plugins/*.min.js',],
  settings.paths.scripts,
  ['other/plugins/*.js'],
)

const scripts = () => {
  return src(sources)
    // .pipe(eslint())
    // .pipe(eslint.format())
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(include())
    .on('error', console.log)
    .pipe(concat('scripts.min.css')) // тут ещё не минифицирован, просто сразу имя дали
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(settings.paths.js))
}

module.exports = scripts