// miao.factory('TokenSrv', function () {
//         return {
//           token: 'c40477fbc958e6ff692ec3660f9bdfc8',
//           setToken: function (token) {
//               this.token = token;
//           },
//           getToken: function () {
//               return this.token;
//           }
//         };
//     });

(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .factory('TokenSrv', processToken);

    /** @ngInject */
    function processToken() {
        
    }
})();
