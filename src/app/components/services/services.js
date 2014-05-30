angular.module('drApp.services', [
  'ui.router', 'ui.router.stateHelper', 'drServices',
])

.config(function(stateHelperProvider){

    var stepSettings = {
      mainState: 'services',
      firstStep: 'services.pickup',
      stepTitle: 'Services'
    };

    var getComponentTemplatePath = function (stateName) {
      return 'components/' + stepSettings.mainState + '/' + stateName + '.html';
    };

    stateHelperProvider
      .setNestedState({
        name: 'services',
        title: "Services",
        sideMenu: true,
        skipAllow: true,
        url: "/services",
        templateUrl: getComponentTemplatePath('services'),
        weight: 3,
        children: [
          {
            name: 'pickup',
            title: "Pickup distance",
            sideMenu: false,
            skipAllow: false,
            url: "/pickup",
            templateUrl: getComponentTemplatePath('services.pickup'),
          },
          {
            name: 'pref1',
            title: "Preferences",
            sideMenu: false,
            skipAllow: false,
            url: "/pref1",
            templateUrl: getComponentTemplatePath('services.pref1'),
          },
          {
            name: 'pref2',
            title: "Preferences",
            sideMenu: false,
            skipAllow: false,
            url: "/pref2",
            templateUrl: getComponentTemplatePath('services.pref2'),
          },
          {
            name: 'summary',
            title: "Summary",
            sideMenu: false,
            skipAllow: false,
            url: "/summary",
            templateUrl: getComponentTemplatePath('services.summary'),
          },
        ],
      });

  }
)

.controller('servicesCtrl', function ($scope, $rootScope, $state, $filter) {
  var user = $rootScope.user;

    $scope.skipAllow = $state.current.skipAllow;


    if ($state.current.name == 'services') {
      $state.transitionTo('services.pickup');
    }

  $scope.states = $filter('filter')($state.get(),  function(state){return state.name != ''});
  $scope.currentState = $state.current;

  //$rootScope.stepTitle = 'About you';

  $scope.$on('$stateChangeStart', function(event, toState){
    //$scope.currentState = toState;
    $scope.skipAllow = toState.skipAllow;

    if (toState.name == 'services') {
      //$location.path('/about/photo');
      $state.transitionTo('services.pickup');
      //$state.go($state.current.children[0]);
    }
  });

    $scope.goNext = function() {
      if (angular.isDefined($state.current.parent) && angular.isDefined($state.current.parent.children)) {
        $scope.finalState = $state.current.parent.name + '.summary';

        var siblings = $state.current.parent.children || [];
        var lastStateName = '';

        siblings.some(function(partState) {
          var valid = $state.current.name == lastStateName;
          lastStateName = partState.name;

          if (valid) {
            $scope.finalState = partState.name;
            return true;
          }
        });

        $state.go($scope.finalState);
      }
    };

})

.service('servicesValidator', function (User) {
  var service = this;

  var mainStepName = 'services';

  var isPickupValid = function(user) {
    console.log('ffff');
    if (angular.isUndefined(user.pickup)) return false;
    if (user.pickup == null) return false;
    if ((user.pickup < 1) || (user.pickup > 30)) {
      return false;
    }
    return true;
  }

    var isPref1Valid = function(user) {
      if (angular.isUndefined(user.pickup)) return false;
      if (user.pickup == null) return false;
      if ((user.pickup < 1) || (user.pickup > 30)) {
        return false;
      }
      return true;
    }

    var isPref2Valid = function(user) {
      if (angular.isUndefined(user.pickup)) return false;
      if (user.pickup == null) return false;
      if ((user.pickup < 1) || (user.pickup > 30)) {
        return false;
      }
      return true;
    }

    // Public API
  service.isStepValid = function(stepName, skipStep){
    if (stepName.substring(0, stepName.indexOf('.')) != mainStepName) return false;

    if (stepName.indexOf('.') > -1) {
      stepName = stepName.substring(stepName.indexOf('.')+1);
    }

    switch(stepName) {
      case 'pickup': return isPickupValid(User);
      case 'pref1': return true;
      case 'pref2': return true;
      // TODO - change to false and add attribute to $state so that validation can be disabled for certain steps
      case 'summary': return true;
    }

    return false;
  };

  return service;
})

/*
.factory('nameStepValidator', function (StepValidator, User) {
  var service = Object.create(StepValidator);

  // Override validation method
  service.isStepValid = function(){
    if (!angular.isEmpty(User.firstName) && !angular.isEmpty(User.lastName)) return true;
    return false;
  }

  return service;
})
 */
;
