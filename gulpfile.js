var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat');

gulp.task('coffee', function() {
    gulp.src('components/coffee/tagline.coffee')
    .pipe(coffee({bare: true})
          .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))  
    
});

gulp.task('scripts', function() {
  return gulp.src('./components/scripts/*.js')
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest('build/development/js'));
});