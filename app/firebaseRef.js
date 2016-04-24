angular.module('app')
  .constant('FirebaseUrl', 'https://jsru-ng-mail-app.firebaseio.com')
  .service('rootRef', ['FirebaseUrl', Firebase])
  .factory('firebaseRef', function(rootRef, authService) {
    return {
      getFolderRef: folderName => rootRef.child('folders').child(authService.$getAuth().uid).child(folderName),
      getMailsRef: () => rootRef.child('mails').child(authService.$getAuth().uid),
      getMailRef: mailId => rootRef.child('mails').child(authService.$getAuth().uid).child(mailId),

      getUserRef: () => rootRef.child('users').child(authService.$getAuth().uid)
    }
  });
