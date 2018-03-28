const gulp = require('gulp')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('pug', () => {
  let now = Date.now()
  gulp.src('./index.pug')
    .pipe(pug())
    .pipe(gulp.dest('../'))
})

gulp.task('sass', () => {
  gulp.src('./style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
			cascade: false
    }))
    .pipe(gulp.dest('../'))
})

gulp.task('watch', ['build'], () => {
  gulp.watch('./**/*.pug', ['pug'])
  gulp.watch('./**/*.scss', ['sass'])
})

gulp.task('build', ['pug', 'sass'])
