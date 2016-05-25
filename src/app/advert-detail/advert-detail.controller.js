/**
 * Created by mandyxue on 16/4/5.
 */

(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .directive('mymodal', mymodal)
    .directive('mymodal1', mymodal1)
    .controller('AdvertDetailCtrl', AdvertDetailCtrl);

  /** @ngInject */
  function AdvertDetailCtrl($scope, $state, auditAdsSrv, NoticeSrv) {
    //审核广告，根据tag=1或0来区别通过与不通过
    var reason = '';
  	$scope.audit = function(id, tag, reason){
      if (tag == 0) {
        reason = reason;
      }
    	auditAdsSrv.auditAds().save({},{
    		id: id,
    		success: tag,
        reason: reason
    	}).$promise.then(
        function (response) {
          console.log(response);
          if(response.errCode == 0){
            NoticeSrv.success("操作成功");

            // alert("操作成功");
            // window.location.reload();
          }else{
            NoticeSrv.error("操作失败");
            // alert("操作失败");
            // window.location.reload();
          };
        }, function (error) {
          console.log(error);
        }
      );
      if(tag == 1){
      $state.go('app.advert-audit');
      window.location.reload();
    }
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
            // window.location.reload();
            // $state.go('app.advert-audit');
          }else{
            alert("操作失败");
            // window.location.reload();
          };
        }, function (error) {
          console.log(error);
        }
      );
    }
  }

  function mymodal ($location, $state) {
    return {
      restrict: 'AE',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        element.bind("click", function() {
          var obj = $("#exampleModal");
          obj.modal('hide');
          setTimeout(function() {
            $state.go('app.advert-audit');
          }, 1000);
          scope.$apply(function(){
            // scope.back = true;
            scope.pass = true;
            scope.remove = false;
            scope.notPass = true;
          })
        });
      }
    }
  }

  function mymodal1 ($location, $state) {
    return {
      restrict: 'AE',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        element.bind("click", function() {
          var obj = $("#myModal");
          obj.modal('hide');
          setTimeout(function() {
            $state.go('app.advert-audit');
          }, 1000);
          scope.$apply(function(){
            // scope.back = true;
            scope.pass = true;
            scope.remove = false;
            scope.notPass = true;
          })
        });
      }
    }
  }
})();
