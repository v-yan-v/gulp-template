const settings = require('../settings')

const {src, dest} = require('gulp')
const preprocessor = settings.preprocessor === 'css' ? 'css' : require('gulp-' + settings.preprocessor)
const include = require('gulp-include')
const plumber = require("gulp-plumber");
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const shorthand = require('gulp-shorthand')


const vanillaCSS = () => {
  return src(settings.paths.styles)
    .pipe(sourcemaps.init())
    .pipe(include())
    .on('error', console.log)
    .pipe(concat('styles.min.css')) // тут ещё не минифицирован, просто сразу имя дали
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(shorthand()) // обобщаем стили типа font-*** в одну строку
    .pipe(cleanCSS({level: 2})) // что-то у меня подозрения что опции не работают
    .pipe(sourcemaps.write('.'))
    .pipe(dest(settings.paths.css))
}

const doCSS = () => {
  return src(settings.paths.styles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(include())
    .on('error', console.log)
    .pipe(preprocessor())
    .pipe(concat('styles.min.css')) // тут ещё не минифицирован, просто сразу имя дали
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(shorthand()) // обобщаем стили типа font-*** в одну строку
    .pipe(cleanCSS({level: 2})) // что-то у меня подозрения что опции не работают
    .pipe(sourcemaps.write('.'))
    .pipe(dest(settings.paths.css))
}

module.exports = preprocessor === 'css' ? vanillaCSS : doCSS