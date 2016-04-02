angular.module('app').run(function($rootScope) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.error(error);
  });
});

angular.module('app').config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/mailbox/folder/inbox');
});

angular.module('app').config(function($stateProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      url: '',
      template: `<app-viewport users="$ctrl.users" current-user="$ctrl.currentUser"></app-viewport>`,
      resolve: {
        users: function(UserService) {
          return UserService.getAll();
        },
        currentUser: function(users, UserService) {
          return UserService.getCurrentUser();
        }
      },
      controller: function($resolve, users, currentUser) {
        this.users = users;
        this.currentUser = currentUser;
      },
      controllerAs: '$ctrl'
    });
});
