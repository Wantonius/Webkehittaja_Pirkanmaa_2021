const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/apiroutes");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");

let app = express();

mongoose.connect("mongodb://localhost/webshopping").then(
	() => console.log("Connected to MongoDB"),
	(error) => console.log("Failed to connect to MongoDB. Reason:",error)
);

app.use(bodyParser.json());

const ttl = 3600000;

//HELPER FUNCTIONS

isUserLogged = (req,res,next) => {
	let token = req.headers.token;
	if(!token) {
		return res.status(403).json({message:"forbidden"});
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(token === loggedSessions[i].token) {
			let now = Date.now();
			if(now > loggedSessions[i].ttl) {
				loggedSessions.splice(i,1);
				return res.status(403).json({message:"forbidden"});
			}
			req.session = {};
			req.session.user = loggedSessions[i].user;
			loggedSessions[i].ttl = loggedSessions[i].ttl+ttl;
			return next();
		}
	}
	return res.status(403).json({message:"forbidden"})
}

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
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			return res.status(400).json({message:"Bad Request"});
		}
		let user = new userModel({
			username:req.body.username,
			password:hash
		});
		user.save(function(err) {
			if(err) {
				console.log("Failed to register user. Reason:",err);
				if(err.code === 11000) {
					return res.status(409).json({message:"Username is already in use"});
				}
				return res.status(500).json({message:"Internal server error"});
			}
			return res.status(200).json({message:"success"});
		})
	})
})

app.post("/login",function(req,res) {
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
		if(registeredUsers[i].username === req.body.username) {
			bcrypt.compare(req.body.password,registeredUsers[i].password,function(err,success) {
					if(err) {
						return res.status(400).json({message:"Bad Request"})
					}
					if(!success) {
						return res.status(403).json({message:"forbidden"})
					}
					let token = createToken();
					let time = Date.now();
					let session = {
						user:req.body.username,
						ttl:time+ttl,
						token:token
					}
					loggedSessions.push(session);
					return res.status(200).json({token:token});
			})
			return;
		}
	}
	return res.status(403).json({message:"forbidden"});
})

app.post("/logout",function(req,res) {
	let token = req.headers.token;
	if(!token) {
		return res.status(404).json({message:"not found"})
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(token === loggedSessions[i].token) {
			loggedSessions.splice(i,1);
			return res.status(200).json({message:"success"})
		}
	}
	return res.status(404).json({message:"not found"})
})

app.use("/api",isUserLogged,apiRoutes);

app.listen(3001);
console.log("Running in port 3001");