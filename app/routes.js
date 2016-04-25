angular.module('app').run(function($rootScope) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.debug('Error:', error);
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
        currentUser: function(authService, $firebaseObject, firebaseRef, firebaseRefs) {
          return authService.$requireAuth()
            .then(() => {
              firebaseRefs.setParam('userKey', authService.$getAuth().uid);
              $firebaseObject(firebaseRefs.parse('users/:userKey')).$loaded()
            });
        }
      },
      controller: function($resolve, currentUser) {
        this.currentUser = currentUser;
      },
      controllerAs: '$ctrl'
    })
});
