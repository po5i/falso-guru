angular.module('myApp.controllers', [])

.controller('AppCtrl', function($scope) {

})

.controller('GuruCtrl', function($scope,$stateParams) {
  $scope.slug = $stateParams.slug;
});