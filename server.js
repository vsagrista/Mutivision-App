var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var env = process.env.NODE_ENV =  process.env.NODE_ENV || 'development';
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(sassMiddleware({
    /* Options */
    src: __dirname,
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/prefix'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));
// Note: you must place sass-middleware *before* `express.static` or else it will
// not work.
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.set(logger('dev'));
app.get('*', function(req, res){
  res.render('index.jade');
}); // gets any request to the server and returns index.js, we can customize the route on the client side.
    // otherwise we'd have to coordinate client and server side routes individually

var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');