import React from 'react';
import {observer} from 'mobx-react-lite';
import CounterStore from './CounterStore';

const store = new CounterStore();	

const MobxTest = (props) => {
	
	return(
		<div>
			<p>Counter:{store.counter}</p>
			<button onClick={store.increment}>Increment</button>
			<button onClick={store.decrement}>Decrement</button>
		</div>
	)

}

export default observer(MobxTest);