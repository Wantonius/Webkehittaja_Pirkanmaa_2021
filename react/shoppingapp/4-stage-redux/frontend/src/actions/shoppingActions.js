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