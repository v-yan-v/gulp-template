const {src, dest} = require('gulp')
const settings = require('../settings')

const source = settings.paths.fontsSrc

const fonts = () => {
  return src(source)
    .pipe(dest(settings.paths.fonts))
}

module.exports = fonts