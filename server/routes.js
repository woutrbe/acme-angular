var path = require('path'),
	mongoose = require('mongoose');

var routes = [

]

module.exports = function(app) {
	app.get('/api/msg/pending', function(req, res) {
		var pending = [
			{
				id: 1,
				type: 'birthday',
				name: 'birthday',
				msg: 'birthday msg',
				date: '2014-03-12'
			},
			{
				id: 2,
				type: 'child',
				name: 'child',
				msg: 'birthday msg',
				date: '2014-03-12'
			}
		]

		res.json(pending);
	})
	app.get('/api/msg/processed', function(req, res) {
		var processed = [
			{
				id: 5,
				type: 'child',
				name: 'birthday',
				msg: 'birthday msg',
				date: '2014-03-12'
			},
			{
				id: 22,
				type: 'child',
				name: 'chasdfild',
				msg: 'birthday msg',
				date: '2014-03-12'
			},
			{
				id: 222,
				type: 'child',
				name: 'chasdfild',
				msg: 'birthday msg',
				date: '2014-03-12'
			},
			{
				id: 252,
				type: 'child',
				name: 'chasdfild',
				msg: 'birthday msg',
				date: '2014-03-12'
			}
		]

		res.json(processed);
	})

	// Return all available names
	app.get('/api/msg/names', function(req, res) {
		var names = [

		]

		res.json(names);
	})
	// Return all available gifts
	app.get('/api/msg/gifts', function(req, res) {
		var gifts = [
			{
				id: 1,
				name: 'Bear',
				img: 'Bleh'
			}
		]

		res.json(gifts);
	})

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
}