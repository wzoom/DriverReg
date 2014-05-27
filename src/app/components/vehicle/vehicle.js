var formVehicle = angular.module('formVehicle', []);

formVehicle.controller('formVehicleCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  var user = $rootScope.user;

  $rootScope.stepTitle = 'Vehicle';

  $scope.formItems = [
    { 'name': 'Car Photo',
      'tpl': 'components/about/tpl/name.tpl.html'},
    { 'name': 'Make',
      'tpl': 'components/about/tpl/photo.tpl.html'},
    { 'name': 'Model',
      'tpl': 'components/about/tpl/phone.tpl.html'},
    { 'name': 'Color',
      'tpl': 'components/about/tpl/gender.tpl.html'},
    { 'name': 'Engine',
      'tpl': 'components/about/tpl/language.tpl.html'},
    { 'name': 'Services',
      'tpl': 'components/about/tpl/dispatch.tpl.html'}
  ];

  // Testing purposes add random string at the end of URL
  angular.forEach($scope.formItems, function (value, key) {
    $scope.formItems[key]['tpl'] = value['tpl'] + '?random=' + Math.random();
  });

  $scope.button = {
    "visibility": 'yes',
    "gender": 'male'
  };

  $scope.step = 0;

  $scope.isCurrentStep = function (step) {
    return $scope.step === step;
  };

  $scope.setCurrentStep = function (step) {
    $scope.step = step;
  };

  $scope.getCurrentStep = function () {
    return $scope.step;
  };

  $scope.getMaxStep = function () {
    return $scope.formItems.length - 1;
  };

  $scope.getCurrentProgress = function () {
    var perc = $scope.getMaxStep() / 100;
    return $scope.step / perc + '%';
  };

  $scope.setNextStep = function () {
    var nextStep = $scope.step + 1;
    var maxValue = $scope.getMaxStep();
    if (nextStep > maxValue) nextStep = maxValue;
    $scope.step = nextStep;
  };

}]);
