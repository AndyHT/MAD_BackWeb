(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .factory('ErrorSrv', processError);

  /** @ngInject */
  function processError() {
    var error, getError;
    error = {
      '101': '令牌不存在或已经过期, 请重新登陆',
      '102':'用户名或密码错误',
      '103':'该用户邮箱未验证',
      '104':'该用户邮箱已被注册',
      '105':'该用户手机号已被注册',
      '106':'该用户手机号未验证',
      '107':'邮箱验证码过期或错误，验证失败，需要重新注册',
      '108':'请求错误',
      '401':'该用户ID不存在',
      '402':'经办人用户名密码错误',
      '403':'该申请不存在',
      '404':'该后台用户已存在',
      '405':'后台用户权限错误',
      '406':'该后台用户不存在',
      '999':'未知错误'
    };
    getError = function(errCode) {
      return error[errCode];
    };
    return {
      getError: getError
    };
  }
})();
