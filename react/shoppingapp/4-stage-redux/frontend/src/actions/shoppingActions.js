import {loading,stopLoading,clearLoginState} from './loginActions';

export const FETCH_SHOPPINGLIST_SUCCESS = "FETCH_SHOPPINGLIST_SUCCESS";
export const FETCH_SHOPPINGLIST_FAILED = "FETCH_SHOPPINGLIST_FAILED";
export const ADD_TO_LIST_SUCCESS = "ADD_TO_LIST_SUCCESS";
export const ADD_TO_LIST_FAILED = "ADD_TO_LIST_FAILED";
export const REMOVE_FROM_LIST_SUCCESS = "REMOVE_FROM_LIST_SUCCESS";
export const REMOVE_FROM_LIST_FAILED = "REMOVE_FROM_LIST_FAILED";
export const EDIT_ITEM_SUCCESS = "EDIT_ITEM_SUCCESS";
export const EDIT_ITEM_FAILED = "EDIT_ITEM_FAILED";
export const CLEAR_SHOPPING_STATE = "CLEAR_SHOPPING_STATE";

//ASYNC ACTION CREATORS
	
export const getList = (token) => {
	return (dispatch) => {	
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
				token:token}
		}
		dispatch(loading());
		fetch("/api/shopping",request).then(response => {
			dispatch(stopLoading());
			if(response.ok) {
				response.json().then(data => {
					dispatch(fetchShoppingListSuccess(data));
				}).catch(error => {
					dispatch(fetchShoppingListFailed("Failed to parse JSON. Reason:"+error));
				});	
			} else {
				if(response.status === 403) {
					dispatch(clearShoppingState());
					dispatch(clearLoginState());
					dispatch(fetchShoppingListFailed("Session expired. Logging you out!"));
				} else {
					dispatch(fetchShoppingListFailed("Server responded with a status:"+response.status));
				}
			}
		}).catch(error => {
			dispatch(stopLoading());
			dispatch(fetchShoppingListFailed("Server responded with an error. Reason:"+error));
		});	
	}
}

export const addToList = (item,token) => {
	return (dispatch) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
				token:token},
			body:JSON.stringify(item)
		}
		dispatch(loading());
		fetch("/api/shopping",request).then(response => {
			dispatch(stopLoading());
			if(response.ok) {
				dispatch(addToListSuccess());
				dispatch(getList(token));
			} else {
				if(response.status === 403) {
					dispatch(clearShoppingState());
					dispatch(clearLoginState());
					dispatch(addToListFailed("Session expired. Logging you out!"));
				} else {
					dispatch(addToListFailed("Server responded with a status:"+response.status));
				}
			}
		}).catch(error => {
			dispatch(stopLoading());
			dispatch(addToListFailed("Server responded with an error. Reason:"+error));
		});	
	}
}
export const removeFromList = (id,token) => {
	return (dispatch) => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json",
				token:token}
		}
		dispatch(loading());
		fetch("/api/shopping/"+id,request).then(response => {
			dispatch(stopLoading());
			if(response.ok) {
				dispatch(removeFromListSuccess());
				dispatch(getList(token));
			} else {
				if(response.status === 403) {
					dispatch(clearShoppingState());
					dispatch(clearLoginState());
					dispatch(removeFromListFailed("Session expired. Logging you out!"));
				} else {
					dispatch(removeFromListFailed("Server responded with a status:"+response.status));
				}
			}
		}).catch(error => {
			dispatch(stopLoading());
			dispatch(removeFromListFailed("Server responded with an error. Reason:"+error));
		});	
	}
}

export const editItem = (item,token) => {
	return (dispatch) => {
		let request = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-type":"application/json",
				token:token},
			body:JSON.stringify(item)
		}
		dispatch(loading());
		fetch("/api/shopping/"+item._id,request).then(response => {
			dispatch(stopLoading());
			if(response.ok) {
				dispatch(editItemSuccess());
				dispatch(getList(token));
			} else {
				if(response.status === 403) {
					dispatch(clearShoppingState());
					dispatch(clearLoginState());
					dispatch(editItemFailed("Session expired. Logging you out!"));
				} else {
					dispatch(editItemFailed("Server responded with a status:"+response.status));
				}
			}
		}).catch(error => {
			dispatch(stopLoading());
			dispatch(editItemFailed("Server responded with an error. Reason:"+error));
		});	
	}
}
//ACTIONS

export const fetchShoppingListSuccess = (list) => {
	return {
		type:FETCH_SHOPPINGLIST_SUCCESS,
		list:list
	}
}

export const fetchShoppingListFailed = (error) => {
	return {
		type:FETCH_SHOPPINGLIST_FAILED,
		error:error
	}
}

export const addToListSuccess = () => {
	return {
		type:ADD_TO_LIST_SUCCESS
	}
}

export const addToListFailed = (error) => {
	return {
		type:ADD_TO_LIST_FAILED,
		error:error
	}
}

export const removeFromListSuccess = () => {
	return {
		type:REMOVE_FROM_LIST_SUCCESS
	}
}

export const removeFromListFailed = (error) => {
	return {
		type:REMOVE_FROM_LIST_FAILED,
		error:error
	}
} 

export const editItemSuccess = () => {
	return {
		type:EDIT_ITEM_SUCCESS
	}
}

export const editItemFailed = (error) => {
	return {
		type:EDIT_ITEM_FAILED,
		error:error
	}
}

export const clearShoppingState = () => {
	return {
		type:CLEAR_SHOPPING_STATE
	}
}