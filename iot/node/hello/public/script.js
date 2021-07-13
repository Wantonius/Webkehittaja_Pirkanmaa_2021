const getHello = () => {
	let request = {
		method:"GET",
		mode:"cors",
		headers:{"Content-type":"application/json"}
	}
	fetch("/hello",request).then(response => {
		if(response.ok) {
			response.json().then(data => {
				document.getElementById("message").innerText = "Message:"+data.message;
			}).catch(error => {
				console.log(error);
			});
		} else {
			document.getElementById("message").innerText = "Server responded with a status:"+response.status
		}
	}).catch(error => {
		console.log(error);
	})
}
