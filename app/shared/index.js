import firebaseRefs from './firebaseRefs';
import appDropdown from './appDropdown';

angular.module('app.shared', ['firebase'])
  .service('firebaseRefs', firebaseRefs)
  .component('appDropdown', appDropdown);
