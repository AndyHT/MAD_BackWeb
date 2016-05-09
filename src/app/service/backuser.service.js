(function() {
  'use strict';

  angular
  .module('madBackWeb')
  .service('BackUserListSrv', BackUserListSrv)
  .service('AddBackUserSrv', AddBackUserSrv)
  .service('UpdateLevelSrv', UpdateLevelSrv)
  .service('UpdateAdminInfoSrv', UpdateAdminInfoSrv);

  /** @ngInject*/
  function BackUserListSrv($resource, baseURL) {
    this.getBackUserInfo = function () {
      return $resource(baseURL + '/backuser/list');
    }
  }

  function  AddBackUserSrv($resource, baseURL) {
    this.addBackUser = function () {
      return $resource(baseURL + '/backuser/create');
    }
  }

  function UpdateLevelSrv($resource, baseURL) {
    this.updateAdminLevel = function () {
      return $resource(baseURL + '/backuser/manage');
    }
  }

  function UpdateAdminInfoSrv($resource, baseURL) {
    this.updateAdminInfo = function () {
      return $resource(baseURL + '/backuser/modify');
    }
  }
})();
