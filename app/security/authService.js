angular.module('app').factory('authService', function($firebaseAuth, firebaseRefs) {
  return $firebaseAuth(firebaseRefs.root);
});
