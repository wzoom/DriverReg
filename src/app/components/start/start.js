var start = angular.module('start', []);

start.controller('startCtrl', function ($scope, $rootScope, $state, gettextCatalog) {
  var user = $rootScope.user;

  $rootScope.stepTitle = gettextCatalog.getString('Getting Started');

});

start.config(function($stateProvider, gettext){

    var getComponentTemplatePath = function (stateName) {
      return 'components/' + stateName + '/' + stateName + '.html';
    };

    $stateProvider
      .state("start", {
        title: gettext("Getting Started"),
        sideMenu: true,
        skipAllow: false,
        url: "/",
        redirectTo: 'start',
        templateUrl: getComponentTemplatePath('start'),
        controller: 'HeaderCtrl',
        weight: 0,
        data: {
          isNeutral: true,
        },
      })
      // Incomplete can be a substate thanks to "ui-view" defined in parent (start.html) template
      .state("start.incomplete", {
        title: gettext("Getting Started"),
        sideMenu: false,
        skipAllow: false,
        url: "^/incomplete",
        templateUrl: 'components/start/start.incomplete.html',
        controller: 'HeaderCtrl',
        weight: 0,
      });
  }
);