'use strict';

/* App Module */

var drApp = angular.module('driverRegApp', [
  'ui.router', 'ui.router.stateHelper',
  'drApp.about',
  'mgcrea.ngStrap',
  'drAnimations',
  'drFilters',
  'drServices',
  'angularFileUpload',
  'start',
  'templates.app',
]);

drApp.config(function($stateProvider, $urlRouterProvider){

    var getComponentTemplatePath = function (stateName) {
      return 'components/' + stateName + '/' + stateName + '.html';
    };

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state("start", {
        title: "Getting Started",
        sideMenu: true,
        url: "/",
        templateUrl: getComponentTemplatePath('start'),
        controller: 'HeaderCtrl',
        weight: 0,
      });
  }
);


drApp.controller('drAppCtrl', function($scope, $state, User) {
  $scope.user =  User;
  $scope.state = $state;

  $scope.notifications = {};

  $scope.removeNotification = function (notification) {
    //i18nNotifications.remove(notification);
  };

  $scope.$on('$routeChangeError', function(event, current, previous, rejection){
    //i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
  });



});

drApp.controller('HeaderCtrl', function ($scope, $location, $state, $filter, aboutValidator) {

  //console.log($state.current);

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
          var valid = aboutValidator.isStepValid(state.name);
          if (valid) {
            progress++;
          }
        });

        if (totalSteps <= 0) {
          var showBar = false;
        }

        return {
          total: totalSteps,
          showBar: showBar,
          absolute: progress,
          percent: (100 * (progress / totalSteps)),
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
    $scope.headerTitle = toState.title;

    var absoluteStep = $scope.getCurrentProgress().absolute;
    var totalStep = $scope.getCurrentProgress().total;

    if ((absoluteStep <= totalStep) && (totalStep > 0)) {
      $scope.headerTitle = $scope.headerTitle + ' (' + absoluteStep + '/' + totalStep + ')';
    }

    $scope.progress = $scope.getCurrentProgress().percent;
    $scope.showBar = $scope.getCurrentProgress().showBar;
  });




});

drApp.controller('formValidationCtrl', function($scope, $state, aboutValidator) {
  // function to submit the form after all validation has occurred
  $scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    if (isValid) {
      alert('our form is amazing');
    }

  };

  //console.log($state);

  $scope.setSkipStep = function() {
    if ($state.current.skipAllow == true) {
      var valid = aboutValidator.isStepValid($state.current.name, true);
      console.log(valid, 'valid');
      if (valid) {
        $scope.setNextStep();
      }
    }
  };

  $scope.setNextStep = function() {
    $scope.finalState = '^.summary';

    if (angular.isDefined($state.current.parent) && angular.isDefined($state.current.parent.children)) {
      var siblings = $state.current.parent.children || [];

      siblings.some(function(partState) {
        var valid = aboutValidator.isStepValid(partState.name);

        //console.log('Step '+ partState.name +' is '+(valid?'valid.':'INVALID.'));

        if (!valid) {
          $scope.finalState = partState.name;
          return true;
        }
      });
    }

    $state.go($scope.finalState);
  };
});


