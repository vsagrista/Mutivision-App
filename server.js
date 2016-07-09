var express = require('express');

var env = process.env.NODE_ENV =  process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.get('*', function(req, res){
  res.render('index.jade');
}); // gets any request to the server and returns index.js, we can customize the route on the client side.
    // otherwise we'd have to coordinate client and server side routes individually

var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');