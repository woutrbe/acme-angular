var path = require('path'),
	mongoose = require('mongoose'),
	_ = require('lodash'),
	Schema = mongoose.Schema;

var defaultBirthdayMsg = 'Mate, Happy Birthday. To celebrate this once a year occasion we have picked the following gift: [gift]. Enjoy.',
	defaultChildMsg = 'Whooa well done and congratulations on the birth of [babyname] on [birthdate].',
	defaultUserID = 13;

var ItemSchema = new Schema({
	id: {
		type: Number
	},
	user_id: {
		type: Number,
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
			processed: false,
			user_id: defaultUserID
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
			processed: true,
			user_id: defaultUserID
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
			{ name: 'Sophia' },
			{ name: 'Emma' },
			{ name: 'Olivia' },
			{ name: 'Isabella' },
			{ name: 'Ava' },
			{ name: 'Lily' },
			{ name: 'Zoe' },
			{ name: 'Chloe' },
			{ name: 'Mia' },
			{ name: 'Madison' },
			{ name: 'Emily' },
			{ name: 'Ella' },
			{ name: 'Madelyn' },
			{ name: 'Abigail' },
			{ name: 'Aubrey' },
			{ name: 'Addison' },
			{ name: 'Avery' },
			{ name: 'Layla' },
			{ name: 'Hailey' },
			{ name: 'Amelia' },
			{ name: 'Hannah' }
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
			user_id: defaultUserID,
			type: req.body.type,
			processed: false,
			msg: (req.body.type == 'child' ? defaultChildMsg : defaultBirthdayMsg),
			date: new Date().toDateString()
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
		var updatedItem = {
			msg: req.body.msg,
			processed: true
		}

		Item.update({
			_id: item._id
		}, updatedItem, function(err) {
			if(err) {
			} else {
				res.json(updatedItem);
			}
		})
	})

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
}