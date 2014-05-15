'use strict';

/* Services */

var drServices = angular.module('drServices', ['ngResource']);

drServices.factory('Phone', ['$resource',
  function ($resource) {
    return $resource('phones/:phoneId.json', {}, {
      query: {method: 'GET', params: {phoneId: 'phones'}, isArray: true}
    });
  }]);


var UserService = angular.module('UserService', []);

UserService.factory('User', function () {

  return function() {
    var user = {};

    user.firstName = '';
    user.lastName = '';
    user.fullNameVisible = 'yes';
    user.gender = 'male';

    user.getFullName = function(short) {
      if (typeof short == 'undefined' || !short) {
        return this.firstName + ' ' + this.lastName;
      }
      else {
        return this.firstName + ' ' + this.lastName.charAt(0);
      }
    }

    user.setFullNameVisible = function(visible) {
      self.fullNameVisible = (visible ? 'yes' : 'no');
    }

    return user;
  }
});
