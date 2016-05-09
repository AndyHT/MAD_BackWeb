(function () {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl ($scope, $state, LoginSrv, TokenSrv, $window) {
      $scope.login = function (username, password) {
        LoginSrv.adminLogin().save({
          name: username,
          pass: password
        }).$promise.then(
          function (response) {
            if (response.errCode == 0 && (response.token && response.token != 'undefined')) {
              $window.localStorage['adminId'] = response.id;
              TokenSrv.setToken(response.token);
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

})()
