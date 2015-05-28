'use strict';

var gulp 		= require('gulp');
var sass 		= require('gulp-sass');
var browsersync = require('browser-sync');
var plumber 	= require('gulp-plumber');
var config 		= require('../../config');

gulp.task('sass', function() {
	var sassOptions = config.sass.options;

	sassOptions.onError = browsersync.notify;
	browsersync.notify('Compiling styles...');

	return gulp.src(config.sass.src)
		.pipe(plumber())
		.pipe(sass(sassOptions))
		.pipe(gulp.dest(config.sass.dest));
		
});