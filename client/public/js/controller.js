var converter = new showdown.Converter();


app.controller('HomeController', function($scope){
  $scope.message = 'testing Home controller';

});

app.controller('BlogController', function($scope, $sce){
  $scope.message = 'testing Blog controller';
  $scope.$watch('blogTextInput', function(newVal, oldVal, scope){
      html = converter.makeHtml(newVal);
      $scope.textOutput = html;
      $scope.trustOutput = function(){
        return $sce.trustAsHtml($scope.textOutput);
      };
  });

});
