import React from 'react';
import StateManager from '../statemanager/StateManager';

class LoginPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username:"",
			password:""
		}
	}
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	onSubmit = (event) => {
		console.log(event);
		event.preventDefault();
		let user = {
			username:this.state.username,
			password:this.state.password
		}
		if(event.target.name === "login") {
			console.log("Moi");
			this.props.login()
		}
	}
	
	render() {
		return(
			<form>
				<label htmlFor="username">Username:</label>
				<input type="text"
						name="username"
						onChange={this.onChange}
						value={this.state.username}/>
				<br/>
				<label htmlFor="password">Password:</label>
				<input type="password"
						name="password"
						onChange={this.onChange}
						value={this.state.password}/>
				<br/>
				<button name="register" onClick={this.onSubmit}>Register</button>
				<button name="login" onClick={this.onSubmit}>Login</button>
			</form>
		)
	}
}
export default StateManager(LoginPage);