'use strict';

angular.module('app').component('contactList', {
  templateUrl: 'app/contacts/contactList.html',
  bindings: {
    contacts: '<'
  },
  controller: function(ContactsService, $state) {
    this.remove = (contact) => {
      ContactsService.remove(contact).then(() => this.refresh());
    };

    this.refresh = () => $state.go($state.current, {}, {reload: $state.current});
  }
});
