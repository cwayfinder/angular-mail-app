'use strict';

angular.module('app').component('mailList', {
  templateUrl: 'app/mail/mailList.html',
  bindings: {
    folder: '<',
    mails: '<',
    onSelect: '&'
  },
  controller: function($scope, MailService) {
    this.collocutor = mail => this.folder === 'sent' ? mail.to : mail.sender.name;

    this.formatDate = timestamp => moment(timestamp).fromNow();
  }
});