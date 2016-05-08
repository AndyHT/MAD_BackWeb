(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('backgroundManagementCtrl', backgroundManagementCtrl)
    .directive('edit', edit)
    .directive('update', ['UpdateLevelSrv', update])
    .directive('cancel', cancel);

  /** @ngInject */
  function backgroundManagementCtrl($scope, BackUserListSrv, AddBackUserSrv, UpdateLevelSrv) {
    $scope.copy = null;
    var token = '506902848235ee96192b0454850aed83a5a1fe1a56e4be8a664eeb374e7aa37f';
    BackUserListSrv.getBackUserInfo().get({
      token: token
    }).$promise.then(
      function (response) {
        $scope.userList = response.backUserList;
      }, function (error) {
        console.log(error);
      }
    )

    $scope.addUser = function (name, email, gender, level, hireDate) {
      var token = '506902848235ee96192b0454850aed83a5a1fe1a56e4be8a664eeb374e7aa37f';
      if (!name || !email || !gender || !level || !hireDate) {
        console.log('无法提交!');
      } else {
        AddBackUserSrv.addBackUser().save({
          token: token,
          userName: name,
          email: email,
          gender: gender,
          level: level,
          hireDate: hireDate
        }).$promise.then(
          function (response) {
            console.log(response.errCode);
          }, function (error) {
            console.log(error);
          }
        )
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
            console.log(ngModel.$modelValue.level + ' : ' + scope.copy);
            var obj = $("#"+id);
            obj.removeClass("inactive");
            obj.addClass("active");
            obj.removeAttr("readOnly");
            scope.$apply(function(){
              scope.showEdit = true;
              scope.showUpdate = true;
              scope.showCancel = true;
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
          var token = '506902848235ee96192b0454850aed83a5a1fe1a56e4be8a664eeb374e7aa37f';
          // console.log('id: ' + ngModel.$modelValue.id);
          // console.log('newLevel: ' + ngModel.$modelValue.level);
          UpdateLevelSrv.updateAdminLevel().save({
            token: token,
            id: ngModel.$modelValue.id,
            newLevel: ngModel.$modelValue.level
          }).$promise.then(
            function (response) {
              console.log(response.errCode);
            }, function (error) {
              console.log(error);
            }
          )
          // console.log(scope.userList[ngModel.$modelValue.id - 1].level);
          var obj = $("#"+id);
          obj.removeClass("active");
          obj.addClass("inactive");
          obj.attr("readOnly",true);
          scope.$apply(function(){
            scope.showEdit = false;
            scope.showUpdate = false;
            scope.showCancel = false;
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
          })
        })
      }
    }
  }
})();
