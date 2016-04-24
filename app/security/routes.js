angular.module('app').run(function($rootScope, $location, $state) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    if (error === 'AUTH_REQUIRED') {
      $state.go('login');
    }
  });
});

angular.module('app').config(function($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      template: '<login></login>',
      resolve: {
        currentAuth: function(authService, $location) {
          return authService.$waitForAuth()
            .then(authData => {
              if(authData) {
                $location.path('/');
              }
            });
        }
      }
    })
    .state('logout', {
      url: '/logout',
      template: '<logout></logout>'
    });
});
