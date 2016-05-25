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
          console.log(begin + ' | ' + end);
          $scope.financeList = response.accountList.slice(begin, end);
        });
      	// $scope.financeList = response.accountList;
      }, function (error) {
        console.log(error);
      }
    );

  }

})();
