const express = require("express");

let router = express.Router();

//DATABASE

let database = [];
let id = 100;

//REST API

router.get("/shopping", function(req,res) {
	let tempDatabase = database.filter(item => item.user === req.session.user);
	return res.status(200).json(tempDatabase);
})

router.post("/shopping", function(req,res) {
	let item = {
		type:req.body.type,
		price:req.body.price,
		count:req.body.count,
		user:req.session.user,
		id:id
	}
	id++;
	database.push(item);
	return res.status(201).json({message:"success"});
})

router.delete("/shopping/:id",function(req,res) {
	let id = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(id === database[i].id) {
			if(database[i].user === req.session.user) {
				database.splice(i,1);
				return res.status(200).json({message:"success"});
			} else {
				return res.status(409).json({message:"conflict"});
			}
		}
	}
	return res.status(404).json({message:"not found"});
})

router.put("/shopping/:id",function(req,res) {
	let id = parseInt(req.params.id,10);
	let item = {
		type:req.body.type,
		price:req.body.price,
		count:req.body.count,
		user:req.session.user,
		id:id
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id === id) {
			if(database[i].user === req.session.user) {
				database.splice(i,1,item);
				return res.status(200).json({message:"success"});
			} else {
				return res.status(409).json({message:"conflict"});
			}
		}
	}
	return res.status(404).json({message:"not found"});
})

module.exports = router;