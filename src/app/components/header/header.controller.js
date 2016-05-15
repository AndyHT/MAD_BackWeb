(function () {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('HeaderCtrl', HeaderCtrl);

    /** @ngInject */
    function HeaderCtrl ($scope, $rootScope, $state, $window, MessageSrv, MessageStatusSrv, DeleteMsgSrv, NoticeSrv, ErrorSrv) {
      $scope.logout = function () {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('LEVEL');
        $window.localStorage.removeItem('adminId');
        $state.go('app.login');
        NoticeSrv.notice("您已成功登出");
      }

      $scope.markMsg = function () {
        MessageStatusSrv.changeStatus().save({
          id: $window.localStorage['adminId']
        })
        .$promise.then(
          function (response) {
            console.log(response.errCode);
          }
        ),
        function (error) {
          console.log(error);
        }
      }

      $scope.refresh = function () {
        $state.reload();
      }

      $scope.delete = function (id) {
        DeleteMsgSrv.deleteMsg().save({
          id: id,
          adminId: $window.localStorage['adminId']
        }).$promise.then(
          function (response) {
            NoticeSrv.success("成功删除消息");
            $state.reload();
          },
          function (error) {
            console.log(error);
          }
        )
      }

      MessageSrv.getMessage().get({
        id: $window.localStorage['adminId']
      }).$promise.then(
        function (response) {
          $rootScope.msgList = response.MsgList.reverse();
          var number = 0;
          for (var msg in response.MsgList) {
            if ((response.MsgList)[msg].status == 0) {
              response.MsgList[msg].color = 'text-danger';
              number++;
            } else {
              response.MsgList[msg].color = 'text-info';
            }
          }
          $rootScope.msg = {
            number: number
          }
        }
      ), function (error) {
        console.log(error);
      }
    }

})();
