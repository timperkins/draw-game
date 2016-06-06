'use strict';

var util = require('./util');

module.exports = class User {
	
	constructor(data) {
		this.name = data.name;
		this.id = util.guid();
	}

}

