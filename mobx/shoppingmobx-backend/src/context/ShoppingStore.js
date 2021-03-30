import {makeObservable,action,observable,computed,autorun} from 'mobx';

class ShoppingStore {
	list = [];
	loading = false;
	error = "";
	
	constructor() {
		makeObservable(this,{
			list:observable,
			loading:observable,
			error:observable,
			totalPrice:computed,
			getList:action,
			addToList:action,
			removeFromList:action,
			editItem:action,
			fetchBackend:action,
			setLoading:action,
			setList:action,
			setError:action
		})
	}
	
	get totalPrice() {
		let price = 0;
		for(let i=0;i<this.list.length;i++) {
			price = price + parseInt(this.list[i].price);
		}
		return price;
	}
	
	getList() {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		this.fetchBackend("/api/shopping",request);
	}
	
	addToList(item) {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(item)
		}
		this.fetchBackend("/api/shopping",request);
	}
	
	removeFromList(id) {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		let url = "/api/shopping/"+id;
		this.fetchBackend(url,request);	
	}

	editItem(item) {
		let request = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(item)
		}
		let url = "/api/shopping/"+item.id
		this.fetchBackend(url,request);
	}
	
	fetchBackend(url,request) {
		this.setLoading(true);
		this.setError("");
		fetch(url,request).then(response => {
			this.setLoading(false);
			if(response.ok) {
				if(request.method === "GET") {
					response.json().then((data) => {
						this.setList(data);
					}).catch((error) => {
						this.setError("Failed to parse JSON:"+error);
					})
				} else {
					this.getList();
				}
			} else {
				this.setError("Server responded with a status:"+response.status);
			}
		}).catch(error => {
			this.setLoading(false);
			this.setError(error);
		});
	}
	
	setLoading(loading) {
		this.loading = loading;
	}
	
	setList(list) {
		this.list = list;
	}
	
	setError(error) {
		this.error = error;
	}

}

export default ShoppingStore;