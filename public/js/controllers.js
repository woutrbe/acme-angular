'use strict';

var acmeControllers = angular.module('acmeControllers', []);

acmeControllers.controller('MainCtrl', ['$scope', function($scope) {
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

acmeControllers.controller('LoginCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.init = function() {
		$scope.$on('showLoginForm', function(e) {
			$scope.class = 'hero__login--shown'
		})
	}

	$scope.login = function() {
		$location.path('/home');
	}

	$scope.init();
}])

acmeControllers.controller('AppCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
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
		$scope.pending = [];
		$scope.processed = [];

		var tab = _.find($scope.tabs, function(tab) {
			return tab.title.toLowerCase() === $routeParams.tab
		})

		if(!tab) tab = $scope.tabs[0];
		tab.active = true;

		$scope.containerContent = tab.url;

		// Get pending and processed messages
		$http.get('/api/msg/pending')
			.success(function(data) {
				$scope.pending = data;
			})
			.error(function(data) {
				console.log('error');
			})
		$http.get('/api/msg/processed')
			.success(function(data) {
				$scope.processed = data;
			})
			.error(function(data) {
				console.log('error');
			})
	}

	$scope.changeTab = function(e, url) {
		e.preventDefault();

		$scope.containerContent = url;
	}

	$scope.newItem = function(e, type) {
		e.preventDefault();
		
		$http.post('/api/msg/new', {
			type: type
		})
		.success(function(data) {
			$scope.pending.push(data);
		})
		.error(function(data) {
			console.log(data);
		})
	}

	$scope.init();
}])

/* Controller for messages */
acmeControllers.controller('MsgCtrl', ['$scope', '$http', '$element', function($scope, $http, $element) {
	$scope.init = function() {
		$scope.msgContent = 'partials/message/' + $scope.msg.type + '.html';	
		$scope.isCollapsed = true;

		$scope.msgEl = angular.element($element);

		var msg = $scope.msg;
		msg.msgClass = 'msg--' + msg.type;

		$scope.$on('saved', function(e) {
			$scope.isCollapsed = true;
			$scope.msgEl.removeClass('msg--active');

			// $scope.msgEl.addClass('msg--hide');
			// window.setTimeout(function() {
			// 	$scope.pending.splice( $scope.pending.indexOf(msg), 1 );
			// 	// $scope.pending = _.without($scope.pending, _.findWhere($scope.pending, {_id: msg._id}));
			// }, 1000);
		})
	}

	// Open the message and load the correct partial
	$scope.open = function() {
		if($scope.msg.processed) return false;

		if(!$scope.msgEl.hasClass('msg--active')) {
			$scope.msgEl.addClass('msg--active');
			$scope.isCollapsed = false;
		} else {
			$scope.msgEl.removeClass('msg--active');
			$scope.isCollapsed = true;
		}
	}

	$scope.init();
}])

/* Controllers for specific message types */
acmeControllers.controller('MsgBirthdayCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.init = function() {
		$scope.selectedGift = null;

		if($scope.msg.processed) {
			$scope.update();
		} else {
			// Load list of gifts
			$http.get('/api/msg/gifts')
				.success(function(data) {
					$scope.gifts = data;

					$scope.selectedGift = data[0].name;
				})
		}
	}

	$scope.update = function() {
		// Fill in data
		$scope.msg.msg = $scope.msg.msg.replace('[gift]', $scope.msg.gift);
	}

	$scope.save = function() {
		$scope.msg.processed = true;
		$scope.msg.gift = $scope.selectedGift;
		$scope.update();

		// Update item
		$http.post('/api/msg/save', {
			item: $scope.msg,
			msg: $scope.msg.msg
		})
		.success(function(data) {
			console.log(data);
		})
		.error(function(data) {
			console.log(data);
		})

		$scope.$emit('saved');
	}

	$scope.init();
}])
acmeControllers.controller('MsgChildCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.init = function() {
		$scope.selectedBirthdate = new Date();
		$scope.selectedName = null;

		// Initiate date picker
		$scope.today = function() {
			$scope.dt = new Date();
		};
		$scope.today();

		$scope.showWeeks = true;
			$scope.toggleWeeks = function () {
			$scope.showWeeks = ! $scope.showWeeks;
		};

		$scope.clear = function () {
			$scope.dt = null;
		};

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
			return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};

		$scope.toggleMin = function() {
			$scope.minDate = ( $scope.minDate ) ? null : new Date();
		};
		$scope.toggleMin();

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		$scope.dateOptions = {
			'year-format': "'yy'",
			'starting-day': 1
		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
		$scope.format = $scope.formats[0];

		if($scope.msg.processed) {
			$scope.update();
		} else {
			// Load list of names
			$http.get('/api/msg/names')
				.success(function(data) {
					$scope.names = data;

					$scope.selectedName = data[0].name;
				})
		}
	}

	$scope.update = function() {
		// Fill in data
		$scope.msg.msg = $scope.msg.msg.replace('[babyname]', $scope.msg.babyname);
		$scope.msg.msg = $scope.msg.msg.replace('[birthdate]', $scope.msg.birthday);
	}

	$scope.save = function() {
		$scope.msg.processed = true;
		$scope.msg.babyname = $scope.selectedName;
		$scope.msg.birthday = new Date($scope.selectedBirthdate).toDateString();

		$scope.update();

		// Update item
		$http.post('/api/msg/save', {
			item: $scope.msg,
			msg: $scope.msg.msg
		})
		.success(function(data) {
			console.log(data);
		})

		$scope.$emit('saved');
	}

	$scope.init();
}])