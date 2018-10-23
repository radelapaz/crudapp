var Queries = require("./Query");
module.exports = function(app){
    /** ADD ITEM*/
    app.post("/items/new",function(req,res){
        // console.log(req.body.name);
        // console.log(req.body);
        Queries.addItem(req.body,function(err,result){
            if(err){
                res.json({status:false, message: err});
            } else {
                res.json({status:true,result: result});
            }
        });
    
    });
    /** GET ALL ITEMS*/
    app.get("/items/get-all",function(req,res){
        Queries.getAll(function(err,rows){
            if(err){
                res.json(err);
            } else{
                res.json({status: true, result: rows});
            }
        });
    });
     /** DELETE ITEM*/
    app.delete("/item-delete/:id", function(req,res,next){
        Queries.deleteItem(req.params.id,function(err,result){
            if(err){
                res.json(err);
            } else {
                res.json(result);
            }
        });
     
    });
     /** GET ITEM*/
    app.get("/items/id",function(req,res){
        // Queries.getById(req.params.id,function(err,result){
        //     if(err){
        //         res.json(err);
        //     } else{
        //         res.json(result);
        //     }
        // });
    
        console.log(req);
    });
    
};