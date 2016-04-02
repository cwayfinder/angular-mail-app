angular.module('app').service('MailService', function($http) {
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

  this.getMail = function(mailId, user) {
    return $http.get(baseUri + mailId + '.json').then(response => normalizeObject(response.data, mailId));
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

  this.remove = function(item) {
    console.debug('delete email', item);

    return $http.delete(baseUri + item.id + '.json')
      .then(response => response.data);
  };
});
