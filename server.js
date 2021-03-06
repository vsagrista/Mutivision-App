var express = require('express'),
  stylus = require('stylus'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

var env = process.env.NODE_ENV =  process.env.NODE_ENV || 'development';


function compile(str, path) {
	return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.set(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(stylus.middleware(
  {
	  src: __dirname + '/public',
	  compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost:27017/multivision');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error...'));
db.once('open', function callBack(){
	console.log('The connection was opened');
});

app.get('/partials/:partialPath', function(req, res){
  res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res){
  res.render('index.jade');
}); // gets any request to the server and returns index.js, we can customize the route on the client side.
    // otherwise we'd have to coordinate client and server side routes individually

var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');