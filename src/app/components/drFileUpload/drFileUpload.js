'use strict';

angular.module('drFileUpload', ['angularFileUpload'])
  .directive('drFileUpload', function(Uploader, $document) {
    'use strict';

    return {
      restrict: "EA",
      scope: {
        theModel: "=ngModel",
      },
      templateUrl: 'components/drFileUpload/drFileUpload.html',
      replace: true,
      link: function(scope, element, attributes) {
        scope.uploader = Uploader;
        var uploaderName = attributes.drFileUpload;
        //console.log('drFileUpload LINK:', element);
        delete attributes.id;

        scope.uploaderName = uploaderName;
        scope.uploaderItem = null;

        scope.showPreview = angular.isDefined(attributes.preview);
        scope.previewSrc = scope.showPreview ? attributes.preview : '';

        scope.openFileSelect = function () {
          scope.invalidFile = null;
          angular.element('input[name="'+ uploaderName + '"]').click();
        };

        scope.openFileSelectOther = function() {
          scope.cancelUploaderItem();
          scope.openFileSelect();
        }

        scope.cancelUploaderItem = function () {
          if (scope.uploaderItem.isUploaded || scope.uploaderItem.isUploading) {
            scope.uploaderItem.cancel();
          }
          else {
            scope.uploaderItem.cancel();
          }

          scope.uploaderItem = null;
        };


        Uploader.bind('afteraddingfile', function (event, item) {
          //console.info('After adding a file', item);
          if (item.fieldName == uploaderName) {
            scope.uploaderItem = item;
          }
        });

        Uploader.bind('whenaddingfilefailed', function (event, item) {
          if (item.fieldName == uploaderName) {
            scope.invalidFile = item.file || true;
          }
        });

        Uploader.bind('success', function (event, xhr, item, response) {
          if (item.fieldName == uploaderName) {
            console.info('Success', response);
            if (angular.isDefined(response.uuid)) {
              // Save the full Media API object to the model.
              scope.theModel = response;
              scope.previewSrc = response.thumbnail.href;
            }
          }
        });
      }
    };
  });
