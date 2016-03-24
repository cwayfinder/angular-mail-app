'use strict';

angular.module('app').component('contactsSidebar', {
  templateUrl: 'app/contacts/contactsSidebar.html',
  bindings: {
    contacts: '<'
  }
});