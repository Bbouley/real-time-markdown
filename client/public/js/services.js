app.factory('PostFactory', ['$http', function($http){

  var obj = {};

  obj.get = function(url){
    return $http.get(url);
  };

}]);
