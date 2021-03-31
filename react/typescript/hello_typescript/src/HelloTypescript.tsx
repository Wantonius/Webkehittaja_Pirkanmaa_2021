import React from 'react';

interface Props {
	name?:string
}

export default class HelloTypescript extends React.Component<Props> {
	
	render() {
		let name:string = "World";
		if(this.props.name) {
			name = this.props.name;
		}
		return (
			<h2>Hello from TypeScript {name}</h2>
		)
	}
}