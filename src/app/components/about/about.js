angular.module('drApp.about', [
  'ui.router',
  'ui.router.stateHelper',
  'ui-rangeSlider',
  'drServices',
  'gettext',
])

.config(function(stateHelperProvider, gettext){

    var stepSettings = {
      mainState: 'about',
      firstStep: 'about.photo',
      stepTitle: gettext('About you'),
    };

    var getComponentTemplatePath = function (stateName) {
      return 'components/' + stepSettings.mainState + '/' + stateName + '.html';
    };

    stateHelperProvider
      .setNestedState({
        name: 'about',
        title: gettext("About You"),
        absolute: true,
        sideMenu: true,
        skipAllow: true,
        url: "/about",
        redirectTo: 'about.photo',
        templateUrl: getComponentTemplatePath('about'),
        weight: 1,
        children: [
          {
            name: 'photo',
            title: gettext("Photo"),
            sideMenu: false,
            skipAllow: true,
            url: "/photo",
            templateUrl: getComponentTemplatePath('about.photo'),
          },
          {
            name: 'name',
            title: gettext("Name"),
            sideMenu: false,
            skipAllow: false,
            url: "/name",
            templateUrl: getComponentTemplatePath('about.name'),
          },
          {
            name: 'gender',
            title: gettext("Gender"),
            sideMenu: false,
            skipAllow: false,
            url: "/gender",
            templateUrl: getComponentTemplatePath('about.gender'),
            data: {
              hideNext: true,
            },
          },
          {
            name: 'phone',
            title: gettext("Phone"),
            sideMenu: false,
            skipAllow: false,
            url: "/phone",
            templateUrl: getComponentTemplatePath('about.phone'),
          },
          {
            name: 'language',
            title: gettext("Language"),
            sideMenu: false,
            skipAllow: false,
            url: "/language",
            templateUrl: getComponentTemplatePath('about.language'),
          },
          {
            name: 'dispatch',
            title: gettext("Dispatching"),
            sideMenu: false,
            skipAllow: true,
            url: "/dispatch",
            templateUrl: getComponentTemplatePath('about.dispatch'),
            data: {
              hideNext: true,
            },
          },
          {
            name: 'summary',
            title: gettext("Summary"),
            sideMenu: false,
            skipAllow: false,
            url: "/summary",
            templateUrl: getComponentTemplatePath('about.summary'),
          }
        ],
      });

  }
)

.controller('aboutCtrl', function ($scope, $rootScope, $state, $filter) {
  $scope.iso_languages = iso_languages;
  var user = $scope.user;

  $scope.getFullName = function() {
    if (angular.isUndefined(user.firstName) || user.firstName == '') {
      return '';
    }

    if (angular.isUndefined(user.lastName) || user.lastName == '') {
      return this.firstName;
    }

    if (user.fullNameVisible == 'yes') {
      return user.firstName + ' ' + user.lastName;
    }
    else {
      return user.firstName + ' ' + user.lastName.charAt(0) + '.';
    }
  }

})

.service('aboutValidator', function () {
  var service = this;

  var isNameValid = function(user) {
    if (angular.isUndefined(user.firstName)) return false;
    if (angular.isUndefined(user.lastName)) return false;
    if (user.firstName == null) return false;
    if (user.lastName == null) return false;
    return true;
  }

  var isPhotoValid = function(user, skipStep) {
    if (skipStep == true) user.image = true;
    if (angular.isUndefined(user.image)) return false;
    if (user.image == null) return false;
    return true;
  }

  var isGenderValid = function(user) {
    if (angular.isUndefined(user.gender)) return false;
    if (user.gender == null) return false;
    return true;
  }

  var isPhoneValid = function(user) {
    if (angular.isUndefined(user.phone) || user.phone == '') return false;
    if (user.phone.length < 10) return false;
    return true;
  }

  var isLanguageValid = function(user) {
    if (angular.isUndefined(user.languagesSpoken)) return false;
    if (user.languagesSpoken == null) return false;
    return true;
  }

  var isDispachingValid = function(user, skipStep) {
    if (skipStep == true) user.dispatchingCompany = 'none';
    if (angular.isUndefined(user.dispatchingCompany)) return false;
    if (user.dispatchingCompany == null) return false;
    return true;
  }

    // Public API
  service.isStepValid = function(stepName, userObject, skipStep){
    if (stepName.substring(0, stepName.indexOf('.')) != 'about') return false;

    if (stepName.indexOf('.') > -1) {
      stepName = stepName.substring(stepName.indexOf('.')+1);
    }

    switch(stepName) {
      case 'photo': return isPhotoValid(userObject, skipStep);
      case 'name': return isNameValid(userObject);
      case 'gender': return isGenderValid(userObject);
      case 'phone': return isPhoneValid(userObject);
      case 'language': return isLanguageValid(userObject);
      case 'dispatch': return isDispachingValid(userObject, skipStep);
      // TODO - change to false and add attribute to $state so that validation can be disabled for certain steps
      case 'summary': return true;
    }

    return false;
  };

  return service;
});
