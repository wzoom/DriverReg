angular.module('drApp.services', [
  'ui.router', 'ui.router.stateHelper', 'drServices',
])

.config(function(stateHelperProvider){

    var stepSettings = {
      mainState: 'services',
      firstStep: 'services.preferences',
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
        redirectTo: 'services.pickup',
        templateUrl: getComponentTemplatePath('services'),
        weight: 3,
        children: [
          {
            name: 'preferences',
            title: "Preferences",
            sideMenu: false,
            skipAllow: false,
            url: "/preferences",
            templateUrl: getComponentTemplatePath('services.preferences'),
          },
          {
            name: 'summary',
            title: "Summary",
            sideMenu: false,
            skipAllow: false,
            url: "/summary",
            templateUrl: getComponentTemplatePath('services.summary'),
          },
        ],
      });

  }
)

.controller('servicesCtrl', function ($scope) {
  $scope.setDefaultServices = function() {

    if(angular.isUndefined($scope.user.services)){
      $scope.user.services = {};
      $scope.user.services.card = "Yes";
      $scope.user.services.wifi = "No";
      $scope.user.services.air = "No";
      $scope.user.services.child = "No";
      $scope.user.services.smoke = "No";
      $scope.user.services.animal = "No";
    }

    return true;
  };
})

  .service('servicesValidator', function () {
    var service = this;

    var isPreferencesValid = function (user) {
      if(angular.isUndefined(user.services)) {
        return false;
      }

      return true;
    };

    // Public API
    service.isStepValid = function (stepName, userObject) {
      if (stepName.substring(0, stepName.indexOf('.')) != 'services') return false;

      if (stepName.indexOf('.') > -1) {
        stepName = stepName.substring(stepName.indexOf('.')+1);
      }

      switch(stepName) {
        case 'preferences' : return isPreferencesValid(userObject);
        case 'summary': return true;
      }

      return true;
    };

    return service;
  });

