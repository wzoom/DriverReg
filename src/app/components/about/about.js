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
          },
          {
            name: 'gender',
            title: "Gender",
            sideMenu: false,
            skipAllow: true,
            url: "/gender",
            templateUrl: getComponentTemplatePath('about.gender'),
          },
          {
            name: 'language',
            title: "Language",
            sideMenu: false,
            skipAllow: true,
            url: "/language",
            templateUrl: getComponentTemplatePath('about.language'),
          },
          {
            name: 'dispatch',
            title: "Dispatch",
            sideMenu: false,
            skipAllow: true,
            url: "/dispatch",
            templateUrl: getComponentTemplatePath('about.dispatch'),
          },
          {
            name: 'summary',
            title: "Summary",
            sideMenu: false,
            skipAllow: true,
            url: "/summary",
            templateUrl: getComponentTemplatePath('about.summary'),
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

  var isNameValid = function(user) {
    if (angular.isUndefined(user.firstName)) return false;
    if (angular.isUndefined(user.lastName)) return false;
    if (user.firstName == '') return false;
    if (user.lastName == '') return false;
    return true;
  }

  var isPhotoValid = function(user) {
    return true;
  }

  var isGenderValid = function(user) {
    return !angular.isUndefined(user.gender) && ['yes','no'].indexOf(user.gender) > -1;
  }

  var isLanguageValid = function(user) {
    return false;
  }

  var isDispachingValid = function(user) {
    return false;
  }

    // Public API
  service.isStepValid = function(stepName){
    if (stepName.substring(0, stepName.indexOf('.')) != mainStepName) return false;

    if (stepName.indexOf('.') > -1) {
      stepName = stepName.substring(stepName.indexOf('.')+1);
    }

    switch(stepName) {
      case 'photo': return isPhotoValid(User);
      case 'name': return isNameValid(User);
      case 'gender': return isGenderValid(User);
      case 'language': return isLanguageValid(User);
      case 'dispatch': return isDispachingValid(User);
      // TODO - change to false and add attribute to $state so that validation can be disabled for certain steps
      case 'summary': return true;
    }

    return false;
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
