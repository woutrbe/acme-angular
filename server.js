var port = (process.env.VMC_APP_PORT || process.env.PORT || 3333),
	express = require('express'),
	passport = require('passport'),
	mongoose = require('mongoose'),
	User = require('./server/models/User.js'),
	app = express(),
	db = mongoose.connect('mongodb://localhost:27017/acme-app');

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride()); 

	app.use(passport.initialize());
	app.use(passport.session());

	// passport.use(User.localStrategy); // Username + password
});

require('./server/routes.js')(app);

app.listen(port, function() {
	console.log('App listening on port ' + port);
});