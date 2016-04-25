'use strict';

import routes from './routes';

import './shared';
import './security';
import './mail';

import appViewport from './appViewport';
import topBar from './topBar';

angular.module('app', ['ui.router', 'app.shared', 'app.security', 'app.mailbox', 'app.contacts'])
  
  .run(function ($rootScope, firebaseRefs, Firebase) {
    firebaseRefs.root = new Firebase('https://jsru-ng-mail-app.firebaseio.com');
    
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      console.debug(error);
    });
  })
  
  .config(routes)

  .component('appViewport', appViewport)
  .component('topBar', topBar);
