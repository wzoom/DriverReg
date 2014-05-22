'use strict';

/* App Module */

var drApp = angular.module('driverRegApp', [
  'ui.router',
  'mgcrea.ngStrap',
  //'drAnimations',
  'drControllers',
  'drFilters',
  'drServices',
  'formValidation',
  'formAbout',
  'formVehicle'
]);

drApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  // Default state
  $urlRouterProvider.otherwise("/about");

  $stateProvider
    .state('about', {
      url: "/about",
      templateUrl: 'components/about/about.html?random=' + Math.random(),
      controller: 'formAboutCtrl'
    })
    .state('vehicle', {
      url: "/vehicle",
      templateUrl: 'components/vehicle/vehicle.html?random=' + Math.random(),
        controller: 'formVehicleCtrl'
    })

}]);


drApp.controller('drAppCtrl', ['$scope', 'User', function($scope, User) {
  $scope.user =  User();

  $scope.notifications = {};

  $scope.removeNotification = function (notification) {
    //i18nNotifications.remove(notification);
  };

  $scope.$on('$routeChangeError', function(event, current, previous, rejection){
    //i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
  });
}]);

drApp.controller('HeaderCtrl', ['$scope', '$location', '$route',
  function ($scope, $location, $route) {
    $scope.location = $location;
    //$scope.breadcrumbs = breadcrumbs;

    $scope.isAuthenticated = true;//security.isAuthenticated;
    $scope.isAdmin = true;//security.isAdmin;

    $scope.home = function () {
      $location.path('/');
    };

    $scope.hideNavbar = function() {
      angular.element('nav.navmenu.offcanvas').offcanvas('hide');
    }

    $scope.isNavbarActive = function (navBarPath) {
      return true;//navBarPath === breadcrumbs.getFirst().name;
    };

    $scope.hasPendingRequests = function () {
      return false;//httpRequestTracker.hasPendingRequests();
    };
  }]);

var formValidation = angular.module('formValidation', []);
formValidation.controller('formValidationCtrl', ['$scope', function($scope) {
// function to submit the form after all validation has occurred
    $scope.submitForm = function(isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
            alert('our form is amazing');
        }

    };
}]);

