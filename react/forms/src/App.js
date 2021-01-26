import logo from './logo.svg';
import './App.css';
import React from 'react';
import NameForm from './NameForm';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<NameForm/>
			</div>
		);
	}
}

export default App;
