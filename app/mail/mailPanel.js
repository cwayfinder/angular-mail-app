'use strict';

angular.module('app').component('mailPanel', {
  templateUrl: 'app/mail/mailPanel.html',
  bindings: {
    mail: '<'
  },
  controller: function($window) {
    // TODO: use a smarter approach instead of $window.history.back()
    this.back = () => $window.history.back();
  }
});
