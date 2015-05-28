'use strict';

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
	.controller('GeoLocationCtrl', function() {

	});

var app = angular.module('GeoLocationApp', ['geoLocationForm']);