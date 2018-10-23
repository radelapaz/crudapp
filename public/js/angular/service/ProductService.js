angular.module("ProductService",[]).factory('ProductService',['$http',function($http) {
    return {

        loadItems: function(){
            return $http.get("/items/get-all")
                .then(function successCallback(response){
                    return response;
                }, function errorCallback(response){
                    return response;
                });
        },

        addItem: function(productData){
            return $http.post("/items/new", productData)
                .then(function successCallback(response){
                    return response;
                }, function errorCallback(response){
                    return response;
                });
       
        },

        deleteItem: function(productId){
            return $http.delete("/item-delete/"+productId)
                .then(function successCallback(response){
                    return response;
                }, function errorCallback(response){
                    return response;
                });
        },

        updateItem: function(product){
            return $http.put("/item/update", product)
                .then(function successCallback(response){
                    return response;
                }, function errorCallback(response){
                    return response;
                });
        }
    }
}]);