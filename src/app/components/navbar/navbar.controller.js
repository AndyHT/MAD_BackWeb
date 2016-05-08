(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('navbarCtrl', navbarCtrl);

  /** @ngInject */
  function navbarCtrl($scope, $location, $state, UserListSrv) {
    $scope.isMain = false;
    $scope.isUserManage = false;
    $scope.isAdManage = false;
    $scope.isFinanceManage = false;
    $scope.isAdmin = false;
    $scope.isStatistics = false;

    console.log($location.path());
    if ($location.path() == '/') {
      $scope.isMain = true;
    }

    if ($location.path() == '/user/list-mobile' ||
        $location.path() == '/user/list-mobileuser/list-advert' ||
        $location.path() == '/user/list-mobileuser/create') {
      $scope.isUserManage = true;
    }

    if ($location.path() == '/advert/push' ||
        $location.path() == '/advert/audit' ||
        $location.path() == '/advert/search') {
      $scope.isAdManage = true;
    }

    if ($location.path() == '/finance' ||
        $location.path() == '/finance/cash' ||
        $location.path() == '/finance/refund') {
      $scope.isFinanceManage = true;
    }

    if ($location.path() == '/admin/userlist' ||
        $location.path() == '/admin/adduser' ||
        $location.path() == '/admin/auth') {
      $scope.isAdmin = true;
    }

    if ($location.path() == '/statistics') {
      $scope.isStatistics = true;
    }
  }
})();
