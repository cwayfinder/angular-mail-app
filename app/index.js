'use strict';

import routes from './routes';

import shared from './shared';

import appViewport from './appViewport';
import topBar from './topBar';

angular.module('app', ['ui.router', 'app.shared', 'app.security', 'app.mailbox', 'app.contacts'])
  .run(function(firebaseRefs, Firebase) {
    firebaseRefs.root = new Firebase('https://jsru-ng-mail-app.firebaseio.com');
  });

angular.module('app').run(function($rootScope) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.debug(error);
  });
});

angular.module('app').config(routes);

angular.module('app')
  .component('appViewport', appViewport)
  .component('topBar', topBar);


