(function() {
  'use strict';

  angular
  .module('madBackWeb')
  .service('UserListSrv', UserListSrv);

  /** @ngInject*/
  function UserListSrv($resource, baseURL) {
    this.getUserInfo = function () {
      return $resource(baseURL + '/user/list?token=:token&tag=:tag', {
        token: "@token",
        tag: "@tag"
      });
    };
  }
})();
