'use strict';

var gulp = require('gulp'),
  amdOptimize = require('amd-optimize'),
  concat = require('gulp-concat'),
  eventStream = require('event-stream'),
  del = require('del'),
  order = require('gulp-order'),
  license = require('gulp-license'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');

gulp.task('build', ['clean'], function() {
  return eventStream.merge(
      gulp.src('node_modules/almond/almond.js'),
      gulp.src('src/*.js').pipe(amdOptimize('main'))
    )
    .pipe(order(['**/almond.js', '**/main.js']))
    .pipe(concat('jsgameboy.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(license('gpl3', {
      project: 'Javascript Game Boy Emulator',
      tiny: true,
      year: 2014,
      organization: 'Claudemiro Alves Feitosa Neto <dimiro1@gmail.com>'
    }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  del('dist');
});

gulp.task('default', function() {
  gulp.start('build');
});
