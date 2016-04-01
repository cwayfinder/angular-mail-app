'use strict';

angular.module('app').component('topBar', {
  templateUrl: 'app/topBar.html',
  bindings: {
    users: '<',
    currentUser: '<'
  },
  controller: function(UserService, $state) {
    this.selectUser = user => {
      this.currentUser = user;
      UserService.setCurrentUser(user);
      $state.go($state.current, {}, {reload: $state.current});
    };
  }
});
