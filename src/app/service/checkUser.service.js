(function() {
  'use strict';

  angular
  .module('madBackWeb')
  .service('GetUserDetailSrv', GetUserDetailSrv)
  .service('CheckUserSrv', CheckUserSrv);

  /** @ngInject*/
  function GetUserDetailSrv ($resource, baseURL) {
    this.getUserDetailById = function () {
      return $resource(baseURL + '/user/detail/:userid?tag=:tag', {
        userid: "userId",
        tag: "@tag"
      });
    };
  }

  function CheckUserSrv ($resource, baseURL) {
    this.checkUser = function () {
      return $resource(baseURL + '/user/audit');
    }
  }

})();
