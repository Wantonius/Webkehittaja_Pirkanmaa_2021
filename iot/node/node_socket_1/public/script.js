const sendMessage = () => {
	let message = document.getElementById("messageinput").value;
	if(message.length === 0) {
		return;
	}
	let request = {
		method:"POST",
		mode:"cors",
		headers:{"Content-type":"application/json"},
		body:JSON.stringify({message:message})
	}
	fetch("/message",request).then(response => {
		if(response.ok) {
			response.json().then(data => {
				console.log("Message from the backend:",data.message);
			}).catch(error => {
				console.log(error);
			})
		} else {
			console.log("Server responded with a status:",response.status)
		}
	}).catch(error => {
		console.log(error);
	})
}
