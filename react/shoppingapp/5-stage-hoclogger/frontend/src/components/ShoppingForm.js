import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addToList} from '../actions/shoppingActions';
import HocLogger from '../hoclogger/HocLogger';

class ShoppingForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			type:"",
			count:0,
			price:0
		}
	}
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		let item = {
			type:this.state.type,
			count:this.state.count,
			price:this.state.price
		}
		this.props.dispatch(addToList(item,this.props.token));
		this.props.hoclog(this.props.loglevel.LOG_INFO,"ShoppingForm - onSubmit","Add new item:"+item.type);
		this.setState({
			type:"",
			count:0,
			price:0
		})
		this.props.history.push("/");
	}
	
	render() {
		return(
			<div style={{width:500,margin:"auto"}}>
				<Form onSubmit={this.onSubmit}>
					<Form.Field>
						<label htmlFor="type">Type:</label>
						<input type="text"
								name="type"
								onChange={this.onChange}
								value={this.state.type}/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="count">Count:</label>
						<input type="number"
								name="count"
								onChange={this.onChange}
								value={this.state.count}/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="price">Price:</label>
						<input type="number"
								name="price"
								step="0.01"
								onChange={this.onChange}
								value={this.state.price}/>
					</Form.Field>
					<Button type="submit">Add</Button>
				</Form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		token:state.login.token
	}
}

export default HocLogger(withRouter(connect(mapStateToProps)(ShoppingForm)));