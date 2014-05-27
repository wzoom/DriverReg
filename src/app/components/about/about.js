var formAbout = angular.module('formAbout', [
  'ui.router'
]);

formAbout.controller('formAboutCtrl', ['$scope', '$rootScope',function($scope, $rootScope) {
  var user = $rootScope.user;

  $rootScope.$on('$routeChangeStart', function(next, current) {
    $scope.step = 0;
  });

  $rootScope.stepTitle = 'About You';

    $scope.formItems = [
        { 'name' : 'Photo',
            'tpl'  : 'components/about/tpl/photo.tpl.html'},
        { 'name' : 'Name',
            'tpl'  : 'components/about/tpl/name.tpl.html'},
        { 'name' : 'Phone',
            'tpl'  : 'components/about/tpl/phone.tpl.html'},
        { 'name' : 'Gender',
            'tpl'  : 'components/about/tpl/gender.tpl.html'},
        { 'name' : 'Language',
            'tpl'  : 'components/about/tpl/language.tpl.html'},
        { 'name' : 'Dispatching',
            'tpl'  : 'components/about/tpl/dispatch.tpl.html'},
        { 'name' : 'Summary',
            'tpl'  : 'components/about/tpl/summary.tpl.html'}
    ];

  // Testing purposes add random string at the end of URL
  angular.forEach($scope.formItems, function(value, key){
    $scope.formItems[key]['tpl'] = value['tpl'] + '?random=' + Math.random();
  });

    $scope.button = {
        "visibility": 'yes',
        "gender" : 'male'
    };

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
        return $scope.formItems.length - 1;
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

}]);

formAbout.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
    .state('photo', {
      url: "/photo",
      templateUrl: "tpl/photo.tpl.html"
    })
    .state('name', {
      url: "/name",
      templateUrl: "tpl/name.tpl.html"
    })
    .state('phone', {
      url: "/phone",
      templateUrl: "tpl/phone.tpl.html"
    })
    .state('gender', {
      url: "/gender",
      templateUrl: "tpl/gender.tpl.html"
    })
    .state('language', {
      url: "/language",
      templateUrl: "tpl/language.tpl.html"
    })
    .state('dispatch', {
      url: "/dispatch",
      templateUrl: "tpl/dispatch.tpl.html"
    })
    .state('summary', {
      url: "/summary",
      templateUrl: "tpl/summary.tpl.html"
    })
});
