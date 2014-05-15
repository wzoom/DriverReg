'use strict';

/* App Module */

var drApp = angular.module('driverRegApp', [
  'ngRoute',
  'mgcrea.ngStrap',
  //'drAnimations',
  'drControllers',
  'drFilters',
  'drServices',
  'UserService'
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

  $scope.items = [
      { 'name' : 'Photo',
        'tpl'  : 'partials/about/photo.html'},
      { 'name' : 'Name',
        'tpl'  : 'partials/about/name.html?noCache=' + Math.random()},
      { 'name' : 'Phone',
          'tpl'  : 'partials/about/phone.html'},
      { 'name' : 'Gender',
        'tpl'  : 'partials/about/gender.html'},
      { 'name' : 'Language',
        'tpl'  : 'partials/about/language.html'},
      { 'name' : 'Dispatching',
        'tpl'  : 'partials/about/dispatch.html'}
  ];

  $scope.step = 0;

  $scope.isCurrentStep = function(step) {
    return $scope.step === step;
  };

  $scope.setCurrentStep = function(step) {
    $scope.step = step;
  };

  $scope.getCurrentStep = function() {
    return $scope.step;
  };

  $scope.getMaxStep = function() {
    return $scope.items.length - 1;
  };

  $scope.getCurrentProgress = function() {
    var perc = $scope.getMaxStep() / 100;
    return $scope.step / perc + '%';
  };

  $scope.setNextStep = function() {
    var nextStep = $scope.step + 1;
    var maxValue = $scope.getMaxStep();
    if(nextStep > maxValue) nextStep = maxValue;
    $scope.step = nextStep;
  };

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

