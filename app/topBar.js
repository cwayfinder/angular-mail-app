'use strict';

angular.module('app').component('topBar', {
  templateUrl: 'app/topBar.html',
  bindings: {
    currentUser: '<'
  }
});
