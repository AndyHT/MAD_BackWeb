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
    $scope.adaduit = false;
    $scope.adsearch = false;

    if ($location.path() == '/user/list-mobile') {
      $scope.user = true;
    }
    if ($location.path() == '/user/list-mobileuser/list-advert') {
      $scope.advert = true;
    }

    if ($location.path() == '/back-auth') {
      $scope.userauth = true;
    }
    if ($location.path() == '/back-userlist') {
      $scope.userlist = true;
    }
    if ($location.path() == '/back-adduser') {
      $scope.adduser = true;
    }

    if ($location.path() == '/advert/push') {
      $scope.adpush = true;
    }
    if ($location.path() == '/advert/audit') {
      $scope.adaduit = true;
    }
    if ($location.path() == '/advert/search') {
      $scope.adsearch = true;
    }

  }

})();
