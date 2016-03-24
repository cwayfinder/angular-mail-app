'use strict';

angular.module('app').service('MailService', function($http) {
  const baseUri = 'https://jsru-ng-mail-app.firebaseio.com/mails/';

  this.getSent = function(user) {
    return $http.get(baseUri + '.json')
        .then(response => normalizeToArray(response.data))
        .then(mails => mails.filter(mail => mail.sender.email === user.email))
        .catch(error => console.error(error));
  };

  this.getInbox = function(user) {
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

    return $http.post(baseUri + '.json', mail)
        .then(response => {
          mail.id = response.data.name;
          return mail;
        });
  };
});