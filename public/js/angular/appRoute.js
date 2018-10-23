angular.module('appRoute',[]).config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
    $routeProvider
        .when("/index",{
            templateUrl:'public/index.html',
            controller:'MainController'
        }).when('/refresh',{
           redirectTo: "/index" 
        })

        .otherwise({redirectTo: '/'}
    );
$locationProvider.html5Mode(true);
}]);