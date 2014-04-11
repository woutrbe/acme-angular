var express = require('express'),
	app = express();

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
})

app.listen(2020);
console.log("App listening on port 2020");