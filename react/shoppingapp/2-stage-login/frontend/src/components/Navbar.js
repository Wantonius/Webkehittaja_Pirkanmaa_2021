import React from 'react';
import {List,Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class Navbar extends React.Component {

	render() {
		let navStyle = {
			height:100,
			backgroundColor:"lightgreen"
		}
		return(
			<div style={navStyle}>
				<Header>Shopping App</Header>
				<List>
					<List.Item><Link to="/">Shopping List</Link></List.Item>
					<List.Item><Link to="/form">Add to list</Link></List.Item>
				</List>
			</div>
		)
	}
}