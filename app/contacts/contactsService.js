'use strict';

app.service('ContactsService', function($http) {
  const baseUri = 'https://jsru-ng-mail-app.firebaseio.com/contacts';

  this.getAll = function(user) {
    return $http.get('https://jsru-ng-mail-app.firebaseio.com/contacts.json')
        .then(response => normalizeToArray(response.data))
        .then(contacts => contacts.filter(c => c.ownerId === user.id))
        .catch(error => console.error(error));
  };

  this.create = function(contact) {
    return $http.post('https://jsru-ng-mail-app.firebaseio.com/contacts.json', contact)
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
    return $http.delete('https://jsru-ng-mail-app.firebaseio.com/contacts/' + item.id + '.json')
        .then(response => response.data);
  };
});
