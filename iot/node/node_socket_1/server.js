const net = require("net");
const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/message",function(req,res) {
	let message = req.body.message+"\n";
	let client = new net.Socket();
	
	client.connect(5000,"localhost",function() {
		console.log("Socket connected");
		client.write(message);
	})
	
	client.on("data",function(data) {
		client.destroy();
		return res.status(200).json({message:data.toString()})
	})
})

app.listen(3000);
console.log("Running in port 3000");
