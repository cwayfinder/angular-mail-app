import routes from './routes';
import authService from './authService';
import login from './login';
import logout from './logout';

angular.module('app.security', ['app.shared'])
  .run(function ($rootScope, $location, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      if (error === 'AUTH_REQUIRED') {
        $state.go('login');
      }
    });
  })
  .config(routes)
  .factory('authService', authService)
  .component('login', login)
  .component('logout', logout);
