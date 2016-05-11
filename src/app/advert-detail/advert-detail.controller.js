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
    //审核广告，根据tag=0或1来区别通过与不通过
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

    //下架广告，蒙版问题还没有解决，暂时没有跳转，只是刷新本页
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
