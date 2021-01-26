import logo from './logo.svg';
import './App.css';
import React from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import {Route,Switch} from 'react-router-dom';
import Navbar from './Navbar';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			list:[],
			id:100
		}
	}
	
	addToList = (contact) => {
		contact.id = this.state.id;
		this.setState((state) => ({
				list:state.list.concat(contact),
				id:state.id+1
		}));		
	}
	
	removeFromList = (id) => {
		this.setState((state) => {
			let tempList = state.list.filter(contact => contact.id !== id)
			return {
				list:tempList
			}
		})
	}

	render() {
		return (
			<div className="App">
			<Navbar/>
			<hr/>
			<Switch>
				<Route exact path="/" render={() => 
					(<ContactList list={this.state.list} removeFromList={this.removeFromList}/>)
				}/>
				<Route path="/form" render={() => 
					(<ContactForm addToList={this.addToList}/>)
				}/>				
			</Switch>
			</div>
		);
	}
}

export default App;
