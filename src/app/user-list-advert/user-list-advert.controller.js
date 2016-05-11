(function() {
  'use strict';

  angular
  .module('madBackWeb')
  .controller('AdvertListCtrl', AdvertListCtrl);

  /** @ngInject */
  function AdvertListCtrl($rootScope, $scope, $state, UserListSrv, GetUserDetailSrv) {
    var tag = 2;
    UserListSrv.getUserInfo().get({
      tag: tag
    }).$promise.then(
      function (response) {
        var list = response.advertiserList;
        for (var user in list) {
          if (list[user].status == '010') {
            list[user].state = '待审核';
            list[user].statusClass = 'label-info';
            list[user].uiSref = 'app.user.check-advert';
            list[user].operator = '审核广告商';
          }
          if (list[user].status == '100') {
            list[user].state = '审核通过';
             list[user].statusClass = 'label-success';
             list[user].uiSref = 'app.user.detail-advert';
             list[user].operator = '广告商详情';
           }
          if (list[user].status == '001') {
            list[user].state = '审核未通过';
            list[user].statusClass = 'label-danger';
            list[user].uiSref = 'app.user.detail-advert';
            list[user].operator = '广告商详情';
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
          $rootScope.advert = {
            name: response.userDetail.name,
            id: response.userDetail.id,
            status: response.userDetail.status,
            email: response.userDetail.email,
            registerDate: response.userDetail.detail.registerDate,
            type: response.userDetail.detail.type,
            licenseType: response.userDetail.detail.licenseType,
            licenseImage: response.userDetail.detail.licenseImage,
            licenseCode: response.userDetail.detail.licenseCode,
            location: response.userDetail.detail.location,
            accomodation: response.userDetail.detail.accomodation,
            businessScope: response.userDetail.detail.businessScope,
            businessPeriod: response.userDetail.detail.businessPeriod,
            organizationCode: response.userDetail.detail.organizationCode,
            legalPersonName: response.userDetail.detail.legalPerson.name,
            legalPersonLocation: response.userDetail.detail.legalPerson.location,
            legalPersonId: response.userDetail.detail.legalPerson.id,
            legalPersonValidDate: response.userDetail.detail.legalPerson.validDate,
            legalPersonIfLongTerm: response.userDetail.detail.legalPerson.ifLongTerm,
            legalPersonIfLegalPerson: response.userDetail.detail.legalPerson.ifLegalPerson,
          }
          console.log(response);
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
