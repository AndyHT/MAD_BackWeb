(function() {
  'use strict';
  angular
    .module('madBackWeb')
    .config(config);

  /** @ngInject */
  function config($httpProvider, $logProvider, toastrConfig) {
    $httpProvider.interceptors.push('myInterceptor');
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }
  angular.module('madBackWeb').value('baseURL', 'http://localhost:4000/back');

})();
