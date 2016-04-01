'use strict';

angular.module('app').component('mailEditor', {
  templateUrl: 'app/mail/mailEditor.html',
  controller: function(UserService, MailService, ContactsService, $state, $window) {
    this.mail = {};

    this.submit = () => {
      MailService.sendMail(UserService.getCurrentUser(), this.mail).then(() => {
        $state.go('^.folder', {folder: 'sent'});
      });
    };

    this.fakeEmail = () => {
      ContactsService.generateFake().then(fake => {
        this.mail.to = fake.email;
        this.mail.subject = faker.directive('lorem')('%w', 3, 3);
        this.mail.text = faker.directive('lorem')('%p', 3, 3);
      });
    };

    // TODO: use a smarter approach instead of $window.history.back()
    this.back = () => $window.history.back();
  }
});
