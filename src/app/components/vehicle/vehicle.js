angular.module('drApp.vehicle', [
  'ui.router', 'ui.router.stateHelper', 'drServices',
])

.config(function(stateHelperProvider){

    var stepSettings = {
      mainState: 'vehicle',
      firstStep: 'vehicle.photo',
      stepTitle: 'Vehicle'
    };

    var getComponentTemplatePath = function (stateName) {
      return 'components/' + stepSettings.mainState + '/' + stateName + '.html';
    };

    stateHelperProvider
      .setNestedState({
        name: 'vehicle',
        title: "Vehicle",
        sideMenu: true,
        skipAllow: true,
        url: "/vehicle",
        templateUrl: getComponentTemplatePath('vehicle'),
        weight: 2,
        children: [
          {
            name: 'photo',
            title: "Car Photo",
            sideMenu: false,
            skipAllow: true,
            url: "/photo",
            templateUrl: getComponentTemplatePath('vehicle.photo'),
          },
          {
            name: 'make',
            title: "Make",
            sideMenu: false,
            skipAllow: false,
            url: "/make",
            templateUrl: getComponentTemplatePath('vehicle.make'),
          },
          {
            name: 'model',
            title: "Model",
            sideMenu: false,
            skipAllow: false,
            url: "/model",
            templateUrl: getComponentTemplatePath('vehicle.model'),
          },
          {
            name: 'color',
            title: "Color",
            sideMenu: false,
            skipAllow: false,
            url: "/color",
            templateUrl: getComponentTemplatePath('vehicle.color'),
          },
          {
            name: 'engine',
            title: "Engine",
            sideMenu: false,
            skipAllow: true,
            url: "/engine",
            templateUrl: getComponentTemplatePath('vehicle.engine'),
          },
          {
            name: 'preferences',
            title: "Preferences",
            sideMenu: false,
            skipAllow: false,
            url: "/preferences",
            templateUrl: getComponentTemplatePath('vehicle.preferences'),
          }
        ],
      });

  }
)

.controller('vehicleCtrl', function ($scope, $rootScope, $state, $filter) {
  var user = $rootScope.user;

    $scope.skipAllow = $state.current.skipAllow;


    if ($state.current.name == 'vehicle') {
      $state.transitionTo('vehicle.photo');
    }

  $scope.states = $filter('filter')($state.get(),  function(state){return state.name != ''});
  $scope.currentState = $state.current;

  //$rootScope.stepTitle = 'Vehicle you';

  $scope.$on('$stateChangeStart', function(event, toState){
    //$scope.currentState = toState;
    $scope.skipAllow = toState.skipAllow;

    if (toState.name == 'vehicle') {
      //$location.path('/vehicle/photo');
      $state.transitionTo('vehicle.photo');
      //$state.go($state.current.children[0]);
    }
  });

  $scope.goNext = function() {
    if (angular.isDefined($state.current.parent) && angular.isDefined($state.current.parent.children)) {
      $scope.finalState = $state.current.parent.name + '.summary';

      var siblings = $state.current.parent.children || [];
      var lastStateName = '';

      siblings.some(function(partState) {
        var valid = $state.current.name == lastStateName;
        lastStateName = partState.name;

        if (valid) {
          $scope.finalState = partState.name;
          return true;
        }
      });

      $state.go($scope.finalState);
    }
  };


  })

.service('vehicleValidator', function (User) {
  var service = this;

  var mainStepName = 'vehicle';

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
