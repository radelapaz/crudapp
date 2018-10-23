var db = require('../dbconnection'); //to get the reference of dbconnection
var Queries= {
    getAll:function(callback){
        return db.query("SELECT * FROM items", callback);
    },
    getById:function(id,callback){
        return db.query("SELECT * FROM items WHERE id=?",[id],callback);
    },
    addItem:function(item,callback){
        return db.query("INSERT INTO items (name,quantity,amount) VALUES(?,?,?)",[item.name,item.quantity,item.amount],callback);
    },
    deleteItem:function(id,callback){
        return db.query("DELETE FROM items WHERE id=?",[id],callback);
    },
    updateItem:function(id,item,callback){
        return db.query("UPDATE items SET name=?,quantity=?,amount=? WHERE id=?",[item.name,item.quantity,item.amount,item.id],callback);
    }
};
module.exports = Queries;