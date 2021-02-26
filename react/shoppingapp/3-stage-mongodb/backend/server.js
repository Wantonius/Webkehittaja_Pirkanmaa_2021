const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/apiroutes");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");
const config = require("./config");

let app = express();

mongoose.connect("mongodb://localhost/webshopping").then(
	() => console.log("Connected to MongoDB"),
	(error) => console.log("Failed to connect to MongoDB. Reason:",error)
);


/*
mongoose.connect("mongodb+srv://"+config.username+":"+config.password+"@"+config.url+"/webshopping?retryWrites=true&w=majority").then(
	() => console.log("Connected to MongoDB"),
	(error) => console.log("Failed to connect to MongoDB. Reason:",error)
);
*/
app.use(bodyParser.json());

const ttl = 3600000;

//HELPER FUNCTIONS

isUserLogged = (req,res,next) => {
	let token = req.headers.token;
	if(!token) {
		return res.status(403).json({message:"forbidden"});
	}
	sessionModel.findOne({"token":token}, function(err,session) {
		if(err) {
			console.log("Failed to find session. Reason:",err);
			return res.status(403).json({message:"forbidden"});
		}
		if(!session) {
			return res.status(403).json({message:"forbidden"});
		}
		let now = Date.now();
		if(session.ttl < now) {
			sessionModel.deleteOne({"_id":session._id}, function(err) {
				if(err) {
					console.log("Failed to remove session. Reason:",err);
				}
				return res.status(403).json({message:"forbidden"})
			})
		} else {
			req.session = {};
			req.session.user = session.user;
			session.ttl = now + ttl;
			session.save(function(err) {
				if(err) {
					console.log("Failed to save session. Reason:",err);
				}
				return next();
			})
		}
	})
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
	userModel.findOne({"username":req.body.username}, function(err,user) {
		if(err) {
			console.log("Login failed, reason:",err);
			return res.status(500).json({message:"Internal server error"})
		}
		if(!user) {
			return res.status(403).json({message:"forbidden"})
		}
		bcrypt.compare(req.body.password,user.password,function(err,success) {
				if(err) {
					return res.status(400).json({message:"Bad Request"})
				}
				if(!success) {
					return res.status(403).json({message:"forbidden"})
				}
				let token = createToken();
				let time = Date.now();
				let session = new sessionModel({
					user:user.username,
					ttl:time+ttl,
					token:token
				})
				session.save(function(err) {
					if(err) {
						console.log("Failed to save session, reason:",err);
						return res.status(500).json({message:"Internal server error"})
					}
					return res.status(200).json({token:token})
				})
		})
	});
})

app.post("/logout",function(req,res) {
	let token = req.headers.token;
	if(!token) {
		return res.status(404).json({message:"not found"})
	}
	sessionModel.deleteOne({"token":token},function(err){
		if(err) {
			console.log("Failed to remove session in logout. Reason:",err);
		}
		return res.status(200).json({message:"logged out"});
	})
})

app.use("/api",isUserLogged,apiRoutes);

app.listen(3001);
console.log("Running in port 3001");