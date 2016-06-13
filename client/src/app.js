import { browserHistory } from 'react-router';
import io from 'socket.io-client';
import axios from 'axios';

var app = {
	routes: {},
	addRoute: function(routeName, route) {
		this.routes[routeName] = route;
	},
	updateRoute: function(routeName) {
		var route = this.routes[routeName];
		var path = _.get(route, 'path');
		if (path) {
			browserHistory.push(path);
		}
	},
	saveUser: function(user) {
		window.localStorage.setItem('user', JSON.stringify(user));
		this.user = user;
	},
	user: null,
	getUser: function() {
		var userString = window.localStorage.getItem('user');
		if (userString) {
			return JSON.parse(userString);
		}
		return null;
	},
	socket: io()
};

app.user = app.getUser();

axios.interceptors.request.use(function (config) {
	if (['POST', 'PUT', 'PATCH'].indexOf(config.method.toUpperCase()) > -1) {
		config.data = config.data || null;
		var data = JSON.parse(config.data) || {};
		data.user = app.user;
		config.data = JSON.stringify(data);
	}
	return config;
});

export default app;