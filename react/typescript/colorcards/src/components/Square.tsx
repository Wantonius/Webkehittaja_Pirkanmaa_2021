import React from 'react';

interface Props {
	color:string
}

export default class Square extends React.Component<Props> {
	
	render() {
		let squareStyle:React.CSSProperties = {
			backgroundColor:this.props.color,
			height:150
		}
		return(
			<div style={squareStyle}></div>
		)		
	}
}