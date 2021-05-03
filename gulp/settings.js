// settings for gulp tasks

// set up output dir
const output = 'build'

// set up the preprocessor (file extension) for css - css|less|scss|sass or whatever you use
const preprocessor = 'sass'

// set up template engine
const engine = 'pug'
const engineExt = 'pug'

const paths = {
  // Output dirs
  html: output,
  css: output + '/css',
  js: output + '/js',
  fonts: output + '/fonts',
  img: output + '/img',
  
  // Sources dirs
  templates: ['src/pages/**/*.' + engineExt, '!src/pages/common/**/*.' + engineExt, '!src/pages/includes/**/*.' + engineExt],
  styles: ['src/styles/*.' + preprocessor],
  scripts: ['src/scripts/*.js'],
  fontsSrc: ['src/fonts/*'],
  images: ['src/images/**/*'],
}

module.exports = {
  preprocessor,
  engine,
  engineExt,
  paths,
}