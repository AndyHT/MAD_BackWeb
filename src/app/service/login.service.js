(function() {
  'use strict';

  angular
  .module('madBackWeb')
  .service('LoginSrv', LoginSrv);

  /** @ngInject*/
  function LoginSrv($resource, baseURL) {
    this.adminLogin = function () {
      return $resource(baseURL + '/login');
    }
  }

})();
