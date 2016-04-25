'use strict';

angular.module('app.contacts').component('contactsSidebar', {
  templateUrl: 'app/contacts/contactsSidebar.html',
  bindings: {
    contacts: '<'
  }
});