'use strict';

angular.module('app').component('contactList', {
  templateUrl: 'app/contacts/contactList.html',
  bindings: {
    contacts: '=',
    onCreate: '&',
    onSelect: '&',
    onRefresh: '&'
  },
  controller: function(ContactsService) {
    this.remove = (contact, index) => {
      ContactsService.remove(contact).then(() => this.onRefresh());
    };
  }
});