import React from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import app from '../app';

export default class CreateGame extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			name: 'Untitled Game'
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
		axios.post('/api/game', {name: this.state.name}).then(res => {
			browserHistory.push(`/game/stage/${res.data.id}`);
		});
	}

	render() {
		return (
			<form id="name-form" onSubmit={this.handleSubmit}>
				<h3>New game:</h3>
				<label for="name">Name: 	</label>
				<input type="text" id="name" value={this.state.name} onChange={e=>this.handleNameChange(e.target.value)} />
				<input type="submit" />
			</form>
		);
	}
}

app.addRoute('createGame', {
	path: '/game/new',
	component: CreateGame
});
