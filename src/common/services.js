'use strict';

/* Services */

var drServices = angular.module('drServices', ['ngResource']);

/*
drServices.factory('Phone', ['$resource',
  function ($resource) {
    return $resource('phones/:phoneId.json', {}, {
      query: {method: 'GET', params: {phoneId: 'phones'}, isArray: true}
    });
  }]);
*/

drServices.factory('User', function () {
 var user = {};

  user.image = null;
  user.firstName = null;
  user.lastName = null;
  user.fullNameVisible = 'yes';
  user.pickup = 5;
  user.countryCode = 'cz';
  user.car = {};
  user.conces = {};
  user.driver = {};
  user.vehicle = {};
  user.conces.license = true;
  user.languagesSpoken = null;

  user.tariffs = [];
  user.fixedRateTariffNotifyMe = true;

  user.taximeterId = null;

  return user;
});
