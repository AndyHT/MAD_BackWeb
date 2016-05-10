(function () {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('AdminInfoCtrl', AdminInfoCtrl);

    function AdminInfoCtrl ($window, $rootScope, $scope, $state, BackUserListSrv, UpdateAdminInfoSrv) {
      BackUserListSrv.getBackUserInfo().get()
      .$promise.then(
        function (response) {
          for (var user in response.backUserList) {
            if (response.backUserList[user].id == $window.localStorage['adminId']) {
              $scope.admin = {
                id: response.backUserList[user].id,
                name: response.backUserList[user].name,
                email: response.backUserList[user].email
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
        if (password === confirmPass) {
          console.log($rootScope.id, $rootScope.email, password)
          UpdateAdminInfoSrv.updateAdminInfo().save({
            id: $rootScope.id,
            email: $rootScope.email,
            pass: password
          }).$promise.then(
            function (response) {
              console.log(response.errCode);
              $state.go('app.login');
            },
            function (error) {
              console.log(error);
            }
          )
        } else {
          $state.go('app.admin-info');
        }
      }
    }
})();
