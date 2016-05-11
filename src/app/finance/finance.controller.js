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
      	console.log(response);
      	$scope.financeList = response.accountList;
      }, function (error) {
        console.log(error);
      }
    );

  }

})();