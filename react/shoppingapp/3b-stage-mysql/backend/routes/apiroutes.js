const express = require("express");
const mysql = require("mysql");

let router = express.Router();

let con = mysql.createConnection({
	host:"localhost",
	user:"test",
	password:"test",
	database:"reactshopping"
});

//REST API

router.get("/shopping", function(req,res) {
	let sql = "SELECT * FROM items WHERE user = ?";
	let values = [req.session.user];
	con.query(sql,values,function(err,items) {
		if(err) {
			console.log(err);
			return res.status(500).json({message:"Internal server error"});
		}
		return res.status(200).json(items);
	})
})

router.post("/shopping", function(req,res) {
	let sql = "INSERT INTO items (type,count,price,user) VALUES (?,?,?,?)";
	let values = [req.body.type,req.body.count,req.body.price,req.session.user];
	con.query(sql,values,function(err) {
		if(err) {
			console.log(err);
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(201).json({message:"success"});
	})
});

router.delete("/shopping/:id",function(req,res) {
	let id = parseInt(req.params.id,10);
	let sql = "DELETE FROM items WHERE _id = ? AND user = ?";
	let values = [id,req.session.user];
	con.query(sql,values,function(err,result) {
		if(err) {
			console.log(err);
			return res.status(500).json({message:"Internal server error"});
		}
		if(result.affectedRows === 0) {
			return res.status(404).json({message:"not found"});
		}
		return res.status(200).json({message:"success"});
	})
})

router.put("/shopping/:id",function(req,res) {
	let id = parseInt(req.params.id,10);
	let sql = "UPDATE items SET type=?, count=?, price=? WHERE _id=? AND user=?";
	let values = [req.body.type,req.body.count,req.body.price,id,req.session.user];
	con.query(sql,values,function(err,result) {
		if(err) {
			console.log(err);
			return res.status(500).json({message:"Internal server error"});
		}
		if(result.affectedRows === 0) {
			return res.status(404).json({message:"not found"});
		}
		return res.status(200).json({message:"success"});
	})		
})


module.exports = router;