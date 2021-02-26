const express = require("express");
const mongoose = require("mongoose");
const itemModel = require("../models/item");

let router = express.Router();



//REST API

router.get("/shopping", function(req,res) {
	let query = {"user":req.session.user};
	itemModel.find(query,function(err,items) {
		if(err) {
			console.log("Failed to find items. Reason:",err);
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(200).json(items);
	});
})

router.post("/shopping", function(req,res) {
	let item = new itemModel({
		type:req.body.type,
		price:req.body.price,
		count:req.body.count,
		user:req.session.user
	});
	item.save(function(err) {
		if(err) {
			console.log("Failed to save new item. Reason:",err);
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(201).json({message:"success"});
	});
})

router.delete("/shopping/:id",function(req,res) {
	let query = {"_id":req.params.id,"user":req.session.user};
	itemModel.deleteOne(query,function(err) {
		if(err) {
			console.log("Failed to remove item. Reason:",err);
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(200).json({message:"success"});
	})
})

router.put("/shopping/:id",function(req,res) {
	let item = {
		type:req.body.type,
		price:req.body.price,
		count:req.body.count,
		user:req.session.user,
	};
	let query = {"_id":req.params.id,"user":req.session.user};
	itemModel.replaceOne(query,item,function(err) {
		if(err) {
			console.log("Failed to edit item. Reason:",err);
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(200).json({message:"success"});
	})		
})



module.exports = router;