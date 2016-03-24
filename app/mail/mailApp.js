'use strict';

angular.module('app').component('mailApp', {
  templateUrl: 'app/mail/mailApp.html',
  bindings: {
    user: '<'
  },
  controller: function($scope, MailService) {
    this.refresh = () => {
      if (this.user) {
        this.mails = [];

        let methodName = 'get' + capitalize(this.selectedFolder);
        MailService[methodName](this.user).then(mails => {
          this.mails = mails;
        });
      }
    };

    this.selectFolder = folder => {
      this.selectedFolder = folder;
      this.composing = false;
      this.refresh();

      $scope.$broadcast('select-folder', folder);
    };

    this.startComposing = () => this.composing = true;

    this.cancelComposing = () => {
      this.composing = false
    };

    this.sendMail = (mail) => {
      MailService.sendMail(this.user, mail).then(m => {
        this.composing = false;
        this.selectFolder('sent');
        this.refresh();
      });
    };

    $scope.$on('load-user', (e, user) => {
      this.user = user;
      this.refresh();
    });

    this.selectedFolder = 'inbox';
    this.refresh();
  }
});
