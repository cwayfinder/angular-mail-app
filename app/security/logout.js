angular.module('app').component('logout', {
  controller: function(authService, $location, $state) {
    authService.$unauth();
    $state.go('login');
  }
});
