(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('FinanceDetailCtrl', FinanceDetailCtrl);

   /** @ngInject */
  function FinanceDetailCtrl($scope, $state, financeListSrv) {
  	financeListSrv.getFinanceList().save()
  	.$promise.then(
      function (response) {
      	// console.log(response);
        $scope.currentPage = 1
        ,$scope.numPerPage = 5
        ,$scope.maxSize = 5
        ,$scope.length = response.accountList.length;

        $scope.$watch("currentPage + numPerPage", function() {
          var begin = (($scope.currentPage - 1) * $scope.numPerPage)
          , end = begin + $scope.numPerPage;
          // console.log(begin + ' | ' + end);
          for (var i = 0; i < response.accountList.length; i++) {
            if(response.accountList[i].catalog == "1") response.accountList[i].catalog ="广告商充值申请";
            else if(response.accountList[i].catalog == "2") response.accountList[i].catalog ="广告商退款申请";
            else if(response.accountList[i].catalog == "3") response.accountList[i].catalog ="车主用户提现申请";
            
          }
          $scope.financeList = response.accountList.slice(begin, end);
        });
      	// $scope.financeList = response.accountList;
      }, function (error) {
        console.log(error);
      }
    );

  }

})();
