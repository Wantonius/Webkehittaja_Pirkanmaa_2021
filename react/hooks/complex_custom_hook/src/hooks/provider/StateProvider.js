import {useReducer} from 'react';
import StateContext from '../context/StateContext';
import ReducerContext from '../context/ReducerContext';
import {ActionConstants} from '../actionconstants';

const initialState = {
	loading:false,
	list:[],
	error:""
}

const reducer = (state,action) => {
	let tempState = {};
	console.log(action);
	switch(action.type) {
		case ActionConstants.LOADING: 
			return {
				...state,
				loading:true,
				error:""
			}
		case ActionConstants.STOP_LOADING:
			return {
				...state,
				loading:false
			}
		case ActionConstants.FETCH_SUCCESS:
			tempState = {
				...state,
				list:action.list,
				error:""
			}
			return tempState;
		case ActionConstants.FETCH_FAIL:
			tempState = {
				...state,
				error:action.error
			}
			return tempState;
		case ActionConstants.ADD_SUCCESS:
			tempState = {
				...state,
				error:""
			}
			return tempState;
		case ActionConstants.ADD_FAIL:
			tempState = {
				...state,
				error:action.error
			}
			return tempState;
		case ActionConstants.REMOVE_SUCCESS:
			tempState = {
				...state,
				error:""
			}
			return tempState;
		case ActionConstants.REMOVE_FAIL:
			tempState = {
				...state,
				error:action.error
			}
			return tempState;
		default:
			return state;
	}
}

const StateProvider = (props) => {
	const [state,dispatch] = useReducer(reducer,initialState);
	return (
		<StateContext.Provider value={state}>
			<ReducerContext.Provider value={dispatch}>
				{props.children}
			</ReducerContext.Provider>
		</StateContext.Provider>
	)
}
export default StateProvider;