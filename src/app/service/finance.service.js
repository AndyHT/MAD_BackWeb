(function() {
  'use strict';

angular
  .module('madBackWeb')
  .service('financeListSrv', financeListSrv);

  /** @ngInject*/
  function financeListSrv($resource, baseURL) {
    this.getFinanceList = function () {
      return $resource(baseURL + '/account/list');
    }

  	this.getApplyList = function() {
  		return $resource(baseURL + '/account/apply/list');
  	}

  	this.completeApply = function() {
  		return $resource(baseURL + '/account/apply/complete');
  	}
  }



})();
