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
  user.fullNameVisible = 'yes';
  user.gender = null;
  user.languagesSpoken = null;
  user.car = {
    color : 'yellow',
  };
  user.pickup = 5;

  user.tariffs = [];
  user.fixedRateTariffNotifyMe = true;

  user.getFullName = function() {
    if (angular.isUndefined(this.firstName) || this.firstName == '') {
      return '';
    }

    if (angular.isUndefined(this.lastName) || this.lastName == '') {
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

