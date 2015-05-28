'use strict';

var regex = /^(?!www | www\.)[A-Za-z0-9_-]+\.+[A-Za-z0-9.\/%&=\?_:;-]+$/;
var mapboxToken = 'pk.eyJ1IjoiaXNjbWVuZG9uY2EiLCJhIjoiZDhiYzNiNDA3Njc1OTU1ZWJiYWZiZTFlZTkxNWE2NWEifQ.jkjIWUB1_ShShM0M1xZBMA';

$(document).ready(function() {
	L.mapbox.accessToken = mapboxToken;
	var map = L.mapbox.map('map', 'mapbox.streets')
	    .setView([40, -74.50], 9);
});

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

		this.mylocation = {};

		this.getHostLocation = function() {
			console.log(this.host);
			findHostLocation.get({ host: this.host }, function(response) {
				console.log(response);
			});
		};

		this.getMyLocation = function() {
			findMyLocation.get({}, function(response) {
				console.log(response);
				$scope.ctrl.updateMyLocationData(response);
			});
		};

		this.updateMyLocationData = function(data) {
			this.mylocation = data;
		}

	});

var app = angular.module('geoLocationApp', ['geoLocationForm', 'geoLocationService', 'urlValidation']);