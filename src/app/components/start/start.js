var start = angular.module('start', []);

start.controller('startCtrl', function ($scope, $rootScope, $state) {
  var user = $rootScope.user;

  $rootScope.stepTitle = 'Getting Started';

});

start.config(function($stateProvider){

    var getComponentTemplatePath = function (stateName) {
      return 'components/' + stateName + '/' + stateName + '.html';
    };

    $stateProvider
      .state("start", {
        title: "Getting Started",
        sideMenu: true,
        skipAllow: false,
        url: "/",
        templateUrl: getComponentTemplatePath('start'),
        controller: 'HeaderCtrl',
        weight: 0,
      })
      // Incomplete can be a substate thanks to "ui-view" defined in parent (start.html) template
      .state("start.incomplete", {
        title: "Getting Started",
        sideMenu: false,
        skipAllow: false,
        url: "^/incomplete",
        templateUrl: 'components/start/start.incomplete.html',
        controller: 'HeaderCtrl',
        weight: 0,
      });
  }
);