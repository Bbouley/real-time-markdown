var converter = new showdown.Converter();


app.controller('HomeController', function($scope){
  $scope.message = 'testing Home controller';
});

app.controller('BlogController', function($scope, $sce, PostFactory, $timeout){

  $scope.post = {};

  $scope.success = false;

  $scope.showEdit = false;

  $scope.testEdit = false;

  $scope.message = 'testing Blog controller';

  function successMessage(){
    $scope.success = false;
  }

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
      $scope.success = true;
      $timeout(successMessage, 8000);
    });
  };

  $scope.addPost = function(){
    var payload = {
      title : $scope.post.title,
      description: $scope.post.description,
      content: $scope.blogTextInput,
    };
    PostFactory.post('/api/v1/posts', payload).then(function(response){
      $scope.success = true;
      $timeout($scope.setMessage(), 10000);
      $scope.getPosts();
    });
  };

  $scope.getPost = function(id){
    $scope.showEdit = true;
    $scope.findPost = '/api/v1/post/' + id;
    PostFactory.get($scope.findPost).then(function(response){
      $scope.post = {
        title : response.data.SUCCESS.title,
        description : response.data.SUCCESS.description,
        _id : response.data.SUCCESS._id
      };
      $scope.blogTextInput = response.data.SUCCESS.content,
      $scope.success = true;
      console.log($scope.showEdit);
      $timeout(successMessage, 10000);
    });
  };


  $scope.editPost = function(){
    var url = '/api/v1/post/' + $scope.post._id;
    var payload = {
      title : $scope.post.title,
      description : $scope.post.description,
      content : $scope.blogTextInput
    };
    PostFactory.put(url, payload)
    .then(function(response){
      $scope.getPosts('/api/v1/posts');
      $scope.success = true;
      $scope.showEdit = false;
      $scope.post = {};
      $scope.blogTextInput = '';
      $timeout(successMessage, 10000);
    });
  };

  $scope.deletePost = function(id){
    var url = '/api/v1/post/' + id;
    PostFactory.delete(url).then(function (response){
      $scope.getPosts('/api/v1/posts');
      $scope.success = true;
      $timeout(successMessage, 10000);
    });
  };

});
