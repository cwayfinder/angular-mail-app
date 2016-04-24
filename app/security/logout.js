angular.module('app').component('logout', {
  controller: function(authService, $location) {
    console.log('logout');
    authService.$unauth();
    $location.path('/login');
  }
});
