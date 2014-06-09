'use strict';

var drUploader = angular.module('drUploader', ['ngResource', 'angularFileUpload']);

drUploader.factory('Uploader', function ($fileUploader) {
  var uploader = $fileUploader.create({
    //scope: $scope,
    url: 'http://api-media-eudev.jelastic.dogado.eu/api-media/v1/images?token=1MSnljapQdv7COEmb0DTY766D%2BCEXgTuHopnrgjccio%3D',
    formData: [
      {tag: 'miro'}
    ],
    autoUpload: true,
  });

  uploader.bind('afteraddingfile', function (event, item) {
    item.formData[0].tag = item.file.name;
    //item.alias = item.file.name;
  });

  return uploader;
});


drUploader.controller('queueCtrl', function ($scope, $timeout, Uploader) {
  // Creates a uploader
  var uploader = Uploader;

  $scope.openSelect = function() {
    var myLink = document.getElementById('hide-button');
    myLink.click();
  };

  $scope.shower = false;

  $scope.setHider = function() {
    // uploader.progress == 100 || uploader.isUploading}
    if (uploader.isUploading) $scope.shower = true;
    if (uploader.progress == 100) {
      //$scope.shower = true;
      $timeout(function(){
        $scope.shower = false;
      }, 20000);
    }
  };

  $scope.hider = function() {
    $scope.shower = false;
  };

  $scope.$watch(function() {
    $scope.setHider();
  });

  // ADDING FILTERS

  // Images only
  uploader.filters.push(function(item /*{File|HTMLInputElement}*/) {
    var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
    type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
  });


  // REGISTER HANDLERS

  uploader.bind('afteraddingfile', function (event, item) {
    item.formData[0].tag = item.file.name;
    console.info('After adding a file EVENT', event);
    console.info('After adding a file ITEM', item);
  });

  uploader.bind('whenaddingfilefailed', function (event, item) {
    console.info('When adding a file failed', item);
  });

  uploader.bind('afteraddingall', function (event, items) {
    console.info('After adding all files', items);
  });

  uploader.bind('beforeupload', function (event, item) {
    console.info('Before upload', item);
  });

  uploader.bind('progress', function (event, item, progress) {
    console.info('Progress: ' + progress, item);
  });

  uploader.bind('success', function (event, xhr, item, response) {
    console.info('Success', xhr, item, response);
  });

  uploader.bind('cancel', function (event, xhr, item) {
    console.info('Cancel', xhr, item);
  });

  uploader.bind('error', function (event, xhr, item, response) {
    console.info('Error', xhr, item, response);
  });

  uploader.bind('complete', function (event, xhr, item, response) {
    console.info('Complete', xhr, item, response);
  });

  uploader.bind('progressall', function (event, progress) {
    console.info('Total progress: ' + progress);
  });

  uploader.bind('completeall', function (event, items) {
    console.info('Complete all', items);
  });
});


drUploader.directive('ngThumb', function($window) {
    var helper = {
      support: !!($window.FileReader && $window.CanvasRenderingContext2D),
      isFile: function(item) {
        return angular.isObject(item) && item instanceof $window.File;
      },
      isImage: function(file) {
        var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    };

    return {
      restrict: 'A',
      template: '<canvas/>',
      link: function(scope, element, attributes) {
        if (!helper.support) return;

        var params = scope.$eval(attributes.ngThumb);

        if (!helper.isFile(params.file)) return;
        if (!helper.isImage(params.file)) return;

        var canvas = element.find('canvas');
        var reader = new FileReader();

        reader.onload = onLoadFile;
        reader.readAsDataURL(params.file);

        function onLoadFile(event) {
          var img = new Image();
          img.onload = onLoadImage;
          img.src = event.target.result;
        }

        function onLoadImage() {
          var width = params.width || this.width / this.height * params.height;
          var height = params.height || this.height / this.width * params.width;
          canvas.attr({ width: width, height: height });
          canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
        }
      }
    };
  });
