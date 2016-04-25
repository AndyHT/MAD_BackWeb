(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .config(config);

    // 参考刷票页面，未完成
    // miao.value('baseURL', 'http://139.129.40.57:9090/back');
    // miao.config(function($httpProvider) {$httpProvider.interceptors.push('myInterceptor');});
    
  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
