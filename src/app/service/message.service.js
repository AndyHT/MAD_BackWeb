(function() {
  'use strict';

  angular
  .module('madBackWeb')
  .service('MessageSrv', MessageSrv)
  .service('MessageStatusSrv', MessageStatusSrv)
  .service('DeleteMsgSrv', DeleteMsgSrv);

  /** @ngInject*/
  function MessageSrv($resource, baseURL) {
    this.getMessage = function () {
      return $resource(baseURL + '/message/list?id=:id', {
        id: "@id"
      });
    }
  }

  function MessageStatusSrv($resource, baseURL) {
    this.changeStatus = function () {
      return $resource(baseURL + '/message/status?id=:id');
    }
  }

  function DeleteMsgSrv($resource, baseURL) {
    this.deleteMsg = function () {
      return $resource(baseURL + '/message/delete');
    }
  }

})();
