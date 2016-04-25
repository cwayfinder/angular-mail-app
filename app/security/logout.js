export default {
  controller: function(authService, $location, $state) {
    authService.$unauth();
    $state.go('login');
  }
};
