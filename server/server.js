var http      = require('http');
var express   = require('express');
var app       = express();
var http      = require('http').Server(app);
var path      = require('path');
var io        = require('socket.io')(http);
var buildDir  = path.resolve(__dirname, '../client/build');

// Bootstrap the game
require('./src')(io);

app.get('/', function(req, res){
  res.sendFile('index.html', {root: buildDir});
});

app.use('/static/', express.static(buildDir));

http.listen(3000, function(){
  console.log('listening on *:3000');
});