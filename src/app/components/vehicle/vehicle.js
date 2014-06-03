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

})

.service('vehicleValidator', function () {
  var service = this;

  // Public API
  service.isStepValid = function(stepName, userObject, skipStep){
    return false;
  };

  return service;
});