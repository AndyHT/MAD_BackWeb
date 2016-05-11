(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .factory('myInterceptor', myInterceptor);

    /** @ngInject */
    function myInterceptor($rootScope, $injector, TokenSrv, baseURL) {
      var myInterceptor = {
        request: function (config) {
          if (arguments[0].url.indexOf(baseURL) !== -1) {
            if (arguments[0].method === 'GET' || arguments[0].method === 'DELETE' || arguments[0].method === 'OPTIONS') {
              arguments[0].params = arguments[0].params || {};
              arguments[0].params.token = TokenSrv.getToken();
            }
            if (arguments[0].method === 'POST' || arguments[0].method === 'PUT') {
              arguments[0].data = arguments[0].data || {};
              arguments[0].data.token = TokenSrv.getToken();
            }
          }
          return config;
        },
        response: function (response) {
          // console.log(response);
          if (response.data.errCode === 101) {
            $injector.get('NoticeSrv').notice($injector.get('ErrorSrv').getError(response.data.errCode));
            var $state = $injector.get('$state');
            $state.go('app.login');
          }
          if (response.data.errCode && response.data.errCode !== 0) {
            $injector.get('NoticeSrv').error($injector.get('ErrorSrv').getError(response.data.errCode));
            var $state = $injector.get('$state');
            $state.go('app.login');
          }
          return response;
        }
      };
      return myInterceptor;
    }
})();
