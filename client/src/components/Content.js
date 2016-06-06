import React from 'react';
import CreateUser from './CreateUser';
import io from 'socket.io-client';

export default class Content extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			view: 'createUser'
		};
		this.changeView = this.changeView.bind(this);
		this.props.socket.on('change:view', this.changeView);
	}

	changeView(view) {
		this.setState({view: view});
	}

	render() {
		var Element;
		if (this.state.view == 'createUser') {
		}
		switch (this.state.view) {
			case 'createUser':
				Element = CreateUser;
				break;
			case 'gameList':
				// TODO
				Element = CreateUser;
				break;
		}
		return <Element {...this.props} />;
	}
}

Content.defaultProps = {
	socket: io()
};
