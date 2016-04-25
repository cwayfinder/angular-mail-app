import routes from './routes';

import MailService from './MailService';

import mailApp from './mailApp';
import mailEditor from './mailEditor';
import mailList from './mailList';
import mailPanel from './mailPanel';
import mailsSidebar from './mailsSidebar';

angular.module('app.mailbox', ['app.shared', 'app.security'])
  .config(routes)
  .service('MailService', MailService)
  .component('mailApp', mailApp)
  .component('mailEditor', mailEditor)
  .component('mailList', mailList)
  .component('mailPanel', mailPanel)
  .component('mailsSidebar', mailsSidebar);
