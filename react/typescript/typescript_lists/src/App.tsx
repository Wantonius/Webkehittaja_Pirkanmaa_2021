import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingItem from './models/ShoppingItem';
import ShoppingForm from './components/ShoppingForm';

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
	
	render() {	
		return (
			<div className="App">
				<ShoppingForm addToList={this.addToList}/>
			</div>
		);
	}
}

export default App;
