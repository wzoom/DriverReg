angular.module('drApp.about', [
  'ui.router',
  'ui.router.stateHelper',
  'drServices',
  'gettext',
])

.config(function(stateHelperProvider, gettext){

    var stepSettings = {
      mainState: 'about',
      firstStep: 'about.photo',
      stepTitle: gettext('About you'),
    };

    var getComponentTemplatePath = function (stateName) {
      return 'components/' + stepSettings.mainState + '/' + stateName + '.html';
    };

    stateHelperProvider
      .setNestedState({
        name: 'about',
        title: gettext("About You"),
        sideMenu: true,
        skipAllow: true,
        url: "/about",
        templateUrl: getComponentTemplatePath('about'),
        weight: 1,
        children: [
          {
            name: 'photo',
            title: gettext("Photo"),
            sideMenu: false,
            skipAllow: true,
            url: "/photo",
            templateUrl: getComponentTemplatePath('about.photo'),
          },
          {
            name: 'name',
            title: gettext("Name"),
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
            title: gettext("Gender"),
            sideMenu: false,
            skipAllow: false,
            url: "/gender",
            templateUrl: getComponentTemplatePath('about.gender'),
          },
          {
            name: 'language',
            title: gettext("Language"),
            sideMenu: false,
            skipAllow: false,
            url: "/language",
            templateUrl: getComponentTemplatePath('about.language'),
          },
          {
            name: 'dispatch',
            title: gettext("Dispatching"),
            sideMenu: false,
            skipAllow: true,
            url: "/dispatch",
            templateUrl: getComponentTemplatePath('about.dispatch'),
          },
          {
            name: 'summary',
            title: gettext("Summary"),
            sideMenu: false,
            skipAllow: false,
            url: "/summary",
            templateUrl: getComponentTemplatePath('about.summary'),
          }
        ],
      });

  }
)

.controller('aboutCtrl', function ($scope, $rootScope, $state, $filter) {
  var user = $rootScope.user;

    $scope.skipAllow = $state.current.skipAllow;


    if ($state.current.name == 'about') {
      $state.transitionTo('about.photo');
    }

  $scope.states = $filter('filter')($state.get(),  function(state){return state.name != ''});
  $scope.currentState = $state.current;

  //$rootScope.stepTitle = 'About you';

  $scope.$on('$stateChangeStart', function(event, toState){
    //$scope.currentState = toState;
    $scope.skipAllow = toState.skipAllow;

    if (toState.name == 'about') {
      //$location.path('/about/photo');
      $state.transitionTo('about.photo');
      //$state.go($state.current.children[0]);
    }
  });

})

.service('aboutValidator', function (User) {
  var service = this;

  var mainStepName = 'about';

  var isNameValid = function(user) {
    if (angular.isUndefined(user.firstName)) return false;
    if (angular.isUndefined(user.lastName)) return false;
    if (user.firstName == null) return false;
    if (user.lastName == null) return false;
    return true;
  }

  var isPhotoValid = function(user, skipStep) {
    if (skipStep == true) user.image = true;
    if (angular.isUndefined(user.image)) return false;
    if (user.image == null) return false;
    return true;
  }

  var isGenderValid = function(user) {
    if (angular.isUndefined(user.gender)) return false;
    if (user.gender == null) return false;
    return true;
  }

  var isLanguageValid = function(user) {
    if (angular.isUndefined(user.languagesSpoken)) return false;
    if (user.languagesSpoken == null) return false;
    return true;
  }

  var isDispachingValid = function(user, skipStep) {
    if (skipStep == true) user.dispatchingCompany = 'none';
    if (angular.isUndefined(user.dispatchingCompany)) return false;
    if (user.dispatchingCompany == null) return false;
    return true;
  }

    // Public API
  service.isStepValid = function(stepName, skipStep){
    if (stepName.substring(0, stepName.indexOf('.')) != mainStepName) return false;

    if (stepName.indexOf('.') > -1) {
      stepName = stepName.substring(stepName.indexOf('.')+1);
    }

    switch(stepName) {
      case 'photo': return isPhotoValid(User, skipStep);
      case 'name': return isNameValid(User);
      case 'gender': return isGenderValid(User);
      case 'language': return isLanguageValid(User);
      case 'dispatch': return isDispachingValid(User, skipStep);
      // TODO - change to false and add attribute to $state so that validation can be disabled for certain steps
      case 'summary': return true;
    }

    return false;
  };

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
