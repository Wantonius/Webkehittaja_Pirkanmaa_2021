const startTimer = () => {
	if(!window.EventSource) {
		document.getElementById("timer").innerHTML="Your browser does not support SSE";
	}
	let source = new EventSource("timer");
	
	source.onmessage = function(event) {
		console.log("onmessage");
		document.getElementById("timer").innerHTML="Timer:"+event.data;
	}
	
	source.onerror = function(event) {
		document.getElementById("timer").innerHTML="Error connecting to SSE"; 
	}
}
