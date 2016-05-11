(function() {
  'use strict';

  angular
  .module('madBackWeb')
  .service('adsListSrv', adsListSrv)
  .service('adDetailSrv', adDetailSrv)
  .service('auditAdsSrv', auditAdsSrv)
  .service('searchAdsSrv', searchAdsSrv);

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

  function auditAdsSrv($resource, baseURL) {
    this.auditAds = function(){
      return $resource(baseURL + '/advert/audit');
    }

    this.removeAds = function(){
      return $resource(baseURL + '/advert/remove');
    }

  }

  function searchAdsSrv($resource, baseURL) {
    this.searchAds = function() {
      return $resource(baseURL + '/advert/search');
    }
  }

})();