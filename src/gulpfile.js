const gulp = require('gulp')
const pug = require('gulp-pug')
const less = require('gulp-less')
const LessAutoprefix = require('less-plugin-autoprefix')

gulp.task('pug', () => {
  gulp.src('./index.pug')
    .pipe(pug({
      data: {
        updatedAt: Date.now()
      }
    }))
    .pipe(gulp.dest('../'))
})

gulp.task('less', () => {
  gulp.src('./style.less')
    .pipe(less({
      plugins: [
        new LessAutoprefix({ browsers: ['last 2 versions'] })
      ]
    }))
    .pipe(gulp.dest('../'))
})

gulp.task('watch', ['build'], () => {
  gulp.watch('./**/*.pug', ['pug'])
  gulp.watch('./**/*.less', ['less'])
})

gulp.task('build', ['pug', 'less'])
