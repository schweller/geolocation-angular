describe('geoLocationApp - Testing Controller', function() {

	beforeEach(module('geoLocationApp'));

	var $rootScope,
		$scope,
		$controller,
		GeoLocationCtrl;

	beforeEach(inject(function(_$rootScope_, _$controller_) {
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$controller = _$controller_;

			GeoLocationCtrl = $controller('GeoLocationCtrl', {
				$scope: $scope
			});
		}
	));

	it('should exist controller', function() {
		expect(GeoLocationCtrl).toBeDefined();
	});

	it('should exist getHostLocation method', function() {
		expect(GeoLocationCtrl.getHostLocation()).toBeDefined();
	});	

	it('should exist getMyLocation method', function() {
		expect(GeoLocationCtrl.getMyLocation()).toBeDefined();
	});

	it('should request return JSON', inject(function($rootScope, $controller, $httpBackend) {
		var searchTestAtr = "www.google.com";
		var response = $httpBackend.expectJSONP('http://freegeoip.net/json/' + searchTestAtr + '');
		response.respond(null);
	}));

	it('should request return JSON', inject(function($rootScope, $controller, $httpBackend) {
		var response = $httpBackend.expectJSONP('http://ip-api.com/json/');
		response.respond(null);
	}));	

});

describe('geoLocationApp - Testing Services', function () {
	var hostLocation,
		myLocation,
	  	httpBackend;

	beforeEach(function (){  
		module('geoLocationApp');

		inject(function($httpBackend, _findHostLocation_, _findMyLocation_) {
			hostLocation = _findHostLocation_;
			myLocation = _findMyLocation_;      
			httpBackend = $httpBackend;
		});

	});

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});


	it('should get my location data and be equal', function (){
		var returnData = {"as":"AS28573 Serviços de Comunicação S.A.","city":"Rio de Janeiro","country":"Brazil","countryCode":"BR","isp":"Virtua","lat":-22.9,"lon":-43.2333,"org":"Virtua","query":"179.210.10.144","region":"RJ","regionName":"Rio de Janeiro","status":"success","timezone":"America/Sao_Paulo","zip":"22240"};

		httpBackend.expectGET('http://ip-api.com/json/').respond(returnData);

		var returnedPromise = myLocation.getLocation();

		var result;
		returnedPromise.then(function(response) {
			result = response;
		});

		httpBackend.flush();

		expect(result.data).toEqual(returnData);
	});	

	it('should get host location data and be equal', function (){
		var returnData = {"ip":"184.168.38.32","country_code":"US","country_name":"Estados Unidos","region_code":"AZ","region_name":"Arizona","city":"Scottsdale","zip_code":"85260","time_zone":"America/Phoenix","latitude":33.612,"longitude":-111.891,"metro_code":753};

		httpBackend.expectGET('http://freegeoip.net/json/www.google.com').respond(returnData);

		var returnedPromise = hostLocation.getLocation('www.google.com');

		var result;
		returnedPromise.then(function(response) {
			result = response;
		});

		httpBackend.flush();

		expect(result.data).toEqual(returnData);
	});

});