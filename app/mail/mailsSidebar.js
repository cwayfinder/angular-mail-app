'use strict';

angular.module('app.mailbox').component('mailsSidebar', {
  templateUrl: 'app/mail/mailsSidebar.html',
  bindings: {
    selectedFolder: '<'
  }
});
