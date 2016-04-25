export default function($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      template: '<login test-users="$ctrl.testUsers"></login>',
      resolve: {
        currentAuth: function(authService, $location) {
          return authService.$waitForAuth()
            .then(authData => {
              if(authData) {
                $location.path('/');
              }
            });
        },
        testUsers: function(firebaseRefs, $firebaseArray) {
          return $firebaseArray(firebaseRefs.parse('users').orderByKey().limitToFirst(3)).$loaded();
        }
      },
      controller: function (testUsers) {
        this.testUsers = testUsers;
      },
      controllerAs: '$ctrl'
    })
    .state('logout', {
      url: '/logout',
      template: '<logout></logout>'
    });
}
