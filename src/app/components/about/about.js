angular.module('drApp.about', [
  'ui.router'
])

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){

    var stepSettings = {
      mainState: 'about',
      firstStep: 'about.photo',
      stepTitle: 'About you'
    };

    var getComponentTemplatePath = function (stateName) {
      return 'components/' + stepSettings.mainState + '/' + stateName + '.html';
    };

    $stateProvider
      .state('about', {
        title: "About You",
        sideMenu: true,
        skipAllow: false,
        url: "/about",
        templateUrl: getComponentTemplatePath('about'),
        controller: function ($state) {
          $state.transitionTo(stepSettings.firstStep);
        }
      })
      .state('about.photo', {
        title: "Photo",
        sideMenu: false,
        skipAllow: true,
        url: "/photo",
        templateUrl: getComponentTemplatePath('about.photo')
      })
      .state('about.name', {
        title: "Name",
        sideMenu: false,
        skipAllow: false,
        url: "/name",
        templateUrl: getComponentTemplatePath('about.name')
      });

  }
])

.controller('aboutCtrl', ['$scope', '$rootScope', '$state', '$filter', function ($scope, $rootScope, $state, $filter) {
  var user = $rootScope.user;

  $scope.states = $filter('filter')($state.get(),  function(state){return state.name != ''});
  $scope.currentState = $state.current;

  $rootScope.stepTitle = 'About you';

}]);

