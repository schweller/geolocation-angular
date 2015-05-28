'use strict';
//var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
var regex = /^(?!www | www\.)[A-Za-z0-9_-]+\.+[A-Za-z0-9.\/%&=\?_:;-]+$/;

angular.module('geoLocationService', ['ngResource'])
	.factory('findHostLocation', function($resource) {
		return $resource('http://freegeoip.net/json/:host');
	})
	.factory('findMyLocation', function($resource) {
		return $resource('http://ip-api.com/json/');
	});

angular.module('urlValidation', [])
	.directive('validUrl', function() {
		return {
			require: "ngModel",
			link: function(scope, elm, attrs, ctrl) {
				var expression = regex;
				var validator = function(value) {
					ctrl.$setValidity('validUrl', expression.test(value));
					return value;
				};

				ctrl.$parsers.unshift(validator);
				ctrl.$formatters.unshift(validator);
			}
		};
	})

angular.module('geoLocationForm', [])
	.directive('locationForm', function() {
		return {
			scope: {},
			templateUrl: '../partials/location_form.html',
			replace: true,
			controller: 'GeoLocationCtrl',
			controllerAs: 'ctrl'
		};
	})
	.controller('GeoLocationCtrl', function($scope, findHostLocation, findMyLocation) {

		this.getHostLocation = function() {
			console.log(this.host);
			findHostLocation.get({ host: this.host }, function(response) {
				console.log(response);
			});
		};

		this.getMyLocation = function() {
			findMyLocation.get({}, function(response) {
				console.log(response);
			});
		};

	});

var app = angular.module('geoLocationApp', ['geoLocationForm', 'geoLocationService', 'urlValidation']);