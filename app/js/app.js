'use strict';

angular.module('geoLocationService', ['ngResource'])
	.factory('findHostLocation', function($resource) {
		return $resource('http://freegeoip.net/json/:host');
	})
	.factory('findMyLocation', function($resource) {
		return $resource('http://ip-api.com/json/');
	});

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

var app = angular.module('geoLocationApp', ['geoLocationForm', 'geoLocationService']);