import React from 'react';

interface Props {
	name?:string;
}

interface State {
	seconds:number;
	timerid:ReturnType<typeof setInterval> | null;
}

export default class StatefulComponent extends React.Component<Props,State> {
	
	state:State = {
		seconds:0,
		timerid:null
	}
	
	componentDidMount() {
		let tempId = setInterval(this.startTimer,1000);
		this.setState({
			timerid:tempId
		})
	}
	
	componentWillUnmount() {
		if(this.state.timerid) {
			clearInterval(this.state.timerid);
		}
	}
	
	startTimer = () => {
		this.setState((state) => {
			return {
				seconds:state.seconds+1		
			}
		}
		)
	}
	
	render() {
		let name = "World";
		if(this.props.name) {
			name = this.props.name;
		}
		return (
			<h2>Hello {name}! You entered this page {this.state.seconds} ago</h2>
		)
	}
}