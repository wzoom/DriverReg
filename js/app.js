'use strict';

/* App Module */

var drApp = angular.module('driverRegApp', [
  'ngRoute',
  'mgcrea.ngStrap',
  //'drAnimations',
  'drControllers',
  'drFilters',
  'drServices',
  'UserService',
  'formValidation',
  'formAbout'
]);

//drApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
drApp.config(['$routeProvider', function ($routeProvider) {
  //$locationProvider.html5Mode(true);

  $routeProvider.
    when('/phones', {
      templateUrl: 'partials/phone-list.html',
      controller: 'PhoneListCtrl'
    }).
    when('/phones/:phoneId', {
      templateUrl: 'partials/phone-detail.html',
      controller: 'PhoneDetailCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
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

