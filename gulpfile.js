var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');

var sassSources = ['components/sass/style.scss'];

var coffeeSources = ['components/coffee/tagline.coffee'];

var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

var htmlSources = ['build/development/*.html'];

var jsonSources = ['build/development/js/*.json'];

gulp.task('coffee', function() {
    gulp.src(coffeeSources)
    .pipe(coffee({bare: true})
          .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))  
    
});

gulp.task('scripts', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest('build/development/js'))
    .pipe(connect.reload())
});


gulp.task('compass', function() {
  gulp.src(sassSources)
  .pipe(compass({
      sass: 'components/sass',
      image: 'build/development/images',
      style: 'expanded'
  }))
    .on('error', gutil.log)
    .pipe(gulp.dest('build/development/css'))
    .pipe(connect.reload())
});

gulp.task('connect', function() {
    connect.server({
    root: 'build/development/',
    livereload: true
  });   
});

gulp.task('html', function() {
     gulp.src(htmlSources)
        .pipe(connect.reload())
 
});

gulp.task('json', function() {
     gulp.src(jsonSources)
        .pipe(connect.reload())
 
});

gulp.task('watch', function() {
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['scripts']);
    gulp.watch(htmlSources, ['html']);
    gulp.watch(jsonSources, ['json']);
    gulp.watch('components/sass/*.scss', ['compass']);
});

gulp.task('default', ['html', 'json', 'coffee', 'scripts', 'compass', 'connect', 'watch']);
