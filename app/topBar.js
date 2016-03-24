'use strict';

angular.module('app').component('topBar', {
  templateUrl: 'app/topBar.html',
  bindings: {
    users: '<',
    currentUser: '<',
    onUserSelect: '&'
  }
});
