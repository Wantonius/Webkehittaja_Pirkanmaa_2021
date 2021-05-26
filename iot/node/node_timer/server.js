const express = require("express");
const net = require("net");

const app = express();

app.use(express.static("public"));

app.get("/timer",function(req,res) {
	res.writeHead(200, {
			"Content-Type":"text/event-stream",
			"Cache-Control":"no-cache",
			"Connection":"keep-alive"
		})	
	let client = new net.Socket();
	
	client.connect(5000,"localhost", function() {
		console.log("Socket connected");
	});
	
	client.on("data",function(data) {
		res.write("data:"+data.toString()+"\n\n");
	})
	
	client.on("close",function() {
		res.end();
		client.destroy();
		console.log("Connection to timer server disconnected");
	})
}); 


app.listen(3000);

console.log("Running in port 3000");
