'use strict';

angular.module('drFileUpload', ['angularFileUpload'])
  .directive('drFileUpload', function(Uploader, $document) {
    'use strict';

    return {
      restrict: "EA",
      templateUrl: 'components/drFileUpload/drFileUpload.html',
      replace: true,
      link: function(scope, element, attributes) {
        var uploaderName = attributes.drFileUpload;
        console.log('drFileUpload LINK:', element);

        scope.uploaderName = uploaderName;
        scope.uploaderItem = null;
        /*
        angular.forEach($fileUploader.queue, function(item) {
          if (item.alias == uploaderName) {
            scope.uploaderItem = item;
          }
        });
*/
        scope.openFileSelect = function () {
          angular.element('input[name="'+ uploaderName + '"]').click();
        };

        Uploader.bind('afteraddingfile', function (event, item) {
          //console.info('After adding a file', item);
          if (item.fieldName == uploaderName) {
            scope.uploaderItem = item;
          }
        });



        /*
        if(!$fileUploader.isHTML5) {
          element.removeAttr('multiple');
        }

        element.bind('change', function() {
          var data = $fileUploader.isHTML5 ? this.files : this;
          var options = scope.$eval(attributes.ngFileSelect);

          scope.$emit('file:add', data, options);

          if($fileUploader.isHTML5 && element.attr('multiple')) {
            element.prop('value', null);
          }
        });

        element.prop('value', null); // FF fix
        */
      }
    };
  });

/*
return {
  restrict: "EA",
  template: "<input type='file' />",
  replace: true,
  link: function (scope, element, attrs) {

    var modelGet = $parse(attrs.fileInput);
    var modelSet = modelGet.assign;
    var onChange = $parse(attrs.onChange);

    var updateModel = function () {
      scope.$apply(function () {
        modelSet(scope, element[0].files[0]);
        onChange(scope);
      });
    };

    element.bind('change', updateModel);
  }
};
*/