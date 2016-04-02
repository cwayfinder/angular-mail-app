angular.module('app').run(function($rootScope) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.error(error);
  });
});


angular.module('app').config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/mailbox/folder/inbox')

  var mailboxAsideView = {
    template: `<mails-sidebar selected-folder="$ctrl.folder"></mails-sidebar>`,
    controller: function($stateParams) {
      this.folder = $stateParams.folder;
    },
    controllerAs: '$ctrl'
  };

  $stateProvider
    .state('app', {
      abstract: true,
      url: '',
      template: `<app-viewport users="$ctrl.users" current-user="$ctrl.currentUser"></app-viewport>`,
      resolve: {
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
      views: {
        main: {
          template: `<mail-editor></mail-editor>`
        },
        aside: mailboxAsideView
      }
    })

    .state('app.mailbox.mail', {
      url: '/mail/:mailId',
      views: {
        main: {
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
        },
        aside: mailboxAsideView
      }
    })

    .state('app.mailbox.folder', {
      url: '/folder/:folder',
      views: {
        main: {
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
        },
        aside: mailboxAsideView
      }
    })

    .state('app.contacts', {
      url: '/contacts',
      template: `<contacts-app user="$ctrl.currentUser"></contacts-app>`
    });
});
