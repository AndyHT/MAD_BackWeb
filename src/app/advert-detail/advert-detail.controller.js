/**
 * Created by mandyxue on 16/4/5.
 */

(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('AdvertDetailCtrl', AdvertDetailCtrl);

  /** @ngInject */
  function AdvertDetailCtrl($scope, $state, auditAdsSrv) {
  	$scope.audit = function(id,tag){
  	auditAdsSrv.auditAds().save({},{
  		id: id,
  		success: tag
  	}).$promise.then(
      function (response) {
        console.log(response);
        if(response.errCode == 0){
          alert("操作成功");
          window.location.reload();
        }else{
          alert("操作失败");
          window.location.reload();
        };
      }, function (error) {
        console.log(error);
      }
    );
  	};

  	$scope.remove = function(id,reason){
  	auditAdsSrv.removeAds().save({},{
  		id: id,
  		reason: reason
  	}).$promise.then(
      function (response) {
        console.log(response);
        //$('#myModal').modal('hide');
        // $state.go('app.advert-audit');
        if(response.errCode == 0){
          alert("操作成功");
          window.location.reload();
        }else{
          alert("操作失败");
          window.location.reload();
        };
      }, function (error) {
        console.log(error);
      }
    );
  	
  	
  }
  	

  }
})();
