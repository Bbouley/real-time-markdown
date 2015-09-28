app.factory('PostFactory', ['$http', function($http){

  var obj = {};

  obj.get = function(url){
    return $http.get(url);
  };

  obj.post = function(url, payload){
    return $http.post(url, payload);
  };

  return obj;

}]);
