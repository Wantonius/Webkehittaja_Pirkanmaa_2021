import React from 'react';
import {List,Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../actions/loginActions';
import HocLogger from '../hoclogger/HocLogger';

class Navbar extends React.Component {

	render() {
		let header = <Header>Shopping App</Header>
		if(this.props.loading) {
			header = <Header>Shopping App ...loading</Header>
		}
		if(this.props.error) {
			header = <Header>{this.props.error}</Header>
		}
		let navStyle = {
			height:100,
			backgroundColor:"lightgreen"
		}
		if(this.props.isLogged) {
			return(
				<div style={navStyle}>
					{header}
					<List>
						<List.Item><Link to="/list">Shopping List</Link></List.Item>
						<List.Item><Link to="/form">Add to list</Link></List.Item>
						<List.Item><Link to="/" onClick={() => {
							this.props.dispatch(logout(this.props.token))
							this.props.hoclog(this.props.loglevel.LOG_INFO,"Navbar - logout()","Logging out")
						}}
							>Logout</Link></List.Item>
					</List>
				</div>
			)
		} else {
			return(
				<div style={navStyle}>
					{header}
				</div>
			)		
		}
	}
}

const mapStateToProps = (state) => {
	let error = "";
	if(state.shopping.error) {
		error = state.shopping.error;
	}
	if(state.login.error) {
		error = state.login.error
	}
	return {
		loading:state.login.loading,
		error:error,
		isLogged:state.login.isLogged,
		token:state.login.token
	}
}

export default HocLogger(connect(mapStateToProps)(Navbar));