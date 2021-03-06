import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import app from '../app';

export default class CreateUser extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			name: 'tim'
		};
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleNameChange(name) {
		this.setState({
			name: name
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		// Use a socket to create the user so we can associate the socket with the user
		app.socket.emit('createUser', {
			name: this.state.name
		}, function(user) {
			app.saveUser(user);
			app.updateRoute('gameList');
		});
	}

	render() {
		return (
			<form id="name-form" onSubmit={this.handleSubmit}>
				<h3>Create a user</h3>
				<label for="name">Your Name: 	</label>
				<input type="text" id="name" value={this.state.name} onChange={e=>this.handleNameChange(e.target.value)} />
				<input type="submit" />
			</form>
		);
	}
}

app.addRoute('createUser', {
	path: '/',
	component: CreateUser
});
