var port = (process.env.VMC_APP_PORT || process.env.PORT || 2020),
	express = require('express'),
	pg = require('pg'),
	passport = require('passport'),
	User = require('./server/models/User.js'),
	app = express();

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());

	app.use(passport.initialize());
	app.use(passport.session());

	// passport.use(User.localStrategy); // Username + password
})

require('./server/routes.js')(app);

app.listen(port, function() {
	console.log('App listening on port ' + port);
});