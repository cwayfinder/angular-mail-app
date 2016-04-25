angular.module('app.mailbox').config(function($stateProvider) {

  var asideView = {
    template: '<mails-sidebar selected-folder="$ctrl.folder"></mails-sidebar>',
    controller: function($stateParams) {
      this.folder = $stateParams.folder;
    },
    controllerAs: '$ctrl'
  };

  $stateProvider

    .state('app.mailbox', {
      abstract: true,
      url: '/mailbox',
      template: '<mail-app user="$ctrl.currentUser"></mail-app>'
    })

    .state('app.mailbox.compose', {
      url: '/compose',
      views: {
        main: {
          template: '<mail-editor></mail-editor>'
        },
        aside: asideView
      }
    })

    .state('app.mailbox.mail', {
      url: '/mail/:mailKey',
      views: {
        main: {
          template: '<mail-panel mail="$ctrl.mail"></mail-panel>',
          resolve: {
            mail: function($stateParams, MailService) {
              return MailService.get($stateParams.mailKey);
            }
          },
          controller: function($stateParams, mail) {
            this.mail = mail;
          },
          controllerAs: '$ctrl'
        },
        aside: asideView
      }
    })

    .state('app.mailbox.folder', {
      url: '/folder/:folder',
      views: {
        main: {
          template: '<mail-list mails="$ctrl.mails" folder="{{$ctrl.folder}}"></mail-list>',
          resolve: {
            mails: function($stateParams, MailService) {
              return MailService.list($stateParams.folder);
            }
          },
          controller: function($stateParams, mails) {
            this.mails = mails;
            this.folder = $stateParams.folder;
          },
          controllerAs: '$ctrl'
        },
        aside: asideView
      }
    });
});
