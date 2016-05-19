(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('rechargeApplyCtrl', rechargeApplyCtrl);

   /** @ngInject */
  function rechargeApplyCtrl($scope, $state, financeListSrv) {
  	financeListSrv.getApplyList().save({},{
  		catalog: 1
  	})
  	.$promise.then(
      function (response) {
      	console.log(response);
      	$scope.rechargeApplyList = response.applyList;
      }, function (error) {
        console.log(error);
      }
    );

    $scope.pass = function(id){
      $scope.tag = 1;
      $scope.applyId = id;
    }

    $scope.reject = function(id){
      $scope.tag = 0;
      $scope.applyId = id;
    }

    $scope.completeRecharge = function(username, password, tag, id){
      console.log(id);
    financeListSrv.completeApply().save({},{
      operatorEmail: username,
      operatorPassword: password,
      applyId: id,
      tag: tag
    })
    .$promise.then(
      function (response) {
        console.log(response.errCode);
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
