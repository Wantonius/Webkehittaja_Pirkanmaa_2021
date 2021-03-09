import React from 'react';
import StateContext from './StateContext';

export default class StateProvider extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			list:[],
			id:100,
			isLogged:false
		}
	}

	login = () => {
		this.setState({
			isLogged:true
		})
	}
	
	logout = () => {
		this.setState({
			isLogged:false
		})
	}
	
	addToList = (item) => {
		item.id = this.state.id;
		this.setState(state => ({
			list:state.list.concat(item),
			id:state.id+1
		}))
	}

	removeFromList = (id) => {
		this.setState(state => {
			let tempList = state.list.filter(item => item.id !== id);
			return {
				list:tempList
			}
		})
	}
	
	render() {
		return(
			<StateContext.Provider value={{
				list:this.state.list,
				isLogged:this.state.isLogged,
				login:this.login,
				logout:this.logout,
				addToList:this.addToList,
				removeFromList:this.removeFromList
			}}>
			{this.props.children}
			</StateContext.Provider>
		)
	}
}