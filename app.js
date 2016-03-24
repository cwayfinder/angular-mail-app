'use strict';

var app = angular.module('app', [])
    .service('UserService', function($http) {
      const baseUri = 'https://jsru-ng-mail-app.firebaseio.com/users/';

      this.getAll = function() {
        console.debug(`load users`);

        return $http.get(baseUri + '.json')
            .then(response => normalizeToArray(response.data))
            .catch(error => console.error(error));
      };
    })
    .service('MailService', function($http) {
      const baseUri = 'https://jsru-ng-mail-app.firebaseio.com/mails/';

      this.getSent = function(user) {
        console.debug(`load sent emails for ${user.fullName}`);

        return $http.get(baseUri + '.json')
            .then(response => normalizeToArray(response.data))
            .then(mails => mails.filter(mail => mail.sender.email === user.email))
            .catch(error => console.error(error));
      };

      this.getInbox = function(user) {
        console.debug(`load inbox emails for ${user.fullName}`);

        return $http.get(baseUri + '.json')
            .then(response => normalizeToArray(response.data))
            .then(mails => mails.filter(mail => mail.to === user.email))
            .catch(error => console.error(error));
      };

      this.sendMail = function(user, mail) {
        mail.timestamp = Date.now();
        mail.sender = {
          name: user.fullName,
          email: user.email
        };

        console.debug(`send email to ${mail.to}`, mail);

        return $http.post(baseUri + '.json', mail)
            .then(response => {
              mail.id = response.data.name;
              return mail;
            });
      };
    }).service('ContactsService', function($http) {
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
