import React from 'react';

export default class Shell extends React.Component {
	render() {
		return (
			<div>
				<h1>Title</h1>
				{this.props.children}
			</div>
		);
	}
}
