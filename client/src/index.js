import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import CreateUser from './components/CreateUser';
import CreateGame from './components/CreateGame';
import GameList from './components/GameList';
import GameStage from './components/GameStage';
import Shell from './components/Shell';
import css from './index.less';
import { Router, Route, browserHistory } from 'react-router';
import _ from 'lodash';
import app from './app';

class App extends React.Component {
	render() {
		var routes = _.map(app.routes, (route, name) => <Route key={name} {...route} />);
		return (
			<Shell>
				<Router history={browserHistory}>
					{routes}
				</Router>
			</Shell>
		);
	}
}

render(<App/>, document.getElementById('app'));