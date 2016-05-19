(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('UploadCtrl', UploadCtrl);

    function UploadCtrl($scope, $log, $qupload, $window) {
      $scope.selectFiles = [];
      console.log($window.localStorage['upToken']);
  		var start = function (index) {
  			$scope.selectFiles[index].progress = {
  				p: 0
  			};
  			$scope.selectFiles[index].upload = $qupload.upload({
  				key: $scope.selectFiles[index].file.name.split('.')[0],
  				file: $scope.selectFiles[index].file,
          token: $window.localStorage['upToken']
  			});
  			$scope.selectFiles[index].upload.then(function (response) {
  				$log.info(response);
          $scope.upload = {
            result: 'success',
            picUrl: 'http://o7epbv9gm.bkt.clouddn.com/' + response.key,
            isSuccess: true
          }
  			}, function (response) {
  				$log.info(response);
          $scope.upload = {
            result: 'failure',
            isSuccess: false
          }
  			}, function (evt) {
  				$scope.selectFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
  			});
  		};

  		$scope.abort = function (index) {
  			$scope.selectFiles[index].upload.abort();
  			$scope.selectFiles.splice(index, 1);
  		};

  		$scope.onFileSelect = function ($files) {
  			var offsetx = $scope.selectFiles.length;
  			for (var i = 0; i < $files.length; i++) {
  				$scope.selectFiles[i + offsetx] = {
  					file: $files[i]
  				};
  				start(i + offsetx);
  			}
  		}
    }

})();
