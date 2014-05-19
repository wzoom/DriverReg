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

  return function() {
    var user = {};

    user.firstName = '';
    user.lastName = '';
    user.fullNameVisible = 'yes';
    user.gender = 'male';

    user.getFullName = function() {
      if (this.fullNameVisible == 'yes') {
        return this.firstName + ' ' + this.lastName;
      }
      else {
        return this.firstName + ' ' + this.lastName.charAt(0) + '.';
      }
    }

    user.setFullNameVisible = function(visible) {
      self.fullNameVisible = (visible ? 'yes' : 'no');
    }

    return user;
  }
});


drServices.factory('ProgressSteps', function () {

  return function() {
    var sections = {
      about : {
        title : "About You",
        steps : {
          photo : {
            title : "Photo",
            tpl  : "components/about/tpl/photo.tpl.html"
          },
          name : {
            title : 'Name',
            tpl  : 'components/about/tpl/name.tpl.html'
          },
          phone : {
            title : 'Phone',
            tpl  : 'components/about/tpl/phone.tpl.html'
          },
          gender : {
            title : 'Gender',
            tpl  : 'components/about/tpl/gender.tpl.html'
          },
          language : {
            title : 'Language',
            tpl  : 'components/about/tpl/language.tpl.html'
          },
          dispatching : {
            title : 'Dispatching',
            tpl  : 'components/about/tpl/dispatch.tpl.html'
          }
        }
      },
      vehicle : {
        title : "Vehicle",
        steps : {}
      },
      services : {
        title : "Services",
        steps : {}
      },
      price : {
        title : "Price",
        steps : {}
      },
      license : {
        title : "Licensing",
        steps : {}
      }
    };

    sections.listSections = function() {
      return sections;
    }


    return sections;
  }
});