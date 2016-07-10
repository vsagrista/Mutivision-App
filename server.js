var express = require('express');
var path = require('path');
var stylus = require('stylus');
var env = process.env.NODE_ENV =  process.env.NODE_ENV || 'development';
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');


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