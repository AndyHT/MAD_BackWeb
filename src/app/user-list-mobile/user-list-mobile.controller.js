(function() {
  'use strict';

  angular
  .module('madBackWeb')
  .controller('UserListCtrl', UserListCtrl);

  /** @ngInject */
  function UserListCtrl($rootScope, $scope, $state, UserListSrv, GetUserDetailSrv) {
    var tag = 1;
    UserListSrv.getUserInfo().get({
      tag: tag
    }).$promise.then(
      function (response) {
        var list = response.userList;
        for (var user in list) {
          if (list[user].status == '010') {
            list[user].state = '待审核';
            list[user].statusClass = 'label-info';
            list[user].uiSref = 'app.user.check-mobile';
            list[user].operator = '审核用户';
          }
          if (list[user].status == '100') {
             list[user].state = '审核通过';
             list[user].statusClass = 'label-success';
             list[user].uiSref = 'app.user.detail-mobile';
             list[user].operator = '用户详情';
           }
          if (list[user].status == '001') {
            list[user].state = '审核未通过';
            list[user].statusClass = 'label-danger';
            list[user].uiSref = 'app.user.detail-mobile';
            list[user].operator = '用户详情';
          }
        }
        $scope.userList = list;
        $scope.filter = {};
        $scope.filterByCategory = function (user) {
          return $scope.filter[user.status] || noFilter($scope.filter);
        }
        function noFilter(filterObj) {
          for (var key in filterObj) {
              if (filterObj[key]) {
                  return false;
              }
          }
          return true;
        }
      }, function (error) {
        console.log(error);
      }
    )

    $scope.getDetailById = function (id) {
      GetUserDetailSrv.getUserDetailById().get({
        userid: id,
        tag: tag
      }).$promise.then(
        function (response) {
          $rootScope.mobile = {
            name: response.userDetail.name,
            id: response.userDetail.id,
            location: response.userDetail.location,
            vehicleLicenseImage: response.userDetail.vehicleLicenseImage,
            email: response.userDetail.email,
            mobilePhone: response.userDetail.mobilePhone
          }
        }, function (error) {
          console.log(error);
        }
      )
    }

    $scope.categories = [{
      name: '等待审核',
      labelClass: 'label-info',
      info: '待审核',
      status: '010'
    },{
      name: '审核通过',
      labelClass: 'label-success',
      info: '审核通过',
      status: '100'
    },{
      name: '审核未通过',
      labelClass: 'label-danger',
      info: '审核未通过',
      status: '001'
    }];
  }

})();
