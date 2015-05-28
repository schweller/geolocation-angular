'use strict';

var src = 'app';
var sassSrc = 'app/sass/**/*.scss';
var sassDest = 'app/css/';

module.exports = {
	browsersync: {
		development: {
			server: {
				baseDir: src
			},
			port: 9999
		}
	},
	sass: {
		src: sassSrc,
		dest: sassDest,
		options: {}
	},
	watch: {
		sass: sassSrc,
		html: src + '/*.html'
	}
}