'use strict';

angular.module('app').component('mailEditor', {
  templateUrl: 'app/mail/mailEditor.html',
  bindings: {
    composing: '<',
    onCreate: '&',
    onCancel: '&'
  },
  controller: function(ContactsService) {
    this.mail = {};

    this.submit = () => this.onCreate({mail: this.mail});

    this.fakeEmail = () => {
      ContactsService.generateFake().then(fake => {
        this.mail.to = fake.email;
        this.mail.subject = faker.directive('lorem')('%w', 3, 3);
        this.mail.text = faker.directive('lorem')('%p', 3, 3);
      });
    }
  }
});
