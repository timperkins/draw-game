'use strict';

var _ = require('lodash');

module.exports = class Component {

	toJSON() {
		var json = {};
		_.forOwn(this, (val, key) => {
			if (val && _.isFunction(val.toJSON)) {
				val = val.toJSON();
			} else if (_.isArray(val)) {
				val = resolveArray(val);
			}
			json[key] = val;
		});

		function resolveArray(arr) {
			return arr.map(item => {
				if (!item) { return item; }
				if (_.isArray(item)) {
					item = resolveArray(item);
				} else {
					if (_.isFunction(item.toJSON)) {
						item = item.toJSON();
					}
				}
				return item;
			});
		}
		return json;
	}

}

