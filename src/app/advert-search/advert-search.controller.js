/**
 * Created by mandyxue on 16/4/5.
 */
 
(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('AdvertSearchCtrl', AdvertSearchCtrl);

  /** @ngInject */
  function AdvertSearchCtrl($scope, $rootScope, $state, searchAdsSrv, adDetailSrv) {

  	$scope.search = function(id, title, location, startDate, endDate) {
  		if(startDate){
  			//var start = startDate.toISOString();
  			var start = moment(startDate).format("YYYY-MM-DD");
  			console.log(start);
  		}
  		if(endDate){
  			var end = moment(endDate).format("YYYY-MM-DD");
  			//var end = endDate.toISOString();
  		}
  		searchAdsSrv.searchAds().save({},{
  			id: id,
  			title: title,
  			broadcastLocation: location,
  			startDate: start,
  			endDate: end
  		}).$promise.then(
     	 function (response) {
        	console.log(response);
       	    if(response.errCode == 0){
            //alert("操作成功");
            //window.location.reload();
            $scope.resultList = response.resultList;
        }else{
          alert("操作失败");
          //window.location.reload();
       	 };
      	}, function (error) {
        console.log(error);
      }
    );
  }

//显示广告详情，投放商圈没有处理，因为数据格式不确定
  $scope.adsDetail = function(id) {
  	//$state.go('app.advert-detail');
   	console.log(id);
   	$rootScope.ad_id = id;
   	//var broadcastLocation = {}；

   	adDetailSrv.getAdDetail().save({},{
   		//token: token,
   		id: id
   	}).$promise.then(
   	function (response){
   		console.log(response.adsDetail);
   		$rootScope.ad_title = response.adsDetail.title;
   		$rootScope.ad_content = response.adsDetail.content;
   		$rootScope.ad_catalog = response.adsDetail.catalog;
   		$rootScope.ad_startDate = response.adsDetail.startDate;
   		$rootScope.ad_endDate = response.adsDetail.endDate;
   		$rootScope.broadcastLocation = response.adsDetail.broadcastLocation;
   	
   	}, function (error) {
   		console.log(error);
   	});
  }



 }
})();
