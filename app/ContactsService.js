angular.module('app').service('ContactsService', function($http) {
  const baseUri = 'https://jsru-ng-mail-app.firebaseio.com/contacts/';

  this.getAll = function(user) {
    console.debug(`load contacts for ${user.fullName}`);

    return $http.get(baseUri + '.json')
      .then(response => normalizeToArray(response.data))
      .then(contacts => contacts.filter(c => c.ownerId === user.id))
      .catch(error => console.error(error));
  };

  this.create = function(contact) {
    console.debug('create contact', contact);

    return $http.post(baseUri + '.json', contact)
      .then(response => {
        contact.id = response.data.name;
        return contact;
      });
  };

  this.generateFake = function() {
    return $http.get('https://randomuser.me/api/')
      .then(res => res.data.results[0].user);
  };

  this.remove = function(item) {
    console.debug('delete contact', item);

    return $http.delete(baseUri + item.id + '.json')
      .then(response => response.data);
  };
});
