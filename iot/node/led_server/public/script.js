const handleLed = (state) => {
	let request = {
		method:"GET",
		mode:"cors",
		headers: {
			"Content-Type":"application/json"
		}
	}
	fetch("/led/"+state,request).then(response => {
		if(response.ok) {
			console.log("Success!")
		} else {
			console.log("Server responded with a status:",response.status);
		}
	}).catch(error => {
		console.log(error)
	})
}

const startLed = () => {
	handleLed("on");
}

const stopLed = () => {
	handleLed("off");
}

const startBlink = () => {
	let ticks = document.getElementById("ticks").value;
	handleLed(ticks);
}
