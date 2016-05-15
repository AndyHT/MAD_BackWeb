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
  		//token: token, 
  		tag: 1
  	}).$promise.then(
      function (response) {
      	//console.log(response.notAuditAdsList);
        $scope.advertList = response.notAuditAdsList;
      }, function (error) {
        console.log(error);
      }
    );
  

//显示广告详情，投放商圈没有处理，因为数据格式不确定
   $scope.adsDetail = function(id) {
   //	window.location.href='http://localhost:3000/#/advert/detail';
   	$state.go('app.advert-detail');
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
   		var location = response.adsDetail.broadcastLocation;
      console.log(location.length);
      var showLocation = "";
      for (var i = 0; i < location.length; i++) {
        if(location[i] == "001"){
          showLocation = showLocation + "嘉定区 ";
        }else if(location[i] == "002"){
          showLocation = showLocation + "金山区 ";
        }else if(location[i] == "003"){
          showLocation = showLocation + "奉贤区 ";
        }else if(location[i] == "004"){
          showLocation = showLocation + "松江区 ";
        }else if(location[i] == "005"){
          showLocation = showLocation + "青浦区 ";
        }else if(location[i] == "006"){
          showLocation = showLocation + "闵行区 ";
        }else if(location[i] == "007"){
          showLocation = showLocation + "浦东新区 ";
        }else if(location[i] == "008"){
          showLocation = showLocation + "长宁区 ";
        }else if(location[i] == "009"){
          showLocation = showLocation + "黄浦区 ";
        }else if(location[i] == "010"){
          showLocation = showLocation + "宝山区 ";
        }else if(location[i] == "011"){
          showLocation = showLocation + "虹口区 ";
        }else if(location[i] == "012"){
          showLocation = showLocation + "杨浦区 ";
        }else if(location[i] == "013"){
          showLocation = showLocation + "崇明县 ";
        }else if(location[i] == "014"){
          showLocation = showLocation + "徐汇区 ";
        }else if(location[i] == "015"){
          showLocation = showLocation + "静安区 ";
        }else if(location[i] == "016"){
          showLocation = showLocation + "普陀区 ";
        }
      };
   		$rootScope.broadcastLocation = showLocation;


   	}, function (error) {
   		console.log(error);
   	});
   }
}



})();
