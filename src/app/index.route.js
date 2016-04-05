(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        views: {
            'header': {
                templateUrl: 'app/components/header/header.html'
            },
            'navbar': {
                templateUrl: 'app/components/navbar/navbar.html'
            },
            'sub-navbar': {
                templateUrl: 'app/components/sub-navbar/dashboard-sub-navbar.html'
            },
            'content': {
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'MainController',
                controllerAs: 'dashboard'
            },
            'footer': {
                templateUrl: 'app/components/footer/footer.html'
            }
        }
      })
      .state('app.login', {
        url: 'login',
        views: {
            'header@': {
                templateUrl: 'app/blank/blank.html'
            },
            'navbar@': {
                templateUrl: 'app/blank/blank.html'
            },
            'sub-navbar@': {
                templateUrl: 'app/blank/blank.html'
            },
            'content@': {
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl'
            },
            'footer@': {
                templateUrl: 'app/blank/blank.html'
            }
        }
      })
      .state('app.user', {
        url: 'user/list-mobile',
        views: {
            'sub-navbar@': {
                templateUrl: 'app/components/sub-navbar/user-list-sub-navbar.html'
            },
            'content@': {
                templateUrl: 'app/user-list-mobile/user-list-mobile.html'
            }
        }
      })
      .state('app.user.list-advert', {
        url: 'user/list-advert',
        views: {
            'sub-navbar@': {
                templateUrl: 'app/components/sub-navbar/user-list-sub-navbar.html'
            },
            'content@': {
                templateUrl: 'app/user-list-advert/user-list-advert.html'
            }
        }
      })
      .state('app.user.check-advert', {
        url: 'user/check-advert',
        views: {
            'sub-navbar@': {
                templateUrl: 'app/components/sub-navbar/user-check-sub-navbar.html'
            },
            'content@': {
                templateUrl: 'app/user-check-advert/user-check-advert.html'
            }
        }
      })
      .state('app.user.check-mobile', {
        url: 'user/check-mobile',
        views: {
            'sub-navbar@': {
                templateUrl: 'app/components/sub-navbar/user-check-sub-navbar.html'
            },
            'content@': {
                templateUrl: 'app/user-check-mobile/user-check-mobile.html'
            }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
