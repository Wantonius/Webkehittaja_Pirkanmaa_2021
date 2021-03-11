import {useContext,useEffect,useState} from 'react';
import ReducerContext from './context/ReducerContext';
import {ActionConstants} from './ActionConstants';

const useAction = () => {
	
	const [urlRequest,setUrlrequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	const dispatch = useContext(ReducerContext);
	
	useEffect(() => {
		const fetch = async () => {
			dispatch({type:ActionConstants.LOADING});
			const response = await fetch(urlRequest.url,urlRequest.request);
			dispatch({type:ActionConstants.STOP_LOADING});
			if(response.ok) {
				if(urlRequest.request.action === "fetch") {
					const data = await response.json();
					dispatch({
						type:ActionConstants.FETCH_SUCCESS,
						list:data
					})
				}
				if(urlRequest.request.action === "add") {
					dispatch({
						type:ActionConstants.ADD_SUCCESS,
					})
					fetchList();
				}
				if(urlRequest.request.action === "delete") {
					dispatch({
						type:ActionConstants.REMOVE_SUCCESS,
					})
					fetchList();
				}
			} else {
				if(urlRequest.request.action === "fetch") {
					dispatch({
						type:ActionConstants.FETCH_FAIL,
						error:"Server responded with a status "+response.status
					})
				}
				if(urlRequest.request.action === "add") {
					dispatch({
						type:ActionConstants.ADD_FAIL,
						error:"Server responded with a status "+response.status
					})
				}
				if(urlRequest.request.action === "delete") {
					dispatch({
						type:ActionConstants.REMOVE_FAIL,
						error:"Server responded with a status "+response.status
					})
				}				
			}
		}
		
		fetch();
	},[urlRequest]);
	
	const fetchList = () => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET",
				mode:"cors",
				headers:{"Content-type":"application/json"}
			},
			action:"fetch"
		})
	}
	
	const addToList = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(item)
			},
			action:"add"
		})
	}
	
	const removeFromList = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				mode:"cors",
				headers:{"Content-type":"application/json"}
			},
			action:"delete"			
		})
	}
	
	return [fetchList,addToList,removeFromList];
	
}

export default useAction;