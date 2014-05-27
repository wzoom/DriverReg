'use strict';

/* App Module */

var drApp = angular.module('driverRegApp', [
  'ui.router',
  'mgcrea.ngStrap',
  'drAnimations',
  'drFilters',
  'drServices',
  'formValidation',
  'formAbout',
  'formVehicle',
  'angularFileUpload',
  'start',
  'templates.app',
]);

drApp.config(['$stateProvider', '$urlRouterProvider',
  function   ($stateProvider,    $urlRouterProvider) {

  // Default state
  $urlRouterProvider.otherwise("/start");

    var getComponentTemplatePath = function (stateName) {
      return 'components/' + stateName + '/' + stateName + '.html?random=' + Math.random();
    };

    $stateProvider
    .state('start', {
      title: "Getting Started",
      url: "/start",
      templateUrl: getComponentTemplatePath('start'),
      controller: 'startCtrl'
    })
    .state('about', {
      title: "About You",
      url: "/about",
      templateUrl: getComponentTemplatePath('about'),
      controller: 'formAboutCtrl'
    })
      .state('about.photo', {
        //title: "",
        //url: "/about",
        templateUrl: 'components/about/tpl/photo.tpl.html?random=' + Math.random()
      })
      .state('about.name', {
        //title: "",
        //url: "/about",
        templateUrl: 'components/about/tpl/name.tpl.html?random=' + Math.random()
      })
    .state('vehicle', {
      title: "Vehicle",
      url: "/vehicle",
      templateUrl: getComponentTemplatePath('vehicle'),
        controller: 'formVehicleCtrl'
    })
    .state('services', {
      title: "Services",
      url: "/services",
      templateUrl: getComponentTemplatePath('services'),
      controller: 'formServicesCtrl'
    })
    .state('prices', {
      title: "Prices",
      url: "/prices",
      templateUrl: getComponentTemplatePath('prices'),
      controller: 'formPricesCtrl'
    })
    .state('licensing', {
      title: "Licensing",
      url: "/licensing",
      templateUrl: getComponentTemplatePath('licensing'),
      controller: 'formLicensingCtrl'
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

drApp.controller('HeaderCtrl', ['$scope', '$location', '$state', '$filter',
  function ($scope, $location, $state, $filter) {

    // Fill-in all states (except the virtual root state)
    $scope.states = $filter('filter')($state.get(),  function(state){return state.name != ''});





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

drApp.controller('TestController', function ($scope, $fileUploader) {
    // Creates a uploader
    var uploader = $scope.uploader = $fileUploader.create({
      scope: $scope,
      url: '' // TODO: add here URL upload services
    });

    $scope.openSelect = function() {
      var myLink = document.getElementById('hide-button');
      myLink.click();
    }

    // ADDING FILTERS

    // Images only
    uploader.filters.push(function(item /*{File|HTMLInputElement}*/) {
      var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
      type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    });


    // REGISTER HANDLERS

    uploader.bind('afteraddingfile', function (event, item) {
      console.info('After adding a file', item);
    });

    uploader.bind('whenaddingfilefailed', function (event, item) {
      console.info('When adding a file failed', item);
    });

    uploader.bind('afteraddingall', function (event, items) {
      console.info('After adding all files', items);
    });

    uploader.bind('beforeupload', function (event, item) {
      console.info('Before upload', item);
    });

    uploader.bind('progress', function (event, item, progress) {
      console.info('Progress: ' + progress, item);
    });

    uploader.bind('success', function (event, xhr, item, response) {
      console.info('Success', xhr, item, response);
    });

    uploader.bind('cancel', function (event, xhr, item) {
      console.info('Cancel', xhr, item);
    });

    uploader.bind('error', function (event, xhr, item, response) {
      console.info('Error', xhr, item, response);
    });

    uploader.bind('complete', function (event, xhr, item, response) {
      console.info('Complete', xhr, item, response);
    });

    uploader.bind('progressall', function (event, progress) {
      console.info('Total progress: ' + progress);
    });

    uploader.bind('completeall', function (event, items) {
      console.info('Complete all', items);
    });
  });


