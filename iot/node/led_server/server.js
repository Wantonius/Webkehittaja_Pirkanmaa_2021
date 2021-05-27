const express = require("express");
const fs = require("fs");

let app = express();

app.use(express.static("public"));

app.get("/led/:state",function(req,res) {
	fs.writeFile("/sys/class/ledclass/led01/led_attr",req.params.state,function(err) {
		if(err) {
			console.log(err);
			return res.status(404).json({message:"Failed to handle led"});
		}
		return res.status(200).json({message:"success"})	
	})
})

app.listen(3000);
console.log("Running in port 3000");
