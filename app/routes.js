angular.module('app').run(function($rootScope, $location, $state) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    if (error === 'AUTH_REQUIRED') {
      console.debug(error);
      $state.go('login');
    } else {
      console.error(error);
    }
  });
});

angular.module('app').config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/app/mailbox/folder/inbox');
});

angular.module('app').config(function($stateProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      url: '/app',
      template: `<app-viewport current-user="$ctrl.currentUser"></app-viewport>`,
      resolve: {
        currentUser: function(authService, $firebaseObject, firebaseRef) {
          return authService.$requireAuth()
            .then(() => $firebaseObject(firebaseRef.getUserRef()).$loaded());
        }
      },
      controller: function($resolve, currentUser) {
        this.currentUser = currentUser;
      },
      controllerAs: '$ctrl'
    })
    .state('login', {
      url: '/login',
      template: '<login></login>',
      resolve: {
        currentAuth: function(authService) {
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
