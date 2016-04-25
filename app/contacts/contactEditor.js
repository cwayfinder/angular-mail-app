'use strict';

export default {
  templateUrl: 'app/contacts/contactEditor.html',
  controller: function(ContactsService, $window, $state) {
    this.contact = {};

    this.submit = () => {
      ContactsService.save(this.contact)
        .then(() => $state.go('^.all'))
        .catch((error) => console.warn(error));
    };

    this.fakeContact = () => {
      function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      
      ContactsService.generateFake().then(fake => {
        this.contact.name = capitalize(fake.name.first) + ' ' + capitalize(fake.name.last);
        this.contact.avatarUrl = fake.picture.thumbnail;
        this.contact.email = fake.email;
        this.contact.phone = fake.phone;
        this.contact.company = faker.directive('company')();
      });
    };

    // TODO: use a smarter approach instead of $window.history.back()
    this.back = () => $window.history.back();
  }
};
