(function () {
  'use strict';

  angular
  .module('madBackWeb')
  .service('DashboardSrv', DashboardSrv)
  .service('StatisticsSrv', StatisticsSrv)

  /** @ngInject*/
  function DashboardSrv($resource, baseURL) {
    this.getDashboardData = function () {
      return $resource(baseURL + '/home');
    }
  }

  function StatisticsSrv($resource, baseURL) {
    this.getStatistics = function () {
      return $resource(baseURL + '/statistics/dayincome');
    }
  }
})()
