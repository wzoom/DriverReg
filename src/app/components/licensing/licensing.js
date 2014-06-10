angular.module('drApp.licensing', [
  'ui.router',
  'ui.router.stateHelper',
  'ui-rangeSlider',
  'drServices',
  'gettext',
])

.config(function(stateHelperProvider, gettext){

    var stepSettings = {
      mainState: 'licensing',
      firstStep: 'licensing.permit',
      stepTitle: gettext('Driver permit'),
    };

    var getComponentTemplatePath = function (stateName) {
      return 'components/' + stepSettings.mainState + '/' + stateName + '.html';
    };

    stateHelperProvider
      .setNestedState({
        name: 'licensing',
        title: gettext("Licensing"),
        absolute: true,
        sideMenu: true,
        skipAllow: true,
        url: "/licensing",
        redirectTo: 'licensing.driver',
        templateUrl: getComponentTemplatePath('licensing'),
        weight: 5,
        children: [
          {
            name: 'driver',
            title: gettext("Drivers"),
            sideMenu: false,
            skipAllow: false,
            url: "/driver",
            templateUrl: getComponentTemplatePath('licensing.driver'),
          },
          {
            name: 'taxi',
            title: gettext("Taxi"),
            sideMenu: false,
            skipAllow: false,
            url: "/taxi",
            templateUrl: getComponentTemplatePath('licensing.taxi'),
          },
          {
            name: 'conces',
            title: gettext("Concessionary"),
            sideMenu: false,
            skipAllow: false,
            url: "/conces",
            templateUrl: getComponentTemplatePath('licensing.conces'),
          },
          {
            name: 'vehicle',
            title: gettext("Vehicle"),
            sideMenu: false,
            skipAllow: false,
            url: "/vehicle",
            templateUrl: getComponentTemplatePath('licensing.vehicle'),
          },
          {
            name: 'summary',
            title: gettext("Summary"),
            sideMenu: false,
            skipAllow: false,
            url: "/summary",
            templateUrl: getComponentTemplatePath('licensing.summary'),
          }
        ],
      });

  }
)

.factory('licenseSettings', function($http, User){
    var countryCode = User.countryCode;
    var url  = 'json/licensing/' + countryCode + '/config.json';
    var licenseSettings = $http.get(url).then(function(response){
      return response.data;
    });
    return licenseSettings;
})

.controller('licensingCtrl', function ($scope, $rootScope, $state, $filter, licenseSettings) {
    licenseSettings.then(function(data){
      $scope.licensingSettings = data;
    });

})

.service('licensingValidator', function (licenseSettings) {
    var service = this;

    licenseSettings.then(function(data){
      service.licensingSettings = data;
    });

    var isDriverValid = function(user) {
      if (angular.isUndefined(service.licensingSettings) || angular.isUndefined(user.driver)) return false;

      // TODO - Waiting to file model
      //if (angular.isUndefined(user.driver.licPhoto) && service.licensingSettings.driver.licPhoto) return false;

      if (angular.isUndefined(user.driver.licenseNumber) && service.licensingSettings.driver.licenseNumber) return false;
      if (angular.isUndefined(user.driver.expirationDate) && service.licensingSettings.driver.expirationDate) return false;

      return true;
    };

    var isTaxiValid = function(user) {
      if (angular.isUndefined(service.licensingSettings) || angular.isUndefined(user.taxi)) return false;

      // TODO - Waiting to file model
      //if (angular.isUndefined(user.taxi.permitPhoto) && service.licensingSettings.taxi.permitPhoto) return false;

      if (angular.isUndefined(user.taxi.licenseNumber) && service.licensingSettings.taxi.licenseNumber) return false;
      if (angular.isUndefined(user.taxi.expirationDate) && service.licensingSettings.taxi.expirationDate) return false;

      return true;
    };

    var isConcesValid = function(user) {
      if (angular.isUndefined(service.licensingSettings) || angular.isUndefined(user.driver)) return false;

      // TODO - Waiting to file model
      //if (angular.isUndefined(user.driver.licPhoto) && service.licensingSettings.driver.licPhoto) return false;

      return false;
    };

    var isVehicleValid = function(user) {
      if (angular.isUndefined(service.licensingSettings) || angular.isUndefined(user.driver)) return false;

      // TODO - Waiting to file model
      //if (angular.isUndefined(user.driver.licPhoto) && service.licensingSettings.driver.licPhoto) return false;

      return false;
    };

    // Public API
    service.isStepValid = function(stepName, userObject, skipStep){
      if (stepName.substring(0, stepName.indexOf('.')) != 'licensing') return false;

      if (stepName.indexOf('.') > -1) {
        stepName = stepName.substring(stepName.indexOf('.')+1);
      }

      switch(stepName) {
        case 'driver' : return isDriverValid(userObject);
        case 'taxi' : return isTaxiValid(userObject);
        case 'conces' : return isConcesValid(userObject);
        case 'vehicle' : return isVehicleValid(userObject);
        case 'summary' : return true;
      }

      return false;
    };

    return service;
});
