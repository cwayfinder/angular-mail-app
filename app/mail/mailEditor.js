'use strict';

export default {
  templateUrl: 'app/mail/mailEditor.html',
  controller: function(ContactsService, MailService, $state, $window) {
    this.mail = {};

    this.submit = () => {
      MailService.save(this.mail)
        .then(() => $state.go('^.folder', {folder: 'sent'}))
        .catch((error) => console.warn("Error:", error));
    };

    this.fakeEmail = () => {
      ContactsService.generateFake()
        .then(contact => ({to: contact.email}))
        .then(mail => {
          mail.subject = faker.directive('lorem')('%w', 3, 3);
          mail.text = faker.directive('lorem')('%p', 3, 3);
          return mail;
        })
        .then(mail => {
          this.mail = mail;
        });
    };

    // TODO: use a smarter approach instead of $window.history.back()
    this.back = () => $window.history.back();
  }
};
