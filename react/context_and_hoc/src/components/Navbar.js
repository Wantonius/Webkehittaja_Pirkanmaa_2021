import React from 'react';
import StateManager from '../statemanager/StateManager';
import {Link} from 'react-router-dom';

class Navbar extends React.Component {
	
	render() {
		let navStyle = {
			height:150,
			backgroundColor:"lightblue"
		}
		if(this.props.isLogged) {
			return(
				<div style={navStyle}>
					<h2>Your Contacts</h2>
					<ul style={{listStyleType:"none"}}>
						<li><Link to="/list">Contacts</Link></li>
						<li><Link to="/form">Add new contact</Link></li>
						<li><Link to="/" onClick={() => this.props.logout()}>Logout</Link></li>
					</ul>
				</div>
			)
		} else  {
			return (
				<div style={navStyle}>
					<h2>Your Contacts</h2>
				</div>
			)
		}
	}
}

export default StateManager(Navbar);