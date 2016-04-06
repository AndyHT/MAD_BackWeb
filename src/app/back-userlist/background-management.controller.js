(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('backgroundManagementCtrl', backgroundManagementCtrl)
    .directive('edit', edit)
    .directive('update', update)
    .directive('cancel', cancel);

  /** @ngInject */
  function backgroundManagementCtrl($scope, $location) {
    $scope.isSelected = false;
    $scope.adduser = false;
    $scope.userauth = false;
    console.log($location.path());
    if ($location.path() == '/back-auth') {
      $scope.userauth = true;
    }
    if ($location.path() == '/back-userlist') {
      $scope.isSelected = true;
    }
    if ($location.path() == '/back-adduser') {
      $scope.adduser = true;
    }

    $scope.copy = null;
    $scope.userList = [{
      id: 1,
      name: 'Tom',
      gender: '男',
      email: '12345678@xx.com',
      level: 'B',
      startTime: '2015-01-01'
    },
      {
        id: 2,
        name: 'Lily',
        gender: '女',
        email: '12345678@xx.com',
        level: 'A',
        startTime: '2015-03-01'
      },
      {
        id: 3,
        name: 'Tony',
        gender: '男',
        email: '12345678@xx.com',
        level: 'C',
        startTime: '2015-05-01'
      }
    ];

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

  function update() {
    return{
      restrict: 'AE',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel){
        element.bind("click",function(){
          var id = "level_" +ngModel.$modelValue.id;
          // console.log(ngModel.$modelValue.level);
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
