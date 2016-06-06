import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import Content from './components/Content';
import Shell from './components/Shell';
import css from './index.less';


class App extends React.Component {
	render() {
		return (
			<Shell>
				<Content />
			</Shell>
		);
	}
}

render(<App/>, document.getElementById('app'));



// var socket = io();

// $(function() {
// 	setState('createUser');
// 	$('#name-form').on('submit', function(e) {
// 		e.preventDefault();
// 		var name = $('#name').val();
// 		socket.emit('createUser', {
// 			name: name
// 		});
// 	});




// });

// socket.on('update:user', function(user) {
// 	window.localStorage.setItem('user', user);
// 	// setState('gameList');
// 	// socket.
// });

// socket.on('change:state', function(e) {
// 	setState(e.newState);
// });



// socket.on('update:gameList', renderGameList);

// var $gameList = $('.game-list');
// function renderGameList(gameList) {
// 	gameList.forEach(function(game) {
// 		$gameList.append($('<div>').text(game.name));
// 	});
// } 

// function setState(state) {
// 	$('[data-state]').removeClass('show');
// 	$('[data-state="' + state + '"]').addClass('show');
// }