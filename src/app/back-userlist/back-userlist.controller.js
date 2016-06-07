(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('backgroundManagementCtrl', backgroundManagementCtrl)
    .directive('edit', edit)
    .directive('update', ['UpdateLevelSrv', update])
    .directive('cancel', cancel);

  /** @ngInject */
  function backgroundManagementCtrl($scope, $state, BackUserListSrv, AddBackUserSrv, UpdateLevelSrv, TokenSrv, NoticeSrv, ErrorSrv) {
    $scope.copy = null;

    BackUserListSrv.getBackUserInfo().get()
    .$promise.then(
      function (response) {
        for (var user in response.backUserList) {
          if (response.backUserList[user].level == 1) {
            response.backUserList[user].levelTrans = '超级管理员';
          } else {
            response.backUserList[user].levelTrans = '普通管理员';
          }
        }
        $scope.currentPage = 1
        ,$scope.numPerPage = 5
        ,$scope.maxSize = 5
        ,$scope.length = response.backUserList.length;

        $scope.$watch("currentPage + numPerPage", function() {
          var begin = (($scope.currentPage - 1) * $scope.numPerPage)
          , end = begin + $scope.numPerPage;
          // console.log(begin + ' | ' + end);
          $scope.userList = response.backUserList.slice(begin, end);
        });
        // $scope.userList = response.backUserList;
      }, function (error) {
        console.log(error);
      }
    )

    $scope.addUser = function (name, email, gender, level, hireDate) {
      if (!name && email && gender && level && hireDate) {
        NoticeSrv.error(ErrorSrv.getError('410'));
      }
      if (name && !email && gender && level && hireDate) {
        NoticeSrv.error(ErrorSrv.getError('411'));
      }
      if (name && email && !gender && level && hireDate) {
        NoticeSrv.error(ErrorSrv.getError('412'));
      }
      if (name && email && gender && !level && hireDate) {
        NoticeSrv.error(ErrorSrv.getError('413'));
      }
      if (name && email && gender && level && !hireDate) {
        NoticeSrv.error(ErrorSrv.getError('414'));
      }
      else if (name && email && gender && level && hireDate){
        AddBackUserSrv.addBackUser().save({
          userName: name,
          email: email,
          gender: gender,
          level: level,
          hireDate: hireDate
        }).$promise.then(
          function (response) {
            NoticeSrv.success("添加管理员成功成功");
            $state.go('app.admin-userlist');
          }, function (error) {
            NoticeSrv.notice("操作失败");
            console.log(error);
          }
        )
      }
      else {
        NoticeSrv.error(ErrorSrv.getError('415'));
      }
    }

  }

  function edit() {
    return {
      restrict: 'AE',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        element.bind("click", function() {
          var id = "level_" + ngModel.$modelValue.id;
            scope.copy = angular.copy(ngModel.$modelValue.level);
            // console.log(ngModel.$modelValue.level + ' : ' + scope.copy);
            var obj = $("#"+id);
            obj.removeClass("inactive");
            obj.addClass("active");
            obj.removeAttr("readOnly");
            scope.$apply(function(){
              scope.showEdit = true;
              scope.showUpdate = true;
              scope.showCancel = true;
              scope.display = true;
              scope.editDisplay = true;
            })
          });
      }
    }
  }

  function update(UpdateLevelSrv) {
    return{
      restrict: 'AE',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel){
        element.bind("click",function(){
          var id = "level_" + ngModel.$modelValue.id;
          // console.log('id: ' + ngModel.$modelValue.id);
          // console.log('newLevel: ' + ngModel.$modelValue.newLevel);
          UpdateLevelSrv.updateAdminLevel().save({
            id: ngModel.$modelValue.id,
            newLevel: ngModel.$modelValue.newLevel
          }).$promise.then(
            function (response) {
              console.log(response.errCode);
            }, function (error) {
              console.log(error);
            }
          )
          var obj = $("#"+id);
          obj.removeClass("active");
          obj.addClass("inactive");
          obj.attr("readOnly",true);
          scope.$apply(function(){
            scope.showEdit = false;
            scope.showUpdate = false;
            scope.showCancel = false;
            scope.display = false;
            scope.editDisplay = false;
          })
        })
      }
    }
  }

  function cancel() {
    return{
      restrict: 'AE',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel){
        element.bind("click",function(){
          scope.$apply(function(){
            ngModel.$modelValue.level = scope.copy;
            //console.log(ngModel.$modelValue);
          });

          var id = "level_" + ngModel.$modelValue.id;
          var obj = $("#"+id);
          obj.removeClass("active");
          obj.addClass("inactive");
          obj.prop("readOnly",true);
          scope.$apply(function(){
            scope.showEdit = false;
            scope.showUpdate = false;
            scope.showCancel = false;
            scope.display = false;
            scope.editDisplay = false;
          })
        })
      }
    }
  }
})();
