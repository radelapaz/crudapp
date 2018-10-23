angular.module("MainController",[]).controller("MainController", function($scope,ItemService,$timeout){
    
    $scope.load = function(){
        ItemService.loadItems()
            .then(function(response){
                if(response.status === 200){
                    $scope.itemList = response.data.result;
                    $scope.itemLength = response.data.result.length;
                }
            });
    };

    $scope.addProduct = function(){
        $scope.submitted = true;
        var itemData = {
            "name": $scope.addProd.name,
            "quantity": $scope.addProd.quantity,
            "amount": $scope.addProd.amount
        }
       

        ItemService.addItem(itemData).then(function(response){
            if(response.data.status){
                $scope.itemList.unshift(response.config.data);
            } else {
                
            }
            $scope.addProd.name = "";
            $scope.addProd.quantity = "";
            $scope.addProd.amount = "";
        });
        $scope.submitted = false;
    };

    $scope.deleteProduct = function(itemId){
        ItemService.deleteItem(itemId)
            .then(function(response){
                if(response.data.status) {
                    for (var i = 0; i <= $scope.itemList.length -1 ; i++) {
                        if (itemId === $scope.itemList[i].id) {
                            $scope.itemList.splice(i, 1);
                            break;
                        }

                    }
                } else {
                    console.log("error");
                }
            });
    }

    $scope.updateProduct = function(itemId){
        var foundProduct =null;
        for(var i = 0; i<= $scope.itemLength -1; i++){
            if($scope.itemList[i].id == itemId){
                foundProduct = $scope.itemList[i];
                break;
            }
        }

        if(foundProduct){
            var updatedProduct = {
                id: foundProduct.id,
                name: foundProduct.name,
                quantity: foundProduct.quantity,
                amount: foundProduct.amount
            }

           $scope.editProd ={
                id: updatedProduct.id,
                name: updatedProduct.name,
                quantity: updatedProduct.quantity,
                amount: updatedProduct.amount

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

        ItemService.updateItem(product).then(function(response){
            if(response.data.status){
                for(var i = 0; i <= $scope.itemList.length -1; i++){
                    if($scope.itemList[i].id == $scope.editProd.id){
                        $timeout(function() {
                            $scope.itemList.splice(i, 1,response.data.result);
                        });
            
                        break;
                    }
                }
               
                cleanUp($scope.editProd);
            } else {
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