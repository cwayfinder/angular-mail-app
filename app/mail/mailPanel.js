'use strict';

angular.module('app').component('mailPanel', {
  templateUrl: 'app/mail/mailPanel.html',
  bindings: {
    mail: '<',
    onBack: '&'
  }
});