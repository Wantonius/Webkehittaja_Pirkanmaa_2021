import {makeAutoObservable,makeObservable,observable,action} from 'mobx';

class CounterStore {

	counter = 0;
	
	constructor() {
		makeObservable(this,{
			counter:observable,
			increment:action,
			decrement:action
		});
	}
	

	increment = () => {
		this.counter++;
	}
	
	decrement = () => {
		this.counter--;
	}
}

export default CounterStore;