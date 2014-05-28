'use strict';

/* Services */

var drServices = angular.module('drServices', ['ngResource']);

drServices.factory('Phone', ['$resource',
  function ($resource) {
    return $resource('phones/:phoneId.json', {}, {
      query: {method: 'GET', params: {phoneId: 'phones'}, isArray: true}
    });
  }]);


drServices.factory('User', function () {
 var user = {};

  user.image = null;
  user.firstName = null;
  user.lastName = null;
  user.fullNameVisible = null;
  user.gender = null;

  user.getFullName = function() {
    if (angular.isEmpty(this.firstName)) {
      return '';
    }

    if (angular.isEmpty(this.lastName)) {
      return this.firstName;
    }

    if (this.fullNameVisible == 'yes') {
      return this.firstName + ' ' + this.lastName;
    }
    else {
      return this.firstName + ' ' + this.lastName.charAt(0) + '.';
    }
  }

  return user;
});


drServices.factory('StepValidator', function () {
  var service = {};

  service.isStepValid = function(){
    return false;
  }

  return service;
});