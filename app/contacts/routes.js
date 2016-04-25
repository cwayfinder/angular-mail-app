

angular.module('app.contacts').config(function($stateProvider) {

  var asideView = {
    template: '<contacts-sidebar></contacts-sidebar>'
  };

  $stateProvider

    .state('app.contacts', {
      url: '/contacts',
      abstract: true,
      template: '<contacts-app contacts="$ctrl.contacts"></contacts-app>'
    })

    .state('app.contacts.create', {
      url: '/create',
      views: {
        main: {
          template: '<contact-editor></contact-editor>'
        },
        aside: asideView
      }
    })

    .state('app.contacts.all', {
      url: '/all',
      views: {
        main: {
          template: '<contact-list contacts="$ctrl.contacts"></contact-list>',
          resolve: {
            contacts: function($stateParams, ContactsService, currentUser) {
              return ContactsService.list($stateParams.folder);
            }
          },
          controller: function(contacts) {
            this.contacts = contacts;
          },
          controllerAs: '$ctrl'
        },
        aside: asideView
      }
    });
});
