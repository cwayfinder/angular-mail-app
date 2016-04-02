angular.module('app').config(function($stateProvider) {
  $stateProvider

    .state('app.contacts', {
      url: '/contacts',
      template: `<contacts-app user="$ctrl.currentUser"></contacts-app>`
    });
});
