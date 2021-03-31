import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingItem from './models/ShoppingItem';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

interface State {
	list:ShoppingItem[],
	id:number
}

class App extends React.Component<{},State> {
	
	state:State = {
		list:[],
		id:100
	}
	
	addToList = (item:ShoppingItem) => {
		item.id = this.state.id;
		this.setState((state) => {
			return {
				list:state.list.concat(item),
				id:state.id+1
			}
		})
	}
	
	removeFromList = (id:number) => {
		this.setState((state) => {
			let tempList = state.list.filter(item => item.id !== id)
			return {
				list:tempList
			}
		})
	}
	
	render() {	
		return (
			<div className="App">
				<ShoppingForm addToList={this.addToList}/>
				<hr/>
				<ShoppingList list={this.state.list} removeFromList={this.removeFromList}/>
			</div>
		);
	}
}

export default App;
