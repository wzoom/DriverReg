var formAbout = angular.module('formAbout', []);

formAbout.controller('formAboutCtrl', ['$scope', function($scope) {
    $scope.formItems = [
        { 'name' : 'Name',
            'tpl'  : 'components/about/tpl/name.tpl.html'},
        { 'name' : 'Photo',
            'tpl'  : 'components/about/tpl/photo.tpl.html'},
        { 'name' : 'Phone',
            'tpl'  : 'components/about/tpl/phone.tpl.html'},
        { 'name' : 'Gender',
            'tpl'  : 'components/about/tpl/gender.tpl.html'},
        { 'name' : 'Language',
            'tpl'  : 'components/about/tpl/language.tpl.html'},
        { 'name' : 'Dispatching',
            'tpl'  : 'components/about/tpl/dispatch.tpl.html'},
    ];

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
