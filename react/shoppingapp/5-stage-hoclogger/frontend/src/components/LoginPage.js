import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {register,login} from '../actions/loginActions';
import HocLogger from '../hoclogger/HocLogger';

class LoginPage extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			username:"",
			password:""
		}
	}
	
	onClick = (event) => {
		if(this.state.username.length < 4 || this.state.password.length < 8) {
			alert("Username must be atleast 4 and password 8 characters long");
			return;
		}
		let user = {
			username:this.state.username,
			password:this.state.password
		}
		if(event.target.name === "login") {
			this.props.dispatch(login(user));
			this.props.hoclog(this.props.loglevel.LOG_INFO,"LoginPage - login()","User "+this.state.username+" logging in")
		} else {
			this.props.dispatch(register(user));
			this.props.hoclog(this.props.loglevel.LOG_INFO,"LoginPage - register()","Register "+this.state.username)
		}
	}
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

	render() {
		return(
			<div style={{width:500,margin:"auto"}}>
				<Form>
					<Form.Field>
						<label htmlFor="username">Username</label>
						<input type="text"
								name="username"
								onChange={this.onChange}
								value={this.state.username}/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="password">Password</label>
						<input type="password"
								name="password"
								onChange={this.onChange}
								value={this.state.password}/>
					</Form.Field>
				<Button onClick={this.onClick} name="register">Register</Button>
				<Button onClick={this.onClick} name="login">Login</Button>
				</Form>
			</div>	
		)
	}
}

export default HocLogger(connect()(LoginPage));