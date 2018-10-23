var Queries = require("./Query");
module.exports = function(app){

    
    /** ADD ITEM PAGE*/
    app.get('/add-page', function(req,res){
        res.render('add-page.ejs',{
            title: "CRUD Application | Add an Item",
            message: ''
        });
    });

    app.get('/edit-page/:id',function(req,res){
        Queries.getById(req.params.id, function(err,result){
            if(err){
                res.status(500).send(err);
            } else {
                res.render('edit-page.ejs',{
                    title: "CRUD Application | Edit an Item",
                    item: result[0],
                    message: ''
                });
            }
        });
    });

    app.post("/add-page",function(req,res){
        // console.log(req.body.name);
        Queries.addItem(req.body,function(err,result){
            if(err){
                return res.status(500).send(err);
            } else {
                res.redirect('/');
            }
        });
    
    });
    /** GET ALL ITEMS*/
    app.get("/",function(req,res){
        Queries.getAll(function(err,rows){
            if(err){
                res.redirect('/');
            } else{
                res.render('index.ejs',{
                    title: "CRUD Application | View",
                    itemList: rows
                });
            }
        });
    });
     /** DELETE ITEM*/
    app.delete("/item/:id", function(req,res){
        console.log(req.params.id);
        // Queries.deleteItem(req.params.id,function(err,result){
        //     if(err){
        //         return res.status(500).send(err);
        //     } else {
        //         res.redirect('/');
        //     }
        // });
     
    });

    app.post("/items-update/:id",function(req,res){
        Queries.updateItem(req.params.id,req.body,function(err,result){
            if(err){
                res.json(err);
            }else {
                res.redirect('/');
            }
        });
    });
     /** GET ITEM*/
    // app.get("/items/id",function(req,res){
    //     // Queries.getById(req.params.id,function(err,result){
    //     //     if(err){
    //     //         res.json(err);
    //     //     } else{
    //     //         res.json(result);
    //     //     }
    //     // });
    
    //     console.log(req);
    // });
    
};