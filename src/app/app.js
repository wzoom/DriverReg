'use strict';

/* App Module */

var drApp = angular.module('driverRegApp', [
  'ui.router',
  'ui.router.stateHelper',
  'ngStorage',
  'gettext',
  'drApp.about',
  'drApp.services',
  'drApp.vehicle',
  'drApp.prices',
  'mgcrea.ngStrap',
  'drAnimations',
  'drFilters',
  'drServices',
  'angularFileUpload',
  'start',
  'vr.directives.slider',
  'templates.app',
]);

drApp.config(function($urlRouterProvider){
    $urlRouterProvider.otherwise('/');
});

drApp.controller('drAppCtrl', function(
  $scope,
  $state,
  $localStorage,
  $sessionStorage,
  $filter,
  User,
  gettextCatalog,
  aboutValidator,
  vehicleValidator,
  servicesValidator,
  pricesValidator
  ) {

  $scope.state = $state;

  $scope.user =  $localStorage.user || User;

  gettextCatalog.currentLanguage = angular.element('html').attr('locale');
  //gettextCatalog.debug = true;

  $scope.notifications = {};

  $scope.$watch('user', function() {
    $localStorage.user = $scope.user;
  });

  $scope.$watch(function() {
    return angular.toJson($localStorage);
  }, function() {
    $scope.user = $localStorage.user;
  });

  $scope.deleteUserObject = function() {
    delete $localStorage.user;
    $localStorage.user = User;
  };

  // Fill-in all sub states
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if (angular.isDefined(toState.parent)) {
      $scope.currentMain = toState.parent;
    } else {
      $scope.currentMain = toState;
    }

    $scope.subItems =  $filter('filter')($state.get(),  function(state){
      return angular.isDefined($scope.currentMain) && angular.isDefined(state.parent) && state.parent.name == $scope.currentMain.name;
    });
  });

  // Get main step progress
  $scope.getProgress = function(stepName) {
    var stepObject = $state.get(stepName);

    var output = {
      total: 0,
      showBar: false,
      absolute: 0,
      percent: 0,
    };

    if (angular.isDefined(stepObject.children) && angular.isDefined($scope.user)) {
      var stepChildren = stepObject.children;
      output['total'] = stepChildren.length - 1;

      if (output['total'] > 0) {
        var validatorName = stepObject.name + 'Validator';
        stepChildren.forEach(function(childrenItem) {
          var valid = eval(validatorName).isStepValid(childrenItem.name, $scope.user);
          if (valid) output['absolute']++;
        });

        output['showBar'] = true;
      }

      if (output['absolute'] > 1) output['percent'] = (100 * ((output['absolute'] -1) / output['total']));

    }

    return output;
  };

  // Get current step progress
  $scope.getCurrentProgress = function() {
    if (angular.isDefined($state.current.parent)) {
      return $scope.getProgress($state.current.parent.name);
    }
  };

  // Fill-in all main states (except the virtual root state)
  $scope.setMainItems = function() {

    var filteredItems = $filter('filter')($state.get(),  function(state){
      return state.name != '' && state.sideMenu == true && angular.isDefined(state.redirectTo);
    });

    filteredItems.forEach(function(filteredItem, index) {
      var filteredItemProgress = $scope.getProgress(filteredItem.name).percent;
      if (filteredItemProgress >= 100) {
        filteredItems[index].redirectTo = filteredItem.name + '.summary';
      }
    });

    return filteredItems;
  };

  $scope.mainItems = $scope.setMainItems();

  //Last unfinished sub step in main step
  $scope.unfinishedSubItem = function(mainItemObject) {
    var finalItemName = mainItemObject.name + '.summary';
    var validatorName = mainItemObject.name + 'Validator';
    mainItemObject.children.some(function(partState) {
      var valid = eval(validatorName).isStepValid(partState.name, $scope.user);
      if (!valid) {
        finalItemName = partState.name;
        return true;
      }
    });

    return finalItemName;
  };

  // Next step set
  $scope.setNextStep = function() {
    if (angular.isDefined($scope.currentMain)) {
      var finalState = $scope.unfinishedSubItem($scope.currentMain);
      $state.go(finalState);
    }
  };

  // Skip step

  $scope.setSkipStep = function() {
    if ($state.current.skipAllow == true && angular.isDefined($scope.currentMain) && angular.isDefined($scope.subItems)) {
      var validatorName = $scope.currentMain.name + 'Validator';
      var valid = eval(validatorName).isStepValid($state.current.name, $scope.user ,true);
      if (valid) $scope.setNextStep();
    }
  };

  // Last main empty step
  $scope.lastMainStep = function() {
    var lastEmptyMainStep = [];

    $scope.mainItems.some(function(item) {
      var itemProgress = $scope.getProgress(item.name).percent;
      if (itemProgress < 100) {
        lastEmptyMainStep = item;
        return true;
      }
    });

    return lastEmptyMainStep;
  };

  // Last empty step
  $scope.lastEmptyStep = function() {
    var lastEmptyStep = 'start.finished';
    var lastEmptyMainStep = $scope.lastMainStep();

    if (angular.isDefined(lastEmptyMainStep.name)) {
      lastEmptyStep = $scope.unfinishedSubItem(lastEmptyMainStep);
    }

    return lastEmptyStep;
  };

  // Chceck if is current state summary page
  $scope.isSummaryPage = function() {
    var output = false;
    var isSummaryPage = $scope.state.current.name.search(/summary/i);

    if (isSummaryPage > 0) output = true;

    return output;
  };

  //
  $scope.setNextMainStep = function() {
    var nextMainStep = $scope.lastMainStep();
    $state.go(nextMainStep.redirectTo);
  };

});

drApp.controller('HeaderCtrl', function ($scope) {
  $scope.hideNavbar = function() {
    angular.element('nav.navmenu.offcanvas').offcanvas('hide');
  };
});

drApp.controller('formValidationCtrl', function () {

});