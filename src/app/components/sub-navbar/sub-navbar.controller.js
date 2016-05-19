(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('subNavbarCtrl', subNavbarCtrl);

  /** @ngInject */
  function subNavbarCtrl($scope, $location) {
    $scope.user = false;
    $scope.advert = false;

    $scope.userlist = false;
    $scope.adduser = false;
    $scope.userauth = false;

    $scope.adpush = false;
    $scope.adupload = false;
    $scope.adaduit = false;
    $scope.adsearch = false;

    $scope.finance = false;
    $scope.financecash = false;
    $scope.financerefund = false;
    console.log($location.path());
    if ($location.path() == '/user/list-mobile') {
      $scope.user = true;
    }
    if ($location.path() == '/user/list-mobileuser/list-advert') {
      $scope.advert = true;
    }

    if ($location.path() == '/admin/auth') {
      $scope.userauth = true;
    }
    if ($location.path() == '/admin/userlist') {
      $scope.userlist = true;
    }
    if ($location.path() == '/admin/adduser') {
      $scope.adduser = true;
    }

    if ($location.path() == '/advert/push') {
      $scope.adpush = true;
    }
    if ($location.path() == '/advert/upload') {
      $scope.adupload = true;
    }
    if ($location.path() == '/advert/audit') {
      $scope.adaduit = true;
    }
    if ($location.path() == '/advert/search') {
      $scope.adsearch = true;
    }

    if ($location.path() == '/finance') {
      $scope.finance = true;
    }

    if ($location.path() == '/finance/cash') {
      $scope.financecash = true;
    }

    if ($location.path() == '/finance/refund') {
      $scope.financerefund = true;
    }

  }

})();
