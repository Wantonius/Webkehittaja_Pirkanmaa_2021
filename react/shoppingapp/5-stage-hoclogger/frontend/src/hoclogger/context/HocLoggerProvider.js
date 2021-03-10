import React from 'react';
import LoggerContext from './LoggerContext';

export default class HocLoggerProvider extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loglevels:{
				LOG_DEBUG:"LOG_DEBUG",
				LOG_INFO:"LOG_INFO",
				LOG_WARN:"LOG_WARN",
				LOG_ERROR:"LOG_ERROR",
				LOG_FATAL:"LOG_FATAL"
			}
		}
	}
	
	hoclog = (severity,tag,desc) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify({
				severity:severity,
				tag:tag,
				desc:desc
			})
		}
		let url = "/hoclog";
		if(this.props.url) {
			url = this.props.url+"/hoclog";
		}
		fetch(url,request).then(response => {
			if(!response.ok) {
				console.log("Failed to log, response:",response.status);
			}
		}).catch(error => {
			console.log("Failed to log, error:",error);
		})
	}
	
	render() {
		return(
			<LoggerContext.Provider value={{
				hoclog:this.hoclog,
				loglevel:this.state.loglevels
			}}>
			{this.props.children}
			</LoggerContext.Provider>
		)
	}
	
}
