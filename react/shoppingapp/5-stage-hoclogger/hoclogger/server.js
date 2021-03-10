const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logitem = require("./models/logitem");

let app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/logger").then(
	() => console.log("Connected to Mongodb"),
	(err) => console.log("Failed to connect to MongoDb, reason:",err)
)

app.get("/hoclog",function(req,res) {
	let query = {};
	if(req.query.severity) {
		query["severity"] = req.query.severity;
	}
	if(req.query.date) {
		query["date"] = {"$gt":req.query.date}
	}
	logitem.find(query,function(err,logitems) {
		if(err) {
			console.log("Failed to query for logs. Reason:",err);
			return res.status(500).json({message:"database failure"});
		}
		return res.status(200).json(logitems);
	})
});

app.post("/hoclog",function(req,res) {
	let now = Date.now();
	if(!req.body) {
		return res.status(422).json({message:"incomplete log"});
	}
	if(!req.body.severity) {
		return res.status(422).json({message:"incomplete log"});
	}
	let templog = new logitem({
		severity:req.body.severity,
		tag:req.body.tag,
		desc:req.body.desc,
		date:now
	})
	templog.save(function(err) {
		if(err) {
			console.log("Failed to save log. Reason:",err);
			return res.status(500).json({message:"database failure"});
		}
		return res.status(201).json({message:"logged!"});
	})
})

app.listen(3002);
console.log("Running in port 3002");