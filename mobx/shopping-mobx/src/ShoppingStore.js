import {makeObservable,action,observable,computed,autorun} from 'mobx';

class ShoppingStore {
	list = [];
	id = 100;
	
	constructor() {
		makeObservable(this,{
			list:observable,
			id:observable,
			totalPrice:computed,
			addToList:action,
			removeFromList:action,
			editItem:action
		})
		autorun(this.reportStoreState);
	}
	
	get totalPrice() {
		let price = 0;
		for(let i=0;i<this.list.length;i++) {
			price = price + this.list[i].price;
		}
		return price;
	}
	
	addToList = (item) => {
		item.id = this.id;
		this.list.push(item);
		this.id++;
	}
	
	removeFromList = (id) => {
		for(let i=0;i<this.list.length;i++) {
			if(this.list[i].id === id) {
				this.list.splice(i,1);
			}
		}
	}

	editItem = (item) => {
		for(let i=0;i<this.list.length;i++) {
			if(this.list[i].id === item.id) {
				this.list.splice(i,1,item);
			}
		}
	}

	reportStoreState = () => {
		console.log(this.list)
	}
}

export default ShoppingStore;