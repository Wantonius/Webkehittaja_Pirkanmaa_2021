const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/apiroutes");
const bcrypt = require("bcrypt");
const mysql = require("mysql");

let app = express();

app.use(bodyParser.json());


//LOGIN DATABASES

const ttl = 3600000;

let con = mysql.createConnection({
	host:"localhost",
	user:"test",
	password:"test",
	database:"reactshopping"
});

con.connect(function(err) {
	if(err) throw err;
	console.log("MySQL Connection successful!");
	let sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) UNIQUE, password VARCHAR(256))";
	
	con.query(sql, function(err,result) {
		if (err) throw err;
		console.log("Created table users if it did not exist:",result);
	});
	
	sql = "CREATE TABLE IF NOT EXISTS sessions (id INT AUTO_INCREMENT PRIMARY KEY, token VARCHAR(128), ttl BIGINT, user VARCHAR(50))";

	con.query(sql, function(err,result) {
		if (err) throw err;
		console.log("Created table sessions if it did not exist:",result);
	});

	sql = "CREATE TABLE IF NOT EXISTS items (_id INT AUTO_INCREMENT PRIMARY KEY, type VARCHAR(120), count INT, price FLOAT, user VARCHAR(50))";

	con.query(sql, function(err,result) {
		if (err) throw err;
		console.log("Created table items if it did not exist:",result);
	});
})

//HELPER FUNCTIONS

isUserLogged = (req,res,next) => {
	let token = req.headers.token;
	if(!token) {
		return res.status(403).json({message:"forbidden"});
	}
	let sql = "SELECT * FROM sessions WHERE token = ?";
	con.query(sql,[token],function(err,result) {
		if(err) {
			console.log(err);
			return res.status(500).json({message:"Internal server error"})
		}
		if(result.length === 0) {
			console.log("hoplaa");
			return res.status(403).json({message:"forbidden"});
		}
		let session = result[0];
		let now = Date.now();
		if(now > session.ttl) {
			console.log("hoplaa 2");
			sql = "DELETE FROM sessions WHERE token = ?";
			con.query(sql,[session.token],function(err) {
				if(err) {
					console.log(err);					
				}
				return res.status(403).json({message:"forbidden"});
			})
		} else {
			req.session = {};
			req.session.user = session.user;
			let tempttl = now + ttl;
			sql = "UPDATE sessions SET ttl = ? WHERE token = ?";
			con.query(sql,[tempttl, session.token],function(err) {
				if(err) {
					console.log(err);
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
		let sql = "INSERT INTO users (username,password) VALUES (?,?)";
		let values = [req.body.username,hash];
		con.query(sql,values,function(err,result) {
			if(err) {
				if(err.errno === 1062) {
					return res.status(409).json({message:"Username is already in use"});
				}
				console.log(err);
				return res.status(500).json({message:"Interal server error"});
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
	let sql = "SELECT * FROM users WHERE username = ?";
	con.query(sql,[req.body.username],function(err,result) {
		if(err) {
			console.log(err);
			return res.status(500).json({message:"Internal server error"})
		}
		if(result.length === 0) {
			return res.status(403).json({message:"forbidden"});
		}
		bcrypt.compare(req.body.password,result[0].password,function(err,success) {
			if(err) {
				console.log(err);
				return res.status(500).json({message:"Internal server error"});
			}
			if(!success) {
				return res.status(403).json({message:"forbidden"});
			}
			let token = createToken();
			let now = Date.now();
			let temp_ttl = now + ttl;
			sql = "INSERT INTO sessions (user,token,ttl) VALUES (?,?,?)";
			let values = [result[0].username,token,temp_ttl];
			con.query(sql,values,function(err) {
				if(err) {
					console.log(err);
					return res.status(500).json({message:"Internal server error"});
				}
				return res.status(200).json({token:token});
			})
		})
	})
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