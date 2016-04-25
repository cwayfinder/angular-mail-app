angular.module('app.security').component('logout', {
  controller: function(authService, $location, $state) {
    authService.$unauth();
    $state.go('login');
  }
});
