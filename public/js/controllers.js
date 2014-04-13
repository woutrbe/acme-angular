'use strict';

var acmeControllers = angular.module('acmeControllers', []);

acmeControllers.controller('MainCtrl', ['$scope', function($scope) {
	$scope.pending = [
		{
			type: 'birthday',
			name: 'birthday',
			msg: 'birthday msg',
			date: '2014-03-12'
		},
		{
			type: 'child',
			name: 'child',
			msg: 'birthday msg',
			date: '2014-03-12'
		}
	]
	$scope.processed = [
		{
			type: 'birthday',
			name: 'birthday',
			msg: 'birthday msg',
			date: '2014-03-12'
		}
	]

	$scope.init = function() {
		$scope.$on('showLogin', function(e) {
			$scope.$broadcast('showLoginForm');
		})
	}
	$scope.init();
}])

acmeControllers.controller('HeroCtrl', ['$scope', function($scope) {
	$scope.login = function(e) {
		e.preventDefault();

		$scope.class = 'hero__button--hide'
		$scope.$emit('showLogin');
	}
}])

acmeControllers.controller('LoginCtrl', ['$scope', function($scope) {
	$scope.init = function() {
		$scope.$on('showLoginForm', function(e) {
			$scope.class = 'hero__login--shown'
		})
	}

	$scope.login = function() {
		window.alert('login');
	}

	$scope.init();
}])

acmeControllers.controller('AppCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
	$scope.tabs = [
		{
			title: 'Pending',
			url: 'partials/pending.html',
			link: '#/home/pending',
			active: false
		},
		{
			title: 'Processed',
			url: 'partials/processed.html',
			link: '#/home/processed',
			active: false
		}
	]

	$scope.init = function() {
		var tab = _.find($scope.tabs, function(tab) {
			return tab.title.toLowerCase() === $routeParams.tab
		})

		if(!tab) tab = $scope.tabs[0];
		tab.active = true;

		$scope.containerContent = tab.url;
	}

	$scope.changeTab = function(e, url) {
		e.preventDefault();

		$scope.containerContent = url;
	}

	$scope.init();
}])

/* Controller for messages */
acmeControllers.controller('MsgCtrl', ['$scope', function($scope) {
	$scope.init = function() {
		var msg = $scope.msg;
		msg.msgClass = 'msg--' + msg.type;

		$scope.$on('saved', function(e) {
			console.log('Msg saved');
		})
	}

	// Open the message and load the correct partial
	$scope.open = function() {
		console.log('open');

		$scope.msgContent = 'partials/message/' + $scope.msg.type + '.html';
	}

	$scope.init();
}])

/* Controllers for specific message types */
acmeControllers.controller('MsgBirthdayCtrl', ['$scope', function($scope) {
	$scope.init = function() {
		console.log('MsgBirthdayCtrl');
	}
	$scope.init();
}])
acmeControllers.controller('MsgChildCtrl', ['$scope', function($scope) {
	$scope.init = function() {
		console.log('MsgChildCtrl');

		// $scope.$emit('saved');
	}
	$scope.init();
}])