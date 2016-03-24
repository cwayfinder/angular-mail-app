'use strict';

angular.module('app').component('contactEditor', {
  templateUrl: 'app/contacts/contactEditor.html',
  bindings: {
    onSubmit: '&',
    onCancel: '&'
  },
  controller: function(ContactsService) {
    this.contact = {};

    this.submit = () => {
      this.onSubmit({contact: this.contact});
    };

    this.fakeContact = () => {
      ContactsService.generateFake().then(fake => {
        this.contact.name = capitalize(fake.name.first) + ' ' + capitalize(fake.name.last);
        this.contact.avatarUrl = fake.picture.thumbnail;
        this.contact.email = fake.email;
        this.contact.phone = fake.phone;
        this.contact.company = faker.directive('company')();
      });
    };
  }
});
