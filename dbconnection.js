var mysql = require('mysql');
var db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: 'inventory'
});

db.connect(function(err){
    if(err){
        console.log("Connection Error: ", err);
    } else {
        console.log("Connection Successful");
    }
});

module.exports = db;