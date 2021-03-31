import React from 'react';
import Square from './Square';
import Label from './Label';

interface State {
	color:string;
}

export default class Card extends React.Component<{},State> {

	state:State = {
		color:"red"
	}
	
	onColorChange = () => {
		const letters:string = "ABCDEF0123456789";
		let color:string = "#";
		for(let i=0;i<6;i++) {
			let temp = Math.floor(Math.random()*16);
			color = color + letters[temp];
		}
		this.setState({
			color:color
		})
	}
	
	render() {
		let cardStyle:React.CSSProperties = {
			height:200,
			width:150,
			backgroundColor:"#FFF",
			WebkitFilter:"drop-shadow(0px 0px 5px #666)",
			filter:"drop-shadow(0px 0px 5px #666)"
		}
		return(
			<div style={cardStyle}>
				<Square color={this.state.color}/>
				<Label color={this.state.color} onColorChange={this.onColorChange}/>
			</div>
		)
	}
}