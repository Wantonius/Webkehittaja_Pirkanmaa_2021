const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/apiroutes");

let app = express();

app.use(bodyParser.json());


//LOGIN DATABASES

const registeredUsers = [];
const loggedSessions = [];
const ttl = 3600000;

//HELPER FUNCTIONS

createToken = () => {
	const letters = "abcdefghijABCDEFGHIJ0123456789";
	let token = "";
	for(let i=0;i<128;i++) {
		let temp = Math.floor(Math.random()*30);
		token = token + letters[temp];
	}
	return token;
}

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Please provide proper credentials"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Please provide proper credentials"});		
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Username must be atleast 4 characters and password 8 characters long"});
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			return res.status(409).json({message:"Username already in use"});
		}
	}
	let user = {
		username:req.body.username,
		password:req.body.password
	}
	registeredUsers.push(user);
	console.log(registeredUsers);
	return res.status(200).json({message:"success"});
})


app.use("/api",apiRoutes);

app.listen(3001);
console.log("Running in port 3001");