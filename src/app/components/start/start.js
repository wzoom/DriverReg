var start = angular.module('start', []);

start.controller('startCtrl', function ($scope, $rootScope, $state) {
  var user = $rootScope.user;

  $rootScope.stepTitle = 'Getting Started';

});
