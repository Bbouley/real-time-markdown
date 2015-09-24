var app = angular.module('controllerApp', ['ngRoute', 'ngSanitize']);

app.config(function($routeProvider){
  // $locationProvider.html5Mode({
  //   enabled : true,
  //   requireBase : false
  // }).hashPrefix('!');
  $routeProvider
  .when('/', {
    templateUrl : '../views/home.html',
    controller : 'HomeController'
  })
  .when('/newPost', {
    templateUrl : '../views/newPost.html',
    controller: 'BlogController'
  });
});
