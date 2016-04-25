export default function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      url: '/app',
      template: `<app-viewport current-user="$ctrl.currentUser"></app-viewport>`,
      resolve: {
        currentUser: function (authService, $firebaseObject, firebaseRefs) {
          return authService.$requireAuth()
            .then(() => {
              console.log('userKey', authService.$getAuth().uid);
              firebaseRefs.setParam('userKey', authService.$getAuth().uid);
              return $firebaseObject(firebaseRefs.parse('users/:userKey')).$loaded()
            });
        }
      },
      controller: function ($resolve, currentUser) {
        this.currentUser = currentUser;
      },
      controllerAs: '$ctrl'
    });

  $urlRouterProvider.otherwise('/app/mailbox/folder/inbox');
}
