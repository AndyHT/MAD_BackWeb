(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
