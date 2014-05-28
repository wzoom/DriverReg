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
        isStateValid: function() {
          return true;
        },
        weight: 0,
      });
  }
);


drApp.controller('drAppCtrl', function($scope, $state, User) {
  $scope.user =  User();
  $scope.state = $state;

  $scope.notifications = {};

  $scope.removeNotification = function (notification) {
    //i18nNotifications.remove(notification);
  };

  $scope.$on('$routeChangeError', function(event, current, previous, rejection){
    //i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
  });



});

drApp.controller('HeaderCtrl', function ($scope, $location, $state, $filter) {

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
  });

drApp.controller('formValidationCtrl', function($scope, $state) {
  // function to submit the form after all validation has occurred
  $scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    if (isValid) {
      alert('our form is amazing');
    }

  };

  console.log($state);

  $scope.skipStep = function() {
    if ($state.current.skipAllow == true) {

    }
  }

  $scope.setNextStep = function() {
    // TODO - find out NAME of the next state first
    console.log($state.get('about'));
    // Go to next state
    $state.go('^.name');
  }
});


