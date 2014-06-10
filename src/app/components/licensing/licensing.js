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
        redirectTo: 'licensing.permit',
        templateUrl: getComponentTemplatePath('licensing'),
        weight: 5,
        children: [
          {
            name: 'photo',
            title: gettext("Driver permit"),
            sideMenu: false,
            skipAllow: true,
            url: "/photo",
            templateUrl: getComponentTemplatePath('licensing.permit'),
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

.controller('licensingCtrl', function ($scope, $rootScope, $state, $filter) {

})

.service('licensingValidator', function () {
  var service = this;

  var isNameValid = function(user) {
    if (angular.isUndefined(user.firstName)) return false;
    if (angular.isUndefined(user.lastName)) return false;
    if (user.firstName == null) return false;
    if (user.lastName == null) return false;
    return true;
  }

    // Public API
  service.isStepValid = function(stepName, userObject, skipStep){
    if (stepName.substring(0, stepName.indexOf('.')) != 'licensing') return false;

    if (stepName.indexOf('.') > -1) {
      stepName = stepName.substring(stepName.indexOf('.')+1);
    }

    switch(stepName) {

    }

    return false;
  };

  return service;
});
