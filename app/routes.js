angular.module('app').run(function($rootScope, $location, $state) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.error(error);
    if (error === 'AUTH_REQUIRED') {
      //$location.path('/login');
      $state.go('app.login', {});
    } else {

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
      template: `<app-viewport users="$ctrl.users" current-user="$ctrl.currentUser"></app-viewport>`,
      resolve: {
        users: function(UserService) {
          return UserService.getAll();
        },
        currentUser: function(users, UserService) {
          return UserService.getCurrentUser();
        },
        currentAuth: function(authService) {
          return authService.$requireAuth();
        }
      },
      controller: function($resolve, users, currentUser) {
        this.users = users;
        this.currentUser = currentUser;
      },
      controllerAs: '$ctrl'
    })
    .state('login', {
      url: '/login',
      template: '<login current-auth="$ctrl.currentAuth"></login>',
      resolve: {
        currentAuth: function(authService) {
          return authService.$waitForAuth();
        }
      },
      controller: function(currentAuth) {
        this.currentAuth = currentAuth;
      },
      controllerAs: '$ctrl'
    })
    .state('logout', {
      url: '/logout',
      template: '<logout></logout>',
      controller: function() {
        console.log('logout state');
      }
    });
});
