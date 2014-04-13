'use strict';

var acmeApp	= angular.module('acme', [
	'ngRoute',
	'ngCookies',

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