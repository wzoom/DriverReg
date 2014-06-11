angular.module('drApp.prices', [
  'ui.router',
  'ui.router.stateHelper',
  'drServices',
  'gettext',
  'drFileUpload'
])

  .config(function(stateHelperProvider, gettext){

    var stepSettings = {
      mainState: 'prices',
      firstStep: 'prices.taximeter',
      stepTitle: gettext('Prices'),
    };

    var getComponentTemplatePath = function (stateName) {
      return 'components/' + stepSettings.mainState + '/' + stateName + '.html';
    };

    stateHelperProvider
      .setNestedState({
        name: 'prices',
        title: gettext("Prices"),
        absolute: true,
        sideMenu: true,
        skipAllow: true,
        url: "/prices",
        redirectTo: 'prices.taximeter',
        templateUrl: getComponentTemplatePath('prices'),
        weight: 4,
        children: [
          {
            name: 'taximeter',
            title: gettext("Taximeter"),
            sideMenu: false,
            skipAllow: true,
            url: "/taximeter",
            templateUrl: getComponentTemplatePath('prices.taximeter'),
          },
          {
            name: 'tariffs',
            title: gettext("Tariffs"),
            sideMenu: false,
            skipAllow: false,
            url: "/tariffs",
            templateUrl: getComponentTemplatePath('prices.tariffs'),
          },
          {
            name: 'summary',
            title: gettext("Summary"),
            sideMenu: false,
            skipAllow: false,
            url: "/summary",
            templateUrl: getComponentTemplatePath('prices.summary'),
          }
        ],
      });

  })

  .controller('pricesCtrl', function ($scope, $rootScope, $state, $filter, $timeout, gettextCatalog) {

    $scope.tariffs = $scope.user.tariffs;

    var addingNewTariff = false;

    var resetNewTariff = function() {
      $scope.newTariff = {
        name: gettextCatalog.getString('Tariff') + ' ' + (countNonEmptyArrayElements($scope.tariffs) + 1),
      };
    }

    if (angular.isUndefined($scope.newTariff)) {
      resetNewTariff();
    }

/*    $scope.tariffs = [

      {
        name: 'Tariff 1',
        waiting: 6,
        pricePerKm: 19,
        initial: 30,
      },
      {
        name: 'Tariff 2',
        waiting: 0,
        pricePerKm: 10,
        initial: 100,
      },

    ];
*/
    angular.forEach($scope.tariffs, function(tariff){
      tariff.editing = false;
    });

    $scope.addNewTariff = function() {
      if (angular.isDefined($scope.newTariff)) {
        $scope.tariffs.push($scope.newTariff);
        resetNewTariff();
        addingNewTariff = false;
      }
    };

    $scope.isAddingNewTariff = function() {
      return addingNewTariff || !$scope.tariffs.length || !$scope.newTariff
    };

    $scope.setAddingNewTariff = function(state) {
      return addingNewTariff = !!state;
    };

    $scope.removeTariff = function(removeKey) {
      if (angular.isDefined($scope.tariffs[removeKey])) {
        $scope.tariffs.splice(removeKey, 1);
        resetNewTariff();

        return true;
      }
    };

    $scope.disableEditing = function(key) {
      if (angular.isDefined($scope.tariffs[key])) {
        $timeout(function(){
          $scope.tariffs[key].editing = false;
        }, 0);

      }
    };

    $scope.getPhotoState = function(name) {
      if (angular.isObject($scope.user.photos[name])) {
        if (angular.isDefined($scope.user.photos[name].uuid) && $scope.user.photos[name].uuid != ''){
          return $scope.user.photos[name].localFileName;
        }
      }
      else {
        for(var i = 0; i<Uploader.queue.length; i++) {
          if (Uploader.queue[i].fieldName == name) {
            return Uploader.queue[i].isUploaded || Uploader.queue[i].progress;
          }
        }
      }
      return false;
    };

  })

  .service('pricesValidator', function (User) {
    var service = this;

    var isTaximeterValid = function(user) {
      return angular.isString(user.taximeterId) && user.taximeterId != '';
    }

    var isTariffsValid = function(user) {
      return angular.isArray(user.tariffs) && countNonEmptyArrayElements(user.tariffs) > 0;
    }

      // Public API
    service.isStepValid = function(stepName, userObject, skipStep){
      if (stepName.substring(0, stepName.indexOf('.')) != 'prices') return false;

      if (stepName.indexOf('.') > -1) {
        stepName = stepName.substring(stepName.indexOf('.')+1);
      }

      switch(stepName) {
        case 'taximeter': return isTaximeterValid(userObject);
        case 'tariffs': return isTariffsValid(userObject);
        case 'summary': return true;
      }

      return false;
    };

    return service;
  });

function countNonEmptyArrayElements(arr) {
  var count = 0;
  for (var i=arr.length; i>0; i--) {
    if (typeof arr[i-1] !== "undefined")
      count++;
  }
  return count;
}

