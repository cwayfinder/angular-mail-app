angular.module('app').component('login', {
  templateUrl: 'app/security/login.html',
  bindings: {
    currentAuth: '='
  },
  controller: function(authService, $location) {
    console.log('currentAuth', this.currentAuth)
    if (this.currentAuth) {
      //$location.path('/mailbox');
    }

    this.twitterLogin = () => {
      authService.$authWithOAuthPopup('twitter')
        .then(() => $location.path('/mailbox/folder/inbox'))
        .catch(err => this.errorMessage = err.code);
    }
  }
});
