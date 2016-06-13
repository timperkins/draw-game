import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import app from '../app';

export default class GameStage extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			name: '',
			users: []
		};
		this.updateGame = this.updateGame.bind(this);
	}

	componentDidMount() {
		// Join the game
		axios({
			url: '/api/game',
			method: 'POST',
			data: {id: this.props.params.gameId}
		}).then(res => {
			this.setState({
				name: res.data.name,
				users: res.data.users
			});
		});
		app.socket.on(`update:game:${this.props.params.gameId}`, this.updateGame);
	}

	componentWillUnmount() {
		app.socket.off(`update:game:${this.props.params.gameId}`, this.updateGame);
		axios.delete('/api/game/user', {
			params: {
				gameId: this.props.params.gameId,
				userId: app.user.id
			}
		});
	}

	updateGame(game) {
		this.setState({
			users: game.users
		});
	}

	render() {
		var users = this.state.users.map(user => <div key={user.id}>{user.name}</div>);
		return (
			<div>
				<h3>game stage</h3>
				<div>game name: {this.state.name}</div>
				<h5>users:</h5>
				{users}
			</div>
		);
	}
}

app.addRoute('gameStage', {
	path: '/game/stage/:gameId',
	component: GameStage
});
