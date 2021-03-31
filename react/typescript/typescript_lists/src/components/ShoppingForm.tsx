import React from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	addToList(item:ShoppingItem):void
}

interface State {
	type:string;
	count:number;
	price:number;
}

export default class ShoppingForm extends React.Component<Props,State> {
	
	state:State = {
		type:"",
		price:0,
		count:0
	}
	
	onChange = (e:React.FormEvent<HTMLInputElement>) =>  {
		let state:any = {};
		state[e.currentTarget.name] = e.currentTarget.value;
		this.setState(state);		
	}
	
	onSubmit = (e:React.SyntheticEvent) => {
		e.preventDefault();
		let item = new ShoppingItem(0,this.state.type,this.state.count,this.state.price);
		this.props.addToList(item);
		this.setState({
			type:"",
			count:0,
			price:0
		})
	}

	render() {
		return(
			<form onSubmit={this.onSubmit}>
				<label htmlFor="type">Type:</label>
				<input type="text"
						name="type"
						onChange={this.onChange}
						value={this.state.type}/>
				<br/>
				<label htmlFor="count">Count:</label>
				<input type="number"
						name="count"
						onChange={this.onChange}
						value={this.state.count}/>
				<br/>
				<label htmlFor="price">Price:</label>
				<input type="number"
						name="price"
						step="0.01"
						onChange={this.onChange}
						value={this.state.price}/>
				<br/>
				<input type="submit" value="Add"/>
			</form>
		)
	}
}