angular.module("MainController",[]).controller("MainController", function($scope,ProductService,$timeout){
    
    $scope.load = function(){
        ProductService.loadItems()
            .then(function(response){
                if(response.status === 200){
                    $scope.productList = response.data.result;
                    $scope.productLength = response.data.result.length;
                }
            });

        // console.log(response.data);
    };

    $scope.addProduct = function(){
        $scope.submitted = true;
        var itemData = {
            "name": $scope.addProd.name,
            "quantity": $scope.addProd.quantity,
            "amount": $scope.addProd.amount
        }
       

        ProductService.addItem(itemData).then(function(response){
            if(response.data.status){
                $scope.productList.unshift(response.data.result);
            } else {
                
            }
            $scope.addProd.name = "";
            $scope.addProd.quantity = "";
            $scope.addProd.amount = "";
        });
        $scope.submitted = false;
    };

    $scope.deleteProduct = function(itemId){
        // ProductService.deleteItem(productId)
        //     .then(function(response){
        //         if(response.data.status) {
        //             for (var i = 0; i <= $scope.productList.length -1 ; i++) {
        //                 if (productId === $scope.productList[i]._id) {
        //                     $scope.productList.splice(i, 1);
        //                     break;
        //                 }

        //             }
        //         } else {
        //             console.log("error");
        //         }
        //     });
        console.log(itemId);
    }

    $scope.updateProduct = function(productId){
        var foundProduct =null;
        for(var i = 0; i<= $scope.productLength -1; i++){
            if($scope.productList[i]._id == productId){
                foundProduct = $scope.productList[i];
                break;
            }
        }

        if(foundProduct){
            var updatedProduct = {
                productId: foundProduct.productId,
                productName: foundProduct.productName,
                productPrice: foundProduct.productPrice,
                _id: productId
            }

           $scope.editProd ={
                id: updatedProduct.productId,
                name: updatedProduct.productName,
                price: updatedProduct.productPrice,
                _id: updatedProduct._id

           }
    
        }

    

        $scope.editFill = true;
      

    }

    $scope.saveUpdate = function(){
        
        var product = {
            _id: $scope.editProd._id,
            productName: $scope.editProd.name,
            productPrice: $scope.editProd.price,
            productId: $scope.editProd.id
        }
        
        $scope.editFill = false;

        ProductService.updateItem(product).then(function(response){
            if(response.data.status){
                for(var i = 0; i <= $scope.productList.length -1; i++){
                    if($scope.productList[i]._id == $scope.editProd._id){
                        $timeout(function() {
                            $scope.productList.splice(i, 1,response.data.result);
                        });
            
                        break;
                    }
                }
               
                cleanUp($scope.editProd);
            } else {
                console.log(response);
            }
        });
    }

    $scope.closeUpdate = function(){
        $scope.editFill = false;
        cleanUp($scope.editProd);
    }

    var cleanUp = function(cleanUpProd){
        cleanUpProd.id = "";
        cleanUpProd.name = "";
        cleanUpProd.price = "";
        $scope.editProd._id = undefined;
    }

})