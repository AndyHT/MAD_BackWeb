(function() {
  'use strict';

  angular
  .module('madBackWeb')
  .service('adsListSrv', adsListSrv)
  .service('adDetailSrv', adDetailSrv);

  /** @ngInject*/
  function adsListSrv($resource, baseURL) {
    this.getNotAuditList = function () {
      return $resource(baseURL + '/advert/list/all');
    }
  }

  function adDetailSrv($resource, baseURL) {
    this.getAdDetail = function () {
      return $resource(baseURL + '/advert/detail');
    }
  }

  

})();