import {getList,clearShoppingState} from './shoppingActions';

//ACTION CONSTANTS

export const LOADING = "LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const CLEAR_LOGIN_STATE = "CLEAR_LOGIN_STATE";

//ASYNC ACTION CREATORS
export const register = (user) => {
	return (dispatch) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		dispatch(loading());
		fetch("/register",request).then(response => {
			if(response.ok) {
				dispatch(registerSuccess());
			} else {
				if(response.status === 409) {
					dispatch(registerFailed("Username is already in use"))
				} else {
					dispatch(registerFailed("Server responded with a status:"+response.status))
				}
			}
		}).catch(error => {
			dispatch(registerFailed("Server responded with an error:"+error));
		})
	}
}

export const login = (user) => {
	return (dispatch) => {	
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		dispatch(loading());
		fetch("/login",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					dispatch(loginSuccess(data.token));
					dispatch(getList(data.token));
				}).catch(error => {
					dispatch(loginFailed("Failed to parse JSON. Error:"+error))
				})
			} else {
				dispatch(loginFailed("Server responded with a status:"+response.status));
			}
		}).catch(error => {
			dispatch(loginFailed("Server responded with an error:"+error));
		})
	}
}

export const logout = (token) => {
	return (dispatch) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
			token:token}
		}
		dispatch(loading());
		fetch("/logout",request).then(response => {
			dispatch(logoutSuccess());
			dispatch(clearShoppingState());
		}).catch(error => {
			dispatch(logoutFailed("Server responded with an error. We logged you out anyway. Error:"+error));
			dispatch(clearShoppingState());
		})
	}
}	
//ACTIONS

export const loading = () => {
	return {
		type:LOADING
	}
}

export const stopLoading = () => {
	return {
		type:STOP_LOADING
	}
}

export const registerSuccess = () => {
	return {
		type:REGISTER_SUCCESS
	}
}

export const registerFailed = (error) => {
	return {
		type:REGISTER_FAILED,
		error:error
	}
}

export const loginSuccess = (token) => {
	return {
		type:LOGIN_SUCCESS,
		token:token
	}
}

export const loginFailed = (error) => {
	return {
		type:LOGIN_FAILED,
		error:error
	}
}

export const logoutSuccess = () => {
	return {
		type:LOGOUT_SUCCESS
	}
}

export const logoutFailed = (error) => {
	return {
		type:LOGOUT_FAILED,
		error:error
	}
}

export const clearLoginState = () => {
	return {
		type:CLEAR_LOGIN_STATE
	}
}