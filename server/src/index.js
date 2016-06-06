'use strict';

var Game = require('./Game');
var User = require('./User');

module.exports = io => {
	var game = new Game();
	var gameList = [game];

	io.on('connection', function(socket){
		socket.on('createUser', function(user) {
			var user = new User({
				name: user.name
			});
			socket.emit('update:user', user);
			socket.emit('update:gameList', gameList);
			socket.emit('change:view', 'gameList');
		});

		socket.on('disconnect', function(){
			console.log('user disconnected');
		});
	});
};