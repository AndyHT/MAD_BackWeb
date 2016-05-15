(function () {
  'use strict';

  angular
  .module('madBackWeb')
  .directive('modal', modal)
  .controller('UserCheckCtrl', UserCheckCtrl);

  function UserCheckCtrl ($rootScope, $scope, $state, CheckUserSrv, NoticeSrv, ErrorSrv) {
    $scope.checkSuccess = function (id, tag) {
      var reason = '';
      CheckUserSrv.checkUser().save({
        id: id,
        tag: tag,
        success: 1,
        reason: reason
      }).$promise.then(
        function (response) {
          NoticeSrv.success("操作成功");
          if (tag == 1) $state.go('app.user');
          if (tag == 2) $state.go('app.user.list-advert');
        },
        function (error) {
          NoticeSrv.notice("操作失败");
          console.log(error);
        }
      )
    }

    $scope.checkFailure = function (id, tag, reason) {
      if (!reason) {
        NoticeSrv.error(ErrorSrv.getError('409'));
      } else {
        CheckUserSrv.checkUser().save({
          id: id,
          tag: tag,
          success: 0,
          reason: reason
        }).$promise.then(
          function (response) {
            NoticeSrv.success("操作成功");
          },
          function (error) {
            NoticeSrv.notice("操作失败");
            console.log(error);
          }
        )
      }
    }

  }

  function modal ($location, $state) {
    return {
      restrict: 'AE',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        element.bind("click", function() {
          var obj = $("#exampleModal");
          obj.modal('hide');
          scope.$apply(function(){
            scope.back = true;
            scope.pass = true;
            scope.notPass = true;
          })
        });
      }
    }
  }

})();
