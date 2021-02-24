import logo from './logo.svg';
import './App.css';
import React from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import {Switch,Route} from 'react-router-dom';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[],
			isLogged:false,
			token:""
		}
	}
	
	componentDidMount() {
		this.getList();
	}
	
	//LOGIN API
	
	register = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		fetch("/register",request).then(response => {
			if(response.ok) {
				alert("Register success");
			} else {
				if(response.status === 409) {
					alert("Username is already in use");
				}
				console.log("Server responded with a status:",response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error:",error);
		})
	}
	
	
	//REST API
	
	getList = () => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		fetch("/api/shopping",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						list:data
					}); 
				}).catch(error => {
					console.log("Failed to parse JSON. Reason:",error);
				});	
			} else {
				console.log("Server responded with a status:",response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error. Reason:",error);
		});
		
	}
	
	addToList = (item) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(item)
		}
		fetch("/api/shopping",request).then(response => {
			if(response.ok) {
				this.getList();
			} else {
				console.log("Server responded with a status:",response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error. Reason:",error);
		});		
	}
	
	removeFromList = (id) => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		fetch("/api/shopping/"+id,request).then(response => {
			if(response.ok) {
				this.getList();
			} else {
				console.log("Server responded with a status:",response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error. Reason:",error);
		});
	}

	editItem = (item) => {
		let request = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(item)
		}
		fetch("/api/shopping/"+item.id,request).then(response => {
			if(response.ok) {
				this.getList();
			} else {
				console.log("Server responded with a status:",response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error. Reason:",error);
		});
	}	
	render() {
		return (
			<div className="App">
				<Navbar/>
				<hr/>
				<Switch>
					<Route exact path="/" render={() => 
						(<LoginPage register={this.register}/>)
					}/>
					<Route path="/list" render={ () => 
						(<ShoppingList list={this.state.list} removeFromList={this.removeFromList} editItem={this.editItem}/>)
					}/>
					<Route path="/form" render={() => 
						(<ShoppingForm addToList={this.addToList}/>)
					}/>				
				</Switch>
			</div>
		);
	}
}

export default App;
