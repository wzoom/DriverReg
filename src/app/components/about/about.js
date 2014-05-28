angular.module('drApp.about', [
  'ui.router', 'ui.router.stateHelper', 'drServices',
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
          if ($state.current.name == 'about') {
            //$state.go($state.current.children[0]);
            $state.go(stepSettings.firstStep);
          }
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
              //validator: 'nameStepValidator',
            },
            controller: function ($state, $scope, user) {

            },
            /*
            isStateValid: function(validator) {
              console.log(validator);
              //return validator.isStateValid()
              return false;
            },
            */

          }
        ],
      });

  }
)

.controller('aboutCtrl', function ($scope, $rootScope, $state, $filter) {
  var user = $rootScope.user;

  $scope.states = $filter('filter')($state.get(),  function(state){return state.name != ''});
  $scope.currentState = $state.current;

  $rootScope.stepTitle = 'About you';

  $rootScope.$on('$stateChangeStart', function(event, toState){
    $scope.currentState = toState;

    if (toState.name == 'about') {
      //$location.path('/about/photo');
      //$state.go('about.photo');
      //$state.go($state.current.children[0]);
    }
  });

})

.service('aboutValidator', function (User) {
  var service = {};

  var mainStepName = 'about';

  function isNameValid() {
    if (!angular.isEmpty(User.firstName) && !angular.isEmpty(User.lastName)) return true;
    return false;
  }

  function isPhotoValid() {
    return true;
  }

  // Public API
  service.isStepValid = function(stepName){
    if (stepName.substring(0, stepName.indexOf('.')) != mainStepName) return false;

    if (stepName.indexOf('.') > -1) {
      stepName = stepName.substring(stepName.indexOf('.')+1);
    }

    switch(stepName) {
      case 'photo': return this.isPhotoValid();
      case 'name': return this.isNameValid();
    }

    // TODO - change to false and add attribute to $state so that validation can be disabled for certain steps
    return true;
  }

  return service;
})

/*
.factory('nameStepValidator', function (StepValidator, User) {
  var service = Object.create(StepValidator);

  // Override validation method
  service.isStepValid = function(){
    if (!angular.isEmpty(User.firstName) && !angular.isEmpty(User.lastName)) return true;
    return false;
  }

  return service;
})
 */
;
