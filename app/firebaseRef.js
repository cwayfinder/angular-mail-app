angular.module('app')
  .constant('FirebaseUrl', 'https://jsru-ng-mail-app.firebaseio.com')
  .service('rootRef', ['FirebaseUrl', Firebase])
  .factory('firebaseRef', function(rootRef, authService) {
    return {
      //getMailsRef: () => rootRef.child('mails').child(authService.$getAuth().uid)
      getMailsRef: () => rootRef.child('mails')
    }
  });
