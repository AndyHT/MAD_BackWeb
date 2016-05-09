(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .factory('TokenSrv', TokenSrv);

    /** @ngInject */
    function TokenSrv($window) {
        return {
          setToken: function (token) {
            $window.localStorage['token'] = token;
          },
          getToken: function () {
            return $window.localStorage['token'];
          }
        }
    }
})();
