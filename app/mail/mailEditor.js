'use strict';

angular.module('app').component('mailEditor', {
  templateUrl: 'app/mail/mailEditor.html',
  bindings: {
    composing: '<',
    onCreate: '&',
    onCancel: '&'
  },
  controller: function() {
    this.mail = {};

    this.submit = () => {
      this.onCreate({mail: this.mail});

    }
  }
});