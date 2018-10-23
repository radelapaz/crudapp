angular.module("ItemService",[]).factory('ItemService',['$http',function($http) {
    return {

        loadItems: function(){
            return $http.get("/items/get-all")
                .then(function successCallback(response){
                    return response;
                }, function errorCallback(response){
                    return response;
                });
        },

        addItem: function(itemData){
            return $http.post("/items/new", itemData)
                .then(function successCallback(response){
                    return response;
                }, function errorCallback(response){
                    return response;
                });
       
        },

        deleteItem: function(itemId){
            console.log(itemId);
            // return $http.delete("/item-delete/"+itemId)
            //     .then(function successCallback(response){
            //         return response;
            //     }, function errorCallback(response){
            //         return response;
            //     });
        },

        updateItem: function(itemData){
            return $http.put("/item/update", itemData)
                .then(function successCallback(response){
                    return response;
                }, function errorCallback(response){
                    return response;
                });
        }
    }
}]);