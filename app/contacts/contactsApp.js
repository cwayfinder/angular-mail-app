'use strict';

angular.module('app').component('contactsApp', {
  templateUrl: 'app/contacts/contactsApp.html',
  bindings: {
    user: '<'
  },
  controller: function($scope, ContactsService) {
    this.refresh = () => {
      if (this.user) {
        ContactsService.getAll(this.user).then(contacts => {
          this.contacts = contacts;
        });
      }
    };

    this.refresh();

    this.startCreating = () => this.creating = true;
    this.cancelCreating = () => this.creating = false;

    this.create = (contact) => {
      contact.ownerId = this.user.id;

      ContactsService.create(contact).then(contact => {
        this.contacts.push(contact);
        this.creating = false;
      });
    };

    $scope.$on('load-user', (e, user) => {
      this.user = user;
      this.refresh();
    });
  }
});