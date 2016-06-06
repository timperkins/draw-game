'use strict';

var Round = require('./Round');
var util = require('./util');

class Game {
	
	constructor(data) {
		data = data || {};
		this.id = util.guid();
		this.users = [];
		this.rounds = [];
		this.activeRound = new Round();
		this.name = data.name || 'Untitled Game';
	}

}

module.exports = Game;