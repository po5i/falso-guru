angular.module('myApp.controllers', [])

.controller('AppCtrl', function($scope, oauthService) {

  oauthService.initialize();

  $scope.user = null;

  $scope.connectButton = function(backend) {
      promiseB = oauthService.connectProvider(backend).then(function(data) {
      });

      promiseB.then(function(data){
          oauthService.getCurrentUser().then(function(data){
            $scope.user = data;
          }); 
      });
  };

})

.controller('GuruCtrl', function($scope,$stateParams) {
  $scope.slug = $stateParams.slug;
});