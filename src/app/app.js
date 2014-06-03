'use strict';

/* App Module */

var drApp = angular.module('driverRegApp', [
  'ui.router',
  'ui.router.stateHelper',
  'ngStorage',
  'drApp.about',
  'drApp.services',
  'drApp.vehicle',
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
  aboutValidator,
  vehicleValidator,
  servicesValidator
  ) {

  $scope.state = $state;

  $scope.user =  $localStorage.user || User;

  if (angular.isDefined($scope.user)) {
    User = $scope.user;
  }

  $scope.$watch('user', function() {
    $localStorage.user = $scope.user;
  });

  $scope.$watch(function() {
    return angular.toJson($localStorage);
  }, function() {
    $scope.user = $localStorage.user;
    User = $localStorage.user;
  });

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

    if (angular.isDefined(stepObject.children)) {
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

    var filtredItems = $filter('filter')($state.get(),  function(state){
      return state.name != '' && state.sideMenu == true && angular.isDefined(state.redirectTo);
    });

    filtredItems.forEach(function(filtredItem, index) {
      var filtredItemProgress = $scope.getProgress(filtredItem.name).percent;
      if (filtredItemProgress >= 100) {
        filtredItems[index].redirectTo = filtredItem.name + '.summary';
      }
    });

    return filtredItems;
  };

  $scope.mainItems = $scope.setMainItems();

  // Next step set
  $scope.setNextStep = function() {
    if (angular.isDefined($scope.currentMain) && angular.isDefined($scope.subItems)) {

      var validatorName = $scope.currentMain.name + 'Validator';
      $scope.subItems.some(function(partState) {
        var valid = eval(validatorName).isStepValid(partState.name, $scope.user);

        console.log('Step '+ partState.name +' is '+(valid?'valid.':'INVALID.'));

        if (!valid) {
          finalState = partState.name;
          return true;
        }
      });

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

});

drApp.controller('HeaderCtrl', function ($scope, $state) {
  $scope.hideNavbar = function() {
    angular.element('nav.navmenu.offcanvas').offcanvas('hide');
  }

  //$scope.progress = $scope.getCurrentProgress().percent;
  $scope.showBar = $scope.getCurrentProgress();
});

drApp.controller('formValidationCtrl', function () {

});

/*
drApp.controller('HeaderCtrl', function ($scope, $location, $state, $filter, aboutValidator, servicesValidator, vehicleValidator) {


    // Fill-in all states (except the virtual root state)
    $scope.states = $filter('filter')($state.get(),  function(state){
      return state.name != ''; //&& state.name.indexOf('.') == -1;
    });

    $scope.isAuthenticated = true;//security.isAuthenticated;
    $scope.isAdmin = true;//security.isAdmin;

    $scope.hideNavbar = function() {
      angular.element('nav.navmenu.offcanvas').offcanvas('hide');
    }

    $scope.isNavbarActive = function (navBarPath) {
      return true;//navBarPath === breadcrumbs.getFirst().name;
    };

    $scope.hasPendingRequests = function () {
      return false;//httpRequestTracker.hasPendingRequests();
    };

  $scope.getCurrentProgress = function() {
    if (angular.isDefined($state.current.parent) && angular.isDefined($state.current.parent.children)) {
      var siblings = $state.current.parent.children || [];
      var totalSteps = siblings.length -1;
      var progress = 0;
      var showBar = true;
      if (totalSteps > 0) {
        angular.forEach(siblings, function (state) {
          console.log($state.current.parent, 'parrent');

          if ($state.current.parent.name == 'about') var valid = aboutValidator.isStepValid(state.name);
          if ($state.current.parent.name == 'vehicle') var valid = vehicleValidator.isStepValid(state.name);
          if ($state.current.parent.name == 'services') var valid = servicesValidator.isStepValid(state.name);
          if (valid) {
            progress++;
          }
        });

        if (totalSteps <= 0) {
          var showBar = false;
        }

        var percent = (100 * ((progress -1) / totalSteps))

        return {
          total: totalSteps,
          showBar: showBar,
          absolute: progress,
          percent: percent,
        }
      }
    }

    return  {
      total: 0,
      absolute: 0,
      percent: 0,
    };
  };

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

    if (angular.isDefined($state.current.parent)) {
      $scope.headerTitle = $state.current.parent.title;
    } else {
      $scope.headerTitle = '';
    }



    var absoluteStep = $scope.getCurrentProgress().absolute;
    var totalStep = $scope.getCurrentProgress().total;

    if ((absoluteStep <= totalStep) && (totalStep > 0)) {
      $scope.headerTitle = $scope.headerTitle + ' (' + absoluteStep + '/' + totalStep + ')';
    }

    $scope.progress = $scope.getCurrentProgress().percent;
    $scope.showBar = $scope.getCurrentProgress().showBar;
  });




});

/*
drApp.controller('formValidationCtrl', function($scope, $state, aboutValidator) {
  $scope.currentState = $state.current;
  $scope.stepTitle = $state.current.title;
  $scope.stepName = $state.current.name;

  $scope.$on('$stateChangeStart', function(event, toState){
    $scope.currentState = toState;
    $scope.stepTitle = toState.title;
    $scope.stepName = toState.name;
  });

  // function to submit the form after all validation has occurred
  $scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    if (isValid) {
      //alert('our form is amazing');
    }

  };

  //console.log($state);
  $scope.isSummaryPage = function() {
    var isSummaryPage = false;
    //TODO: Find something better match
    if ($scope.stepName.indexOf('.summary') > -1) isSummaryPage = true;

    return isSummaryPage;
  };
  $scope.setSkipStep = function() {
    if ($state.current.skipAllow == true) {
      var valid = aboutValidator.isStepValid($state.current.name, true);

      if (valid) {
        $scope.setNextStep();
      }
    }
  };

  $scope.setNextStep = function() {
    if (angular.isDefined($state.current.parent) && angular.isDefined($state.current.parent.children)) {
      $scope.finalState = $state.current.parent.name + '.summary';

      var siblings = $state.current.parent.children || [];

      siblings.some(function(partState) {
        var valid = aboutValidator.isStepValid(partState.name);

        console.log('Step '+ partState.name +' is '+(valid?'valid.':'INVALID.'));

        if (!valid) {
          $scope.finalState = partState.name;
          return true;
        }
      });

      $state.go($scope.finalState);
    }
  };
});
*/


