export default function($stateProvider) {
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
}
