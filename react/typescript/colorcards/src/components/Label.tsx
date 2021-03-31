import React from 'react';

interface Props {
	color:string;
	onColorChange():void;
}

export default class Label extends React.Component<Props> {

	render() {
		let labelStyle:React.CSSProperties = {
			fontFamily:"sans-serif",
			fontWeight:"bold",
			padding:13,
			margin:0
		}
		return(
			<p style={labelStyle} onClick={() => this.props.onColorChange()}>{this.props.color}</p>
		)
	}
}

