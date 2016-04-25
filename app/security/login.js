angular.module('app').component('login', {
  templateUrl: 'app/security/login.html',
  controller: function(authService, $location, $firebaseObject, firebaseRef, firebaseRefs) {

    this.twitterLogin = () => {
      authService.$authWithOAuthPopup('twitter')
        .then((authData) => {
          firebaseRefs.setParam('userKey', authService.$getAuth().uid);

          var user = $firebaseObject(firebaseRefs.parse('users/:userKey'));
          user.name = authData.twitter.displayName;
          return user.$save();
        })
        .then(() => $location.path('/'))
        .catch(err => this.errorMessage = err.code);
    }
  }
});
