/**
 * Created by mandyxue on 16/4/5.
 */
(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('AdvertAuditCtrl', AdvertAuditCtrl);

  /** @ngInject */
  function AdvertAuditCtrl($scope, $state, adsListSrv, adDetailSrv, $rootScope) {
  	var token = "";
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
   //	window.location.href='http://localhost:3000/#/advert/detail';
   	$state.go('app.advert-detail');
   	console.log(id);
   	$rootScope.ad_id = id;
   	//var broadcastLocation = {}；

   	adDetailSrv.getAdDetail().save({},{
   		token: token,
   		id: id
   	}).$promise.then(
   	function (response){
   		function locations(obj) {
			for (var key in obj) {}
		}
   		console.log(response.adsDetail);
   		$rootScope.ad_title = response.adsDetail.title;
   		$rootScope.ad_content = response.adsDetail.content;
   		$rootScope.ad_catalog = response.adsDetail.catalog;
   		$rootScope.ad_startDate = response.adsDetail.startDate;
   		$rootScope.ad_endDate = response.adsDetail.endDate;
   		$rootScope.broadcastLocation = response.adsDetail.broadcastLocation;
   		var location = response.adsDetail.broadcastLocation;
   		var item = new locations();
   		for(var i = 0; i<location.length; i++){

   		// item.wujiaochang = false;
   		// item.renminguangchang = false; 
   		// item.xujiahui= false;
   		// item.jingansi= false;
   		// item.lujiazui= false;
   		// item.shijigongyuan= false;
   		// item.zhongshangongyuan= false;
   		// item.zhangjiang= false;
   		// item.nanjingdonglu= false;
   		// item.hongqiao= false;
   		// item.pudongjichang= false;
   		// item.wujiaochang = (location[i] == "五角场")&&(item.wujiaochang == false)?true:false;
   		// item.renminguangchang = (location[i] == "人民广场")&&(item.renminguangchang == false)?true:false;
   		// item.xujiahui = (location[i] == "徐家汇")&&(item.xujiahui == false)?true:false;
   		// item.jingansi = (location[i] == "静安寺")&&(item.jingansi == false)?true:false;
   		// item.lujiazui = (location[i] == "陆家嘴")&&(item.lujiazui == false)?true:false;
   		// item.shijigongyuan = (location[i] == "世纪公园")&&(item.shijigongyuan == false)?true:false;
   		// item.zhongshangongyuan = (location[i] == "中山公园")&&(item.zhongshangongyuan == false)?true:false;
   		// item.zhangjiang = (location[i] == "张江")&&(item.zhangjiang == false)?true:false;
   		// item.nanjingdonglu = (location[i] == "南京东路")&&(item.nanjingdonglu == false)?true:false;
   		// item.hongqiao = (location[i] == "虹桥")&&(item.hongqiao == false)?true:false;
   		// item.pudongjichang = (location[i] == "浦东机场")&&(item.pudongjichang == false)?true:false;
   		console.log(item);



   	}
   	item.wujiaochang = "wujiaochang";
   	$rootScope.showLocation = item;


   	}, function (error) {
   		console.log(error);
   	});
   }
}



})();
