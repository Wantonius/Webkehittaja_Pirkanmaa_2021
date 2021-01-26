import React from 'react';
import {Link} from 'react-router-dom';
import {List} from 'semantic-ui-react';

export default class Navbar extends React.Component {

	render() {
		return(
			<List>
				<List.Item><Link to="/">Contact List</Link></List.Item>
				<List.Item><Link to="/form">Add To List</Link></List.Item>
			</List>
		)
	}
}