import React from 'react';
import axios from 'axios';
import app from '../app';
import { Link, browserHistory } from 'react-router';

export default class GameList extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			gameList: []
		};
		this.updateGameList = this.updateGameList.bind(this);
		this.joinGame = this.joinGame.bind(this);
	}

	componentDidMount() {
		app.socket.on('update:gameList', this.updateGameList);
		axios.get('/api/gameList').then(res => this.updateGameList(res.data));
	}

	componentWillUnmount() {
		app.socket.off('update:gameList', this.updateGameList);
	}

	updateGameList(gameList) {
		this.setState({
			gameList: gameList
		});
	}

	joinGame(game) {
		browserHistory.push(`/game/stage/${game.id}`);
	}

	render() {
		var gameList = this.state.gameList.map(game => {
			return (
				<div key={game.id}>
					<h4>{game.name}</h4>
					<button onClick={() => this.joinGame(game)}>Join</button>
				</div>
			);
		});
		return (
			<div>
				<Link to="/game/new">new game</Link>
				<h2>game list</h2>
				{gameList}
			</div>
		);
	}
}

app.addRoute('gameList', {
	path: '/game-list',
	component: GameList
});
