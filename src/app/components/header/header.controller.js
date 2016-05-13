(function () {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('HeaderCtrl', HeaderCtrl);

    function HeaderCtrl ($scope, $rootScope, $state, $window, MessageSrv, MessageStatusSrv, DeleteMsgSrv) {
      $scope.logout = function () {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('LEVEL');
        $window.localStorage.removeItem('adminId');
        $state.go('app.login');
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

})()
