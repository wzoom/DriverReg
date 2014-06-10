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
      transclude: true,
      link: function(scope, element, attributes) {
        var uploaderName = attributes.drFileUpload;

        //scope.$watch(fileElement.attr)
        //attributes.$observe('class', function(val){
        //  element.find('.content').addClass(val);
        //});

        scope.uploader = Uploader;
        //console.log('drFileUpload LINK:', element);
        delete attributes.id;
        //delete attributes.required;

        scope.isFileRequired = attributes.required || false;

        scope.uploaderName = uploaderName;
        scope.uploaderItem = null;

        scope.fileName = null;

        scope.showPreview = angular.isDefined(attributes.preview);
        scope.previewSrc = scope.showPreview ? attributes.preview : '';

        scope.$watch('theModel', function(mediaFileModel) {
          if (angular.isDefined(mediaFileModel) && mediaFileModel !== null) {
            if (angular.isDefined(mediaFileModel.thumbnail) && angular.isDefined(mediaFileModel.thumbnail.href)) {
              scope.previewSrc = mediaFileModel.thumbnail.href;
            }
            if (angular.isDefined(mediaFileModel.localFileName)) {
              scope.fileName = mediaFileModel.localFileName;
            }

          }
        });

        scope.openFileSelect = function () {
          scope.invalidFile = null;
          angular.element('input[name="'+ uploaderName + '"]').click();
        };

        scope.openFileSelectOther = function() {
          if (angular.isDefined(scope.uploaderItem) && scope.uploaderItem !== null) {
            scope.cancelUploaderItem();
          }
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
            scope.fileName = item.file.name;
          }
        });

        Uploader.bind('whenaddingfilefailed', function (event, item) {
          if (item.fieldName == uploaderName) {
            scope.invalidFile = item.file || true;
          }
        });

        Uploader.bind('success', function (event, xhr, item, response) {
          if (item.fieldName == uploaderName) {
            //console.info('Success', response);
            if (angular.isDefined(response.uuid)) {
              // Save the full Media API object to the model.
              scope.theModel = response;
            }
          }
        });
      }
    };
  });
