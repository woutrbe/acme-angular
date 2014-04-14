'use strict';

var acmeApp	= angular.module('acme', [
	'ngRoute',
	'ngCookies',

	'ui.bootstrap',

	'acmeControllers',
	'acmeDirectives'
])

acmeApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/login', {
				templateUrl: 'partials/hero.html'
			})
			.when('/home', {
				templateUrl: 'partials/app.html'
			})
			.when('/home/:tab', {
				templateUrl: 'partials/app.html'
			})
			.otherwise({
				redirectTo: '/login'
			})
	}
])