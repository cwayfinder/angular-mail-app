angular.module('app').factory('authService', function($firebaseAuth, rootRef) {
  return $firebaseAuth(rootRef);
});
