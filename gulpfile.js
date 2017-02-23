const gulp = require('gulp')
const pug = require('gulp-pug')
const less = require('gulp-less')

gulp.task('pug', () => {
  gulp.src('./src/*.jade')
    .pipe(pug())
    .pipe(gulp.dest('./'))
})

gulp.task('less', () => {
  gulp.src('./src/*.less')
    .pipe(less())
    .pipe(gulp.dest('./'))
})


gulp.task('dev', ['pug', 'less'], () => {
  gulp.watch('src/**/*', ['pug', 'less'])
})
