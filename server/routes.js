var path = require('path'),
	mongoose = require('mongoose'),
	_ = require('lodash'),
	Schema = mongoose.Schema;

var defaultBirthdayMsg = 'Mate, Happy Birthday. To celebrate this once a year occasion we have picked the following gift: [gift]. Enjoy.',
	defaultChildMsg = 'Whooa well done and congratulations on the birth of [babyname] on [birthdate].';

var ItemSchema = new Schema({
	id: {
		type: Number
	},
	type: {
		type: String,
		default: 'birthday'
	},
	processed: {
		type: Boolean,
		default: false
	},
	msg: {
		type: String,
		default: 'test'
	},
	date: {
		type: String
	}
});

mongoose.model('Item', ItemSchema);

var Item = mongoose.model('Item'),
	routes = [

	]

module.exports = function(app) {
	// Return all pending messages
	app.get('/api/msg/pending', function(req, res) {
		Item.find({
			processed: false
		}).sort('id').exec(function(err, items) {
			if(err) {
				res.render('error', {
	                status: 500
	            });
			} else {
				res.json(items);
			}
		})
	})

	// Return all processed message
	app.get('/api/msg/processed', function(req, res) {
		Item.find({
			processed: true
		}).sort('id').exec(function(err, items) {
			if(err) {
				res.render('error', {
	                status: 500
	            });
			} else {
				res.json(items);
			}
		})
	})

	// Return all available names
	app.get('/api/msg/names', function(req, res) {
		// Return a fixed array
		var names = [
			{name: 'test'},
			{name: 'asdf'},
			{name: 'tesast'},
			{name: 'aff'}
		]

		res.json(names);
	})

	// Return all available gifts
	app.get('/api/msg/gifts', function(req, res) {
		// Return a fixed array
		var gifts = [
			{
				id: 1,
				name: 'a bear',
				img: 'Bleh'
			},
			{
				id: 1,
				name: 'one ball',
				img: 'Bleh'
			},
			{
				id: 1,
				name: 'bottle of water',
				img: 'Bleh'
			},
			{
				id: 1,
				name: 'a new car',
				img: 'Bleh'
			},
			{
				id: 1,
				name: 'some clothing',
				img: 'Bleh'
			}
		]

		res.json(gifts);
	})


	// Create a new message
	app.post('/api/msg/new', function(req, res) {
		var item = new Item({
			type: 'birthday',
			processed: false,
			msg: defaultChildMsg,
			date: '2014-03-18'
		})

		item.save(function(err) {
			if(err) {

			} else {
				res.json(item);
			}
		})
	})

	// Update message
	app.post('/api/msg/save', function(req, res) {
		var item = req.body.item;
		item = _.extend(item, req.body.msg);

		item.save(function(err) {
			if(err) {

			} else {
				res.json(item);
			}
		})
	})

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
}