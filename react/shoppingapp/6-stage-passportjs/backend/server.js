const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/apiroutes");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");
const config = require("./config");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const mongoStore = require("connect-mongo");

let app = express();

const promise = mongoose.connect("mongodb://localhost/webshopping").then(
	(m) => m.connection.getClient(),
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

app.use(session({
	name:"shoppingapp-session",
	resave:false,
	secret:"myBestSecret",
	saveUninitialized:false,
	cookie:{
		maxAge:1000*60*60*24,
		httpOnly:true,
		sameSite:true
	},
	store:new mongoStore({
		collection:"sessions",
		clientPromise:promise,
		ttl:60*60*24
	})
}))

app.use(passport.initialize());
app.use(passport.session());

//Passport login strategies

passport.use("local-login",new localStrategy({
	usernameField:"username",
	passwordField:"password",
	passReqToCallback:true
},function(req,username,password,done){
	if(!req.body) {
		return done(null,false,{message:"Please provide proper credentials"})
	}
	if(!req.body.username || !req.body.password) {
		return done(null,false,{message:"Please provide proper credentials"})		
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return done(null,false,{message:"Username must 4 characters and password 8 characters long"})
	}
	userModel.findOne({"username":req.body.username}, function(err,user) {
		if(err) {
			console.log("Login failed, reason:",err);
			return done(err);
		}
		if(!user) {
			return done(null,false,{message:"Please provide proper credentials"})
		}
		bcrypt.compare(req.body.password,user.password,function(err,success) {
				if(err) {
					console.log(err);
					return done(err);
				}
				if(!success) {
					return done(null,false,{message:"Please provide proper credentials"})
				}
				let token = createToken();
				req.session.token = token;
				req.session.user = user.username;
				return done(null,user);
		})
	});	
}));

passport.serializeUser(function(user,done) {
	done(null,user._id);
})

passport.deserializeUser(function(id,done) {
	userModel.findById(id,function(err,user) {
		if(err) {
			return done(err);
		}
		return done(null,user);
	})
})

//HELPER FUNCTIONS

isUserLogged = (req,res,next) => {
	let token = req.headers.token;
	if(!token) {
		return res.status(403).json({message:"forbidden"});
	}
	if(req.isAuthenticated()) {
		if(req.headers.token === req.session.token) {
			return next();
		} else {
			return res.status(403).json({message:"forbidden"});
		}
	} else{
		return res.status(403).json({message:"forbidden"});
	}
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

app.post("/login",passport.authenticate("local-login"),function(req,res) {
	return res.status(200).json({token:req.session.token});
})

app.post("/logout",function(req,res) {
	let token = req.headers.token;
	if(!token) {
		return res.status(404).json({message:"not found"})
	}
	if(req.session) {
		req.logout();
		req.session.destroy();
		return res.status(200).json({message:"success"})
	}
	return res.status(404).json({message:"not found"})
})

app.use("/api",isUserLogged,apiRoutes);

app.listen(3001);
console.log("Running in port 3001");