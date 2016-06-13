'use strict';

var Game = require('./Game');
var User = require('./User');
var _ = require('lodash');

module.exports = opts => {
	var app = opts.app;
	var io = opts.io;
	var gameList = [];
	var userList = [];

	app.get('/api/gameList', function(req, res) {
		res.send(gameList);
	});

	app.post('/api/game', function(req, res) {
		var gameId = _.get(req, 'body.id');
		var userId = _.get(req, 'body.user.id');
		var user = _.find(userList, {id: userId});
		if (gameId) {
			// Join game
			var game = _.find(gameList, {id: gameId});
			if (game) {
				if (!_.find(game.users, {id: userId})) {
					game.addUser(user);
				}
				res.send(game);
			} else {
				// Game not found
			}
		} else {
			// Create game
			var game = new Game({
				name: req.body.name,
				host: user
			});
			gameList.push(game);
			userList.forEach(user => user.socket.emit('update:gameList', gameList));
			res.send(game);
		}
	});

	// Remove user from game
	app.delete('/api/game/user', function(req, res) {
		var gameId = _.get(req, 'query.gameId');
		var userId = _.get(req, 'query.userId');
		var user = _.find(userList, {id: userId});
		var game = _.find(gameList, {id: gameId});
		if (game.users.indexOf(user) > -1) {
			game.removeUser(user);
		}
		res.send();
	});

	io.on('connection', function(socket) {

		socket.on('createUser', function(user, cb) {
			var user = new User({
				name: user.name,
				socket: socket
			});
			userList.push(user);

			socket.on('disconnect', () => {
				userList.splice(userList.indexOf(user), 1);
				gameList.forEach(game => {
					if (game.users.indexOf(user) > -1) {
						game.removeUser(user);
					}
				});
			});

			cb(user.toJSON());
		});
	});
};