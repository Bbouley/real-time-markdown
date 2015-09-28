var converter = new showdown.Converter();


app.controller('HomeController', function($scope){
  $scope.message = 'testing Home controller';
});

app.controller('BlogController', function($scope, $sce, PostFactory){

  $scope.message = 'testing Blog controller';

  $scope.$watch('blogTextInput', function(newVal, oldVal, scope){
      html = converter.makeHtml(newVal);
      $scope.textOutput = html;
      $scope.trustOutput = function(){
        return $sce.trustAsHtml($scope.textOutput);
      };
  });

  $scope.getPosts = function(url){
    PostFactory.get(url).then(function(response){
      $scope.posts = response.data;
    });
  };

  $scope.addPost = function(){
    var payload = {
      title : $scope.post.title,
      description: $scope.post.description,
      content: $scope.blogTextInput,
    };
    console.log(payload);
    PostFactory.post(url, payload).then(function(response){
      console.log(response);
    });
  };

});
