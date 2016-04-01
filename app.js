'use strict';

var app = angular.module('app', ['ui.router'])
  .run(function($rootScope) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      console.error(error);
    });
  })
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/aaa/mailbox/folder/inbox')

    $stateProvider
      .state('app', {
        abstract: true,
        url: '/aaa',
        template: `<app-viewport users="$ctrl.users" current-user="$ctrl.currentUser"></app-viewport>`,
        resolve:  {
          users: function(UserService) {
            return UserService.getAll();
          },
          currentUser: function(users, UserService) {
            return UserService.getCurrentUser();
          }
        },
        controller: function($resolve, users, currentUser) {
          this.users = users;
          this.currentUser = currentUser;
        },
        controllerAs: '$ctrl'
      })
      .state('app.mailbox', {
        abstract: true,
        url: '/mailbox',
        template: `<mail-app user="$ctrl.currentUser"></mail-app>`
      })
      .state('app.mailbox.compose', {
        url: '/compose',
        template: `<mail-editor></mail-editor>`
      })
      .state('app.mailbox.mail', {
        url: '/mail/:mailId',
        template: `<mail-panel mail="$ctrl.mail"></mail-panel>`,
        resolve: {
          mail: function($stateParams, MailService, currentUser) {
            return MailService.getMail($stateParams.mailId, currentUser);
          }
        },
        controller: function($stateParams, mail) {
          this.mail = mail;
        },
        controllerAs: '$ctrl'
      })
      .state('app.mailbox.folder', {
        url: '/folder/:folder',
        template: `<mail-list mails="$ctrl.mails" folder="{{$ctrl.folder}}"></mail-list>`,
        resolve: {
          mails: function($stateParams, MailService, UserService, currentUser) {
            let methodName = 'get' + capitalize($stateParams.folder);
            return MailService[methodName](UserService.getCurrentUser());
          }
        },
        controller: function($stateParams, mails) {
          this.mails = mails;
          this.folder = $stateParams.folder;
        },
        controllerAs: '$ctrl'
      })
      .state('app.contacts', {
        url: '/contacts',
        template: `<contacts-app user="$ctrl.currentUser"></contacts-app>`
      });
  })
  .service('UserService', function($http) {
    const baseUri = 'https://jsru-ng-mail-app.firebaseio.com/users/';

    let users;
    let currentUser;

    this.getAll = function() {
      console.debug(`load users`);

      return $http.get(baseUri + '.json')
        .then(response => normalizeToArray(response.data))
        .then(data => {
          users = data;
          return data;
        })
        .catch(error => console.error(error));
    };

    this.setCurrentUser = user => currentUser = user;
    this.getCurrentUser = () => {
      if (!currentUser) {
        currentUser = users[0];
      }
      return currentUser
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
