var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    jade = require('gulp-jade'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass');


/**
 * browser-sync task
 */
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./app/"
        }
    });
});


/**
 * Script task
 */
gulp.task('script', function(){
 gulp.src(['./app/assets/js/**/*.js', '!app/assets/js/**/*.min.js'])
     .pipe(plumber())
     .pipe(rename({suffix:'.min'}))
     .pipe(uglify())
     .pipe(gulp.dest('./app/assets/js'))
     .pipe(reload({stream:true}));
});


/**
 * Sass task
 */
gulp.task('sass', function(){
  gulp.src('./app/assets/sass/main.scss')
      .pipe(plumber())
      .pipe(sass({
        includePaths: ['css'],
      }))
      .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
      .pipe(gulp.dest('./app/assets/sass'))
      .pipe(reload({stream:true}));
});


/**
 * Jade task
 */
gulp.task('jade', function(){
  return gulp.src('app/*.jade')
          .pipe(plumber())
          .pipe(jade())
          .pipe(gulp.dest('app'))
          .pipe(reload({stream:true}));
});


/**
 * Watch task
 */
gulp.task('watch', function () {
    gulp.watch('app/assets/sass/**', ['sass']);
    gulp.watch('app/assets/js/**', ['script']);
    gulp.watch('app/**/*.jade', ['jade']);
});

/**
 * default task
 */
gulp.task('default', ['browser-sync', 'watch']);
