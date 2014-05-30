angular.module('drApp.services', [
  'ui.router', 'ui.router.stateHelper', 'drServices',
])

.config(function(stateHelperProvider){

    var stepSettings = {
      mainState: 'services',
      firstStep: 'services.pickup',
      stepTitle: 'Services'
    };

    var getComponentTemplatePath = function (stateName) {
      return 'components/' + stepSettings.mainState + '/' + stateName + '.html';
    };

    stateHelperProvider
      .setNestedState({
        name: 'services',
        title: "Services",
        sideMenu: true,
        skipAllow: true,
        url: "/services",
        templateUrl: getComponentTemplatePath('services'),
        weight: 1,
        children: [
          {
            name: 'pickup',
            title: "Pickup distance",
            sideMenu: false,
            skipAllow: false,
            url: "/pickup",
            templateUrl: getComponentTemplatePath('services.pickup'),
          },
        ],
      });

  }
)

.controller('servicesCtrl', function ($scope, $rootScope, $state, $filter) {
  var user = $rootScope.user;

    $scope.skipAllow = $state.current.skipAllow;


    if ($state.current.name == 'services') {
      $state.transitionTo('services.pickup');
    }

  $scope.states = $filter('filter')($state.get(),  function(state){return state.name != ''});
  $scope.currentState = $state.current;

  //$rootScope.stepTitle = 'About you';

  $scope.$on('$stateChangeStart', function(event, toState){
    //$scope.currentState = toState;
    $scope.skipAllow = toState.skipAllow;

    if (toState.name == 'services') {
      //$location.path('/about/photo');
      $state.transitionTo('services.pickup');
      //$state.go($state.current.children[0]);
    }
  });

})

.service('servicesValidator', function (User) {
  var service = this;

  var mainStepName = 'services';

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
