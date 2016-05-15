(function () {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('AdminInfoCtrl', AdminInfoCtrl);

    function AdminInfoCtrl ($window, $rootScope, $scope, $state, BackUserListSrv, UpdateAdminInfoSrv, NoticeSrv, ErrorSrv) {
      BackUserListSrv.getBackUserInfo().get()
      .$promise.then(
        function (response) {
          for (var user in response.backUserList) {
            if (response.backUserList[user].id == $window.localStorage['adminId']) {
              if (response.backUserList[user].level == 1) {
                $scope.admin = {
                  id: response.backUserList[user].id,
                  name: response.backUserList[user].name,
                  email: response.backUserList[user].email,
                  levelT: '超级管理员'
                };
              } else {
                $scope.admin = {
                  id: response.backUserList[user].id,
                  name: response.backUserList[user].name,
                  email: response.backUserList[user].email,
                  levelT: '普通管理员'
                };
              }
              $rootScope.id = response.backUserList[user].id;
              $rootScope.email = response.backUserList[user].email;
            }
          }
        }, function (error) {
          console.log(error);
        }
      )
      $scope.updateAdminInfo = function (password, confirmPass) {
        if (!password || !confirmPass) {
          NoticeSrv.error(ErrorSrv.getError('416'));
        }
        if (password && confirmPass && (password === confirmPass)) {
          if (password.length<8) {
            NoticeSrv.error(ErrorSrv.getError('419'));
            $state.go('app.admin-info');
          }
          else {
            // console.log($rootScope.id, $rootScope.email, password)
            UpdateAdminInfoSrv.updateAdminInfo().save({
              id: $rootScope.id,
              email: $rootScope.email,
              pass: password
            }).$promise.then(
              function (response) {
                NoticeSrv.error(ErrorSrv.getError('418'));
                $state.go('app.login');
              },
              function (error) {
                console.log(error);
              }
            )
          }
        }
        if (password && confirmPass && (password !== confirmPass)) {
          NoticeSrv.error(ErrorSrv.getError('417'));
          $state.go('app.admin-info');
        }
      }
    }
})();
