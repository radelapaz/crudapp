var Queries = require("./Query");
module.exports = function(app){

app.post("/items/new",function(req,res){
    Queries.addItem(req.body,function(err,result){
        if(err){
            res.json({status:false, message: err});
        } else {
            res.json({status:true,result: result});
        }
    });

});

app.get("/items/get-all",function(req,res){
    Queries.getAll(function(err,rows){
        if(err){
            res.json(err);
        } else{
            res.json(rows);
        }
    });
});

};