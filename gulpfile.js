const { src, dest, parallel, series, watch } = require('gulp');
const sync = require('browser-sync').create();
const scss = require('gulp-sass');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const fileinclude = require('gulp-file-include');
const ttf2woff2 = require('gulp-ttf2woff2');
const del = require('del');

const server = (done) => {
  sync.init({
    server: {
      baseDir: './dist',
    },
    notify: false,
    online: true,
  }),
    watch('./src/scss/**/*.scss', styles);
  watch('./src/index.html', htmlInclude);
  watch('./src/**/*.html', htmlInclude);
  watch('./src/img/*.png', imgToDist);
  watch('./src/img/*.jpg', imgToDist);
  watch('./src/img/*.jpeg', imgToDist);
  watch('./src/img/*.svg', imgToDist);
  watch('./src/fonts/*.ttf', fonts);
  watch('./src/js/**/*.js', scripts);
  done();
};

const styles = () => {
  return src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(
      scss({
        outputStyle: 'compressed',
      }).on('error', notify.onError())
    )
    .pipe(sourcemap.write('.'))
    .pipe(dest('dist/css'))
    .pipe(sync.stream());
};

const htmlInclude = () => {
  return src(['./src/**/*.html'])
    .pipe(
      fileinclude({
        prefix: '@',
        basepath: '@file',
      })
    )
    .pipe(dest('./dist'))
    .pipe(sync.stream());
};

const scripts = () => {
  return src('./src/js/*.js').pipe(dest('./dist/js')).pipe(sync.stream());
};

const imgToDist = () => {
  return src([
    './src/img/**/*.png',
    './src/img/**/*.jpg',
    './src/img/**/*.jpeg',
    './src/img/**/*.svg',
  ]).pipe(dest('./dist/img'));
};

const fonts = () => {
  return src('./src/fonts/*.ttf').pipe(ttf2woff2()).pipe(dest('./dist/fonts'));
};

const clean = () => {
  return del(['dist/*']);
};

exports.server = server;
exports.styles = styles;
exports.fonts = fonts;

exports.default = series(
  clean,
  parallel(htmlInclude, fonts, styles, imgToDist, scripts, server)
);
