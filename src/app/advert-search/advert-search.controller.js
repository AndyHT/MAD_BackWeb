/**
 * Created by mandyxue on 16/4/5.
 */
 
(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('AdvertSearchCtrl', AdvertSearchCtrl);

  /** @ngInject */
  function AdvertSearchCtrl($scope, searchAdsSrv) {

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

 }
})();
