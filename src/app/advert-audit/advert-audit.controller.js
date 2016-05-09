/**
 * Created by mandyxue on 16/4/5.
 */
(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('AdvertAuditCtrl', AdvertAuditCtrl);

  /** @ngInject */
  function AdvertAuditCtrl($scope, adsListSrv, adDetailSrv, $rootScope) {
  	var token = "72f171533bce44b1640330690f086e21d5fbb58638b8681c3f31314bf4453b8e";
  	adsListSrv.getNotAuditList().save({},{
  		token: token, 
  		tag: 1
  	}).$promise.then(
      function (response) {
      	//console.log(response.notAuditAdsList);
        $scope.advertList = response.notAuditAdsList;
      }, function (error) {
        console.log(error);
      }
    );
  

   $scope.adsDetail = function(id) {
   	window.location.href='http://localhost:3000/#/advert/detail';
   	console.log(id);
   	$rootScope.ad_id = id;

   	adDetailSrv.getAdDetail().save({},{
   		token: token,
   		id: id
   	}).$promise.then(
   	function (response){
   		console.log(response.adsDetail);
   		$rootScope.ad_title = response.adsDetail.title;
   		$rootScope.ad_content = response.adsDetail.content;
   		$rootScope.ad_catalog = response.adsDetail.catalog;
   		$rootScope.ad_startDate = response.adsDetail.startDate;
   		$rootScope.ad_endDate = response.adsDetail.endDate;


   	}, function (error) {
   		console.log(error);
   	});
   }
}
})();
