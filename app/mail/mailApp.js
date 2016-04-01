'use strict';

angular.module('app').component('mailApp', {
  templateUrl: 'app/mail/mailApp.html',
  bindings: {
    user: '<'
  },
  controller: function($scope, MailService) {

  }
});
