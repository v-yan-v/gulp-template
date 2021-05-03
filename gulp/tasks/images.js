const settings = require('../settings')
const {src, dest} = require('gulp')
const newer = require('gulp-newer')
const imagemin = require('gulp-imagemin')
const del = require('del')

const sources = settings.paths.images

const images = () => {
  return src(sources) // Берём все изображения из папки источника
    .pipe(newer(settings.paths.img)) // Проверяем, было ли изменено (сжато) изображение ранее
    .pipe(imagemin()) // Сжимаем и оптимизируем изображения
    .pipe(dest(settings.paths.img)) // Выгружаем оптимизированные изображения в папку назначения
}

const cleanImg = (cb) => {
  // Удаляем всё содержимое папки "build/img"
  return del(settings.paths.img + '/**/*', {force: true}).then(() => {cb()})
}

module.exports.minify = images
module.exports.cleanImg = cleanImg