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
        redirectTo: 'vehicle.photo',
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
            data: {
              hideNext: true,
            },
          },
          {
            name: 'engine',
            title: "Engine",
            sideMenu: false,
            skipAllow: false,
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
          },
          {
            name: 'summary',
            title: "Summary",
            sideMenu: false,
            skipAllow: false,
            url: "/summary",
            templateUrl: getComponentTemplatePath('vehicle.summary'),
          }
        ],
      });

  }
)

.controller('vehicleCtrl', function ($scope, $rootScope, $state, $filter) {
  $scope.carSelector = false;
  $scope.currentYear = (new Date).getFullYear();

  $scope.carMake = function() {
    $scope.carSelector = !$scope.carSelector;
  };

  $scope.carMakeHide = function() {
    $scope.carSelector = false;
  };

    $scope.setDefaultSize = function() {
      if (angular.isUndefined($scope.user.car.size)) {
        $scope.user.car.size = 1600;
      }
      return true;
    };

  $scope.setDefaultSeats = function() {
    if (angular.isUndefined($scope.user.car.seats)) {
      $scope.user.car.seats = 3;
    }
    return true;
  };

    $scope.setDefaultLuggage = function() {
      if (angular.isUndefined($scope.user.car.luggage)) {
        $scope.user.car.luggage = 3;
      }
      return true;
    };

    $scope.setDefaultHandicap = function() {
      if (angular.isUndefined($scope.user.car.handicap)) {
        $scope.user.car.handicap = "No";
      }
      return true;
    };
})

.service('vehicleValidator', function () {
    var service = this;

    var isPhotoValid = function (user, skipStep) {
      if (angular.isUndefined(user.car)) return false;
      if (skipStep == true) user.vehicleImage = true;
      if (angular.isUndefined(user.vehicleImage)) return false;
      if (user.vehicleImage == null) return false;
      return true;
    };

    var isMakeValid = function (user) {
      if (angular.isUndefined(user.car)) return false;
      if (angular.isUndefined(user.car.year)) return false;
      if (angular.isUndefined(user.car.make)) return false;
      return true;
    };

    var isModelValid = function (user) {
      if (angular.isUndefined(user.car)) return false;
      if (angular.isUndefined(user.car.model)) return false;
      if (user.car.model.length < 3) return false;
      return true;
    };

    var isColorValid = function (user) {
      if (angular.isUndefined(user.car)) return false;
      if (angular.isUndefined(user.car.color)) return false;
      if (user.car.color.length < 3) return false;
      return true;
    };

    var isEngineValid = function (user) {
      if (angular.isUndefined(user.car)) return false;
      if (angular.isUndefined(user.car.fuel) || angular.isUndefined(user.car.size)) return false;
      if (user.car.size < 1000 || user.car.size > 3000) return false;
      return true;
    };

    var isPreferencesValid = function (user) {
      if (angular.isUndefined(user.car)) return false;
      if (angular.isUndefined(user.car.seats)) return false;
      if ((user.car.seats < 1) || (user.car.seats > 16)) return false;
      if (angular.isUndefined(user.car.luggage)) return false;
      if ((user.car.luggage < 1) || (user.car.luggage > 16)) return false;
      if (angular.isUndefined(user.car.handicap)) return false;

      return true;
    };

    // Public API
    service.isStepValid = function (stepName, userObject, skipStep) {
      if (stepName.substring(0, stepName.indexOf('.')) != 'vehicle') return false;

      if (stepName.indexOf('.') > -1) {
        stepName = stepName.substring(stepName.indexOf('.')+1);
      }

      switch(stepName) {
        case 'photo': return isPhotoValid(userObject, skipStep);
        case 'make' : return isMakeValid(userObject);
        case 'model' : return isModelValid(userObject);
        case 'color' : return isColorValid(userObject);
        case 'engine' : return isEngineValid(userObject);
        case 'preferences' : return isPreferencesValid(userObject);
        case 'summary': return true;
      }

      return false;
    };

    return service;
});