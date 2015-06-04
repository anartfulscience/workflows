var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat');

var sassSources = ['components/sass/style.scss'];

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
    .pipe(gulp.dest('build/development/js'))
});


gulp.task('compass', function() {
  gulp.src(sassSources)
  .pipe(compass({
      sass: 'components/sass',
      image: 'build/development/images',
      style: 'expanded'
  }))
    .pipe(concat('script.js'))
    .on('error', gutil.log)
    .pipe(gulp.dest('build/development/js'))
});
