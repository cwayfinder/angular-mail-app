'use strict';

angular.module('app').component('mailList', {
  templateUrl: 'app/mail/mailList.html',
  bindings: {
    folder: '<',
    mails: '<',
    onSelect: '&',
    onRemove: '&',
    onRefresh: '&'
  },
  controller: function($scope, MailService) {
    this.collocutor = mail => this.folder === 'sent' ? mail.to : mail.sender.name;

    this.formatDate = timestamp => moment(timestamp).fromNow();

    this.remove = (mail, event) => {
      event.stopPropagation();
      MailService.remove(mail).then(() => this.onRemove());
    };
  }
});
