'use strict';

var gulp 	= require('gulp');
var browsersync = require('browser-sync');
var config	= require('../../config').watch;

gulp.task('watch', ['browsersync'], function() {

	gulp.watch(config.sass,	['sass', browsersync.reload]);
	gulp.watch(config.html, browsersync.reload);

});