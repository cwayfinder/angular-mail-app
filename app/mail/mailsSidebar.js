'use strict';

angular.module('app').component('mailsSidebar', {
  templateUrl: 'app/mail/mailsSidebar.html',
  bindings: {
    selectedFolder: '<',
    onFolderSelect: '&',
    onComposeClick: '&'
  },
  controller: function() {
    this.selectSent = () => this.onFolderSelect({folder: 'sent'});
    this.selectInbox = () => this.onFolderSelect({folder: 'inbox'});
  }
});