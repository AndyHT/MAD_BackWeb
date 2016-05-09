(function () {
  'use strict';
  angular
    .module('madBackWeb')
    .factory('AuthSrv', AuthSrv);

    /** @ngInject */
    function AuthSrv($state, TokenSrv) {
        this.getIsAuthed = function () {
          if (TokenSrv.getToken() && TokenSrv.getToken() !== 'undefined') {
            return TokenSrv.getToken();
          } else {
            return false;
          }
        }
    }
})()
