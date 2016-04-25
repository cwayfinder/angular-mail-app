export default {
  templateUrl: 'app/security/login.html',
  bindings: {
    testUsers: '<'
  },
  controller: function (authService, $location, $firebaseObject, firebaseRefs) {
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
    };

    this.testLogin = user => {
      console.log('testLogin', user);
      authService.$authWithPassword({email: user.email, password: '123'})
        .then(() => firebaseRefs.setParam('userKey', authService.$getAuth().uid))
        .then(() => $location.path('/'))
        .catch(err => this.errorMessage = err.code);
    }
  }
};
