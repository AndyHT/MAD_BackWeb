/**
 * Created by mandyxue on 16/4/5.
 */
(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('AdvertAuditCtrl', AdvertAuditCtrl);

  /** @ngInject */
  function AdvertAuditCtrl($http, $scope) {
  	
  	$http({
      method:'post',
      url:'http://121.42.57.59:4000/back/advert/list/all',
      data:{token:"72f171533bce44b1640330690f086e21d5fbb58638b8681c3f31314bf4453b8e",tag:1}
    }).success(function(res){
      console.log(res);
      $scope.advertList = res.AdsList;
    })

  }
})();
