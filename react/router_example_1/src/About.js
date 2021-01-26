import React from 'react';

export default class About extends React.Component {

	render() {
		return(
		<div>
			<h2>This application demostrates React Router</h2>
			<button onClick={() => this.props.history.push("/secret")}>Go to secret page</button>
		</div>
		)
	}
}