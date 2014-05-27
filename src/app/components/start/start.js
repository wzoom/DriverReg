var start = angular.module('start', []);

start.controller('startCtrl', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {
  var user = $rootScope.user;

  $rootScope.stepTitle = 'Getting Started';


}]);
