'use strict';

var Round = require('./Round');
var util = require('./util');
var _ = require('lodash');
var Component = require('./Component');

class Game extends Component {
	
	constructor(data) {
		super(data);
		data = data || {};
		this.id = util.guid();
		this.host = data.host;
		this.users = [data.host];
		this.rounds = [];
		this.activeRound = new Round();
		this.name = data.name || 'Untitled Game';
	}

	addUser(user) {
		this.users.push(user);
		this.notifyUsers();
	}

	removeUser(user) {
		var removeIndex = this.users.indexOf(user);
		if (removeIndex > -1) {
			this.users.splice(removeIndex, 1);
			this.notifyUsers();
		}
	}

	notifyUsers() {
		this.users.forEach(user => user.socket.emit(`update:game:${this.id}`, this));
	}

}

module.exports = Game;