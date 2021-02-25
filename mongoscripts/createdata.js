var data = [];
var customers = ['Matti','Jaska','Sanna','Martti','Seija'];

for(let i=0;i<5000;i++) {
	var tempId = Math.floor(Math.random()*5);
	var cost = Math.floor(Math.random()*100)+1;
	data[i] = {
		"custId":customers[tempId],
		"price":cost
	}
}

var conn = new Mongo();
var db = conn.getDB("customerDB");

db.data.insert(data);