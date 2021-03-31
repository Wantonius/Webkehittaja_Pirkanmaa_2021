import React from 'react';
import logo from './logo.svg';
import './App.css';
import HelloTypescript from './HelloTypescript';

function App() {
  return (
    <div className="App">
		<HelloTypescript/>
		<HelloTypescript name="Erno"/>
    </div>
  );
}

export default App;
