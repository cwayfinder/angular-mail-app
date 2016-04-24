angular.module('app').component('login', {
  templateUrl: 'app/security/login.html',
  controller: function(authService, $location, $firebaseObject, firebaseRef) {

    this.twitterLogin = () => {
      authService.$authWithOAuthPopup('twitter')
        .then((authData) => {
          var user = $firebaseObject(firebaseRef.getUserRef());
          user.name = authData.twitter.displayName;
          return user.$save();
        })
        .then(() => $location.path('/'))
        .catch(err => this.errorMessage = err.code);
    }
  }
});
