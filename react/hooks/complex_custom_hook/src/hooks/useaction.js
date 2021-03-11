import {useContext,useEffect,useState,useMemo} from 'react';
import ReducerContext from './context/ReducerContext';
import {ActionConstants} from './actionconstants';

const useAction = () => {
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	const dispatch = useContext(ReducerContext);
	
	if(!dispatch) {
		console.log("Needs to be under the StateProvider");
	}
	
	useEffect(() => {
		if(urlRequest.url==="") {
			return;
		}
		console.log(urlRequest);
		const fetchData = async () => {
			dispatch({type:ActionConstants.LOADING});
			const response = await fetch(urlRequest.url,urlRequest.request);
			dispatch({type:ActionConstants.STOP_LOADING});
			if(response.ok) {
				if(urlRequest.action === "fetch") {
					const data = await response.json();
					dispatch({
						type:ActionConstants.FETCH_SUCCESS,
						list:data
					})
					return;
				}
				if(urlRequest.action === "add") {
					dispatch({
						type:ActionConstants.ADD_SUCCESS,
					})
					fetchList();
					return;
				}
				if(urlRequest.action === "delete") {
					dispatch({
						type:ActionConstants.REMOVE_SUCCESS,
					})
					fetchList();
					return;
				}
			} else {
				if(urlRequest.action === "fetch") {
					dispatch({
						type:ActionConstants.FETCH_FAIL,
						error:"Server responded with a status "+response.status
					})
					return;
				}
				if(urlRequest.action === "add") {
					dispatch({
						type:ActionConstants.ADD_FAIL,
						error:"Server responded with a status "+response.status
					})
					return;
				}
				if(urlRequest.action === "delete") {
					dispatch({
						type:ActionConstants.REMOVE_FAIL,
						error:"Server responded with a status "+response.status
					})
					return;
				}				
			}
		}
		
		fetchData();
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
	
	const add = (item) => {
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
	
	const remove = (id) => {
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
	
	return useMemo(() => ({fetch,add,remove}),[dispatch]);
	
}

export default useAction;