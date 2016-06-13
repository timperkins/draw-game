'use strict';

var util = require('./util');
var _ = require('lodash');
var Component = require('./Component');

class User extends Component {
	
	constructor(data) {
		super(data);
		this.name = data.name;
		this.socket = data.socket;
		this.id = util.guid();
	}

	toJSON() {
		var json = super.toJSON();
		return _.pick(json, ['name', 'id']);
	}

}

module.exports = User;
