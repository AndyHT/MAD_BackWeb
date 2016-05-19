(function () {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl ($scope, $state, LoginSrv, TokenSrv, $window, NoticeSrv) {
      $scope.login = function (username, password) {
        LoginSrv.adminLogin().save({
          name: username,
          password: password
        }).$promise.then(
          function (response) {
            if (response.errCode == 0 && (response.token && response.token != 'undefined')) {
              $window.localStorage['adminId'] = response.id;
              TokenSrv.setToken(response.token);
              $window.localStorage['LEVEL'] = response.level;
              $window.localStorage['upToken'] = response.uptoken;
              NoticeSrv.success("登录成功");
              $state.go('app');
            } else {
              $state.go('app.login');
            }
          }, function (error) {
            console.log(error);
          }
        )
      }
    }

})();
