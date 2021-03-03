import React from 'react'
import {connect} from 'react-redux';

class ContactForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			firstname:"",
			lastname:"",
			phone:""
		}
	}	
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

	onSubmit = (event) => {
		event.preventDefault();
		let contact = {
			firstname:this.state.firstname,
			lastname:this.state.lastname,
			phone:this.state.phone
		}
		console.log("ContactForm: onSubmit, dispatch ADD_TO_LIST");
		this.props.dispatch({
			type:"ADD_TO_LIST",
			contact:contact
		})
	}
	
	render() {
			return(
			<form onSubmit={this.onSubmit}>
				<label htmlFor="firstname">First Name:</label>
				<input type="text"
						name="firstname"
						onChange={this.onChange}
						value={this.state.firstname}/>
				<br/>
				<label htmlFor="lastname">Last Name:</label>
				<input type="text"
						name="lastname"
						onChange={this.onChange}
						value={this.state.lastname}/>
				<br/>
				<label htmlFor="phone">Phone:</label>
				<input type="text"
						name="phone"
						onChange={this.onChange}
						value={this.state.phone}/>
				<br/>
				<input type="submit" value="Add"/>
			</form>
		)
	}
}

export default connect()(ContactForm);