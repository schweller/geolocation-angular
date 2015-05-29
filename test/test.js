describe('Hello world example', function() {

	beforeEach(angular.mock.module('geoLocationForm'));

	var scope,
		ctrl;

	beforeEach(inject(function ($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('GeoLocationCtrl', {
				$scope: scope
			}
		);
	}));

	it('says hello world!', function() {
		expect(scope.greeting).toEqual("Hello world!");
	});

});