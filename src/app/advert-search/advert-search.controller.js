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

    $scope.places = ['','嘉定区','金山区','奉贤区','松江区','青浦区','闵行区','浦东新区','长宁区','黄浦区','宝山区','虹口区','杨浦区','崇明县','徐汇区','静安区','普陀区'];
    $scope.selectedPlace = $scope.places[0];

  	$scope.search = function(id, title, selectedPlace, startDate, endDate) {
      var location = '';
  		if(startDate){
  			var start = moment(startDate).format("YYYY-MM-DD 00:00:00");
  		}
  		if(endDate){
  			var end = moment(endDate).format("YYYY-MM-DD 00:00:00");
  		}
      for (var i = 1; i < $scope.places.length; i++) {
      if(selectedPlace == $scope.places[i]){
        if(i < 10) location = '00' + i;
        else location = '0' + i;
        
      }else{
        location = '';
      }
      
    };
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

            //console.log(response.resultList[0].status);
            for (var i = 0; i < response.resultList.length; i++) {
            if(response.resultList[i].status == "000") response.resultList[i].status ="未通过审核";
            else if(response.resultList[i].status == "001") response.resultList[i].status ="已通过审核";
            else if(response.resultList[i].status == "010") response.resultList[i].status ="草稿";
            else if(response.resultList[i].status == "100") response.resultList[i].status ="未审核";
            else if(response.resultList[i].status == "101") response.resultList[i].status ="已下架";

          }
            $scope.resultList = response.resultList;

            // 分页
            $scope.currentPage = 1
            ,$scope.numPerPage = 5
            ,$scope.maxSize = 5
            ,$scope.length = response.resultList.length;

            $scope.$watch("currentPage + numPerPage", function() {
              var begin = (($scope.currentPage - 1) * $scope.numPerPage)
              , end = begin + $scope.numPerPage;
              console.log(begin + ' | ' + end);
              $scope.resultList = response.resultList.slice(begin, end);
            });

            // $scope.resultList = response.resultList;

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
<<<<<<< HEAD
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
   		//$rootScope.broadcastLocation = response.adsDetail.broadcastLocation;
   	
=======
   		$rootScope.broadcastLocation = response.adsDetail.broadcastLocation;

>>>>>>> 6b00f91162cc8c9aabe74f5b8a91d5e16bbc540b
   	}, function (error) {
   		console.log(error);
   	});
  }



 }
})();
