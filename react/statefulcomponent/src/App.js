import logo from './logo.svg';
import './App.css';
import React from 'react';
import StatefulComponent from './StatefulComponent';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<StatefulComponent/>
			</div>
		);
	}
}

export default App;
