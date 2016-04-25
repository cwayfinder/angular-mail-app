angular.module('app.security').factory('authService', function($firebaseAuth, firebaseRefs) {
  return $firebaseAuth(firebaseRefs.root);
});
