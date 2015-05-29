'use strict';

var regex = /^(?!www | www\.)[A-Za-z0-9_-]+\.+[A-Za-z0-9.\/%&=\?_:;-]+$/;
var mapboxToken = 'pk.eyJ1IjoiaXNjbWVuZG9uY2EiLCJhIjoiZDhiYzNiNDA3Njc1OTU1ZWJiYWZiZTFlZTkxNWE2NWEifQ.jkjIWUB1_ShShM0M1xZBMA';

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
	.controller('GeoLocationCtrl', ['$scope', 'findHostLocation', 'findMyLocation', function($scope, findHostLocation, findMyLocation) {

		var myLocationMarker,
			hostLocation,
			map;

		this.mylocation = {};

		this.loadMap = function() {
			L.mapbox.accessToken = mapboxToken;
			map = L.mapbox.map('map', 'mapbox.streets')
			    .setView([40, -74.50], 9);
		};

		this.getHostLocation = function() {
			findHostLocation.get({ host: this.host }, function(response) {
				map == undefined ? $scope.ctrl.loadMap() : false;
				$scope.ctrl.addHostLocationToMap(response);
			});
		};

		this.getMyLocation = function() {
			findMyLocation.get({}, function(response) {
				map == undefined ? $scope.ctrl.loadMap() : false;
				$scope.ctrl.updateMyLocationData(response);
				$scope.ctrl.addMyLocationToMap(response);
			});
		};

		this.resetMyLocation = function() {
			var emptyData = {};
			myLocationMarker != null ? map.removeLayer(myLocationMarker) : false;
			myLocationMarker = null;
			$scope.ctrl.updateMyLocationData(emptyData);		
		}

		this.addMyLocationToMap = function(data) {

			if (myLocationMarker == null) {
				myLocationMarker = L.marker(
					[data.lat, data.lon],
					{
						title: 'Your estimated location'
					}
				);

				myLocationMarker.addTo(map);
				map.setView([data.lat, data.lon], 13);
			};

		};

		this.addHostLocationToMap = function(data) { 
			hostLocation = L.mapbox.featureLayer({
			    // this feature is in the GeoJSON format: see geojson.org
			    // for the full specification
			    type: 'Feature',
			    geometry: {
			        type: 'Point',
			        // coordinates here are in longitude, latitude order because
			        // x, y is the standard for GeoJSON and many formats
			        coordinates: [
			          data.longitude,
			          data.latitude 
			        ]
			    },
			    properties: {
			        title: this.host + ' estimated location',
			        // one can customize markers by adding simplestyle properties
			        // https://www.mapbox.com/guides/an-open-platform/#simplestyle
			        'marker-size': 'large',
			        'marker-color': '#BE9A6B',
			        'marker-symbol': 'circle-stroked'
			    }
			});
			hostLocation.addTo(map);
			map.setView([data.latitude, data.longitude], 13);

		};

		this.updateMyLocationData = function(data) {
			this.mylocation = data;
		}

	}]);

var app = angular.module('geoLocationApp', ['geoLocationForm', 'geoLocationService', 'urlValidation']);