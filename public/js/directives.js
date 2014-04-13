'use strict';

var acmeDirectives = angular.module('acmeDirectives', []);

acmeDirectives.directive('msgTpl', function() {
	return {
		restrict: 'A',
		templateUrl: 'msg.html'
	}
})
acmeDirectives.directive('resize', ['$window', function($window) {
	return {
		link: function(scope, elem, attrs) {
			scope.onResize = function() {
				var header = document.getElementsByTagName('header')[0];
				scope.windowHeight = $window.innerHeight - header.clientHeight;
			}
			scope.onResize();

			angular.element($window).bind('resize', function() {
				scope.onResize();
				scope.$apply();
			})
		}
	}
}])