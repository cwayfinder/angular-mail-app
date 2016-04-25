import routes from './routes';

import ContactsService from './ContactsService';

import contactsApp from './contactsApp';
import contactList from './contactList';
import contactEditor from './contactEditor';
import contactsSidebar from './contactsSidebar';

angular.module('app.contacts', ['app.shared', 'app.security'])
  .config(routes)
  
  .service('ContactsService', ContactsService)
  
  .component('contactsApp', contactsApp)
  .component('contactList', contactList)
  .component('contactEditor', contactEditor)
  .component('contactsSidebar', contactsSidebar);
