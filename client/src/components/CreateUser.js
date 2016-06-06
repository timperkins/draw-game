import React from 'react';

export default class CreateUser extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			name: ''
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
		this.props.socket.emit('createUser', {
			name: this.state.name
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
