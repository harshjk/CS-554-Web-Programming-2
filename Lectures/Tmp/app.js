// app.js



//  http://api.openweathermap.org/data/2.5/forecast?q=London,uk&cnt=4&APPID=8b75f64c8da2baf28df9afb75c7ddc95



var weatherApp =  angular.module('weatherApp',['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'home.htm',
        controller:'homeController'
    })
    .when('/forcast',{
        templateUrl:'forcast.htm',
        controller:'forcastController'
    })
     .when('/forcast/:days',{
        templateUrl:'forcast.htm',
        controller:'forcastController'
    })
});


//SERVICES
weatherApp.service('cityService',function(){
    this.city = "New York, NY";
});

//CONTROLLER
weatherApp.controller('homeController',['$scope','cityService',function($scope,cityService){
    $scope.city=cityService.city;
    
    $scope.$watch('city',function(){
        cityService.city = $scope.city;
    });
}]);

weatherApp.controller('forcastController',['$scope','$resource','$routeParams','cityService',function($scope,$resource,$routeParams,cityService){
    $scope.city=cityService.city;
    
    $scope.days = $routeParams.days || 2;
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?APPID=8b75f64c8da2baf28df9afb75c7ddc95",{callback:"JSON_CALLBACK"},{get:{method:"JSONP"}});
    
    $scope.weatherResult = $scope.weatherAPI.get({q:$scope.city, cnt:$scope.days});
    
    //console.log($scope.weatherResult);
    
    $scope.convertToFernheit = function(degK){
        return Math.round((1.8*(degK-273))+32);
    };
    
    $scope.convertToDate = function(dt){
       // console.log(dt);
        return new Date(dt * 1000);
    }; 
    
}]);