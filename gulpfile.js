const gulp = require('gulp')
const pug = require('gulp-pug')
const stylus = require('gulp-stylus')

gulp.task('pug', () => {
  gulp.src('./src/*.jade')
    .pipe(pug())
    .pipe(gulp.dest('./'))
})

gulp.task('stylus', () => {
  gulp.src('./src/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./'))
})


gulp.task('dev', ['pug', 'stylus'], () => {
  gulp.watch('src/**/*', ['pug', 'stylus'])
})
