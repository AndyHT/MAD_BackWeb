(function () {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('HeaderCtrl', HeaderCtrl);

    function HeaderCtrl ($scope, $state, $window) {
      $scope.logout = function () {
        $window.localStorage.removeItem('token');
        $state.go('app.login');
      }
    }

})()
