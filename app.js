'use strict';

var app = angular.module('app', ['ui.router', 'firebase', 'app.shared', 'app.security'])
  .run(function(firebaseRefs, Firebase) {
    firebaseRefs.root = new Firebase('https://jsru-ng-mail-app.firebaseio.com');
  });
