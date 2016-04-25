angular.module('app').run(function(firebaseRefs, Firebase) {
  firebaseRefs.root = new Firebase('https://jsru-ng-mail-app.firebaseio.com');
});
