//////////////
// INCLUDES //
//////////////

// Include Gulp and plugins
'use strict';
var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var changed      = require('gulp-changed');
var clean        = require('gulp-clean');
var concat       = require('gulp-concat');
var modRewrite   = require('connect-modrewrite');
var rename       = require('gulp-rename');
var runSequence  = require('run-sequence');
var sass         = require('gulp-sass');
var uncss        = require('gulp-uncss');
var source       = require('vinyl-source-stream');
var uglify       = require('gulp-uglify');
var util         = require('gulp-util');
var watchify     = require('watchify');

// BrowserSync
// ---------------
// Syncs page navigation and scrolling between connected browsers
// Injects CSS into connected browsers when changes are detected
gulp.task('watch', function(){
  browserSync.init({
    server: {
      baseDir: "./build",
      middleware: [
        modRewrite([
          '^[^\\.]*$ /index.html [L]'
        ])
      ]
    },
    port: 4000,
    open: true
  });
  gulp.watch('./app/**/*.html', function() {
    browserSync.reload('./build/**/*.html');
  });
  gulp.watch('./app/assets/scripts/*.js', function() {
    browserSync.reload('./build/**/*.js');
  });
});

// Gulp Clean
// ---------------
// Cleans out the build folder before anything
// happens to make sure that all of the files are updated

gulp.task('clean', function(){
  return gulp.src('./build').pipe(clean());
});

// Gulp Sass
// ---------------
// Outputs style.css file from source style.scss file

gulp.task('sass', function(){
  gulp.src('./app/assets/styles/style.scss')
    .pipe(sass({ errLogToConsole: true, style: 'expanded' }))
    .pipe(concat('style.css'))
        .pipe(uncss({
            html: ['http://localhost:4000/'],
            report: true
        }))
    .pipe(gulp.dest('./build/assets/styles/'))
    .pipe(browserSync.stream());
});

gulp.task('vendor-styles', function() {
  gulp.src('./app/assets/vendor/styles/*.css')
    .pipe(concat('vendor-styles.css'))
    .pipe(gulp.dest('./build/assets/vendor/styles/'));
});

// Gulp JS
// ---------------
// Outputs bundle file from source js files

gulp.task('scripts', function(){
  gulp.src('./app/assets/scripts/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./build/assets/scripts/'));
});

gulp.task('vendor-scripts', function() {
  gulp.src('./app/assets/vendor/scripts/*.js')
    .pipe(concat('vendor-scripts.js'))
    .pipe(gulp.dest('./build/assets/vendor/scripts/'));
});

// Pipe Files
// ---------------
// Pipes all of the extra files to their build location

gulp.task('pipe-html', function(){
  gulp.src('./app/*.html')
    .pipe(gulp.dest('./build/'));
});

gulp.task('pipe-img', function(){
  gulp.src('./app/assets/img/*')
    .pipe(gulp.dest('./build/assets/img/'));
});

gulp.task('pipe-vendor-fonts', function(){
  gulp.src('./app/assets/vendor/fonts/*')
    .pipe(gulp.dest('./build/assets/vendor/fonts/'));
});

gulp.task('pipe-files', function(){
  gulp.run('pipe-html');
  gulp.run('pipe-img');
  gulp.run('pipe-vendor-fonts');
});

gulp.task('gulp', function(callback) {
  runSequence('clean',
              'pipe-files',
              'sass',
              'vendor-styles',
              'scripts',
              'vendor-scripts',
              'watch', callback);
});

/////////////////
// TASK RUNNER //
/////////////////

// run all the tasks
gulp.task('default', [
  'gulp'
], function() {

// watch for CSS changes
gulp.watch('./app/**/*.scss', function() {
  gulp.run('sass');
});

// watch for HTML changes
gulp.watch('./app/**/*.html', function() {
  gulp.run('pipe-html');
});

// watch for JS changes
gulp.watch('./app/**/*.js', function() {
  gulp.run('scripts');
  gulp.run('vendor-scripts');
});

});
