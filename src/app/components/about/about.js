angular.module('drApp.about', [
  'ui.router', 'ui.router.stateHelper',
])

.config(function(stateHelperProvider){

    var stepSettings = {
      mainState: 'about',
      firstStep: 'about.photo',
      stepTitle: 'About you'
    };

    var getComponentTemplatePath = function (stateName) {
      return 'components/' + stepSettings.mainState + '/' + stateName + '.html';
    };

    stateHelperProvider
      .setNestedState({
        name: 'about',
        title: "About You",
        sideMenu: true,
        skipAllow: false,
        url: "/about",
        templateUrl: getComponentTemplatePath('about'),
        weight: 1,
        controller: function ($state) {
          $state.transitionTo(stepSettings.firstStep);
        },
        isStateValid: function() {
          return false;
        },
        children: [
          {
            name: 'photo',
            title: "Photo",
            sideMenu: false,
            skipAllow: true,
            url: "/photo",
            templateUrl: getComponentTemplatePath('about.photo'),
            isStateValid: function() {
              return false;
            }
          },
          {
            name: 'name',
            title: "Name",
            sideMenu: false,
            skipAllow: false,
            url: "/name",
            templateUrl: getComponentTemplatePath('about.name'),
            resolve: {
              user: 'User',
            },
            controller: function ($state, $scope, user) {

              $scope.isStateValid = function() {
                if (!angular.isEmpty(user.firstName) && !angular.isEmpty(user.lastName)) return true;
                return false;
              };
            }
          },
          {
            name: 'gender',
            title: "Gender",
            sideMenu: false,
            skipAllow: true,
            url: "/gender",
            templateUrl: getComponentTemplatePath('about.gender'),
            isStateValid: function() {
              return false;
            }
          },
          {
            name: 'language',
            title: "Language",
            sideMenu: false,
            skipAllow: true,
            url: "/language",
            templateUrl: getComponentTemplatePath('about.language'),
            isStateValid: function() {
              return false;
            }
          },
          {
            name: 'dispatch',
            title: "Dispatch",
            sideMenu: false,
            skipAllow: true,
            url: "/dispatch",
            templateUrl: getComponentTemplatePath('about.dispatch'),
            isStateValid: function() {
              return false;
            }
          },
          {
            name: 'summary',
            title: "Summary",
            sideMenu: false,
            skipAllow: true,
            url: "/summary",
            templateUrl: getComponentTemplatePath('about.summary'),
            isStateValid: function() {
              return false;
            }
          }
        ]
      });

  }
)

.controller('aboutCtrl', function ($scope, $rootScope, $state, $filter) {
  var user = $rootScope.user;

  $scope.states = $filter('filter')($state.get(),  function(state){return state.name != ''});
  $scope.currentState = $state.current;

  $rootScope.stepTitle = 'About you';

});

